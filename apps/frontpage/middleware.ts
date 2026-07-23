import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { docsVersions, latestVersion } from '@repo/utils';

/**
 * Extract version prefix and remaining doc path from a docs URL path.
 * E.g. "/docs/9/writing-stories" → \{ versionSlug: "9", docPath: "writing-stories" \}
 * E.g. "/docs/writing-stories"  → \{ versionSlug: undefined, docPath: "writing-stories" \}
 */
function extractVersionAndPath(docsPath: string): { versionSlug: string | undefined; docPath: string } {
  // Check if first segment matches a known version slug
  const segments = docsPath.split('/').filter(Boolean);
  if (segments.length === 0) return { versionSlug: undefined, docPath: '' };

  const firstSegment = segments[0];
  const firstMajor = firstSegment.split('.')[0];
  const isVersion = docsVersions.some(
    (v) => (v.inSlug ?? v.id) === firstSegment || v.id === firstSegment || v.id.split('.')[0] === firstMajor,
  );

  if (isVersion) {
    return {
      versionSlug: firstSegment,
      docPath: segments.slice(1).join('/'),
    };
  }

  return { versionSlug: undefined, docPath: docsPath };
}

/**
 * Forward query params (renderer, language, codeOnly, version) to the internal route.
 */
function buildMdRewriteUrl(
  request: NextRequest,
  docPath: string,
  versionSlug: string | undefined,
): URL {
  const versionPrefix = versionSlug ? `${versionSlug}/` : '';
  const url = new URL(`/md-api/${versionPrefix}${docPath}`, request.url);

  // Copy user-provided query params (these are from the original request URL,
  // so Next.js does forward them correctly)
  const renderer = request.nextUrl.searchParams.get('renderer');
  const language = request.nextUrl.searchParams.get('language');
  const codeOnly = request.nextUrl.searchParams.get('codeOnly');

  if (renderer) url.searchParams.set('renderer', renderer);
  if (language) url.searchParams.set('language', language);
  if (codeOnly) url.searchParams.set('codeOnly', codeOnly);

  return url;
}

// eslint-disable-next-line @typescript-eslint/require-await -- Following Next.js middleware convention, even though we don't have async work here
export async function middleware(request: NextRequest) {
  const pathname: string = request.nextUrl.pathname;

  // .md suffix: serve markdown for any /docs/*.md URL (like Stripe's docs.stripe.com/testing.md)
  // Supports versioned URLs: /docs/9/writing-stories.md, /docs/8/get-started.md
  // Also supports /docs.md for the root docs page
  if (pathname.startsWith('/docs') && pathname.endsWith('.md')) {
    const rawPath = pathname.replace(/^\/docs\/?/, '').replace(/\.md$/, '');
    const { versionSlug, docPath } = extractVersionAndPath(rawPath);

    const url = buildMdRewriteUrl(request, docPath, versionSlug ?? latestVersion.id);
    return NextResponse.rewrite(url);
  }

  // Content negotiation: serve markdown for docs pages when requested by LLMs
  // LLM tools like Claude Code send Accept: text/markdown headers
  const acceptHeader = request.headers.get('accept') ?? '';
  const prefersMarkdown =
    acceptHeader.includes('text/markdown') &&
    !acceptHeader.includes('text/html');

  if (prefersMarkdown && pathname.startsWith('/docs') && !pathname.endsWith('.md')) {
    const rawPath = pathname.replace(/^\/docs\/?/, '');
    const { versionSlug, docPath } = extractVersionAndPath(rawPath);

    const url = buildMdRewriteUrl(request, docPath, versionSlug ?? latestVersion.id);
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - images (images public folder)
     * - docs-assets (docs assets folder)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - icon.svg (favicon file)
     * - favicon.ico (favicon file)
     * - bubbles.png (docs background file)
     */
    '/((?!api|images|docs-assets|_next/static|_next/image|icon.svg|favicon.ico|bubbles.png|llms.txt|llms-full.txt).*)',
  ],
};
