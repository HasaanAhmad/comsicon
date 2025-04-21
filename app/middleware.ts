import { auth } from "@/utils/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { prisma } from "@/utils/prisma"


export async function middleware(request: NextRequest) {
  const session = await auth()
  
  // Public paths that don't require authentication
  const publicPaths = ['/authentication']
  const isPublicPath = publicPaths.some(path => request.nextUrl.pathname.startsWith(path))

  if (!session && !isPublicPath) {
    return NextResponse.redirect(new URL('/authentication', request.url))
  }

  // If user is authenticated but hasn't completed onboarding
  if (session?.user && !isPublicPath) {
    const userHasOrg = await prisma.organizationMember.findFirst({
      where: {
        userId: session.user.id
      }
    })

    if (!userHasOrg && !request.nextUrl.pathname.startsWith('/onboarding')) {
      return NextResponse.redirect(new URL('/onboarding', request.url))
    }

    // If user has org but tries to access onboarding
    if (userHasOrg && request.nextUrl.pathname.startsWith('/onboarding')) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
} 