import { NextResponse } from 'next/server'
import { auth } from '@/utils/auth'
import { UserRole } from '@prisma/client'
export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ user: null })
    }

    return NextResponse.json({
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        role: session.user.role || 'USER' as UserRole,
        onboardingComplete: session.user.onboardingComplete || false
      }
    })
  } catch (error) {
    console.error('Session API Error:', error)
    return NextResponse.json({ user: null })
  }
} 