import { fn } from 'storybook/test';
import preview from '../../.storybook/preview';
import { NewsletterForm } from './index';

const meta = preview.meta({
  title: 'NewsletterForm',
  component: NewsletterForm,
  parameters: { layout: 'centered' },
  args: { onSubscribe: fn() },
});

export const Default = meta.story({});

export const InEyebrow = meta.story({
  args: { inEyebrow: true },
  decorators: [
    (Story) => (
      <div className="ui-bg-black ui-p-4 ui-w-[320px]">
        <Story />
      </div>
    ),
  ],
});
