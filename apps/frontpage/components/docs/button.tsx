'use client';

import { Button as UIButton } from '@repo/ui';
import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';
import { ChevronSmallDownIcon } from '@storybook/icons';

interface ButtonProps {
  onClick?: () => void;
  children: string;
  active?: boolean;
  arrow?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { onClick, children = '', active = false, arrow = false, ...props },
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    return (
      <UIButton
        variant="outline"
        size="sm"
        active={active ? 'outline' : undefined}
        className="gap-1"
        onClick={onClick}
        ref={ref}
        {...props}
      >
        {children}
        {arrow ? <ChevronSmallDownIcon /> : null}
      </UIButton>
    );
  },
);

Button.displayName = 'Button';
