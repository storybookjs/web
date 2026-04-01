import { type NextRequest, NextResponse } from 'next/server';
import { type DocsVersion, docsVersions, latestVersion } from '@repo/utils';
import { getAllTrees } from '../../lib/get-all-trees';
import { getFlatTree } from '../../lib/get-flat-tree';
import { resolveVersionFromSlug } from '../../lib/resolve-doc-for-llm';

export const dynamic = 'force-dynamic';

const baseUrl = 'https://storybook.js.org';

export const getLlmsBannerLines = ({ version }: { version: DocsVersion }) => [
  '# Storybook',
  '',
  '> Storybook is a frontend workshop for building UI components and pages in isolation. It helps with UI development, testing, and documentation.',
  '',
  `Current version: ${version.label} (${version.id})`,
  '',
  '## Documentation',
  '',
  `- [Storybook Docs](${baseUrl}/docs): Main documentation`,
  `- [Full Documentation (Markdown)](${baseUrl}/llms-full.txt): Complete documentation in plain text for LLM consumption`,
  '',
  '## Markdown Access',
  '',
  'Append `.md` to any docs URL to get clean markdown with code examples:',
  `- \`${baseUrl}/docs/writing-stories/decorators.md\``,
  `- \`${baseUrl}/docs/9/writing-stories/decorators.md\` (Version 9)`,
  '',
  '### Query Parameters',
  '',
  'All markdown endpoints (`.md` URLs and `llms-full.txt`) support these query parameters:',
  '- `renderer` - Framework filter for code snippets (default: `react`). Options: `react`, `vue`, `angular`, `svelte`, `web-components`, `solid`, `preact`, `html`, `ember`, `qwik`',
  '- `language` - Language filter for code snippets (default: `ts`). Options: `ts`, `js`',
  '- `codeOnly` - When `true`, returns only the code snippets without prose',
  '',
  'Examples:',
  '- `GET /docs/writing-stories/decorators.md?renderer=vue&language=ts`',
  '- `GET /docs/writing-stories/decorators.md?codeOnly=true`',
  '- `GET /llms-full.txt?renderer=angular&language=js`',
  '',
  '### Versioned Access',
  '',
  'Prefix the path with a version slug for older versions:',
];

export function GET(request: NextRequest) {
  const versionSlug = request.nextUrl.searchParams.get('version') ?? undefined;
  const versionId = resolveVersionFromSlug(versionSlug);
  const activeVersion = docsVersions.find((v) => v.id === versionId) ?? latestVersion;

  const listOfTrees = getAllTrees();
  const tree = listOfTrees.find((t) => t.name === versionId);
  const flatTree = tree?.children
    ? getFlatTree({ tree: tree.children })
    : [];

  const lines = [...getLlmsBannerLines({ version: activeVersion })];

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
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
