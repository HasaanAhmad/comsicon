'use client'

import { useUser } from '@/app/store/useUser'
import { useEffect } from 'react'
import { getCurrentUser } from '@/app/actions/user'

export const UserProfile = () => {
  const { user, setUser, isLoading, setIsLoading } = useUser()

  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true)
      const userData = await getCurrentUser()
      setUser(userData)
      setIsLoading(false)
    }

    loadUser()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <p>Welcome, {user?.name}</p>
      <p>{user?.email}</p>
    </div>
  )
} 