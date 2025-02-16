from fastapi import APIRouter, Request, HTTPException
import stripe
import os

router = APIRouter()

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET")

@router.post("/stripe")
async def stripe_webhook(request: Request):
    try:
        event = None
        payload = await request.body()
        sig_header = request.headers.get("stripe-signature")

        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, webhook_secret
            )
        except ValueError as e:
            raise HTTPException(status_code=400, detail="Invalid payload")
        except stripe.error.SignatureVerificationError as e:
            raise HTTPException(status_code=400, detail="Invalid signature")

        # Handle the event
        if event.type == "customer.subscription.created":
            subscription = event.data.object
            # TODO: Update user's subscription status
            print(f"Subscription created: {subscription.id}")
        elif event.type == "customer.subscription.updated":
            subscription = event.data.object
            # TODO: Update user's subscription status
            print(f"Subscription updated: {subscription.id}")
        elif event.type == "customer.subscription.deleted":
            subscription = event.data.object
            # TODO: Update user's subscription status
            print(f"Subscription cancelled: {subscription.id}")
        elif event.type == "invoice.payment_succeeded":
            invoice = event.data.object
            # TODO: Update usage limits
            print(f"Payment succeeded for invoice: {invoice.id}")
        elif event.type == "invoice.payment_failed":
            invoice = event.data.object
            # TODO: Handle failed payment
            print(f"Payment failed for invoice: {invoice.id}")

        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
