import React from 'react'
import PerformancePage from './_components/Performance'

const page = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-3xl font-bold">Performance</h1>
      <p className="text-muted-foreground">Manage your tasks and events.</p>
      <div className="flex flex-col gap-4 w-full">
        <PerformancePage />
      </div>
    </div>
)
}

export default page