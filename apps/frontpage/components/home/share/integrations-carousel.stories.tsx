import { expect, userEvent } from 'storybook/test';
import preview from '../../../.storybook/preview';
import { IntegrationsCarousel } from './integrations-carousel';
import nextLogo from './images/next-js.svg';
import figmaLogo from './images/figma.svg';
import notionLogo from './images/notion.svg';
import mediumLogo from './images/medium.svg';

const integrations = [
  {
    index: 1,
    name: 'NextJS',
    image: nextLogo,
    color: '#000',
    media: (
      <div className="w-full h-[300px] flex items-center justify-center bg-zinc-800 text-white text-2xl rounded">
        NextJS preview
      </div>
    ),
  },
  {
    index: 2,
    name: 'Figma',
    image: figmaLogo,
    color: '#000',
    media: (
      <div className="w-full h-[300px] flex items-center justify-center bg-zinc-700 text-white text-2xl rounded">
        Figma preview
      </div>
    ),
  },
  {
    index: 3,
    name: 'Notion',
    image: notionLogo,
    color: '#fff',
    media: (
      <div className="w-full h-[300px] flex items-center justify-center bg-zinc-600 text-white text-2xl rounded">
        Notion preview
      </div>
    ),
  },
  {
    index: 4,
    name: 'Medium',
    image: mediumLogo,
    color: '#F5C347',
    media: (
      <div className="w-full h-[300px] flex items-center justify-center bg-zinc-500 text-white text-2xl rounded">
        Medium preview
      </div>
    ),
  },
];

const meta = preview.meta({
  title: 'Home/Share/IntegrationsCarousel',
  component: IntegrationsCarousel,
  globals: { backgrounds: { value: 'dark' } },
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="bg-homeBackground w-[600px] p-8">
        <Story />
      </div>
    ),
  ],
});

export const Default = meta.story({
  args: { integrations },
});

export const Switched = meta.story({
  args: { integrations },
  play: async ({ canvas }) => {
    const buttons = canvas.getAllByRole('button');
    await userEvent.click(buttons[2]);
    await expect(canvas.getByText('Notion preview')).toBeInTheDocument();
  },
});
