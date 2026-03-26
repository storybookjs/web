import fs from 'node:fs';
import path from 'node:path';
import { type NextRequest, NextResponse } from 'next/server';
import { latestVersion } from '@repo/utils';
import matter from 'gray-matter';
import { resolveDocForLLM, buildContentBanner } from '../../../../../lib/resolve-doc-for-llm';

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

interface RouteContext {
  params: Promise<{ path: string[] }>;
}

export async function GET(
  request: NextRequest,
  context: RouteContext,
) {
  const { path: pathSegments } = await context.params;
  const slug = pathSegments.join('/');

  const renderer = request.nextUrl.searchParams.get('renderer') || 'react';
  const language = request.nextUrl.searchParams.get('language') || 'ts';

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
