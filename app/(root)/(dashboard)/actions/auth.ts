'use server'

import { handleSignOut } from '@/app/actions/user'

export async function signOut() {
  await handleSignOut()
} 