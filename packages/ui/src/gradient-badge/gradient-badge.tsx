'use client';

import Link from 'next/link';
import type { FC, ReactNode } from 'react';
import { cn } from '../cn';

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
  <Link
    href={link}
    className={cn(
      'ui-gradient-badge',
      'ui-inline-flex ui-items-center ui-gap-2 ui-rounded-full ui-pl-3 ui-pr-3 ui-py-1.5 ui-text-xs ui-font-normal ui-text-white ui-no-underline',
      className,
    )}
  >
    {icon}
    {children}
  </Link>
);
