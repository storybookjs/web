'use client';

import { cn } from '@repo/utils';
import type { FC, ReactNode } from 'react';

export interface GradientBadgeProps {
  link: string;
  children: ReactNode;
  icon: ReactNode;
  className?: string;
}

export const GradientBadge: FC<GradientBadgeProps> = ({
  link,
  children,
  icon,
  className,
}) => (
  <a
    href={link}
    className={cn(
      'ui-gradient-badge',
      'ui-inline-flex ui-items-center ui-gap-2 ui-rounded-full ui-pl-3 ui-pr-3 ui-py-1.5 ui-text-xs ui-font-normal ui-text-white ui-no-underline',
      className,
    )}
  >
    {icon}
    {children}
  </a>
);
