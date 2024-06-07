import { cn } from '@repo/utils';
import snarkdown from 'snarkdown';

type Variant = 'neutral' | 'positive' | 'info' | 'warning';

const VARIANT_DEFAULT_ICON: Partial<Record<Variant, string>> = {
  info: 'ℹ️',
  warning: '⚠️',
};

interface CalloutContainerProps {
  variant: Variant;
}

export interface CalloutProps extends CalloutContainerProps {
  title?: string;
  icon?: string;
  children: string;
}

export function Callout({
  title,
  icon,
  children,
  variant,
  ...props
}: CalloutProps) {
  const appliedIcon = icon ?? VARIANT_DEFAULT_ICON[variant];

  return (
    <div
      className={cn(
        'mb-6 flex gap-4 rounded p-6',
        variant === 'neutral' && 'bg-slate-200 dark:bg-slate-600',
        variant === 'positive' && 'bg-slate-200 dark:bg-slate-600',
        variant === 'info' &&
          'border border-blue-200 bg-blue-100 dark:border-slate-700 dark:bg-slate-900',
        variant === 'warning' && 'bg-slate-200 dark:bg-slate-600',
      )}
      {...props}
    >
      {appliedIcon ? (
        <span aria-hidden className="hidden text-2xl md:flex">
          {appliedIcon}
        </span>
      ) : null}
      <div>
        {title ? (
          <div dangerouslySetInnerHTML={{ __html: snarkdown(title) }} />
        ) : null}
        <div className="mb-0 [&>p]:mb-0">{children}</div>
      </div>
    </div>
  );
}
