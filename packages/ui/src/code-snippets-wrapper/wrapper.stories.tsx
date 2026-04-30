import type { Meta, StoryObj } from '@storybook/react';
import { CodeSnippetsWrapper } from './wrapper';

const sampleCode = (
  <pre>
    <code>{`import { Meta } from '@storybook/react';

export default { title: 'Button' } satisfies Meta;`}</code>
  </pre>
);

const meta = {
  title: 'CodeSnippetsWrapper',
  component: CodeSnippetsWrapper,
  parameters: {
    layout: 'padded',
  },
  args: {
    children: sampleCode,
    copy: 'npm install --save-dev @storybook/react',
    title: 'Button.stories.tsx',
  },
} satisfies Meta<typeof CodeSnippetsWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TypeScript: Story = {
  args: { iconLanguage: 'ts', title: 'Button.stories.ts' },
};

export const Shell: Story = {
  args: {
    iconLanguage: 'sh',
    title: 'Terminal',
    children: (
      <pre>
        <code>npx storybook@latest init</code>
      </pre>
    ),
  },
};

export const NoTitle: Story = {
  args: { title: undefined },
};

export const NoIcon: Story = {
  args: { iconLanguage: null },
};

export const WithoutCopy: Story = {
  args: { copy: undefined },
};

export const WithOptions: Story = {
  args: {
    options: <span className="ui-text-xs ui-text-slate-500">v8.0+</span>,
  },
};

export const WithTopAndBottom: Story = {
  args: {
    top: <div className="ui-text-sm ui-font-bold">Recommended setup</div>,
    bottom: (
      <div className="ui-border-t ui-border-zinc-300 ui-px-5 ui-py-2 ui-text-xs ui-text-slate-500 dark:ui-border-slate-700">
        Tip: run with --quiet to suppress warnings.
      </div>
    ),
  },
};

export const NewUsersVariant: Story = {
  args: { variant: 'new-users' },
};
