'use server'

import { auth } from "@/utils/auth"
import { signOut } from "@/utils/auth"
import { prisma } from "@/utils/prisma"

export async function getCurrentUser() {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return null
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        onboardingComplete: true,
      }
    })

    return user
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export async function handleSignOut() {
  try {
    await signOut()
    return { success: true }
  } catch (error) {
    console.error('Error signing out:', error)
    return { success: false }
  }
} 