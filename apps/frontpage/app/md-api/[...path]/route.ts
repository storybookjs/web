import fs from 'node:fs';
import path from 'node:path';
import { type NextRequest, NextResponse } from 'next/server';
import matter from 'gray-matter';
import {
  resolveDocForLLM,
  buildContentBanner,
  resolveVersionFromSlug,
} from '../../../lib/resolve-doc-for-llm';
import { findDocFile } from '../../../lib/get-page';

export const dynamic = 'force-dynamic';

interface RouteContext {
  params: Promise<{ path: string[] }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  const { path: pathSegments } = await context.params;

  const renderer = request.nextUrl.searchParams.get('renderer') ?? 'react';
  const language = request.nextUrl.searchParams.get('language') ?? 'ts';
  const codeOnly = request.nextUrl.searchParams.get('codeOnly') === 'true';

  let versionSlug: string | undefined;
  let docSegments = pathSegments;

  const firstSegment = pathSegments[0];
  const isVersion = Boolean(/\d+(?:\.\d+)?/.exec(firstSegment));

  if (isVersion) {
    versionSlug = firstSegment;
    docSegments = pathSegments.slice(1);
  }

  const versionId = resolveVersionFromSlug(versionSlug);
  const slug = docSegments.join('/');

  const result = findDocFile(`${versionId}/${slug}`);
  if (!result) {
    return new NextResponse('Page not found', { status: 404 });
  }

  const fullPath = path.join(process.cwd(), result.filePath);
  const fileContent = fs.readFileSync(fullPath, 'utf8');
  const { content: rawContent, data } = matter(fileContent);

  const pagePath = [versionId, ...slug.split('/')];
  const baseUrl = `${request.nextUrl.protocol}//${request.nextUrl.host}`;

  const { content, availableRenderers, availableLanguages } = resolveDocForLLM(
    rawContent,
    {
      versionId,
      renderer,
      language,
      codeOnly,
      pagePath,
      isIndexPage: result.isIndexPage,
      baseUrl,
    },
  );

  const title = String(data.title ?? '');
  const banner = buildContentBanner({
    renderer,
    language,
    rendererList: availableRenderers,
    languageList: availableLanguages,
    versionId,
    codeOnly,
    slug,
  });

  const markdown = codeOnly
    ? `${banner}# ${title} — Code Snippets\n\n${content}`
    : `${banner}# ${title}\n\n${content}`;

  return new NextResponse(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'CDN-Cache-Control': 'no-store',
      Vary: 'Accept',
    },
  });
}
