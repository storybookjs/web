import { type NextRequest, NextResponse } from 'next/server';
import { docsVersions, latestVersion } from '@repo/utils';
import { getAllTrees } from '../../lib/get-all-trees';
import { getFlatTree } from '../../lib/get-flat-tree';
import { resolveVersionFromSlug } from '../../lib/resolve-doc-for-llm';
import { getLlmsBannerLines } from '../../lib/get-llm-banner-lines';

export const dynamic = 'force-dynamic';

export function GET(request: NextRequest) {
  const baseUrl = `${request.nextUrl.protocol}//${request.nextUrl.host}`;
  const versionSlug = request.nextUrl.searchParams.get('version') ?? undefined;
  const versionId = resolveVersionFromSlug(versionSlug);
  const activeVersion =
    docsVersions.find((v) => v.id === versionId) ?? latestVersion;

  const listOfTrees = getAllTrees();
  const tree = listOfTrees.find((t) => t.name === versionId);
  const flatTree = tree?.children ? getFlatTree({ tree: tree.children }) : [];

  const lines = [...getLlmsBannerLines({ baseUrl, version: activeVersion })];

  for (const version of docsVersions) {
    if (version.id === latestVersion.id) continue;
    const slug = version.inSlug ?? version.id;
    lines.push(`- \`/docs/${slug}/get-started.md\` — ${version.label}`);
  }
  lines.push('');
  lines.push('Full documentation dump for older versions:');
  for (const version of docsVersions) {
    if (version.id === latestVersion.id) continue;
    const slug = version.inSlug ?? version.id;
    lines.push(`- \`/llms-full.txt?version=${slug}\` — ${version.label}`);
  }

  lines.push('');
  lines.push('## Docs Pages');
  lines.push('');

  for (const node of flatTree) {
    const indent = node.level > 1 ? '  '.repeat(node.level - 1) : '';
    lines.push(`${indent}- ${node.slug}`);
  }

  lines.push('');
  lines.push('## Community & Resources');
  lines.push('');
  lines.push(`- [Blog](${baseUrl}/blog): Storybook blog`);
  lines.push(`- [Tutorials](${baseUrl}/tutorials): Step-by-step tutorials`);
  lines.push(`- [Recipes](${baseUrl}/recipes): Integration recipes`);
  lines.push(`- [Addons](${baseUrl}/addons): Addon catalog`);
  lines.push(
    `- [GitHub](https://github.com/storybookjs/storybook): Source code`,
  );
  lines.push(`- [Discord](https://discord.gg/storybook): Community chat`);
  lines.push('');

  return new NextResponse(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'CDN-Cache-Control': 'no-store',
    },
  });
}
