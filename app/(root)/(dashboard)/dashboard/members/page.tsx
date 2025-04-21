import React from 'react'
import MembersPage from './_components/Members'
const page = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-3xl font-bold">Members</h1>
      <p className="text-muted-foreground">Manage your tasks and events.</p>
      <div className="flex flex-col gap-4 w-full">
        <MembersPage />
      </div>
    </div>
)
}

export default page