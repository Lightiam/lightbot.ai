// No React import needed
import { Button } from "../ui/button"
import { BillingInterval } from "../../types/pricing"

interface BillingToggleProps {
  interval: BillingInterval
  onChange: (interval: BillingInterval) => void
}

export function BillingToggle({ interval, onChange }: BillingToggleProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2 bg-muted p-1 rounded-lg">
        <Button
          variant={interval === 'monthly' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onChange('monthly')}
          className={interval === 'monthly' ? 'bg-purple-600 hover:bg-purple-700' : ''}
        >
          Monthly
        </Button>
        <Button
          variant={interval === 'yearly' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onChange('yearly')}
          className={interval === 'yearly' ? 'bg-purple-600 hover:bg-purple-700' : ''}
        >
          Yearly
        </Button>
      </div>
      {interval === 'yearly' && (
        <span className="text-sm text-muted-foreground">
          Get 2 Months FREE
        </span>
      )}
    </div>
  )
}
