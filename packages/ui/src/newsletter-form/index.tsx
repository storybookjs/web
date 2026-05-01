'use client';

import * as React from 'react';
import { Formik, type FormikValues } from 'formik';
import { cn } from '../cn';
import { Button } from '../button';
import { useMailingListForm } from './use-mailing-list-form';

const validateForm = (values: FormikValues): FormikValues => {
  if (!values.email) {
    return { email: 'Required' };
  }

  return {};
};

interface NewsletterFormProps {
  inEyebrow?: boolean;
  onSubscribe?: () => void;
}

export const NewsletterForm = ({
  inEyebrow = false,
  onSubscribe,
}: NewsletterFormProps): React.ReactElement => {
  const formRef = React.useRef<HTMLFormElement | null>(null);
  const [hasSubmitted, onSubmitForm] = useMailingListForm(onSubscribe);

  React.useEffect(() => {
    if (hasSubmitted && formRef.current) {
      const submitButtonEl = formRef.current.querySelector('[type="submit"]');
      if (submitButtonEl) {
        (submitButtonEl as HTMLButtonElement).blur();
      }
    }
  }, [formRef, hasSubmitted]);

  return (
    <Formik
      initialValues={{ email: '' }}
      validate={validateForm}
      onSubmit={onSubmitForm}
    >
      {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <form
          className={cn(
            'ui-relative ui-w-full',
            inEyebrow
              ? 'ui-max-w-[240px] ui-h-[28px] -ui-mt-[2px] ui-mb-[2px] sm:-ui-my-3'
              : 'sm:ui-min-w-[360px] ui-h-12',
          )}
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <input
            className={cn(
              'ui-rounded-md ui-w-full ui-h-full ui-transition-color ui-text-zinc-800 ui-border dark:ui-text-white',
              inEyebrow
                ? 'ui-bg-slate-900 ui-border-slate-700 ui-pl-2 ui-pr-[90px] ui-text-[13px]'
                : 'ui-bg-white dark:ui-bg-slate-900 ui-border-zinc-200 dark:ui-border-slate-700 ui-pl-4 ui-pr-[100px]',
            )}
            id="email"
            type="email"
            name="email"
            value={values.email}
            placeholder="you@domain.com"
            onChange={handleChange}
            onBlur={handleBlur}
            autoCapitalize="off"
            autoCorrect="off"
          />
          <Button
            variant="solid"
            size="md"
            className={cn(
              'ui-absolute -ui-translate-y-1/2 ui-top-1/2',
              inEyebrow
                ? 'ui-h-[22px] ui-right-[3px] ui-text-xs ui-rounded-[3px]'
                : 'ui-right-2',
            )}
            type="submit"
            aria-disabled={isSubmitting}
          >
            Subscribe
          </Button>
          {hasSubmitted ? (
            <div
              className="ui-absolute ui-top-0 ui-left-0 ui-w-full ui-h-full ui-z-10 ui-rounded-md ui-flex ui-items-center ui-justify-between ui-px-4 ui-bg-green-600"
              role="alert"
            >
              <b>
                <span role="img" aria-label="thumbs up">
                  👍
                </span>{' '}
                Thanks, you&rsquo;re all signed up!
              </b>
            </div>
          ) : null}
        </form>
      )}
    </Formik>
  );
};
