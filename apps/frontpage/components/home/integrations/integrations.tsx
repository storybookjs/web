import Image from 'next/image';
import Apollo from './images/apollo.svg';
import Axe from './images/axe.svg';
import Chromatic from './images/chromatic.svg';
import Cypress from './images/cypress.svg';
import Emotion from './images/emotion.png';
import Figma from './images/figma.svg';
import Gatsby from './images/gatsby.svg';
import GraphQL from './images/graphql.svg';
import Invision from './images/invision.svg';
import Jest from './images/jest.svg';
import MSW from './images/msw.svg';
import Nextjs from './images/nextjs.svg';
import Notion from './images/notion.svg';
import Nuxt from './images/nuxt.svg';
import Nx from './images/nx.svg';
import Playwright from './images/playwright.svg';
import RedwoodJS from './images/redwoodjs.svg';
import Sass from './images/sass.svg';
import Sketch from './images/sketch.svg';
import SWC from './images/swc.png';
import Tailwind from './images/tailwind.svg';
import TestingLib from './images/testing-lib.png';
import UXpin from './images/uxpin.svg';
import Vite from './images/vite.svg';
import Webpack from './images/webpack.svg';
import Zeplin from './images/zeplin.svg';
import Zeroheight from './images/zeroheight.svg';
import Ionic from './images/ionic.svg';
import Launchdarkly from './images/launchdarkly.svg';
import Supernova from './images/supernova.svg';

