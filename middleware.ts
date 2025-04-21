import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // Public paths that don't require authentication
  const publicPaths = ['/authentication', '/']
  const isPublicPath = publicPaths.some(path => request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith(path))

  // Check auth status from session token
  const token = request.cookies.get('next-auth.session-token')?.value

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/authentication', request.url))
  }

  // Protected routes logic
  if (token && !isPublicPath) {
    // Allow access to onboarding and dashboard
    if (request.nextUrl.pathname.startsWith('/onboarding') || 
        request.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.next()
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
} 