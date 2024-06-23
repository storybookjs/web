import { MDXRemote } from 'next-mdx-remote/rsc';

import { mdxComponents, MDXRemoteOptions } from '@repo/ui';

export function AddonReadme({ addon }: { addon: Addon }) {
  const readme = addon.readme as string;

  return (
    <div className="min-w-0 flex-1">
      {addon.readme && (
        <MDXRemote
          source={readme}
          components={mdxComponents}
          options={MDXRemoteOptions}
        />
      )}
    </div>
  );
}
