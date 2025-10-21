import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Allow all API routes, static files, and login pages
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon') ||
    pathname === '/simple-login' ||
    pathname === '/ultra-login' ||
    pathname === '/login' ||
    pathname === '/login-test' ||
    pathname === '/cookie-test'
  ) {
    return NextResponse.next()
  }
  
  // Check for login cookie
  const isLoggedIn = request.cookies.get('logged_in')?.value === 'true'
  
  // If not logged in and trying to access protected route, redirect to login
  if (!isLoggedIn && pathname !== '/simple-login') {
    return NextResponse.redirect(new URL('/simple-login', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
