import preview from '../../../.storybook/preview';
import { Code } from './code';

const meta = preview.meta({
  title: 'MDX/Code',
  component: Code,
  parameters: { layout: 'centered' },
});

export const Default = meta.story({
  args: { children: 'inline.code()' },
});

export const InProse = meta.story({
  decorators: [
    (Story) => (
      <p className="ui-max-w-prose">
        Use <Story /> to import the helper.
      </p>
    ),
  ],
  args: { children: 'import { fn } from "storybook/test"' },
});
