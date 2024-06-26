import type { ReactNode } from 'react';
import { cn } from '@repo/utils';
import Link from 'next/link';
import { ArrowLeftIcon } from '@storybook/icons';

interface SubHeaderProps {
  className?: string;
  leftLabel?: string;
  leftHref?: string;
  right?: ReactNode;
}

export const SubHeader = ({
  className,
  leftLabel,
  leftHref,
  right,
}: SubHeaderProps): ReactNode => {
  return (
    <div
      className={cn(
        'ui-mb-16 ui-h-16 ui-items-center ui-justify-between ui-border-b ui-border-zinc-100 dark:ui-border-slate-800 flex',
        className,
      )}
    >
      <Link
        className="ui-flex ui-items-center ui-gap-3 ui-transition-colors hover:ui-text-blue-500"
        href={leftHref || '/'}
      >
        <ArrowLeftIcon /> {leftLabel || 'Back'}
      </Link>
      {right}
    </div>
  );
};
