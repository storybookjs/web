import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@storybook/icons';
import { cn } from '../cn';

export interface SubHeaderTab {
  label: string;
  href: string;
}

interface BaseProps {
  className?: string;
  right?: ReactNode;
}

interface BackLinkProps extends BaseProps {
  leftLabel?: string;
  leftHref?: string;
  tabs?: never;
  activeHref?: never;
}

interface TabsProps extends BaseProps {
  tabs: SubHeaderTab[];
  /** `href` of the tab for the current page */
  activeHref: string;
  /** Accessible name for the tab navigation */
  label?: string;
  leftLabel?: never;
  leftHref?: never;
}

export type SubHeaderProps = BackLinkProps | TabsProps;

export function SubHeader(props: SubHeaderProps): ReactNode {
  const { className, right } = props;

  return (
    <div
      className={cn(
        'ui-mb-16 ui-flex ui-h-16 ui-items-center ui-justify-between ui-border-b ui-border-zinc-100 dark:ui-border-slate-800',
        className,
      )}
    >
      {props.tabs ? (
        <nav aria-label={props.label} className="ui-flex ui-h-full ui-gap-6">
          {props.tabs.map(({ label, href }) => {
            const isActive = href === props.activeHref;
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  '-ui-mb-px ui-flex ui-items-center ui-border-b-2 ui-border-transparent ui-text-sm ui-font-bold ui-text-zinc-600 ui-transition-colors hover:ui-text-blue-500 dark:ui-text-slate-400 dark:hover:ui-text-blue-500',
                  isActive &&
                    'ui-border-blue-500 ui-text-blue-700 dark:ui-text-blue-500',
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      ) : (
        <Link
          className="ui-flex ui-items-center ui-gap-3 ui-transition-colors hover:ui-text-blue-500"
          href={props.leftHref ?? '/'}
        >
          <ArrowLeftIcon /> {props.leftLabel ?? 'Back'}
        </Link>
      )}
      {right}
    </div>
  );
}
