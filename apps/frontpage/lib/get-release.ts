import fs from 'node:fs';
import { compileMDX } from 'next-mdx-remote/rsc';

import { mdxComponents } from '@repo/ui';

export async function getRelease(version: string) {
  if (!version) return undefined;

  const file = await fs.promises.readFile(
    `${process.cwd()}/content/releases/${version}.md`,
    'utf8',
  );

  /**
   * TODO: Refactor this to use the MDXRemote component
   *       Because then we can import MDXContent from @repo/ui
   */
  return compileMDX<{ title: string }>({
    source: file,
    options: {
      parseFrontmatter: true,
    },
    components: {
      ...mdxComponents,
    },
  });
}
