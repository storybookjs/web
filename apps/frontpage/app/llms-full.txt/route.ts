import fs from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { latestVersion } from '@repo/utils';
import matter from 'gray-matter';
import { getAllTrees } from '../../lib/get-all-trees';
import { getFlatTree } from '../../lib/get-flat-tree';

export const dynamic = 'force-static';

function stripMdxComponents(content: string): string {
  // Remove import statements
  let cleaned = content.replace(/^import\s+.*$/gm, '');

  // Remove JSX-only components (self-closing and block) but keep their text content
  // Self-closing: <Component ... />
  cleaned = cleaned.replace(/<[A-Z][A-Za-z]*\s[^>]*\/>/g, '');
  // Opening + closing tags with content: keep inner content
  cleaned = cleaned.replace(
    /<([A-Z][A-Za-z]*)[^>]*>([\s\S]*?)<\/\1>/g,
    '$2',
  );
  // Remaining self-closing components without attributes
  cleaned = cleaned.replace(/<[A-Z][A-Za-z]*\s*\/>/g, '');

  // Remove HTML comments
  cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '');

  // Remove consecutive blank lines (more than 2)
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  return cleaned.trim();
}

function getDocContent(filePath: string): string | null {
  const fullPath = path.join(process.cwd(), filePath);
  if (!fs.existsSync(fullPath)) return null;

  const fileContent = fs.readFileSync(fullPath, 'utf8');
  const { content, data } = matter(fileContent);

  const title = data.title || '';
  const cleaned = stripMdxComponents(content);

  return `# ${title}\n\n${cleaned}`;
}

function findDocFile(slug: string): string | null {
  const versionId = latestVersion.id;
  // Remove /docs prefix
  const docPath = slug.replace(/^\/docs\/?/, '');
  const basePath = `content/docs/${versionId}/${docPath}`;

  // Try different file patterns
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

export function GET() {
  const listOfTrees = getAllTrees();
  const tree = listOfTrees.find((t) => t.name === latestVersion.id);
  const flatTree = tree?.children
    ? getFlatTree({ tree: tree.children })
    : [];

  const baseUrl = 'https://storybook.js.org';
  const sections: string[] = [
    '# Storybook Documentation',
    '',
    `> Complete documentation for Storybook ${latestVersion.label}`,
    `> Source: ${baseUrl}/docs`,
    '',
    '---',
    '',
  ];

  for (const node of flatTree) {
    const docFile = findDocFile(node.slug);
    if (!docFile) continue;

    const content = getDocContent(docFile);
    if (!content) continue;

    sections.push(content);
    sections.push('');
    sections.push(`> Source: ${baseUrl}${node.slug}`);
    sections.push('');
    sections.push('---');
    sections.push('');
  }

  return new NextResponse(sections.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
