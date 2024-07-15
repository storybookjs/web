import fs from 'node:fs';
import { compileMDX } from 'next-mdx-remote/rsc';

import { mdxComponents } from '@repo/ui';

export async function getRelease(version: string) {
  if (!version) return undefined;

  const file = await fs.promises.readFile(
    `${process.cwd()}/content/releases/${version}.md`,
    'utf8',
  );

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
