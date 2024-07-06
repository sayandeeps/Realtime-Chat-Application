// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userCookie = request.cookies.get('user');
  const isAuthenticated = userCookie !== undefined;

  const url = request.nextUrl.clone();
  
  if (!isAuthenticated && url.pathname !== '/login') {
    // If the user is not authenticated, redirect to the login page
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (isAuthenticated && url.pathname === '/login') {
    // If the user is authenticated and trying to access the login page, redirect to the home page or dashboard
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // Continue to the requested page
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'], // Paths to match (exclude API routes and static files)
};
