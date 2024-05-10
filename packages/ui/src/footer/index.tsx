import { cn } from '@repo/utils';
import type { FC } from 'react';
import Link from 'next/link';
import { StorybookLogo } from '../logos/storybook';
import { ChromaticLogo } from '../logos/chromatic';
import { Container } from '../container';
import { Form } from './form';
import { footerNav } from './nav';

export interface FooterProps {
  variant?: 'system' | 'home';
}

export const Footer: FC<FooterProps> = ({ variant = 'system' }) => {
  return (
    <div
      className={cn(
        variant !== 'home' &&
          'ui-bg-slate-50 ui-text-slate-800 ui-border-t ui-border-zinc-200 dark:ui-bg-zinc-900 dark:ui-text-white dark:ui-border-zinc-700',
        variant === 'home' &&
          'ui-bg-homeBackground ui-text-white ui-border-t border-zinc-700',
      )}
    >
      <Container className="lg:ui-px-8 ui-py-12">
        <Form variant={variant} />
        <div className="ui-flex ui-flex-wrap ui-mb-6 sm:ui-mb-20">
          {footerNav.map((nav) => (
            <div
              className="ui-flex ui-flex-col ui-w-full ui-gap-3 ui-mb-12 sm:ui-w-1/2 md:ui-flex-1 md:ui-mb-0"
              key={nav.title}
            >
              <div className="ui-font-bold ui-text-md">{nav.title}</div>
              {nav.links.map((link) => {
                if (link.isExternal)
                  return (
                    <a
                      className={cn(
                        'ui-text-zinc-600 hover:ui-text-blue-500 ui-transition-colors ui-text-md',
                        variant === 'home' && 'ui-text-zinc-400',
                        variant !== 'home' &&
                          'ui-text-zinc-600 dark:ui-text-zinc-400',
                      )}
                      href={link.href}
                      key={link.title}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {link.title}
                    </a>
                  );
                return (
                  <Link
                    className={cn(
                      'ui-text-zinc-600 hover:ui-text-blue-500 ui-transition-colors ui-text-md',
                      variant === 'home' && 'ui-text-zinc-400',
                      variant !== 'home' &&
                        'ui-text-zinc-600 dark:ui-text-zinc-400',
                    )}
                    href={link.href}
                    key={link.title}
                  >
                    {link.title}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
        <div className="ui-flex ui-flex-col ui-justify-between ui-gap-12 sm:ui-flex-row sm:ui-gap-0">
          <div className="ui-flex ui-gap-4 sm:ui-gap-8">
            <div
              className={cn(
                'ui-border-r ui-border-zinc-200 ui-pr-4 sm:ui-pr-8 dark:ui-border-zinc-600',
                variant === 'home' && 'ui-border-zinc-600',
              )}
            >
              <div
                className={cn(
                  'text-sm mb-2',
                  variant === 'home' && 'ui-text-zinc-400',
                  variant !== 'home' &&
                    'ui-text-zinc-600 dark:ui-text-zinc-400',
                )}
              >
                Open source software
              </div>
              <StorybookLogo color={variant === 'home' ? 'white' : 'system'} />
            </div>
            <div>
              <div
                className={cn(
                  'text-sm mb-2',
                  variant === 'home' && 'ui-text-zinc-400',
                  variant !== 'home' &&
                    'ui-text-zinc-600 dark:ui-text-zinc-400',
                )}
              >
                Maintained by
              </div>
              <ChromaticLogo color={variant === 'home' ? 'white' : 'system'} />
            </div>
          </div>
          <div
            className={cn(
              'text-sm',
              variant === 'home' && 'ui-text-zinc-400',
              variant !== 'home' && 'ui-text-zinc-600 dark:ui-text-zinc-400',
            )}
          >
            Special thanks to{' '}
            <a
              className={cn(
                'ui-text-zinc-600 hover:ui-text-blue-500 ui-transition-colors ui-text-md',
                variant === 'home' && 'ui-text-white',
                variant !== 'home' && 'ui-text-zinc-600 dark:ui-text-white',
              )}
              href="https://netlify.com"
            >
              Netlify
            </a>{' '}
            and{' '}
            <a
              className={cn(
                'ui-text-zinc-600 hover:ui-text-blue-500 ui-transition-colors ui-text-md',
                variant === 'home' && 'ui-text-white',
                variant !== 'home' && 'ui-text-zinc-600 dark:ui-text-white',
              )}
              href="https://circleci.com"
            >
              CircleCi
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
};
