import fs from 'node:fs';
import path from 'node:path';
import { type NextRequest, NextResponse } from 'next/server';
import { latestVersion } from '@repo/utils';
import matter from 'gray-matter';
import { getAllTrees } from '../../../../lib/get-all-trees';
import { getFlatTree } from '../../../../lib/get-flat-tree';

function stripMdxComponents(content: string): string {
  let cleaned = content.replace(/^import\s+.*$/gm, '');
  cleaned = cleaned.replace(/<[A-Z][A-Za-z]*\s[^>]*\/>/g, '');
  cleaned = cleaned.replace(
    /<([A-Z][A-Za-z]*)[^>]*>([\s\S]*?)<\/\1>/g,
    '$2',
  );
  cleaned = cleaned.replace(/<[A-Z][A-Za-z]*\s*\/>/g, '');
  cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '');
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
  return cleaned.trim();
}

function findAndReadDoc(
  docPath: string,
  versionId: string,
): { title: string; content: string } | null {
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
      const fileContent = fs.readFileSync(fullPath, 'utf8');
      const { content, data } = matter(fileContent);
      return {
        title: data.title || '',
        content: stripMdxComponents(content),
      };
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
      markdownUrl: `https://storybook.js.org/docs/api/md?path=${node.slug.replace('/docs/', '')}`,
    }));

    return NextResponse.json(
      {
        version: latestVersion.id,
        label: latestVersion.label,
        pages,
      },
      {
        headers: {
          'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        },
      },
    );
  }

  // Return specific page as markdown
  const doc = findAndReadDoc(slug, latestVersion.id);
  if (!doc) {
    return new NextResponse('Page not found', { status: 404 });
  }

  const markdown = `# ${doc.title}\n\n${doc.content}`;

  return new NextResponse(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
