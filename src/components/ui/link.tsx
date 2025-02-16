import * as React from "react"
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom"
import { cn } from "../../lib/utils"

export interface LinkProps extends RouterLinkProps {
  className?: string
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <RouterLink
        ref={ref}
        className={cn(
          "text-foreground hover:text-purple-600 transition-colors",
          className
        )}
        {...props}
      >
        {children}
      </RouterLink>
    )
  }
)
Link.displayName = "Link"
