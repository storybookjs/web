'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';
import { Button } from '../../ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { sendFeedback } from './actions';
import { useFormState, useFormStatus } from 'react-dom';
import { ReactionsProps } from './footer';

const initialState = {
  message: '',
};

export const Form = ({
  reaction,
  setReaction,
}: {
  reaction: string;
  setReaction: Dispatch<SetStateAction<ReactionsProps>>;
}) => {
  const [state, formAction] = useFormState(sendFeedback, initialState);

  useEffect(() => {
    if (state.message === 'ok') {
      setTimeout(() => {
        setReaction(null);
      }, 2000);
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
          <div>Thank you for your help!</div>
        </motion.div>
      )}
      <input type="hidden" name="reaction" value={reaction} />
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

  return (
    <Button variant="solid" size="md" type="submit" aria-disabled={pending}>
      Send feedback
    </Button>
  );
}
