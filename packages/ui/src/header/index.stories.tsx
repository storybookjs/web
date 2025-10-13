import type { Meta, StoryObj } from '@storybook/nextjs';
import { NewsletterForm } from '../newsletter-form';
import { Eyebrow } from './eyebrow';
import { Header } from './index';

const eyebrow = (
  <Eyebrow
    href="https://us02web.zoom.us/webinar/register/WN_XP4uv862TIS1T3SR8voC5Q"
    title="Join live session: Top 8 Storybook myths holding your team back"
  />
);

const eyebrowWithNewsletterForm = (
  <Eyebrow
  title={<>Storybook 9 is coming! Join the newsletter to get it first. <NewsletterForm inEyebrow /></>}
  />
);

const meta = {
  component: Header,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      navigation: {
        pathname: '/',
      },
    },
  },
  args: {
    algoliaApiKey: 'algoliaApiKey',
    eyebrow: null,
    subMenu: null,
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {};

// TODO: @repo/ui's Tailwind config doesn't use the class for dark mode,
//       so this doesn't work. But configuring the class for dark mode
//       breaks the site itself.
// export const Dark: Story = {
//   parameters: {
//     themes: {
//       themeOverride: 'dark',
//     }
//   }
// };

export const Home: Story = {
  args: {
    variant: 'home',
  },
  globals: {
    backgrounds: {
      value: 'dark',
    },
  },
};

export const TabletLight: Story = {
  globals: {
    viewport: {
      value: 'tablet',
    },
  },
  parameters: {
    chromatic: {
      viewports: [834],
    },
  },
};

export const MobileLight: Story = {
  globals: {
    viewport: {
      value: 'mobile1',
    },
  },
  parameters: {
    chromatic: {
      viewports: [320],
    },
  },
};

// export const MobileDark: Story = {
//   globals: {
//     viewport: {
//       value: 'mobile1',
//     },
//   },
//   parameters: {
//     themes: {
//       themeOverride: 'dark',
//     }
//   }
// };

export const DesktopWithEyebrow: Story = {
  args: {
    eyebrow,
  },
};

export const DesktopWithEyebrowWithNewsletterForm: Story = {
  args: {
    eyebrow: eyebrowWithNewsletterForm,
  },
};

export const MobileWithEyebrow: Story = {
  args: {
    eyebrow,
  },
  globals: {
    viewport: {
      value: 'mobile1',
    },
  },
  parameters: {
    chromatic: {
      viewports: [320],
    },
  },
};

export const MobileWithEyebrowWithNewsletterForm: Story = {
  ...MobileWithEyebrow,
  args: {
    eyebrow: eyebrowWithNewsletterForm,
  },
};
