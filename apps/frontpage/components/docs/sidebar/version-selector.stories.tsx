import { docsVersions, latestVersion } from '@repo/utils';
import preview from '../../../.storybook/preview';
import { VersionSelector } from './version-selector';

const meta = preview.meta({
  title: 'Docs/Sidebar/VersionSelector',
  component: VersionSelector,
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
});

export const Latest = meta.story({
  args: { activeVersion: latestVersion },
});

export const PreviousMajor = meta.story({
  args: { activeVersion: docsVersions[1] ?? latestVersion },
});
