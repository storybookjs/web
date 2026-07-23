'use client';

import { useAnalytics } from '@repo/utils/analytics';
import { type FC, type ReactNode, useEffect, useRef, useState } from 'react';
import copyToClipboard from 'copy-to-clipboard';
import snarkdown from 'snarkdown';
import { CheckIcon, CopyIcon } from '@storybook/icons';
import { cn } from '../../cn';
import { Button } from '../../button';

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
  icon?: ActionIconName | null;
  event: string;
}

const SUCCESS_LABEL_DURATION_MS = 2000;

type CopyAction = ActionBase & {
  copy: string;
  labelOnSuccess?: string | null;
  iconOnSuccess?: ActionIconName | null;
  href?: never;
};

type LinkAction = ActionBase & {
  href: string;
  copy?: never;
};

export type CalloutAction = CopyAction | LinkAction;

const isCopyAction = (action: CalloutAction): action is CopyAction =>
  Boolean(action.copy);

const isLinkAction = (action: CalloutAction): action is LinkAction =>
  Boolean(action.href);

const ActionButton: FC<{ action: CalloutAction }> = ({ action }) => {
  const track = useAnalytics();
  const [showSuccess, setShowSuccess] = useState(false);
  const successTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
    },
    [],
  );

  let resolvedLabelOnSuccess: string | null | undefined;
  let resolvedIconOnSuccess: ActionIconName | null | undefined;
  let resolvedIcon: ActionIconName | null | undefined = action.icon;

  if (isCopyAction(action)) {
    resolvedLabelOnSuccess =
      action.labelOnSuccess === undefined ? 'Copied!' : action.labelOnSuccess;
    resolvedIconOnSuccess =
      action.iconOnSuccess === undefined ? 'check' : action.iconOnSuccess;
    if (resolvedIcon === undefined) {
      resolvedIcon = 'copy';
    }
  }

  const flashSuccess = (): void => {
    if (!resolvedLabelOnSuccess && !resolvedIconOnSuccess) return;
    setShowSuccess(true);
    if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
    successTimeoutRef.current = setTimeout(() => {
      setShowSuccess(false);
    }, SUCCESS_LABEL_DURATION_MS);
  };

  const handleClick = (): void => {
    track(action.event);
    if (isCopyAction(action)) {
      copyToClipboard(action.copy);
    }
    flashSuccess();
  };

  const buttonLabel =
    showSuccess && resolvedLabelOnSuccess ? resolvedLabelOnSuccess : action.label;
  const buttonIconName =
    showSuccess && resolvedIconOnSuccess ? resolvedIconOnSuccess : resolvedIcon;
  const buttonIcon = buttonIconName ? ACTION_ICONS[buttonIconName] : null;

  if (isLinkAction(action)) {
    return (
      <Button variant="solid" size="md" asChild>
        <a
          href={action.href}
          onClick={() => {
            track(action.event);
            flashSuccess();
          }}
        >
          {buttonIcon}
          {buttonLabel}
        </a>
      </Button>
    );
  }

  return (
    <Button variant="ghost" size="md" onClick={handleClick} type="button">
      {buttonIcon}
      {buttonLabel}
    </Button>
  );
};

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
  const actionKey = action ? action.copy ?? action.href : undefined;

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
          <ActionButton key={actionKey} action={action} />
        </div>
      ) : null}
    </div>
  );
};
