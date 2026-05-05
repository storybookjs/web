import preview from '../../../.storybook/preview';
import { Code } from './code';

const sample = `import { Button } from './Button';

export default {
  title: 'Button',
  component: Button,
};

export const Primary = {
  args: {
    primary: true,
    label: 'Click me',
  },
};
`;

const meta = preview.meta({
  title: 'Home/Share/Code',
  component: Code,
  globals: { backgrounds: { value: 'dark' } },
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="bg-homeBackground p-8">
        <Story />
      </div>
    ),
  ],
});

export const Default = meta.story({
  args: { code: sample, fileName: 'Button.stories.tsx' },
});

export const NoFileName = meta.story({
  args: { code: sample },
});
