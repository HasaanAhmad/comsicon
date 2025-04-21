import React from 'react'
import Chat from './_components/chat'
import MainLayout from '../../layout/MainLayout'
const page = () => {
  return (
    <div>
      <MainLayout>
        <Chat/>
      </MainLayout>
    </div>
)
}

export default page