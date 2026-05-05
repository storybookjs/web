import preview from '../../../.storybook/preview';
import { P } from './p';

const meta = preview.meta({
  title: 'MDX/P',
  component: P,
  parameters: { layout: 'padded' },
});

export const Default = meta.story({
  args: {
    children:
      'Storybook is a frontend workshop for building UI components and pages in isolation.',
  },
});

export const WithLink = meta.story({
  args: {
    children: (
      <>
        Storybook is a frontend workshop for{' '}
        <a href="https://storybook.js.org">building UI components</a> and pages.
      </>
    ),
  },
});
