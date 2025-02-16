export interface PricingTier {
  id: string;
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  description: string;
  limits: {
    messages: number;
    conversations: number;
    chatbots: number;
    agents: number;
  };
  features: string[];
  highlighted?: boolean;
}

export interface AddOnPricing {
  id: string;
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  description?: string;
}

export interface SubscriptionPlan {
  id: string;
  tier: PricingTier;
  interval: BillingInterval;
  status: SubscriptionStatus;
  currentPeriodEnd: string;
  usage: {
    messages: number;
    conversations: number;
  };
  addOns?: AddOnPricing[];
}

export type BillingInterval = 'monthly' | 'yearly';
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'incomplete' | 'trialing';

export interface CreateSubscriptionInput {
  tierId: string;
  interval: BillingInterval;
  addOnIds?: string[];
}

export interface UpdateSubscriptionInput {
  subscriptionId: string;
  tierId: string;
  interval: BillingInterval;
  addOnIds?: string[];
}

export interface CancelSubscriptionInput {
  subscriptionId: string;
}

export interface SubscriptionUsage {
  messages: {
    used: number;
    limit: number;
  };
  conversations: {
    used: number;
    limit: number;
  };
}
