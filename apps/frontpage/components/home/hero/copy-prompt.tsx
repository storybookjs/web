import { CheckIcon, WandIcon } from '@storybook/icons';
import type { FC } from 'react';
import { useState } from 'react';
import copy from 'copy-to-clipboard';
import { useAnalytics } from '../../../lib/analytics';

const PROMPT_TEXT =
  'Install Storybook in this project with `npx storybook@0.0.0-pr-34345-sha-aba9b514 init` and follow its instructions';

export const CopyPrompt: FC = () => {
  const [state, setState] = useState(false);
  const track = useAnalytics();

  const onClick = () => {
    copy(PROMPT_TEXT);
    setState(true);
    track('CopyPromptClick', {
      prompt: PROMPT_TEXT,
    });
    setTimeout(() => {
      setState(false);
    }, 2000);
  };

  return (
    <button
      className="hidden items-center gap-1.5 font-mono text-sm text-white/60 transition-colors hover:text-white md:flex"
      onClick={onClick}
      title="Copy AI prompt to install Storybook"
      type="button"
    >
      { state ? <CheckIcon className="h-3.5 w-3.5" /> : <WandIcon className="h-3.5 w-3.5" /> }
      {state ? 'Copied!' : 'Copy agent prompt'}
    </button>
  );
};
