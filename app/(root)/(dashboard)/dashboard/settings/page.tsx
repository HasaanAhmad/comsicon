import React from 'react'
import SettingsPage from './_components/Settings'

const page = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="text-muted-foreground">Manage your tasks and events.</p>
      <div className="flex flex-col gap-4 w-full">
        <SettingsPage />
      </div>
    </div>
)
}

export default page