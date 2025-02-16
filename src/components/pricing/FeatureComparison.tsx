import React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Check, Minus } from "lucide-react"
import { PRICING_TIERS } from "../../config/pricing"
import type { PricingTier } from "../../types/pricing"

const allFeatures = Array.from(
  new Set(PRICING_TIERS.flatMap(tier => tier.features))
);

function getTierHasFeature(tier: PricingTier, feature: string): boolean {
  return tier.features.includes(feature) || 
    tier.features.some(f => f.startsWith(`Everything in ${tier.name}`));
}

export function FeatureComparison() {
  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Feature</TableHead>
            {PRICING_TIERS.map((tier) => (
              <TableHead key={tier.id} className="text-center">
                {tier.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {allFeatures.map((feature) => (
            <TableRow key={feature}>
              <TableCell className="font-medium">{feature}</TableCell>
              {PRICING_TIERS.map((tier) => (
                <TableCell key={tier.id} className="text-center">
                  {getTierHasFeature(tier, feature) ? (
                    <Check className="h-4 w-4 text-green-600 mx-auto" />
                  ) : (
                    <Minus className="h-4 w-4 text-muted-foreground mx-auto" />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
