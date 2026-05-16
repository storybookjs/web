import preview from '../../.storybook/preview';
import { CodeSnippetsWrapper } from './wrapper';

const sampleCode = (
  <pre>
    <code>{`import { Meta } from '@storybook/nextjs-vite';

export default { title: 'Button' } satisfies Meta;`}</code>
  </pre>
);

const meta = preview.meta({
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
});

export const Default = meta.story();

export const TypeScript = meta.story({
  args: { iconLanguage: 'ts', title: 'Button.stories.ts' },
});

export const Shell = meta.story({
  args: {
    iconLanguage: 'sh',
    title: 'Terminal',
    children: (
      <pre>
        <code>npx storybook@latest init</code>
      </pre>
    ),
  },
});

export const NoTitle = meta.story({
  args: { title: undefined },
});

export const NoIcon = meta.story({
  args: { iconLanguage: null },
});

export const WithoutCopy = meta.story({
  args: { copy: undefined },
});

export const WithOptions = meta.story({
  args: {
    options: <span className="ui-text-xs ui-text-slate-500">v8.0+</span>,
  },
});

export const WithTopAndBottom = meta.story({
  args: {
    top: <div className="ui-text-sm ui-font-bold">Recommended setup</div>,
    bottom: (
      <div className="ui-border-t ui-border-zinc-300 ui-px-5 ui-py-2 ui-text-xs ui-text-slate-500 dark:ui-border-slate-700">
        Tip: run with --quiet to suppress warnings.
      </div>
    ),
  },
});

export const NewUsersVariant = meta.story({
  args: { variant: 'new-users' },
});
