import React from 'react'
import Calendar from './_components/Calendar'

type Props = {}

const page = (props: Props) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-3xl font-bold">Calendar</h1>
      <p className="text-muted-foreground">Manage your tasks and events.</p>
      <div className="flex flex-col gap-4 w-full">
        <Calendar />
      </div>
    </div>
)
}

export default page