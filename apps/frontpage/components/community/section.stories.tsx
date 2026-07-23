import preview from '../../.storybook/preview';
import { Section } from './section';

const meta = preview.meta({
  title: 'Community/Section',
  component: Section,
  parameters: { layout: 'padded' },
});

export const Default = meta.story({
  args: {
    id: 'example',
    children: (
      <>
        <h2 className="mb-2 text-2xl font-bold">Section heading</h2>
        <p>Section content goes here.</p>
      </>
    ),
  },
});
