'use client';

import { cn } from '@repo/utils';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { CloseIcon } from '@storybook/icons';
import { saveNewsletter } from './actions';

interface NewsletterFormProps {
  variant?: 'system' | 'dark';
}

const initialState = {
  message: '',
};

function SubmitButton(): JSX.Element {
  const { pending } = useFormStatus();

  return (
    <button
      aria-disabled={pending}
      className="absolute flex items-center justify-center h-8 gap-2 px-2 text-sm font-bold text-white transition-all duration-300 -translate-y-1/2 bg-blue-500 rounded-md whitespace-nowrap ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 group hover:bg-blue-600 right-2 top-1/2"
      type="submit"
    >
      Subscribe
    </button>
  );
}

export const NewsletterForm: FC<NewsletterFormProps> = ({ variant }) => {
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
            'absolute top-0 left-0 w-full h-full z-10 rounded-md flex items-center justify-between px-4',
            status === 'done' && 'bg-green-300',
            status === 'error' && 'bg-red-300',
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
        className={cn(
          'rounded-md pl-4 pr-[100px] w-full h-full transition-color bg-white text-zinc-800',
          variant === 'system' && 'border border-zinc-200',
        )}
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
