'use client';

import type { FC } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { cn } from '@repo/utils';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { GithubIcon } from '@storybook/icons';
import type { DocsVersion } from '@repo/utils';
import { StorybookLogo } from '../logos/storybook';
import { Search } from './search';
import { MobileMenu } from './mobile-menu';
import { Submenu } from './submenu';

interface TreeMetaProps {
  title: string;
  sidebar?: {
    title?: string;
    order?: number;
  };
  tab?: {
    title?: string;
    order?: number;
  };
  isTab?: boolean;
}

interface TreeProps extends TreeMetaProps {
  name: string;
  slug: string;
  pathSegment: string;
  type: 'directory' | 'link' | 'tab';
  children?: TreeProps[];
}
export interface HeaderProps {
  variant?: 'home' | 'system';
  tree?: TreeProps[];
  activeVersion?: DocsVersion;
  githubCount?: number;
}

export const Header: FC<HeaderProps> = ({
  variant = 'home',
  tree,
  activeVersion,
  githubCount = 0,
}) => {
  const pathname = usePathname();

  return (
    <header
      className={cn(
        'ui-w-full ui-relative ui-z-50',
        variant === 'home' && 'ui-border-b ui-border-white/20',
        variant === 'system' &&
          'ui-sticky ui-top-0 ui-z-40 ui-backdrop-blur ui-bg-white/80 dark:ui-bg-zinc-900/80 lg:ui-border-b lg:ui-border-zinc-200 dark:ui-border-zinc-700',
      )}
    >
      <div className="ui-mx-auto ui-max-w-8xl">
        <div
          className={cn(
            'ui-h-18 ui-py-4 ui-px-4 sm:ui-px-8 md:ui-px-8 lg:ui-border-0 ui-flex ui-items-center ui-justify-between',
            variant === 'system' &&
              'ui-border-b ui-border-zinc-200 dark:ui-border-zinc-700',
          )}
        >
          <div className="ui-flex ui-items-center ui-gap-6">
            <Link className="ui-pl-2 md:ui-pl-0" href="/">
              <StorybookLogo color={variant === 'home' ? 'white' : 'system'} />
            </Link>
            <NavigationMenu.Root className="max-[920px]:ui-hidden">
              <NavigationMenu.List className="ui-flex ui-gap-2">
                <Button
                  active={pathname === '/docs'}
                  href="/docs"
                  variant={variant}
                >
                  Docs
                </Button>
                <Button external href="/integrations" variant={variant}>
                  Addons
                </Button>
                <Button external href="/showcase" variant={variant}>
                  Showcase
                </Button>
                <Button external href="/blog" variant={variant}>
                  Blog
                </Button>
                <Button
                  external
                  externalIcon
                  href="https://www.chromatic.com/storybook?utm_source=storybook_website&utm_medium=link&utm_campaign=storybook"
                  variant={variant}
                >
                  Visual Test
                </Button>
                <Button
                  external
                  externalIcon
                  href="https://www.chromatic.com/sales?utm_source=storybook_website&utm_medium=link&utm_campaign=storybook"
                  variant={variant}
                >
                  Enterprise
                </Button>
              </NavigationMenu.List>
            </NavigationMenu.Root>
          </div>
          <div className="ui-flex ui-gap-4">
            <a
              aria-label="Star Storybook on GitHub"
              className={cn(
                'ui-h-8 ui-flex ui-items-center ui-justify-center ui-border ui-rounded-full ui-transition-colors max-[440px]:ui-hidden ui-px-3 ui-gap-2',
                githubCount === 0 && 'w-8 px-0',
                variant === 'home' &&
                  'ui-border-white/30 hover:ui-border-white ui-text-white',
                variant === 'system' &&
                  'ui-border-zinc-300 hover:ui-border-zinc-400 ui-text-black',
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
                    variant !== 'home' && 'ui-text-slate-600',
                  )}
                >
                  {githubCount.toLocaleString('en-US')}
                </span>
              )}
            </a>
            <Search variant={variant} />
          </div>
          <MobileMenu variant={variant} />
        </div>
        {pathname.startsWith('/docs') && (
          <Submenu
            activeVersion={activeVersion}
            tree={tree}
            variant={variant}
          />
        )}
      </div>
    </header>
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'home' | 'system';
  active?: boolean;
  external?: boolean;
  externalIcon?: boolean;
  href: string;
  children: string;
}

const Button: FC<ButtonProps> = ({
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
            'ui-inline-flex ui-items-center ui-justify-center ui-whitespace-nowrap ui-rounded-md ui-text-sm ui-font-bold ui-ring-offset-white ui-transition-all focus-visible:ui-outline-none focus-visible:ui-ring-2 focus-visible:ui-ring-blue-700 focus-visible:ui-ring-offset-2 disabled:ui-pointer-events-none disabled:ui-opacity-50 dark:ui-ring-offset-slate-950 dark:ui-focus-visible:ring-slate-300 ui-duration-300 ui-h-8 ui-px-2',
            variant === 'home' &&
              !active &&
              'ui-group ui-flex ui-items-center ui-justify-center ui-gap-2 ui-text-sm ui-text-white ui-font-bold hover:ui-bg-white/10 hover:ui-text-white',
            variant === 'system' &&
              !active &&
              'ui-group ui-flex ui-items-center ui-justify-center ui-gap-2 ui-text-sm ui-text-zinc-500 ui-font-bold hover:ui-bg-blue-100 hover:ui-text-blue-500  dark:ui-text-white dark:hover:ui-bg-blue-500/10',
            active &&
              'ui-bg-blue-100 ui-text-blue-500 dark:ui-bg-blue-500/10 dark:ui-text-blue-500',
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
