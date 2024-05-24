'use client';

import type { FC } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { cn } from '@repo/utils';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'home' | 'system';
  active?: boolean;
  external?: boolean;
  externalIcon?: boolean;
  href: string;
  children: string;
}

export const Button: FC<ButtonProps> = ({
  variant,
  external = false,
  externalIcon = false,
  active = false,
  href,
  children,
}) => {
  const Comp = external ? 'a' : Link;

  return (
    <NavigationMenu.Item>
      <NavigationMenu.Link asChild>
        <Comp
          className={cn(
            'ui-inline-flex ui-items-center ui-justify-center ui-whitespace-nowrap ui-rounded-md ui-text-sm ui-font-bold ui-transition-all focus-visible:ui-outline-none focus-visible:ui-ring-2 focus-visible:ui-ring-blue-700 disabled:ui-pointer-events-none disabled:ui-opacity-50 dark:ui-focus-visible:ring-slate-300 ui-duration-300 ui-h-8 ui-px-2',
            variant === 'home' &&
              !active &&
              'ui-group ui-flex ui-items-center ui-justify-center ui-gap-2 ui-text-sm ui-text-white ui-font-bold hover:ui-bg-white/10 hover:ui-text-white',
            variant === 'system' &&
              !active &&
              'ui-group ui-flex ui-items-center ui-justify-center ui-gap-2 ui-text-sm ui-text-zinc-500 ui-font-bold hover:ui-bg-[rgba(0,0,0,0.04)] hover:ui-text-blue-500  dark:ui-text-white dark:hover:ui-bg-white/5',
            active &&
              'ui-bg-[rgba(0,0,0,0.04)] hover:ui-bg-[rgba(0,0,0,0.08)] dark:ui-bg-white/5 dark:hover:ui-bg-white/10 ui-text-blue-500',
          )}
          href={href}
          target={external ? '_blank' : undefined}
        >
          {children}
          {externalIcon ? (
            <div className="ui-h-full ui-flex ui-items-start ui-py-1.5">
              <svg
                fill="none"
                height="8"
                viewBox="0 0 8 8"
                width="8"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.63695 1.23752C2.63695 1.07155 2.77149 0.937012 2.93746 0.937012L6.76232 0.937012C6.92829 0.937012 7.06283 1.07155 7.06283 1.23752V5.06239C7.06283 5.22835 6.92829 5.36289 6.76232 5.3629C6.59636 5.36289 6.46181 5.22835 6.46181 5.06239L6.46181 1.96302L1.45001 6.97482C1.33266 7.09217 1.14239 7.09217 1.02503 6.97482C0.907673 6.85746 0.907673 6.66719 1.02503 6.54983L6.03683 1.53803L2.93746 1.53803C2.77149 1.53803 2.63695 1.40349 2.63695 1.23752Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          ) : null}
        </Comp>
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
};
