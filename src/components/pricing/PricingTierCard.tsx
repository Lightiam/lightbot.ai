// No React import needed
import { Button } from "../ui/button"
import { Card, CardHeader, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import { Check } from "lucide-react"
import type { PricingTier, BillingInterval } from "../../types/pricing"
import { getAnnualDiscount } from "../../config/pricing"

interface PricingTierCardProps {
  tier: PricingTier
  interval: BillingInterval
  onSelect: (tierId: string) => Promise<void>
  loading?: boolean
}

export function PricingTierCard({ tier, interval, onSelect, loading = false }: PricingTierCardProps) {
  const price = interval === 'yearly' 
    ? tier.price.yearly 
    : tier.price.monthly;

  const yearlyDiscount = interval === 'yearly' && tier.price.monthly > 0
    ? getAnnualDiscount(tier.price.monthly)
    : 0;

  return (
    <Card className={`relative ${tier.highlighted ? 'border-purple-600 shadow-lg' : ''}`}>
      {tier.highlighted && (
        <Badge 
          className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600"
        >
          Most Popular
        </Badge>
      )}
      <CardHeader>
        <div className="space-y-1">
          <h3 className="text-2xl font-bold">{tier.name}</h3>
          <p className="text-sm text-muted-foreground">{tier.description}</p>
        </div>
        <div className="mt-4">
          {price === -1 ? (
            <div className="text-3xl font-bold">Custom Pricing</div>
          ) : (
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold">
                ${price}
              </span>
              <span className="text-muted-foreground">
                /{interval}
              </span>
            </div>
          )}
          {yearlyDiscount > 0 && (
            <p className="text-sm text-green-600 mt-1">
              Save ${yearlyDiscount} annually
            </p>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Limits</h4>
            <ul className="space-y-2">
              <li className="text-sm">
                Messages: {tier.limits.messages === -1 ? 'Unlimited' : tier.limits.messages.toLocaleString()}
              </li>
              <li className="text-sm">
                Conversations: {tier.limits.conversations === -1 ? 'Unlimited' : tier.limits.conversations.toLocaleString()}
              </li>
              <li className="text-sm">
                Chatbots: {tier.limits.chatbots === -1 ? 'Unlimited' : tier.limits.chatbots}
              </li>
              <li className="text-sm">
                Agents: {tier.limits.agents === -1 ? 'Unlimited' : tier.limits.agents}
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Features</h4>
            <ul className="space-y-2">
              {tier.features.map((feature) => (
                <li key={feature} className="text-sm flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <Button
            className={`w-full ${tier.highlighted ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
            onClick={() => onSelect(tier.id)}
            disabled={loading}
          >
            {price === 0 ? 'Start Free' : price === -1 ? 'Contact Sales' : 'Get Started'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
