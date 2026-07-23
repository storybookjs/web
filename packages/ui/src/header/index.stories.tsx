import preview from '../../.storybook/preview';
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
    title={
      <>
        Storybook 9 is coming! Join the newsletter to get it first.{' '}
        <NewsletterForm inEyebrow />
      </>
    }
  />
);

const meta = preview.meta({
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
});

export const Light = meta.story();

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

export const Home = meta.story({
  args: {
    variant: 'home',
  },
  globals: {
    backgrounds: {
      value: 'dark',
    },
  },
});

export const TabletLight = meta.story({
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
});

export const MobileLight = meta.story({
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
});

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

export const DesktopWithEyebrow = meta.story({
  args: {
    eyebrow,
  },
});

export const DesktopWithEyebrowWithNewsletterForm = meta.story({
  args: {
    eyebrow: eyebrowWithNewsletterForm,
  },
});

export const MobileWithEyebrow = meta.story({
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
});

export const MobileWithEyebrowWithNewsletterForm = meta.story({
  ...MobileWithEyebrow.input,
  args: {
    eyebrow: eyebrowWithNewsletterForm,
  },
});
