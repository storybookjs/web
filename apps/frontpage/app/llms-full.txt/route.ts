import fs from 'node:fs';
import path from 'node:path';
import { type NextRequest, NextResponse } from 'next/server';
import { latestVersion } from '@repo/utils';
import matter from 'gray-matter';
import { getAllTrees } from '../../lib/get-all-trees';
import { getFlatTree } from '../../lib/get-flat-tree';
import { resolveDocForLLM, buildContentBanner } from '../../lib/resolve-doc-for-llm';

function findDocFile(slug: string): string | null {
  const versionId = latestVersion.id;
  const docPath = slug.replace(/^\/docs\/?/, '');
  const basePath = `content/docs/${versionId}/${docPath}`;

  const candidates = [
    `${basePath}.mdx`,
    `${basePath}.md`,
    `${basePath}/index.mdx`,
    `${basePath}/index.md`,
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(path.join(process.cwd(), candidate))) {
      return candidate;
    }
  }

  return null;
}

export function GET(request: NextRequest) {
  const renderer = request.nextUrl.searchParams.get('renderer') || 'react';
  const language = request.nextUrl.searchParams.get('language') || 'ts';

  const listOfTrees = getAllTrees();
  const tree = listOfTrees.find((t) => t.name === latestVersion.id);
  const flatTree = tree?.children
    ? getFlatTree({ tree: tree.children })
    : [];

  const baseUrl = 'https://storybook.js.org';

  // Collect all renderers and languages across all pages
  const globalRenderers = new Set<string>();
  const globalLanguages = new Set<string>();

  const pageSections: string[] = [];

  for (const node of flatTree) {
    const docFile = findDocFile(node.slug);
    if (!docFile) continue;

    const fullPath = path.join(process.cwd(), docFile);
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    const { content: rawContent, data } = matter(fileContent);

    const { content, availableRenderers, availableLanguages } = resolveDocForLLM(rawContent, {
      versionId: latestVersion.id,
      renderer,
      language,
    });

    for (const r of availableRenderers) globalRenderers.add(r);
    for (const l of availableLanguages) globalLanguages.add(l);

    if (!content) continue;

    const title = data.title || '';
    pageSections.push(`# ${title}\n\n${content}`);
    pageSections.push(`> Source: ${baseUrl}${node.slug}`);
    pageSections.push('---');
    pageSections.push('');
  }

  const banner = buildContentBanner(
    renderer,
    language,
    [...globalRenderers].sort(),
    [...globalLanguages].sort(),
  );

  const header = [
    '# Storybook Documentation',
    '',
    `> Complete documentation for Storybook ${latestVersion.label}`,
    `> Source: ${baseUrl}/docs`,
    '',
    banner,
    '---',
    '',
  ].join('\n');

  const fullContent = header + pageSections.join('\n');

  return new NextResponse(fullContent, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
