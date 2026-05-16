import { fn, expect, userEvent } from 'storybook/test';
import preview from '../../../.storybook/preview';
import { DocsContext } from '../../../app/docs/provider';
import { Form } from './form';
import type { SendFeedback } from './types';

const docsValue = {
  activeRenderer: 'react',
  activeLanguage: 'js',
  activePackageManager: 'npm',
  activeSnippetTabs: [],
  activeDismissals: [],
  setRenderer: fn(),
  setLanguage: fn(),
  setPackageManager: fn(),
  setSnippetTabs: fn(),
  setDismissals: fn(),
};

const meta = preview.meta({
  title: 'Docs/Footer/Form',
  component: Form,
  parameters: {
    nextjs: { navigation: { pathname: '/docs/get-started/install' } },
  },
  decorators: [
    (Story) => (
      <DocsContext.Provider value={docsValue}>
        <div className="w-[340px] rounded border border-zinc-200 p-3">
          <Story />
        </div>
      </DocsContext.Provider>
    ),
  ],
  args: {
    reaction: 'up',
    setReaction: fn(),
    sendFeedback: fn<SendFeedback>(() => Promise.resolve({ status: 'ok' })),
  },
});

export const Default = meta.story({});

export const SuccessAfterSubmit = meta.story({
  args: {
    sendFeedback: fn<SendFeedback>(() =>
      Promise.resolve({
        status: 'ok',
        url: 'https://github.com/storybookjs/storybook/discussions/0',
      }),
    ),
  },
  play: async ({ canvas, args }) => {
    const submit = canvas.getByRole('button', { name: /send feedback/i });
    await userEvent.click(submit);
    await expect(args.sendFeedback).toHaveBeenCalled();
    await expect(
      await canvas.findByText(/your feedback has been received/i),
    ).toBeInTheDocument();
  },
});

export const FailureAfterSubmit = meta.story({
  args: {
    sendFeedback: fn<SendFeedback>(() =>
      Promise.resolve({
        status: 'fail',
        message: 'Could not submit feedback. Please try again.',
      }),
    ),
  },
  play: async ({ canvas, args }) => {
    const submit = canvas.getByRole('button', { name: /send feedback/i });
    await userEvent.click(submit);
    await expect(args.sendFeedback).toHaveBeenCalled();
    await expect(
      await canvas.findByText(/could not submit feedback/i),
    ).toBeInTheDocument();
  },
});
