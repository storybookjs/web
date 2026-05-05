import { expect, userEvent } from 'storybook/test';
import preview from '../../.storybook/preview';
import { IllustratedFeatureList } from './illustrated-feature-list';
import { Eye, Pixel, Interact, Accessibility } from './test/icons';

const features = [
  {
    icon: <Eye aria-hidden />,
    title: 'Spot test',
    description: 'Stories are tests you can debug in dev and QA.',
    link: { label: 'Learn about UI tests', href: '/docs/writing-tests' },
    media: '/home/test/homepage-spot-testing-lg.mp4',
    poster: '/home/test/homepage-spot-testing-poster-lg.jpg',
  },
  {
    icon: <Pixel aria-hidden />,
    title: 'Visual test appearance',
    description: 'Pinpoint UI changes down to the pixel.',
    link: {
      label: 'Learn about visual tests',
      href: '/docs/writing-tests/visual-testing',
    },
    media: '/home/test/homepage-visual-testing-lg.mp4',
    poster: '/home/test/homepage-visual-testing-poster-lg.jpg',
  },
  {
    icon: <Interact aria-hidden />,
    title: 'Interaction test behavior',
    description: 'Simulate user behavior and assert in the browser.',
    link: {
      label: 'Learn about interaction tests',
      href: '/docs/writing-tests/interaction-testing',
    },
    media: '/home/test/homepage-component-testing-lg.mp4',
    poster: '/home/test/homepage-component-testing-poster-lg.jpg',
  },
  {
    icon: <Accessibility aria-hidden />,
    title: 'Accessibility tests',
    description: 'Check stories for WCAG and ARIA issues.',
    link: {
      label: 'Learn about accessibility tests',
      href: '/docs/writing-tests/accessibility-testing',
    },
    media: '/home/test/homepage-accessibility-testing-lg.mp4',
    poster: '/home/test/homepage-accessibility-testing-poster-lg.jpg',
  },
];

const meta = preview.meta({
  title: 'Home/IllustratedFeatureList',
  component: IllustratedFeatureList,
  globals: { backgrounds: { value: 'dark' } },
  parameters: {
    layout: 'fullscreen',
    chromatic: { viewports: [320, 768, 1200] },
  },
  decorators: [
    (Story) => (
      <div className="bg-homeBackground">
        <Story />
      </div>
    ),
  ],
});

export const Default = meta.story({
  args: { features, alignment: 'left', bgColor: '#FDDD9C' },
});

export const RightAligned = meta.story({
  args: { features, alignment: 'right', bgColor: '#A2E1E0' },
});

export const SwitchedFeature = meta.story({
  args: { features, alignment: 'left', bgColor: '#FDDD9C' },
  play: async ({ canvas }) => {
    const target = canvas.getByRole('button', {
      name: /Interaction test behavior/,
    });
    await userEvent.click(target);
    await expect(target).toHaveAttribute('aria-pressed', 'true');
  },
});