export function Integrations() {
  const integrations = [
    {
      href: 'https://storybook.js.org/blog/storybook-for-vite/',
      image: Vite,
      name: 'Vite',
      isExternal: true,
    },
    {
      target: '_blank',
      href: 'https://www.chromatic.com/storybook?utm_source=storybook_website&utm_medium=home_integrations&utm_campaign=storybook',
      image: Chromatic,
      name: 'Chromatic',
      isExternal: true,
    },
    {
      href: `/docs/sharing/embed#embed-stories-on-other-platforms`,
      image: Notion,
      name: 'Notion',
    },
    {
      href: `/docs/writing-tests/integrations/stories-in-unit-tests`,
      image: TestingLib,
      name: 'TestingLib',
    },
    {
      href: '/addons/@react-theming/storybook-addon',
      image: Emotion,
      name: 'Emotion',
    },
    {
      target: '_blank',
      rel: 'noopener nofollow noreferrer',
      href: 'https://medium.com/storybookjs/building-a-front-end-project-with-react-tailwindcss-and-storybook-742bdb1417da',
      image: Tailwind,
      name: 'Tailwind',
      isExternal: true,
    },
    {
      image: Jest,
      name: 'Jest',
      href: '/addons/@storybook/addon-jest',
    },
    {
      href: '/addons/storybook-addon-next',
      image: Nextjs,
      name: 'Nextjs',
    },
    {
      href: `/docs/builders/webpack#gatsby-focus-wrapper`,
      image: Webpack,
      name: 'Webpack',
    },
    {
      href: `/docs/sharing/design-integrations#figma`,
      image: Figma,
      name: 'Figma',
    },
    {
      href: 'https://zeroheight.com/3xlwst8/p/507ba7-storybook',
      target: '_blank',
      rel: 'noopener nofollow noreferrer',
      image: Zeroheight,
      name: 'Zeroheight',
      isExternal: true,
    },
    {
      href: 'https://nx.dev/storybook/overview-react',
      target: '_blank',
      rel: 'noopener nofollow noreferrer',
      image: Nx,
      name: 'Nx',
      isExternal: true,
    },
    {
      href: '/addons/storybook-addon-apollo-client',
      image: Apollo,
      name: 'Apollo',
    },
    {
      href: `/docs/writing-tests/integrations/stories-in-end-to-end-tests`,
      image: Playwright,
      name: 'Playwright',
    },
    {
      href: '/addons/@storybook/addon-a11y',
      image: Axe,
      name: 'Axe',
    },
    {
      href: 'https://redwoodjs.com/docs/storybook',
      target: '_blank',
      rel: 'noopener nofollow noreferrer',
      image: RedwoodJS,
      name: 'RedwoodJS',
      isExternal: true,
    },
    {
      href: '/addons/mswjs/msw-storybook-addon',
      image: MSW,
      name: 'MSW',
    },
    {
      href: '/addons/storybook-zeplin',
      image: Zeplin,
      name: 'Zeplin',
    },
    {
      href: '/addons/tag/graphql',
      image: GraphQL,
      name: 'GraphQL',
    },
    {
      href: '/addons/storybook-addon-gatsby/',
      image: Gatsby,
      name: 'Gatsby',
    },
    {
      href: '/addons/storybook-addon-launchdarkly/',
      image: Launchdarkly,
      name: 'Launchdarkly',
    },
    {
      href: 'https://github.com/storybookjs/presets/tree/master/packages/preset-scss',
      image: Sass,
      name: 'Sass',
      isExternal: true,
    },
    {
      href: '/addons/storybook-addon-swc/',
      image: SWC,
      name: 'SWC',
    },
    {
      href: 'https://www.uxpin.com/merge/storybook-integration',
      target: '_blank',
      rel: 'noopener nofollow noreferrer',
      image: UXpin,
      name: 'UXpin',
      isExternal: true,
    },
    {
      href: 'https://ionicframework.com/blog/how-to-use-storybook-with-stencil/',
      target: '_blank',
      rel: 'noopener nofollow noreferrer',
      image: Ionic,
      name: 'Ionic',
      isExternal: true,
    },
    {
      href: `/docs/sharing/design-integrations`,
      image: Sketch,
      name: 'Sketch',
    },
    {
      target: '_blank',
      rel: 'noopener nofollow noreferrer',
      href: 'https://support.invisionapp.com/hc/en-us/articles/360051565792',
      image: Invision,
      name: 'Invision',
      isExternal: true,
    },
    {
      href: '/addons/@storybook/testing-angular',
      image: Supernova,
      name: 'Supernova',
    },
    {
      href: `/docs/writing-tests/integrations/stories-in-end-to-end-tests`,
      image: Cypress,
      name: 'Cypress',
    },
    {
      target: '_blank',
      rel: 'noopener nofollow noreferrer',
      href: 'https://storybook.nuxtjs.org/',
      image: Nuxt,
      name: 'Nuxt',
      isExternal: true,
    },
  ];

  return (
    <div className="sticky top-16 w-full items-center text-center md:grid-cols-[2/3]">
      <div className="grid w-full grid-flow-row-dense auto-rows-max grid-cols-[repeat(6,_minmax(auto,_80px))] justify-center gap-5 sm:grid-cols-[repeat(10,_minmax(auto,_80px))] md:grid-cols-[repeat(6,_minmax(auto,_90px))] md:justify-end lg:gap-10">
        {integrations.map(({ image, name, isExternal, ...integration }) => {
          if (isExternal)
            return (
              <a
                className="pointer-events-none flex h-auto w-full select-none items-center justify-center rounded-sm shadow-md md:pointer-events-auto"
                key={name}
                {...integration}
              >
                <Image
                  alt={name}
                  className="block h-full w-full"
                  height="80"
                  loading="lazy"
                  src={image}
                  width="80"
                />
              </a>
            );
          return (
            <div
              className="pointer-events-none flex h-auto w-full select-none items-center justify-center rounded-sm shadow-md md:pointer-events-auto"
              key={name}
              {...integration}
            >
              <Image
                alt={name}
                className="block h-full w-full"
                height="80"
                loading="lazy"
                src={image}
                width="80"
              />
            </div>
          );
        })}
      </div>
      <div className="from-homeBackground to-homeBackground/0 pointer-events-none absolute bottom-[-2.5rem] left-0 right-0 hidden h-1/2 bg-gradient-to-t md:block" />
    </div>
  );
}
