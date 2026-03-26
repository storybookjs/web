import { NextResponse } from 'next/server';
import { docsVersions, latestVersion } from '@repo/utils';
import { getAllTrees } from '../../lib/get-all-trees';
import { getFlatTree } from '../../lib/get-flat-tree';

export const dynamic = 'force-static';

export function GET() {
  const listOfTrees = getAllTrees();
  const tree = listOfTrees.find((t) => t.name === latestVersion.id);
  const flatTree = tree?.children
    ? getFlatTree({ tree: tree.children })
    : [];

  const baseUrl = 'https://storybook.js.org';

  const lines: string[] = [
    '# Storybook',
    '',
    '> Storybook is a frontend workshop for building UI components and pages in isolation. It helps with UI development, testing, and documentation.',
    '',
    `Current version: ${latestVersion.label} (${latestVersion.id})`,
    '',
    '## Documentation',
    '',
    `- [Storybook Docs](${baseUrl}/docs): Main documentation`,
    `- [Full Documentation (Markdown)](${baseUrl}/llms-full.txt): Complete documentation in plain text for LLM consumption`,
    '',
    '## API Endpoints',
    '',
    `- [Documentation as Markdown](${baseUrl}/docs/api/md): Get any docs page as markdown via \`/docs/api/md/{path}\``,
    '',
    '### Query Parameters',
    '',
    'All documentation endpoints support the following query parameters:',
    '- `renderer` - Framework filter for code snippets (default: `react`). Options: `react`, `vue`, `angular`, `svelte`, `web-components`, `solid`, `preact`, `html`, `ember`, `qwik`',
    '- `language` - Language filter for code snippets (default: `ts`). Options: `ts`, `js`',
    '',
    'Example: `GET /docs/api/md/writing-stories/decorators?renderer=vue&language=ts`',
    '',
    '## Docs Pages',
    '',
  ];

  for (const node of flatTree) {
    const indent = node.level > 1 ? '  '.repeat(node.level - 1) : '';
    lines.push(`${indent}- [${node.slug}](${baseUrl}${node.slug})`);
  }

  lines.push('');
  lines.push('## Other Versions');
  lines.push('');
  for (const version of docsVersions) {
    if (version.id === latestVersion.id) continue;
    const slug = version.inSlug ?? version.id;
    lines.push(
      `- [${version.label}](${baseUrl}/docs/${slug}): ${version.label}`,
    );
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
