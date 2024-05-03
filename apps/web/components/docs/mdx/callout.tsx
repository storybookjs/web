import { cn } from '@utils';
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

export const Callout = ({
  title,
  icon,
  children,
  variant,
  ...props
}: CalloutProps) => {
  const appliedIcon = icon ?? VARIANT_DEFAULT_ICON[variant];

  return (
    <div
      className={cn(
        'p-6 rounded flex gap-4',
        variant === 'neutral' && 'bg-slate-200',
        variant === 'positive' && 'bg-slate-200',
        variant === 'info' && 'bg-blue-100 border border-blue-200',
        variant === 'warning' && 'bg-slate-200'
      )}
      {...props}
    >
      {appliedIcon && (
        <span className="hidden text-2xl md:flex" aria-hidden>
          {appliedIcon}
        </span>
      )}
      <div>
        {title && (
          <div dangerouslySetInnerHTML={{ __html: snarkdown(title) }} />
        )}
        <div className="mb-0 [&>p]:mb-0">{children}</div>
      </div>
    </div>
  );
};
