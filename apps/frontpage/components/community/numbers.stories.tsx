import preview from '../../.storybook/preview';
import { Numbers } from './numbers';

const meta = preview.meta({
  title: 'Community/Numbers',
  component: Numbers,
  parameters: { layout: 'padded' },
  args: {
    githubCount: '85k+',
    contributorsCount: '2,100+',
    discordMembersCount: '13.5k',
    npmDownloadsCount: '11.6M',
    youtubeSubscribersCount: '8.2k',
  },
});

export const Default = meta.story({});

export const SmallNumbers = meta.story({
  args: {
    githubCount: '100',
    contributorsCount: '12',
    discordMembersCount: '50',
    npmDownloadsCount: '500',
    youtubeSubscribersCount: '20',
  },
});
