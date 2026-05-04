import { definePreview } from '@storybook/nextjs-vite';
import addonA11y from "@storybook/addon-a11y";
import addonDocs from "@storybook/addon-docs";
import { withThemeByClassName } from '@storybook/addon-themes';

import '@docsearch/css';
import '../src/styles.css';

if (typeof window !== 'undefined') {
  // copy-to-clipboard falls back to prompt() in test browsers; suppress the dialog.
  window.prompt = () => null;
}

export default definePreview({
  decorators: [
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],

  parameters: {
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

  addons: [addonA11y(), addonDocs()]
});
