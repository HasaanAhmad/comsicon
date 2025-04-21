import React from 'react'
import Chat from './_components/chat'
const page = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-3xl font-bold">Chat</h1>
      <p className="text-muted-foreground">Manage your tasks and events.</p>
      <div className="flex flex-col gap-4 w-full">
        <Chat />
      </div>
    </div>
)
}

export default page