import React from 'react'
import { auth } from '@/utils/auth'
import { redirect } from 'next/navigation'
import { getOnboarding } from '../../(dashboard)/dashboard/_actions/get_onboarding'

const layout = async ({children}: {children: React.ReactNode}) => {
  const session = await auth()
  if (!session?.user) {
    redirect('/authentication')
  }
  const onboarding = await getOnboarding()
  if (onboarding) {
    redirect('/dashboard')
  }
  console.log(onboarding);
  return (
    <div>{children} </div>
  )
}

export default layout