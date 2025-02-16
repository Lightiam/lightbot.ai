import React, { type FC } from "react"
import { Badge } from "./badge"
import { cn } from "../../lib/utils"
import type { FlowStatus } from "../../types"

export interface StatusBadgeProps {
  status: FlowStatus;
}

const variants = {
  draft: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  deployed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  failed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
};

export const StatusBadge: FC<StatusBadgeProps & { className?: string }> = ({ status, className }) => {
  return (
    <Badge className={cn(variants[status], className)}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}
