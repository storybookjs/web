'use client';

import { cn } from '@repo/utils';
import { FC, useEffect, useState } from 'react';
import { saveNewsletter } from './actions';
import { useFormState, useFormStatus } from 'react-dom';
import { CloseIcon } from '@storybook/icons';

interface Props {
  variant?: 'system' | 'dark';
}

const initialState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="absolute flex items-center justify-center h-8 gap-2 px-2 text-sm font-bold text-white transition-all duration-300 -translate-y-1/2 bg-blue-500 rounded-md whitespace-nowrap ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 group hover:bg-blue-600 right-2 top-1/2"
      aria-disabled={pending}
    >
      Subscribe
    </button>
  );
}

export const NewsletterForm: FC<Props> = ({ variant }) => {
  const [state, formAction] = useFormState(saveNewsletter, initialState);
  const [status, setStatus] = useState<'idle' | 'done' | 'error'>('idle');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (state.message === 'ok') setStatus('done');
    if (state.message && state.message !== 'ok') setStatus('error');
  }, [state.message]);

  return (
    <form className="relative w-full max-w-[360px] h-12" action={formAction}>
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
          >
            <CloseIcon />
          </button>
        </div>
      )}

      <input
        type="text"
        id="email"
        name="email"
        placeholder="you@domain.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={cn(
          'rounded-md pl-4 pr-[100px] w-full h-full transition-color bg-white text-zinc-800',
          variant === 'system' && 'border border-zinc-200',
        )}
      />
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
};
