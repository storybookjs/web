import fs from 'fs';
import { compileMDX } from 'next-mdx-remote/rsc';
import * as MDX from '../components/docs/mdx';

export async function getRelease(version: string) {
  if (!version) return undefined;

  const file = await fs.promises.readFile(
    process.cwd() + `/content/releases/${version}.md`,
    'utf8'
  );

  return await compileMDX<{ title: string }>({
    source: file,
    options: {
      parseFrontmatter: true,
    },
    components: {
      h1: MDX.H1,
      h2: MDX.H2,
      h3: MDX.H3,
      h4: MDX.H1,
      a: MDX.A,
      p: MDX.P,
      hr: MDX.Hr,
      ul: MDX.UnorderedList,
      li: MDX.List,
      pre: MDX.Pre,
    },
  });
}
