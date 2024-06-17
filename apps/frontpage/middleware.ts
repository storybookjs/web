import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { COOKIERENDERID } from './constants';

export function middleware(request: NextRequest) {
  let searchParam = request.nextUrl.searchParams.get('renderer');

  const response = NextResponse.next();

  // If the renderer query param is set, set the cookie
  if (searchParam) {
    response.cookies.set(COOKIERENDERID, searchParam);
  }

  return response;
}
