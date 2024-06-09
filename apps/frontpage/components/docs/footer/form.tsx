'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button } from '../../ui/button';
import { motion } from 'framer-motion';
import { sendFeedback } from './actions';
import { useFormState, useFormStatus } from 'react-dom';
import { ReactionsProps } from './footer';
import { useParams, usePathname } from 'next/navigation';
import { useDocs } from '../../../app/docs/provider';
import { getVersion } from '../../../lib/get-version';
import { url } from 'inspector';
import { set } from 'date-fns';

const initialState = {
  message: '',
  url: '',
};

export const Form = ({
  reaction,
  setReaction,
}: {
  reaction: string;
  setReaction: Dispatch<SetStateAction<ReactionsProps>>;
}) => {
  const [state, formAction] = useFormState(sendFeedback, initialState);
  const pathname = usePathname();
  const params = useParams<{ slug: string[] }>();
  const { activeRenderer, activeLanguage } = useDocs();
  const activeVersion = getVersion(params.slug);

  useEffect(() => {
    if (state.message === 'ok') {
      setTimeout(() => {
        setReaction(null);
      }, 4000);
    }
  }, [state.message]);

  const duration = 0.2;
  const ease = 'easeInOut';

  useEffect(() => {
    if (reaction) {
      setTimeout(() => {
        document.getElementById('feedback')?.focus();
      }, duration * 1000);
    }
  }, [reaction]);

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration, ease }}
      className="relative flex flex-1 flex-col items-end gap-3 px-3 pb-3"
      action={formAction}
    >
      {state.message === 'ok' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-1 bg-white text-sm"
        >
          <div>Your feedback has been received!</div>
          {!!state.url ? (
            <a
              className="text-blue-500 underline underline-offset-4"
              target="_blank"
              href={state.url}
            >
              View on Github
            </a>
          ) : (
            <div>Thank you for your help!</div>
          )}
        </motion.div>
      )}
      <input type="hidden" name="reaction" value={reaction} />
      <input type="hidden" name="slug" value={pathname} />
      {activeRenderer && (
        <input type="hidden" name="renderer" value={activeRenderer} />
      )}
      {activeLanguage && (
        <input type="hidden" name="language" value={activeLanguage} />
      )}
      {activeVersion && (
        <input type="hidden" name="version" value={activeVersion.id} />
      )}
      <textarea
        id="feedback"
        name="feedback"
        required
        className="h-24 w-full rounded-md border border-zinc-200 p-2 text-sm"
        placeholder="Your feedback..."
      />
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </motion.form>
  );
};

function SubmitButton() {
  const { pending } = useFormStatus();
  const [text, setText] = useState('Send feedback');

  useEffect(() => {
    if (pending) setText('Sending...');
  }, [pending]);

  return (
    <Button variant="solid" size="md" type="submit" aria-disabled={pending}>
      {text}
    </Button>
  );
}
