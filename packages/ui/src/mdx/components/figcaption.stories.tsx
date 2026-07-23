import preview from '../../../.storybook/preview';
import { Figcaption } from './figcaption';
import { FigureProvider } from './figure-provider';

const meta = preview.meta({
  title: 'MDX/Figcaption',
  component: Figcaption,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <FigureProvider>
        <Story />
      </FigureProvider>
    ),
  ],
});

export const Default = meta.story({
  args: { children: 'example.tsx' },
});
