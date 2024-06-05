'use client';

import type { FC } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { cn } from '@repo/utils';
import Link from 'next/link';
import { Arrow } from './arrow';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'home' | 'system';
  active?: boolean;
  external?: boolean;
  externalIcon?: boolean;
  href: string;
  title: string;
}

export const Button: FC<ButtonProps> = ({
  variant,
  external = false,
  externalIcon = false,
  active = false,
  href,
  title,
}) => {
  const Comp = external ? 'a' : Link;

  return (
    <NavigationMenu.Item>
      <NavigationMenu.Link asChild>
        <Comp
          className={cn(
            'ui-inline-flex ui-items-center ui-justify-center ui-whitespace-nowrap ui-rounded-md ui-text-sm ui-font-bold ui-transition-all focus-visible:ui-outline-none focus-visible:ui-ring-2 focus-visible:ui-ring-blue-700 dark:ui-focus-visible:ring-slate-300 ui-duration-300 ui-h-8 ui-px-2',
            variant === 'home' &&
              !active &&
              'ui-group ui-flex ui-items-center ui-justify-center ui-gap-2 ui-text-sm ui-text-white ui-font-bold hover:ui-bg-white/10 hover:ui-text-white',
            variant === 'system' &&
              !active &&
              'ui-group ui-flex ui-items-center ui-justify-center ui-gap-2 ui-text-sm ui-text-zinc-500 ui-font-bold hover:ui-bg-[rgba(0,0,0,0.04)] hover:ui-text-blue-500 dark:ui-text-white dark:hover:ui-bg-white/5',
            active &&
              'ui-bg-[rgba(0,0,0,0.04)] hover:ui-bg-[rgba(0,0,0,0.08)] dark:ui-bg-white/5 dark:hover:ui-bg-white/10 ui-text-blue-500',
          )}
          href={href}
          target={external ? '_blank' : undefined}
        >
          {title}
          {externalIcon ? (
            <div className="ui-h-full ui-flex ui-items-start ui-py-1.5">
              <Arrow />
            </div>
          ) : null}
        </Comp>
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
};
