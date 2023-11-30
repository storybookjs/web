import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        ghostHome:
          "group flex items-center justify-center gap-2 rounded text-sm text-white font-bold hover:bg-blue-500/10 hover:text-blue-500 transition-colors",
        ghostSystem:
          "group flex items-center justify-center gap-2 rounded text-sm text-zinc-500 font-bold hover:bg-blue-100 hover:text-blue-500 transition-colors dark:text-white dark:hover:bg-blue-500/10",
        link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
      },
      size: {
        sm: "h-7 rounded-md px-2",
        lg: "h-8 rounded-md px-2",
        iconSm: "h-7 w-7",
        iconLg: "h-10 w-10",
      },
      active: {
        true: "bg-blue-100 text-blue-500 dark:bg-blue-500/10 dark:text-blue-500",
        false: "",
      },
    },
    defaultVariants: {
      variant: "ghostSystem",
      size: "lg",
      active: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, active, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, active, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
