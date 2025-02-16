from typing import Literal, Dict, Optional
from datetime import datetime
from sqlalchemy.orm import Session
from ..models.usage import Usage
from ..models.subscription import Subscription
from ..config.pricing import PRICING_TIERS

UsageType = Literal['message', 'conversation']

async def track_usage(
    db: Session,
    user_id: str,
    type: UsageType,
    count: int = 1
) -> Dict:
    """
    Track usage for a specific user and type
    """
    try:
        # Get current subscription
        subscription = db.query(Subscription).filter(
            Subscription.user_id == user_id,
            Subscription.status == 'active'
        ).first()

        if not subscription:
            raise ValueError("No active subscription found")

        # Get current usage
        usage = db.query(Usage).filter(
            Usage.user_id == user_id,
            Usage.type == type,
            Usage.period_start <= datetime.utcnow(),
            Usage.period_end >= datetime.utcnow()
        ).first()

        if not usage:
            # Create new usage record
            usage = Usage(
                user_id=user_id,
                type=type,
                count=count,
                period_start=subscription.current_period_start,
                period_end=subscription.current_period_end
            )
            db.add(usage)
        else:
            # Update existing usage
            usage.count += count

        db.commit()

        # Get limits from pricing tier
        tier = next(
            (t for t in PRICING_TIERS if t.id == subscription.tier_id),
            None
        )
        if not tier:
            raise ValueError("Invalid subscription tier")

        limit = tier.limits.get(f"{type}s", -1)
        remaining = limit - usage.count if limit > 0 else None

        return {
            "type": type,
            "current": usage.count,
            "limit": limit,
            "remaining": remaining
        }

    except Exception as e:
        db.rollback()
        raise e

async def check_usage_limits(
    db: Session,
    user_id: str,
    type: UsageType
) -> Dict:
    """
    Check if user has exceeded their usage limits
    """
    try:
        # Get current subscription
        subscription = db.query(Subscription).filter(
            Subscription.user_id == user_id,
            Subscription.status == 'active'
        ).first()

        if not subscription:
            raise ValueError("No active subscription found")

        # Get current usage
        usage = db.query(Usage).filter(
            Usage.user_id == user_id,
            Usage.type == type,
            Usage.period_start <= datetime.utcnow(),
            Usage.period_end >= datetime.utcnow()
        ).first()

        if not usage:
            return {
                "type": type,
                "has_exceeded": False,
                "current": 0,
                "limit": None
            }

        # Get limits from pricing tier
        tier = next(
            (t for t in PRICING_TIERS if t.id == subscription.tier_id),
            None
        )
        if not tier:
            raise ValueError("Invalid subscription tier")

        limit = tier.limits.get(f"{type}s", -1)
        has_exceeded = limit > 0 and usage.count >= limit

        return {
            "type": type,
            "has_exceeded": has_exceeded,
            "current": usage.count,
            "limit": limit
        }

    except Exception as e:
        raise e
