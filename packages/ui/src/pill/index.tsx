import { cn } from '@repo/utils';
import type { ReactNode } from 'react';
import { ChevronSmallDownIcon } from '@storybook/icons';
import { Slot, Slottable } from '@radix-ui/react-slot';

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  active?: boolean;
  arrow?: boolean;
  asChild?: boolean;
}

export const Pill = ({
  onClick,
  children = '',
  active = false,
  arrow = false,
  asChild = false,
  ...props
}: ButtonProps): ReactNode => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={cn(
        'ui-outline-offset-3 ui-inline-flex ui-h-7 ui-items-center ui-justify-center ui-gap-1 ui-rounded ui-border ui-border-zinc-300 ui-px-2 ui-text-sm ui-text-zinc-800 ui-outline-blue-500 ui-transition-colors hover:ui-border-blue-500 hover:ui-text-blue-500 data-[state=open]:ui-border-blue-500 data-[state=open]:ui-text-blue-500',
        active &&
          'ui-border-blue-500 ui-text-blue-500 dark:ui-border-blue-500 dark:ui-text-blue-500',
        !active &&
          'ui-dark:border-slate-700 dark:ui-text-slate-500 dark:hover:ui-border-slate-500',
      )}
      onClick={onClick}
      {...props}
    >
      <Slottable>{children}</Slottable>
      {arrow ? <ChevronSmallDownIcon /> : null}
    </Comp>
  );
};
