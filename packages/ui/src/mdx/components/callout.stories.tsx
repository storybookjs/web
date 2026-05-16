import { expect, waitFor } from 'storybook/test';
import preview from '../../../.storybook/preview';
import { Callout } from './callout';

const meta = preview.meta({
  title: 'MDX/Callout',
  component: Callout,
  parameters: {
    layout: 'padded',
  },
  args: {
    children: 'This is a callout message that gives the reader useful context.',
  },
});

export const Neutral = meta.story({
  args: { variant: 'neutral' },
});

export const Positive = meta.story({
  args: { variant: 'positive', icon: '✅' },
});

export const Info = meta.story({
  args: { variant: 'info' },
});

export const Warning = meta.story({
  args: { variant: 'warning' },
});

export const WithTitle = meta.story({
  args: {
    variant: 'info',
    title: 'Heads up',
    children: 'Something important to read.',
  },
});

export const WithCustomIcon = meta.story({
  args: { icon: '🤖', children: 'AI-generated content ahead.' },
});

export const WithJsxChildren = meta.story({
  args: {
    variant: 'info',
    children: (
      <p>
        You can pass <strong>JSX</strong> as children, including{' '}
        <a href="https://storybook.js.org">links</a>.
      </p>
    ),
  },
});

export const WithCopyAction = meta.story({
  args: {
    icon: '🤖',
    children: 'Use this prompt with your AI assistant to scaffold a Storybook.',
    action: {
      label: 'Copy prompt',
      event: 'copy_storybook_prompt',
      copy: 'Set up Storybook in this project with sensible defaults.',
    },
  },
  play: async ({ canvas, step, userEvent }) => {
    await step('clicking swaps to labelOnSuccess', async () => {
      await userEvent.click(
        canvas.getByRole('button', { name: 'Copy prompt' }),
      );
      await expect(
        await canvas.findByRole('button', { name: 'Copied!' }),
      ).toBeInTheDocument();
    });
    await step('label reverts after the success window', async () => {
      await waitFor(
        async () => {
          await expect(
            canvas.getByRole('button', { name: 'Copy prompt' }),
          ).toBeInTheDocument();
        },
        { timeout: 3000 },
      );
    });
  },
});

export const WithCopyActionOverrides = meta.story({
  args: {
    icon: '🤖',
    children: 'Use this prompt with your AI assistant to scaffold a Storybook.',
    action: {
      label: 'Copy command',
      labelOnSuccess: 'Got it!',
      icon: 'check',
      iconOnSuccess: 'copy',
      event: 'copy_storybook_prompt_overrides',
      copy: 'storybook init',
    },
  },
  play: async ({ canvas, step, userEvent }) => {
    await step('button starts with overridden label', async () => {
      await expect(
        canvas.getByRole('button', { name: 'Copy command' }),
      ).toBeInTheDocument();
    });
    await step('clicking shows overridden labelOnSuccess', async () => {
      await userEvent.click(
        canvas.getByRole('button', { name: 'Copy command' }),
      );
      await expect(
        await canvas.findByRole('button', { name: 'Got it!' }),
      ).toBeInTheDocument();
    });
    await step('label reverts after the success window', async () => {
      await waitFor(
        async () => {
          await expect(
            canvas.getByRole('button', { name: 'Copy command' }),
          ).toBeInTheDocument();
        },
        { timeout: 3000 },
      );
    });
  },
});

export const WithLinkAction = meta.story({
  args: {
    variant: 'info',
    children: 'Read the migration guide before upgrading.',
    action: {
      label: 'Open guide',
      event: 'open_migration_guide',
      href: 'https://storybook.js.org/docs/migration-guide',
    },
  },
});

export const LongContent = meta.story({
  args: {
    variant: 'warning',
    title: 'Breaking change',
    children:
      'This API was removed in 9.0. To migrate, update your imports to use the new package and run the codemod. The codemod handles most cases automatically but you should review your test files manually.',
    action: {
      label: 'Copy codemod',
      event: 'copy_codemod',
      copy: 'npx storybook@latest migrate',
    },
  },
});
