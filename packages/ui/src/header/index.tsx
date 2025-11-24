'use client';

import type { FC, ReactNode } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { cn } from '@repo/utils';
import { usePathname } from 'next/navigation';
import { GithubIcon } from '@storybook/icons';
import { usePlausible } from 'next-plausible';
import { StorybookLogo } from '../logos/storybook-logo';
// import { NewsletterForm } from '../newsletter-form';
import { Search } from '../search';
import { MobileMenu } from './mobile-menu';
import { Button } from './button';
// import { Eyebrow } from './eyebrow';
import { nav } from './nav';

export interface HeaderProps {
  algoliaApiKey: string;
  eyebrow?: ReactNode;
  githubCount?: number;
  subMenu?: ReactNode;
  variant?: 'home' | 'system';
}

export const Header: FC<HeaderProps> = ({
  algoliaApiKey,
  eyebrow,
  // eyebrow = (
  //   <Eyebrow
  //     href="https://us02web.zoom.us/webinar/register/1817522455361/WN_YfPY1PvpRIOs3GcB4p_P9w"
  //     title="Join us live: CSF Next: Less Boilerplate, faster story writing"
  //   />
  // ),
  githubCount = 0,
  subMenu,
  variant = 'system',
}) => {
  const pathname = usePathname();
  const plausible = usePlausible();

  return (
    <>
      {eyebrow}
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
                aria-label="Home"
              >
                <StorybookLogo
                  color={variant === 'home' ? 'white' : 'system'}
                  height={24}
                />
              </a>
              <NavigationMenu.Root className="min-[940px]:ui-block ui-hidden">
                <NavigationMenu.List className="ui-flex ui-gap-2">
                  {nav.map((item) => {
                    let active = false;
                    if (item.href === '/docs') {
                      active = pathname.startsWith('/docs');
                    } else if (item.href === '/addons') {
                      active = pathname.startsWith('/addons');
                    } else {
                      active = pathname === item.href;
                    }

                    return (
                      <Button
                        active={active}
                        external={item.external}
                        href={item.href}
                        onClick={() => { if (item.href === '/docs' || item.href === '/docs/') { plausible('GetStartedClick', { props: { location: 'header-nav' }})}}}
                        key={item.title}
                        title={item.title}
                        variant={variant}
                      />
                    );
                  })}
                </NavigationMenu.List>
              </NavigationMenu.Root>
            </div>
            <div className="ui-flex ui-gap-4">
              <a
                aria-label="Star Storybook on GitHub"
                className={cn(
                  'ui-h-8 ui-flex ui-items-center ui-justify-center ui-border ui-rounded-full ui-transition-colors max-[1120px]:ui-hidden ui-px-3 ui-gap-2 focus-visible:ui-outline-none focus-visible:ui-ring-inset focus-visible:ui-ring-2 focus-visible:ui-ring-blue-700',
                  githubCount === 0 && 'w-8 px-0',
                  variant === 'home' &&
                    'ui-border-white/30 hover:ui-border-white ui-text-white',
                  variant === 'system' &&
                    'ui-border ui-border-zinc-200 dark:ui-border-slate-700 ui-text-zinc-500 dark:ui-text-white  hover:ui-border-zinc-400 dark:hover:ui-border-slate-500',
                )}
                href="https://github.com/storybookjs/storybook"
                rel="noreferrer noopener"
                target="_blank"
              >
                <GithubIcon />
                {githubCount > 0 && (
                  <span className={cn('ui-text-xs ui-font-bold')}>
                    {githubCount.toLocaleString('en-US')}
                  </span>
                )}
              </a>
              <Search
                algoliaApiKey={algoliaApiKey}
                className="max-[440px]:ui-hidden"
                variant={variant}
              />
              {
              pathname !== '/docs' && pathname !== '/docs/' && (
                <a
                  className={cn(
                    'ui-h-8 ui-flex ui-items-center ui-justify-center ui-rounded-full ui-transition-colors max-[1040px]:ui-hidden ui-px-3 focus-visible:ui-outline-none focus-visible:ui-ring-inset focus-visible:ui-ring-2  focus-visible:ui-ring-blue-700 focus-visible:ui-shadow-[inset_0_0_0_4px_white] dark:focus-visible:ui-shadow-[inset_0_0_0_4px_#0d1026]',
                    variant === 'home' && 'ui-bg-white hover:ui-bg-white/96 ui-text-black',
                    variant === 'system' && 'ui-bg-zinc-700 hover:ui-bg-zinc-900 ui-text-white dark:ui-bg-slate-100 dark:hover:ui-bg-white dark:ui-text-zinc-900',
                  )}
                  href="/docs"
                  onClick={() => { plausible('GetStartedClick', { props: { location: 'header-cta' }})}}
                >
                  <span className={cn('ui-text-xs ui-font-bold whitespace-nowrap')}>
                    Get Started
                  </span>
                </a>
              )}
              <MobileMenu algoliaApiKey={algoliaApiKey} variant={variant} />
            </div>
          </div>
          {subMenu}
        </div>
      </header>
    </>
  );
};
