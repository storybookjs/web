import type { Preview } from '@storybook/react';
import '../app/globals.css';
import '@repo/ui/styles.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
