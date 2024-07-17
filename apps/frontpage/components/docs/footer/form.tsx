/* eslint-disable no-nested-ternary -- TODO */
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
// eslint-disable-next-line import/named -- This should be solved in React 19
import { useFormState, useFormStatus } from 'react-dom';
import { motion } from 'framer-motion';
import { useParams, usePathname } from 'next/navigation';
import { useDocs } from '../../../app/docs/provider';
import { getVersion } from '../../../lib/get-version';
import { Button } from '../../ui/button';
import { sendFeedback, type FeedbackState } from './actions';
import { type ReactionsProps } from './footer';

const initialState: FeedbackState = {};

const inaccessiblyVisuallyHiddenStyles: React.CSSProperties = {
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: '1px',
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
    if (state.status === 'ok') {
      setTimeout(() => {
        setReaction(null);
      }, 4000);
    }
  }, [setReaction, state.status]);

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
      className="flex flex-col flex-1 gap-3 px-3 pb-3"
      action={formAction}
    >
      {!state.status ? (
        <>
          <input type="hidden" name="reaction" value={reaction} />
          <input type="hidden" name="slug" value={pathname} />
          {activeRenderer ? (
            <input type="hidden" name="renderer" value={activeRenderer} />
          ) : null}
          {activeLanguage ? (
            <input type="hidden" name="language" value={activeLanguage} />
          ) : null}
          {activeVersion ? (
            <input type="hidden" name="version" value={activeVersion.id} />
          ) : null}
          <label htmlFor="feedback" className="sr-only">
            Optional feedback
          </label>
          <textarea
            id="feedback"
            name="feedback"
            className="w-full h-24 p-2 text-sm border rounded-md border-zinc-200"
            placeholder={`What ${reaction === 'up' ? 'was' : 'wasn’t'} helpful?`}
          />
          <label htmlFor="comment" style={inaccessiblyVisuallyHiddenStyles}>
            Optional comment
          </label>
          <textarea
            id="comment"
            name="comment"
            placeholder="Your feedback..."
            style={inaccessiblyVisuallyHiddenStyles}
            aria-hidden="true"
            tabIndex={-1}
          />
          <SubmitButton />
        </>
      ) : state.status === 'ok' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center flex-1 gap-1 text-sm bg-white"
        >
          <div>Your feedback has been received!</div>
          {state.url ? (
            <a
              className="text-blue-500 underline underline-offset-4"
              target="_blank"
              href={state.url}
              rel="noopener"
            >
              View on Github
            </a>
          ) : (
            <div>Thank you for your help!</div>
          )}
        </motion.div>
      ) : state.status === 'fail' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center flex-1 gap-1 text-sm bg-white"
        >
          <div>{state?.message}</div>
        </motion.div>
      ) : null}
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
