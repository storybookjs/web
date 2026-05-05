import { definePreview } from '@storybook/nextjs-vite';
import addonA11y from "@storybook/addon-a11y";
import addonDocs from "@storybook/addon-docs";
import addonLinks from "@storybook/addon-links";
import { sb } from 'storybook/test';

import '@docsearch/css';
import '../app/globals.css';
import '@repo/ui/styles.css';

sb.mock(import('react-use-scroll-direction'), { spy: true });

export default definePreview({
  parameters: {
    backgrounds: {
      options: {
        dark: { value: '#0d1026', name: 'Dark' },
      },
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    nextjs: {
      appDirectory: true,
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },

  addons: [addonA11y(), addonDocs(), addonLinks()]
});
