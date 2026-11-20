import { Container } from '@repo/ui';
import preview from '../../../.storybook/preview';
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

export const Default = meta.story();
