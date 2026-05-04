import preview from '../../.storybook/preview';
import { Document } from '../home/test/icons';
import { FeatureCard } from './feature-card';

const meta = preview.meta({
  title: 'AI/FeatureCard',
  component: FeatureCard,
  globals: { backgrounds: { value: 'dark' } },
});

export const Default = meta.story({
  args: {
    icon: <Document />,
    title: 'Match existing UI patterns',
    description:
      'Agents should reuse existing components instead of inventing new ones. Storybook exposes production components and their APIs so agents assemble UI from what already exists.',
  },
});

export const ShortDescription = meta.story({
  args: {
    icon: <Document />,
    title: 'Short title',
    description: 'A brief description for this feature.',
  },
});
