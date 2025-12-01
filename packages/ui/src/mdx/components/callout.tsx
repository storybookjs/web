import { cn } from '@repo/utils';
import { type FC } from 'react';
import snarkdown from 'snarkdown';

type Variant = 'neutral' | 'positive' | 'info' | 'warning';

const VARIANT_DEFAULT_ICON: Partial<Record<Variant, string>> = {
  info: 'ℹ️',
  warning: '⚠️',
};

interface CalloutProps {
  title?: string;
  icon?: string;
  variant?: Variant;
  children: string;
}

export const Callout: FC<CalloutProps> = ({
  title,
  icon,
  children,
  variant = 'neutral',
  ...props
}) => {
  const appliedIcon = icon ?? VARIANT_DEFAULT_ICON[variant];

  return (
    <div
      className={cn(
        'ui-mb-6 ui-flex ui-gap-4 ui-rounded ui-p-6',
        variant === 'neutral' &&
          'ui-border ui-border-blue-200 ui-bg-blue-100 dark:ui-border-slate-700 dark:ui-bg-slate-900',
        variant === 'positive' &&
          'ui-border ui-border-blue-200 ui-bg-blue-100 dark:ui-border-slate-700 dark:ui-bg-slate-900',
        variant === 'info' &&
          'ui-border ui-border-blue-200 ui-bg-blue-100 dark:ui-border-slate-700 dark:ui-bg-slate-900',
        variant === 'warning' &&
          'ui-border ui-border-orange-200 ui-bg-orange-100 dark:ui-border-orange-800 dark:ui-bg-orange-950',
      )}
      {...props}
    >
      {appliedIcon ? (
        <span
          aria-hidden
          className="ui-hidden ui-text-2xl md:ui-flex ui-flex-none"
        >
          {appliedIcon}
        </span>
      ) : null}
      <div className="ui-min-w-0">
        {title ? (
          <div dangerouslySetInnerHTML={{ __html: snarkdown(title) }} />
        ) : null}
        {/* TODO: Check prefix placement in ones like `[&>p]:ui-mb-0` */}
        <div className="ui-mb-0 [&>p]:ui-mb-0 [&>ul]:ui-mb-0">{children}</div>
      </div>
    </div>
  );
};
