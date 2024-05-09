import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@repo/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 duration-300',
  {
    variants: {
      variant: {
        ghostHome:
          'group flex items-center justify-center gap-2 text-sm text-white font-bold hover:bg-blue-500/10 hover:text-blue-500',
        ghostSystem:
          'group flex items-center justify-center gap-2 text-sm text-zinc-500 font-bold hover:bg-blue-100 hover:text-blue-500  dark:text-white dark:hover:bg-blue-500/10',
        solid:
          'group flex items-center justify-center gap-2 text-sm text-zinc-500 font-bold text-white bg-blue-500 hover:bg-blue-600',
        link: 'text-slate-900 underline-offset-4 hover:underline dark:text-slate-50',
        outlineHome:
          'group flex items-center justify-center gap-2 text-sm text-white font-bold border border-white',
      },
      size: {
        sm: 'h-7 px-2',
        md: 'h-8 px-2',
        lg: 'h-10 px-4',
        iconSm: 'h-7 w-7',
        iconLg: 'h-10 w-10',
      },
      rounded: {
        md: 'rounded-md',
        full: 'rounded-full px-4',
      },
      active: {
        system:
          'bg-blue-100 text-blue-500 dark:bg-blue-500/10 dark:text-blue-500',
        home: 'text-blue-500 dark:bg-blue-500/10 dark:text-blue-500',
      },
      jumpOnHover: {
        true: 'hover:-translate-y-0.5',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'ghostSystem',
      size: 'lg',
      rounded: 'md',
      jumpOnHover: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      active,
      size,
      rounded,
      jumpOnHover,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            active,
            size,
            rounded,
            jumpOnHover,
            className,
          }),
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
