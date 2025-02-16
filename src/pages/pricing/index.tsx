import React, { useState } from "react";
import { BillingToggle } from "../../components/pricing/BillingToggle";
import { PricingTierCard } from "../../components/pricing/PricingTierCard";
import { FeatureComparison } from "../../components/pricing/FeatureComparison";
import { PRICING_TIERS } from "../../config/pricing";
import type { BillingInterval } from "../../types/pricing";
import { useSubscription } from "../../hooks/use-subscription";
import { useToast } from "../../components/ui/use-toast";

export function PricingPage() {
  const [interval, setInterval] = useState<BillingInterval>("monthly")

  const { createNewSubscription, loading } = useSubscription();
  const { toast } = useToast();

  const handleSelectTier = async (tierId: string) => {
    if (loading) return;

    try {
      await createNewSubscription(tierId, interval);
      toast({
        title: "Success",
        description: "Redirecting to checkout...",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to create subscription. Please try again.",
        variant: "destructive",
      });
      console.error("Failed to create subscription:", err);
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">
          Honest, Transparent & Affordable Chatbot Pricing
        </h1>
        <ul className="flex flex-wrap justify-center gap-8 text-sm">
          <li className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-600" />
            No hidden cost
          </li>
          <li className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-600" />
            No Markup cost (Meta charges)
          </li>
          <li className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-600" />
            Get started for FREE
          </li>
          <li className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-600" />
            Get FREE Green Tick Verification
          </li>
        </ul>
      </div>

      <div className="flex justify-center">
        <BillingToggle interval={interval} onChange={setInterval} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {PRICING_TIERS.map((tier) => (
          <PricingTierCard
            key={tier.id}
            tier={tier}
            interval={interval}
            onSelect={handleSelectTier}
            loading={loading}
          />
        ))}
      </div>

      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-center">Compare Features</h2>
        <FeatureComparison />
      </div>

      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Chatbot for Non-Profit Organizations</h2>
        <div className="flex flex-col items-center gap-2 text-lg">
          <p>50% discount for non-profit organizations.</p>
          <p>100% discount for non-profit organizations working for animal welfare.</p>
        </div>
      </div>
    </div>
  )
}
