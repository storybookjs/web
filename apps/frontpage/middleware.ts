import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { docsVersions, latestVersion } from '@repo/utils';
import { docsVersionsRedirects } from './redirects/docs-versions-redirects';
import { type RedirectData } from './redirects/types';
import { docsRenderersRedirects } from './redirects/docs-renderers-redirects';
import { docsCommonRedirects } from './redirects/docs-common-redirects';

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

  // Redirect /docs/{latestVersionId}/... to /docs/... (latest version doesn't need a prefix)
  // This handles cases like /docs/10.3/writing-stories → /docs/writing-stories
  if (pathname.startsWith('/docs/') && !pathname.endsWith('.md')) {
    const rawPath = pathname.replace(/^\/docs\//, '');
    const segments = rawPath.split('/').filter(Boolean);
    if (segments.length >= 2) {
      const firstSegment = segments[0];
      const firstMajor = firstSegment.split('.')[0];
      const matchedVersion = docsVersions.find(
        (v) => v.id === firstSegment || v.id.split('.')[0] === firstMajor,
      );
      // Only redirect if it matches the latest version (non-latest versions are handled by existing routing)
      if (matchedVersion && matchedVersion.id === latestVersion.id && !matchedVersion.inSlug) {
        const restPath = segments.slice(1).join('/');
        return NextResponse.redirect(
          new URL(`/docs/${restPath}`, request.url),
          308,
        );
      }
    }
  }

  // .md suffix: serve markdown for any /docs/*.md URL (like Stripe's docs.stripe.com/testing.md)
  // Supports versioned URLs: /docs/9/writing-stories.md, /docs/8/get-started.md
  if (pathname.startsWith('/docs/') && pathname.endsWith('.md')) {
    const rawPath = pathname.replace(/^\/docs\//, '').replace(/\.md$/, '');
    const { versionSlug, docPath } = extractVersionAndPath(rawPath);

    if (docPath) {
      const url = buildMdRewriteUrl(request, docPath, versionSlug);
      return NextResponse.rewrite(url);
    }
  }

  // Content negotiation: serve markdown for docs pages when requested by LLMs
  // LLM tools like Claude Code send Accept: text/markdown headers
  const acceptHeader = request.headers.get('accept') ?? '';
  const prefersMarkdown =
    acceptHeader.includes('text/markdown') &&
    !acceptHeader.includes('text/html');

  if (prefersMarkdown && pathname.startsWith('/docs') && !pathname.endsWith('.md')) {
    const rawPath = pathname.replace(/^\/docs\/?/, '');
    if (rawPath) {
      const { versionSlug, docPath } = extractVersionAndPath(rawPath);
      if (docPath) {
        const url = buildMdRewriteUrl(request, docPath, versionSlug);
        return NextResponse.rewrite(url);
      }
    }
  }

  // Merge all redirects into a single list
  // The order of the list is important
  // The first matching redirect will be used
  const redirectList: RedirectData[] = [
    ...docsVersionsRedirects,
    ...docsRenderersRedirects,
    ...docsCommonRedirects,
  ];

  for (const redirectData of redirectList) {
    let sourcePattern = redirectData.source;
    let destinationURL = redirectData.destination;

    // Check if the source pattern includes ":path" or ":path*"
    if (sourcePattern.includes(':path')) {
      // Check if the source pattern includes a wildcard
      const wildcard = sourcePattern.endsWith('*');

      // Replace ":path*" and ":path" with the appropriate regex
      sourcePattern = sourcePattern
        .replace(':path*', '(.*)')
        .replace(':path', '([^/]+)');

      // Create a regex pattern to match the source pattern
      const regex = new RegExp(`^${sourcePattern}$`);

      // Check if the current path matches the source pattern
      const match = pathname.match(regex);

      if (match) {
        // If wildcard is true, replace ":path" in the destination with all matched segments
        // Otherwise, replace with the first matched segment
        if (wildcard) {
          // Assuming the entire path after ":path*" is captured in match[1]
          destinationURL = destinationURL.replace(':path', match[1]);
        } else {
          // Replace ":path" with the first matched segment
          destinationURL = destinationURL.replace(':path', match[1]);
        }

        const statusCode = redirectData.permanent ? 308 : 307;
        return NextResponse.redirect(
          new URL(destinationURL, request.url),
          statusCode,
        );
      }
    } else if (pathname === redirectData.source) {
      // Handle exact matches
      const statusCode = redirectData.permanent ? 308 : 307;
      return NextResponse.redirect(
        new URL(destinationURL, request.url),
        statusCode,
      );
    }
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
