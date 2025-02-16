from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import stripe
import os

router = APIRouter()

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

class CreateSubscriptionRequest(BaseModel):
    tierId: str
    interval: str

class UpdateSubscriptionRequest(BaseModel):
    subscriptionId: str
    tierId: str
    interval: str

class CancelSubscriptionRequest(BaseModel):
    subscriptionId: str

@router.post("/create")
async def create_subscription(request: CreateSubscriptionRequest):
    try:
        # Create Stripe Checkout Session
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            mode="subscription",
            success_url="http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url="http://localhost:5173/cancel",
            line_items=[{
                "price": request.tierId,
                "quantity": 1,
            }],
        )
        return {"sessionId": session.id}
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/update")
async def update_subscription(request: UpdateSubscriptionRequest):
    try:
        subscription = stripe.Subscription.modify(
            request.subscriptionId,
            items=[{
                "id": request.tierId,
                "price": request.tierId,
            }],
        )
        return {"subscription": subscription}
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/cancel")
async def cancel_subscription(request: CancelSubscriptionRequest):
    try:
        subscription = stripe.Subscription.delete(request.subscriptionId)
        return {"subscription": subscription}
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{subscription_id}")
async def get_subscription(subscription_id: str):
    try:
        subscription = stripe.Subscription.retrieve(subscription_id)
        return {"subscription": subscription}
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))
