import fs from 'node:fs';
import path from 'node:path';
import { type NextRequest, NextResponse } from 'next/server';
import { docsVersions, latestVersion } from '@repo/utils';
import matter from 'gray-matter';
import { getAllTrees } from '../../lib/get-all-trees';
import { getFlatTree } from '../../lib/get-flat-tree';
import {
  resolveDocForLLM,
  resolveVersionFromSlug,
} from '../../lib/resolve-doc-for-llm';
import { findDocFile } from '../../lib/get-page';
import { getLlmsBannerLines } from '../../lib/get-llm-banner-lines';

export const dynamic = 'force-dynamic';

export function GET(request: NextRequest) {
  const renderer = request.nextUrl.searchParams.get('renderer') ?? 'react';
  const language = request.nextUrl.searchParams.get('language') ?? 'ts';
  const codeOnly = request.nextUrl.searchParams.get('codeOnly') === 'true';
  const versionSlug = request.nextUrl.searchParams.get('version') ?? undefined;

  const versionId = resolveVersionFromSlug(versionSlug);
  const version = docsVersions.find((v) => v.id === versionId);

  const listOfTrees = getAllTrees();
  const tree = listOfTrees.find((t) => t.name === versionId);
  const flatTree = tree?.children ? getFlatTree({ tree: tree.children }) : [];

  const baseUrl = `${request.nextUrl.protocol}//${request.nextUrl.host}`;

  // Collect all renderers and languages across all pages
  const globalRenderers = new Set<string>();
  const globalLanguages = new Set<string>();

  const pageSections: string[] = [];

  const isLatest = versionId === latestVersion.id;
  const versionInSlug = version?.inSlug ?? versionId;

  for (const node of flatTree) {
    // Strip /docs/ prefix and version slug (e.g. /docs/9/writing-stories → writing-stories)
    let docPath = node.slug.replace(/^\/docs\/?/, '');
    if (!isLatest) {
      docPath = docPath.replace(new RegExp(`^${versionInSlug}/`), '');
    }

    const result = findDocFile(`${versionId}/${docPath}`);
    if (!result) continue;

    const fullPath = path.join(process.cwd(), result.filePath);
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    const { content: rawContent, data } = matter(fileContent);

    const pagePath = [versionId, ...docPath.split('/')];

    const { content, availableRenderers, availableLanguages } =
      resolveDocForLLM(rawContent, {
        versionId,
        renderer,
        language,
        codeOnly,
        pagePath,
        isIndexPage: result.isIndexPage,
        baseUrl,
      });

    for (const r of availableRenderers) globalRenderers.add(r);
    for (const l of availableLanguages) globalLanguages.add(l);

    if (!content) continue;

    const title = String(data.title ?? '');
    pageSections.push(`# ${title}\n\n${content}`);
    pageSections.push(`> Source: ${baseUrl}${node.slug}`);
    pageSections.push('---');
    pageSections.push('');
  }

  const header = [
    ...getLlmsBannerLines({ baseUrl, version: version ?? latestVersion }),
    '---',
    '',
  ].join('\n');

  const fullContent = header + pageSections.join('\n');

  return new NextResponse(fullContent, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'CDN-Cache-Control': 'no-store',
    },
  });
}
