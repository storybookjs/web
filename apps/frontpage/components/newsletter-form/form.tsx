/* eslint-disable import/named -- TODO: Fix this when React 19 is out */
'use client';

import { cn } from '@repo/utils';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { CloseIcon } from '@storybook/icons';
import { Button } from '../ui/button';
import { saveNewsletter } from './actions';

interface NewsletterFormProps {
  variant?: 'system' | 'dark';
}

const initialState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      aria-disabled={pending}
      className="absolute -translate-y-1/2 right-2 top-1/2"
      size="md"
      type="submit"
      variant="solid"
    >
      Subscribe
    </Button>
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
