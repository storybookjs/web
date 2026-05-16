import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../cn';

const buttonVariants = cva(
  'ui-inline-flex ui-items-center ui-justify-center ui-whitespace-nowrap ui-rounded-md ui-text-sm ui-font-medium ui-ring-offset-white ui-transition-all focus-visible:ui-outline-none focus-visible:ui-ring-2 focus-visible:ui-ring-blue-800 focus-visible:ui-ring-offset-2 disabled:ui-pointer-events-none disabled:ui-opacity-50 dark:ui-ring-offset-slate-950 dark:focus-visible:ui-ring-slate-300 ui-duration-300',
  {
    variants: {
      variant: {
        ghost:
          'ui-group ui-flex ui-items-center ui-justify-center ui-gap-2 ui-text-sm ui-text-blue-600 ui-font-bold hover:ui-bg-blue-600/10',
        ghostHome:
          'ui-group ui-flex ui-items-center ui-justify-center ui-gap-2 ui-text-sm ui-text-white ui-font-bold hover:ui-bg-blue-600/10 hover:ui-text-blue-600',
        ghostSystem:
          'ui-group ui-flex ui-items-center ui-justify-center ui-gap-2 ui-text-sm ui-text-zinc-500 ui-font-bold hover:ui-bg-blue-200 hover:ui-text-blue-600 dark:ui-text-white dark:hover:ui-bg-blue-600/10',
        solid:
          'ui-group ui-flex ui-items-center ui-justify-center ui-gap-2 ui-text-sm ui-text-white ui-font-bold ui-bg-blue-600 hover:ui-bg-blue-700',
        link: 'ui-text-slate-900 ui-underline-offset-4 hover:ui-underline dark:ui-text-slate-50',
        outline:
          'ui-group ui-flex ui-items-center ui-justify-center ui-gap-2 ui-text-sm ui-text-zinc-500 ui-font-bold ui-border ui-border-zinc-300 hover:ui-border-blue-600 hover:ui-text-blue-600 data-[state=open]:ui-border-blue-600 data-[state=open]:ui-text-blue-600 dark:ui-text-white dark:ui-border-slate-700',
        outlineHome:
          'ui-group ui-flex ui-items-center ui-justify-center ui-gap-2 ui-text-sm ui-text-white ui-font-bold ui-border ui-border-white',
      },
      size: {
        sm: 'ui-h-7 ui-px-2',
        md: 'ui-h-8 ui-px-2',
        lg: 'ui-h-10 ui-px-4',
        iconSm: 'ui-h-7 ui-w-7',
        iconLg: 'ui-h-10 ui-w-10',
      },
      rounded: {
        md: 'ui-rounded-md',
        full: 'ui-rounded-full ui-px-4',
      },
      active: {
        system:
          'ui-bg-blue-200 ui-text-blue-600 dark:ui-bg-blue-600/10 dark:ui-text-blue-600',
        home: 'ui-text-blue-600 dark:ui-bg-blue-600/10 dark:ui-text-blue-600',
        outline:
          'ui-border-blue-600 ui-text-blue-600 dark:ui-border-blue-600 dark:ui-text-blue-600',
        filled:
          'ui-border-slate-500 ui-bg-slate-500 ui-text-white hover:ui-border-slate-500 hover:ui-text-white dark:ui-border-slate-700 dark:ui-bg-slate-700 dark:ui-text-slate-400 dark:hover:ui-border-slate-700 dark:hover:ui-text-slate-400',
      },
      jumpOnHover: {
        true: 'hover:-ui-translate-y-0.5',
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
