'use client';

import { cn } from '@repo/utils';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { CloseIcon } from '@storybook/icons';
import { saveNewsletter } from './actions';

const initialState = {
  message: '',
};

function SubmitButton(): JSX.Element {
  const { pending } = useFormStatus();

  return (
    <button
      aria-disabled={pending}
      className="ui-absolute ui-flex ui-items-center ui-justify-center ui-h-8 ui-gap-2 ui-px-2 ui-text-sm ui-font-bold ui-text-white ui-transition-all ui-duration-300 -ui-translate-y-1/2 ui-bg-blue-500 ui-rounded-md ui-whitespace-nowrap ui-ring-offset-white focus-visible:ui-outline-none focus-visible:ui-ring-2 focus-visible:ui-ring-blue-700 focus-visible:ui-ring-offset-2 disabled:ui-pointer-events-none disabled:ui-opacity-50 dark:ui-ring-offset-slate-950 dark:focus-visible:ui-ring-slate-300 group hover:ui-bg-blue-600 ui-right-2 ui-top-1/2"
      type="submit"
    >
      Subscribe
    </button>
  );
}

export const NewsletterForm: FC = () => {
  const [state, formAction] = useFormState(saveNewsletter, initialState);
  const [status, setStatus] = useState<'idle' | 'done' | 'error'>('idle');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (state.message === 'ok') setStatus('done');
    if (state.message && state.message !== 'ok') setStatus('error');
  }, [state.message]);

  return (
    <form action={formAction} className="relative w-full max-w-[360px] h-12">
      {(status === 'done' || status === 'error') && (
        <div
          className={cn(
            'ui-absolute ui-top-0 ui-left-0 ui-w-full ui-h-full ui-z-10 ui-rounded-md ui-flex ui-items-center ui-justify-between ui-px-4',
            status === 'done' && 'ui-bg-green-300',
            status === 'error' && 'ui-bg-red-300',
          )}
        >
          {status === 'done' && <div>Thanks, you are all signed up!</div>}
          {status === 'error' && <div>Your email is invalid</div>}
          <button
            onClick={() => {
              setStatus('idle');
              setEmail('');
              state.message = '';
            }}
            type="button"
          >
            <CloseIcon />
          </button>
        </div>
      )}
      <input
        className="ui-rounded-md ui-pl-4 ui-pr-[100px] ui-w-full ui-h-full ui-transition-color ui-bg-white ui-text-zinc-800 dark:ui-bg-slate-900 ui-border ui-border-zinc-200 dark:ui-border-slate-700"
        id="email"
        name="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="you@domain.com"
        type="text"
        value={email}
      />
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state.message}
      </p>
    </form>
  );
};
