import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Don't redirect, just pass through
  return NextResponse.next();
}

export const config = {
  // Match all pathnames except for
  // - API routes
  // - _next (Next.js internals)
  // - _static (inside /public)
  // - all root files inside /public (e.g. /favicon.ico)
  matcher: ['/((?!api|_next|_static|.*\\..*).*)']
};