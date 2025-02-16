import { loadStripe } from '@stripe/stripe-js'
import type { BillingInterval, CreateSubscriptionInput, UpdateSubscriptionInput, CancelSubscriptionInput } from '../types/pricing'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export async function createSubscription({ tierId, interval }: CreateSubscriptionInput): Promise<void> {
  try {
    const stripe = await stripePromise
    if (!stripe) {
      throw new Error('Stripe failed to initialize')
    }

    // TODO: Call backend to create subscription and get session ID
    const response = await fetch('/api/subscriptions/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tierId, interval })
    })

    if (!response.ok) {
      throw new Error('Failed to create subscription')
    }

    const { sessionId } = await response.json()

    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({ sessionId })
    if (error) {
      throw error
    }
  } catch (error) {
    console.error('Error creating subscription:', error)
    throw error
  }
}

export async function updateSubscription({ subscriptionId, tierId, interval }: UpdateSubscriptionInput): Promise<void> {
  try {
    const response = await fetch('/api/subscriptions/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subscriptionId, tierId, interval })
    })

    if (!response.ok) {
      throw new Error('Failed to update subscription')
    }
  } catch (error) {
    console.error('Error updating subscription:', error)
    throw error
  }
}

export async function cancelSubscription({ subscriptionId }: CancelSubscriptionInput): Promise<void> {
  try {
    const response = await fetch('/api/subscriptions/cancel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subscriptionId })
    })

    if (!response.ok) {
      throw new Error('Failed to cancel subscription')
    }
  } catch (error) {
    console.error('Error canceling subscription:', error)
    throw error
  }
}

export async function getSubscriptionStatus(subscriptionId: string): Promise<void> {
  try {
    const response = await fetch(`/api/subscriptions/${subscriptionId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    if (!response.ok) {
      throw new Error('Failed to get subscription status')
    }

    return response.json()
  } catch (error) {
    console.error('Error getting subscription status:', error)
    throw error
  }
}
