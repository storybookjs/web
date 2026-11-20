import { Container } from '@repo/ui';
import preview from '../../../../.storybook/preview';
import { FeatureGrid } from './feature-grid';

const meta = preview.meta({
  title: 'Home/Test/FeatureGrid',
  component: FeatureGrid,
  globals: { backgrounds: { value: 'dark' } },
  parameters: {
    layout: 'fullscreen',
    chromatic: { viewports: [375, 1440] },
  },
  decorators: [
    (Story) => (
      <div className="bg-homeBackground">
        <Container className="pb-12 pt-12 text-white sm:pt-16 md:pb-20 lg:px-8">
          <Story />
        </Container>
      </div>
    ),
  ],
});

export const Current = meta.story({ args: { variant: 'current' } });

/** Outlined facet cards, icon beside the text */
export const Variant1 = meta.story({
  name: 'Variant 1',
  args: { variant: 1 },
});

/** Bento with two wide featured tiles */
export const Variant2 = meta.story({
  name: 'Variant 2',
  args: { variant: 2 },
});

/** Connected sequence from a spot check to CI */
export const Variant3 = meta.story({
  name: 'Variant 3',
  args: { variant: 3 },
});

/** Compact two-column list with dividers */
export const Variant4 = meta.story({
  name: 'Variant 4',
  args: { variant: 4 },
});

/** Icon-led tiles in a hairline matrix */
export const Variant5 = meta.story({
  name: 'Variant 5',
  args: { variant: 5 },
});
