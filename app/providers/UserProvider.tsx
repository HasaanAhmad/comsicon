"use client"
import { useEffect } from 'react'
import { useUser } from '@/app/store/useUser'

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { fetchUser } = useUser()

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return <>{children}</>
}