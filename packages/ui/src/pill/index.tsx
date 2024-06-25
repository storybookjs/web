import { cn } from '@repo/utils';
import type { ReactNode } from 'react';
import { ChevronSmallDownIcon } from '@storybook/icons';
import { Slot, Slottable } from '@radix-ui/react-slot';

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  isActive?: boolean;
  arrow?: boolean;
  asChild?: boolean;
  noHover?: boolean;
}

export const Pill = ({
  onClick,
  children = '',
  isActive = false,
  arrow = false,
  asChild = false,
  noHover = false,
  ...props
}: ButtonProps): ReactNode => {
  let Comp = asChild ? Slot : 'button';
  if (noHover) Comp = 'div';

  return (
    <Comp
      className={cn(
        'ui-outline-offset-3 ui-inline-flex ui-h-7 ui-items-center ui-justify-center ui-gap-1 ui-rounded ui-border ui-px-2 ui-text-sm',
        noHover &&
          'ui-cursor-default dark:ui-border-slate-700 dark:ui-text-slate-400',
        !noHover &&
          'ui-outline-blue-500 ui-transition-colors hover:ui-border-blue-500 hover:ui-text-blue-500',
        isActive &&
          'ui-border-blue-500 ui-text-blue-500 dark:ui-border-blue-500 dark:ui-text-blue-500',
        !isActive &&
          !noHover &&
          'dark:ui-border-slate-700 dark:ui-text-slate-400 dark:hover:ui-border-blue-500 dark:hover:ui-text-blue-500',
      )}
      onClick={onClick}
      {...props}
    >
      <Slottable>{children}</Slottable>
      {arrow ? <ChevronSmallDownIcon /> : null}
    </Comp>
  );
};
