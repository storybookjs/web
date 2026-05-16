import preview from '../../.storybook/preview';
import { Team } from './team';

const meta = preview.meta({
  title: 'Community/Team',
  component: Team,
  parameters: { layout: 'padded' },
});

export const Default = meta.story({});
