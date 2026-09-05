import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-accent/15 text-accent",
        muted: "bg-surface-2 text-muted",
        danger: "bg-danger/15 text-danger",
        warn: "bg-warn/15 text-warn",
        moderate: "bg-moderate/15 text-moderate",
        ok: "bg-ok/15 text-ok",
        outline: "text-muted shadow-[0_0_0_1px_var(--color-border)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
