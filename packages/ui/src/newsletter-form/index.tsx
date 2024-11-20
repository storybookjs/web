'use client';

import * as React from 'react';
import { Formik, type FormikValues } from 'formik';
import { useMailingListForm } from './use-mailing-list-form';

const validateForm = (values: FormikValues): FormikValues => {
  if (!values.email) {
    return { email: 'Required' };
  }

  return {};
};

interface NewsletterFormProps {
  onSubscribe?: () => void;
}

export const NewsletterForm = ({
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
          className="ui-relative ui-w-full ui-min-w-[360px] ui-h-12"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <input
            className="ui-rounded-md ui-pl-4 ui-pr-[100px] ui-w-full ui-h-full ui-transition-color ui-bg-white ui-text-zinc-800 dark:ui-bg-slate-900 ui-border ui-border-zinc-200 dark:ui-border-slate-700 dark:ui-text-white"
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
          <button
            className="ui-absolute ui-flex ui-items-center ui-justify-center ui-h-8 ui-gap-2 ui-px-2 ui-text-sm ui-font-bold ui-text-white ui-transition-all ui-duration-300 -ui-translate-y-1/2 ui-bg-blue-500 ui-rounded-md ui-whitespace-nowrap ui-ring-offset-white focus-visible:ui-outline-none focus-visible:ui-ring-2 focus-visible:ui-ring-blue-700 focus-visible:ui-ring-offset-2 disabled:ui-pointer-events-none disabled:ui-opacity-50 dark:ui-ring-offset-slate-950 dark:focus-visible:ui-ring-slate-300 hover:ui-bg-blue-600 ui-right-2 ui-top-1/2 group"
            type="submit"
            aria-disabled={isSubmitting}
          >
            Subscribe
          </button>
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
