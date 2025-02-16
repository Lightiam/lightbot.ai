import { useState, useCallback } from 'react'
import type { BillingInterval } from '../types/pricing'
import { createSubscription, updateSubscription, cancelSubscription, getSubscriptionStatus } from '../services/stripe'
import { useToast } from '../components/ui/use-toast'

interface UseSubscriptionReturn {
  loading: boolean;
  error: Error | null;
  createNewSubscription: (tierId: string, interval: BillingInterval) => Promise<void>;
  updateExistingSubscription: (subscriptionId: string, tierId: string, interval: BillingInterval) => Promise<void>;
  cancelExistingSubscription: (subscriptionId: string) => Promise<void>;
  getStatus: (subscriptionId: string) => Promise<void>;
}

export function useSubscription(): UseSubscriptionReturn {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { toast } = useToast()

  const createNewSubscription = useCallback(async (tierId: string, interval: BillingInterval) => {
    setLoading(true)
    setError(null)
    try {
      await createSubscription({ tierId, interval })
      toast({
        title: 'Success',
        description: 'Subscription created successfully',
      })
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to create subscription')
      setError(error)
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
      throw error
    } finally {
      setLoading(false)
    }
  }, [toast])

  const updateExistingSubscription = useCallback(async (subscriptionId: string, tierId: string, interval: BillingInterval) => {
    setLoading(true)
    setError(null)
    try {
      await updateSubscription({ subscriptionId, tierId, interval })
      toast({
        title: 'Success',
        description: 'Subscription updated successfully',
      })
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update subscription')
      setError(error)
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
      throw error
    } finally {
      setLoading(false)
    }
  }, [toast])

  const cancelExistingSubscription = useCallback(async (subscriptionId: string) => {
    setLoading(true)
    setError(null)
    try {
      await cancelSubscription({ subscriptionId })
      toast({
        title: 'Success',
        description: 'Subscription cancelled successfully',
      })
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to cancel subscription')
      setError(error)
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
      throw error
    } finally {
      setLoading(false)
    }
  }, [toast])

  const getStatus = useCallback(async (subscriptionId: string) => {
    setLoading(true)
    setError(null)
    try {
      return await getSubscriptionStatus(subscriptionId)
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to get subscription status')
      setError(error)
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
      throw error
    } finally {
      setLoading(false)
    }
  }, [toast])

  return {
    loading,
    error,
    createNewSubscription,
    updateExistingSubscription,
    cancelExistingSubscription,
    getStatus,
  }
}
