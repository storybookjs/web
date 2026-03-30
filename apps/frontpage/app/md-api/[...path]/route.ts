import fs from 'node:fs';
import path from 'node:path';
import { type NextRequest, NextResponse } from 'next/server';
import matter from 'gray-matter';
import { resolveDocForLLM, buildContentBanner, resolveVersionFromSlug } from '../../../lib/resolve-doc-for-llm';

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

  const renderer = request.nextUrl.searchParams.get('renderer') ?? 'react';
  const language = request.nextUrl.searchParams.get('language') ?? 'ts';
  const codeOnly = request.nextUrl.searchParams.get('codeOnly') === 'true';

  // Version is encoded in path by middleware: /md-api/v/{version}/{docPath}
  let versionSlug: string | undefined;
  let docSegments = pathSegments;

  if (pathSegments[0] === 'v' && pathSegments.length >= 3) {
    versionSlug = pathSegments[1];
    docSegments = pathSegments.slice(2);
  }

  const versionId = resolveVersionFromSlug(versionSlug);
  const slug = docSegments.join('/');

  const docFile = findDocFile(slug, versionId);
  if (!docFile) {
    return new NextResponse('Page not found', { status: 404 });
  }

  const fullPath = path.join(process.cwd(), docFile);
  const fileContent = fs.readFileSync(fullPath, 'utf8');
  const { content: rawContent, data } = matter(fileContent);

  const { content, availableRenderers, availableLanguages } = resolveDocForLLM(rawContent, {
    versionId,
    renderer,
    language,
    codeOnly,
  });

  const title = String(data.title ?? '');
  const banner = buildContentBanner({
    renderer,
    language,
    rendererList: availableRenderers,
    languageList: availableLanguages,
    versionId,
    codeOnly,
  });

  const markdown = codeOnly
    ? `${banner}# ${title} — Code Snippets\n\n${content}`
    : `${banner}# ${title}\n\n${content}`;

  return new NextResponse(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
