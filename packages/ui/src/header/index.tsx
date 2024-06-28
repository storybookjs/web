'use client';

import type { FC, ReactNode } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { cn } from '@repo/utils';
import { usePathname } from 'next/navigation';
import { GithubIcon } from '@storybook/icons';
import { StorybookLogo } from '../logos/storybook-logo';
import { Search } from '../search';
import { MobileMenu } from './mobile-menu';
import { Button } from './button';
import { nav } from './nav';

export interface HeaderProps {
  algoliaApiKey: string;
  githubCount?: number;
  subMenu?: ReactNode;
  variant?: 'home' | 'system';
}

export const Header: FC<HeaderProps> = ({
  algoliaApiKey,
  githubCount = 0,
  subMenu,
  variant = 'system',
}) => {
  const pathname = usePathname();

  return (
    <header
      className={cn(
        'ui-w-full ui-relative ui-z-50',
        variant === 'home' && 'ui-border-b ui-border-white/20',
        variant === 'system' &&
          'ui-sticky ui-top-0 ui-z-40 ui-backdrop-blur ui-bg-white/80 sm:ui-bg-white/60 dark:ui-bg-slate-950/80 lg:ui-border-b lg:ui-border-black/5 dark:ui-border-slate-800',
      )}
    >
      <div className="ui-mx-auto ui-max-w-8xl">
        <div
          className={cn(
            'ui-h-18 ui-py-4 ui-px-4 sm:ui-px-8 md:ui-px-8 lg:ui-border-0 ui-flex ui-items-center ui-justify-between',
            variant === 'system' &&
              'ui-border-b ui-border-zinc-200 dark:ui-border-slate-800',
          )}
        >
          <div className="ui-flex ui-items-center ui-gap-6">
            {/* TODO: Contextual Link is possible */}
            <a
              className="ui-pl-2 md:ui-px-3 ui-h-8 ui-flex ui-items-center"
              href="/"
            >
              <StorybookLogo color={variant === 'home' ? 'white' : 'system'} />
            </a>
            <NavigationMenu.Root className="max-[920px]:ui-hidden">
              <NavigationMenu.List className="ui-flex ui-gap-2">
                {nav.map((item) => (
                  <Button
                    active={pathname === item.href}
                    external={item.external}
                    href={item.href}
                    key={item.title}
                    title={item.title}
                    variant={variant}
                  />
                ))}
              </NavigationMenu.List>
            </NavigationMenu.Root>
          </div>
          <div className="ui-flex ui-gap-4">
            <a
              aria-label="Star Storybook on GitHub"
              className={cn(
                'ui-h-8 ui-flex ui-items-center ui-justify-center ui-border ui-rounded-full ui-transition-colors max-[992px]:ui-hidden ui-px-3 ui-gap-2',
                githubCount === 0 && 'w-8 px-0',
                variant === 'home' &&
                  'ui-border-white/30 hover:ui-border-white ui-text-white',
                variant === 'system' &&
                  'ui-border ui-border-zinc-200 dark:ui-border-slate-700 ui-text-zinc-500 dark:ui-text-white',
              )}
              href="https://github.com/storybookjs/storybook"
              rel="noreferrer noopener"
              target="_blank"
            >
              <GithubIcon />
              {githubCount > 0 && (
                <span
                  className={cn(
                    'ui-text-xs ui-font-bold',
                    variant === 'home' && 'ui-text-white',
                    variant !== 'home' &&
                      'ui-text-slate-600 dark:ui-text-white',
                  )}
                >
                  {githubCount.toLocaleString('en-US')}
                </span>
              )}
            </a>
            <Search
              algoliaApiKey={algoliaApiKey}
              className="max-[440px]:ui-hidden"
              variant={variant}
            />
          </div>
          <MobileMenu algoliaApiKey={algoliaApiKey} variant={variant} />
        </div>
        {subMenu}
      </div>
    </header>
  );
};
