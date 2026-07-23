import preview from '../../.storybook/preview';
import { Testimonial } from './testimonial';

const meta = preview.meta({
  title: 'Home/Testimonial',
  component: Testimonial,
  globals: { backgrounds: { value: 'dark' } },
  parameters: {
    layout: 'fullscreen',
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
  args: {
    text: 'Storybook is the most useful frontend tool I have used in years. It has changed the way our team builds UI.',
    avatarUrl: '/home/community/contributor1.jpg',
    name: 'Dominic Nguyen',
    jobTitle: 'Frontend Engineer, Chromatic',
    logo: <span className="text-white text-sm font-bold">CHROMATIC</span>,
  },
});

export const LongQuote = meta.story({
  args: {
    text: 'Storybook gives our team a shared visual workshop to design, review, and document UI in isolation. It made our review process dramatically faster, and it surfaces edge cases that would otherwise slip through to production.',
    avatarUrl: '/home/community/contributor1.jpg',
    name: 'Dominic Nguyen',
    jobTitle: 'Frontend Engineer, Chromatic',
    logo: <span className="text-white text-sm font-bold">CHROMATIC</span>,
  },
});
