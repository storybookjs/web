'use client';

import { cn } from '@repo/utils';
import { type FC, type ReactNode, useEffect, useRef, useState } from 'react';
import copyToClipboard from 'copy-to-clipboard';
import snarkdown from 'snarkdown';
import { CheckIcon, CopyIcon } from '@storybook/icons';
import { Button } from '../../button';
import { useAnalytics } from '../../analytics';

export type ActionIconName = 'copy' | 'check';

const ACTION_ICONS: Record<ActionIconName, ReactNode> = {
  copy: <CopyIcon />,
  check: <CheckIcon />,
};

type Variant = 'neutral' | 'positive' | 'info' | 'warning';

const VARIANT_DEFAULT_ICON: Partial<Record<Variant, string>> = {
  info: 'ℹ️',
  warning: '⚠️',
};

interface ActionBase {
  label: string;
  labelOnSuccess?: string;
  icon?: ActionIconName;
  iconOnSuccess?: ActionIconName;
  event: string;
}

const SUCCESS_LABEL_DURATION_MS = 2000;

export type CalloutAction =
  | (ActionBase & {
      onClick: (helpers: { copy: (text: string) => void }) => void;
      href?: never;
    })
  | (ActionBase & {
      href: string;
      external?: boolean;
      onClick?: never;
    });

export interface CalloutProps {
  title?: string;
  icon?: string;
  variant?: Variant;
  action?: CalloutAction;
  children: ReactNode;
}

export const Callout: FC<CalloutProps> = ({
  title,
  icon,
  children,
  variant = 'neutral',
  action,
}) => {
  const appliedIcon = icon ?? VARIANT_DEFAULT_ICON[variant];
  const track = useAnalytics();
  const [showSuccess, setShowSuccess] = useState(false);
  const successTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
    },
    [],
  );

  const flashSuccess = (): void => {
    if (!action?.labelOnSuccess) return;
    setShowSuccess(true);
    if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
    successTimeoutRef.current = setTimeout(() => {
      setShowSuccess(false);
    }, SUCCESS_LABEL_DURATION_MS);
  };

  const handleClick = (): void => {
    if (!action) return;
    track(action.event);
    if ('onClick' in action && action.onClick) {
      action.onClick({ copy: (text) => copyToClipboard(text) });
    }
    flashSuccess();
  };

  const buttonLabel =
    showSuccess && action?.labelOnSuccess ? action.labelOnSuccess : action?.label;
  const buttonIconName =
    showSuccess && action?.iconOnSuccess ? action.iconOnSuccess : action?.icon;
  const buttonIcon = buttonIconName ? ACTION_ICONS[buttonIconName] : null;

  return (
    <div
      className={cn(
        'ui-mb-6 ui-flex ui-flex-col ui-gap-4 ui-rounded ui-p-6 md:ui-flex-row md:ui-items-baseline',
        variant === 'neutral' &&
          'ui-border ui-border-blue-200 ui-bg-blue-100 dark:ui-border-slate-700 dark:ui-bg-slate-900',
        variant === 'positive' &&
          'ui-border ui-border-blue-200 ui-bg-blue-100 dark:ui-border-slate-700 dark:ui-bg-slate-900',
        variant === 'info' &&
          'ui-border ui-border-blue-200 ui-bg-blue-100 dark:ui-border-slate-700 dark:ui-bg-slate-900',
        variant === 'warning' &&
          'ui-border ui-border-orange-200 ui-bg-orange-100 dark:ui-border-orange-800 dark:ui-bg-orange-950',
      )}
    >
      <div className="ui-flex ui-min-w-0 ui-flex-1 ui-gap-4 md:ui-items-baseline">
        {appliedIcon ? (
          <span
            aria-hidden
            className="ui-hidden ui-text-xl md:ui-flex ui-flex-none ui-relative ui-top-[3px]"
          >
            {appliedIcon}
          </span>
        ) : null}
        <div className="ui-min-w-0">
          {title ? (
            <div dangerouslySetInnerHTML={{ __html: snarkdown(title) }} />
          ) : null}
          <div className="ui-mb-0 [&>*:last-child]:ui-mb-0">{children}</div>
        </div>
      </div>
      {action ? (
        <div className="ui-flex-none">
          {'href' in action && action.href ? (
            <Button variant="solid" size="md" asChild>
              <a
                href={action.href}
                onClick={() => {
                  track(action.event);
                  flashSuccess();
                }}
                {...(action.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {buttonIcon}
                {buttonLabel}
              </a>
            </Button>
          ) : (
            <Button variant="ghost" size="md" onClick={handleClick} type="button">
              {buttonIcon}
              {buttonLabel}
            </Button>
          )}
        </div>
      ) : null}
    </div>
  );
};
