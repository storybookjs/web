import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookieRenderId } from './constants';
import { docsVersionsRedirects } from './redirects/docs-versions-redirects';
import { RedirectData } from './redirects/types';
import { docsRenderersRedirects } from './redirects/docs-renderers-redirects';
import { docsCommonRedirects } from './redirects/docs-common-redirects';
import { renderers } from '@repo/utils';

export async function middleware(request: NextRequest) {
  let searchParam = request.nextUrl.searchParams.get('renderer');
  const pathname: string = request.nextUrl.pathname;

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

  // If the renderer query param is set, set the cookie
  const response = NextResponse.next();

  if (searchParam) {
    const findRenderer = renderers.find(
      (renderer) => renderer.id === searchParam,
    );

    if (findRenderer) {
      response.cookies.set(cookieRenderId, searchParam);
    }
  }

  return response;
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
    '/((?!api|images|docs-assets|_next/static|_next/image|icon.svg|favicon.ico|bubbles.png).*)',
  ],
};
