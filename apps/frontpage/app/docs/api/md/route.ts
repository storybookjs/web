import fs from 'node:fs';
import path from 'node:path';
import { type NextRequest, NextResponse } from 'next/server';
import { latestVersion } from '@repo/utils';
import matter from 'gray-matter';
import { getAllTrees } from '../../../../lib/get-all-trees';
import { getFlatTree } from '../../../../lib/get-flat-tree';
import { resolveDocForLLM, buildContentBanner } from '../../../../lib/resolve-doc-for-llm';

function findDocFile(
  docPath: string,
  versionId: string,
): string | null {
  const basePath = `content/docs/${versionId}/${docPath}`;
  const candidates = [
    `${basePath}.mdx`,
    `${basePath}.md`,
    `${basePath}/index.mdx`,
    `${basePath}/index.md`,
  ];

  for (const candidate of candidates) {
    const fullPath = path.join(process.cwd(), candidate);
    if (fs.existsSync(fullPath)) {
      return candidate;
    }
  }
  return null;
}

export function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const slug = searchParams.get('path');

  if (!slug) {
    // Return index of all available pages
    const listOfTrees = getAllTrees();
    const tree = listOfTrees.find((t) => t.name === latestVersion.id);
    const flatTree = tree?.children
      ? getFlatTree({ tree: tree.children })
      : [];

    const pages = flatTree.map((node) => ({
      slug: node.slug,
      url: `https://storybook.js.org${node.slug}`,
      markdownUrl: `https://storybook.js.org/docs/api/md/${node.slug.replace('/docs/', '')}`,
    }));

    return NextResponse.json(
      {
        version: latestVersion.id,
        label: latestVersion.label,
        availableParams: {
          renderer: 'Filter code snippets by framework (default: react). Options: react, vue, angular, svelte, web-components, solid, etc.',
          language: 'Filter code snippets by language (default: ts). Options: ts, js',
        },
        pages,
      },
      {
        headers: {
          'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        },
      },
    );
  }

  // Return specific page as markdown (backward compatibility with ?path= param)
  const renderer = searchParams.get('renderer') || 'react';
  const language = searchParams.get('language') || 'ts';

  const docFile = findDocFile(slug, latestVersion.id);
  if (!docFile) {
    return new NextResponse('Page not found', { status: 404 });
  }

  const fullPath = path.join(process.cwd(), docFile);
  const fileContent = fs.readFileSync(fullPath, 'utf8');
  const { content: rawContent, data } = matter(fileContent);

  const { content, availableRenderers, availableLanguages } = resolveDocForLLM(rawContent, {
    versionId: latestVersion.id,
    renderer,
    language,
  });

  const title = data.title || '';
  const banner = buildContentBanner(renderer, language, availableRenderers, availableLanguages);
  const markdown = `${banner}# ${title}\n\n${content}`;

  return new NextResponse(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
