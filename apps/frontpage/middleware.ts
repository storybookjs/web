import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookieRenderId } from './constants';
import { docsVersionsRedirects } from './redirects/docs-versions-redirects';
import { RedirectData } from './redirects/types';

export async function middleware(request: NextRequest) {
  let searchParam = request.nextUrl.searchParams.get('renderer');
  const pathname: string = request.nextUrl.pathname;
  const redirectList: RedirectData[] = [...docsVersionsRedirects];
  const redirectData = redirectList.find((r) => r.source === pathname);

  if (
    redirectData &&
    typeof redirectData.destination === 'string' &&
    typeof redirectData.permanent === 'boolean'
  ) {
    console.log(' Redirect to →', redirectData.destination);
    const statusCode = redirectData.permanent ? 308 : 307;
    return NextResponse.redirect(
      new URL(redirectData.destination, request.url),
      statusCode,
    );
  }

  // If the renderer query param is set, set the cookie
  const response = NextResponse.next();
  if (searchParam) {
    response.cookies.set(cookieRenderId, searchParam);
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
