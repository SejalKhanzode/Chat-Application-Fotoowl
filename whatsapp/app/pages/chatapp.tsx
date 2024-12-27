"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import BackgroundImage from "../assets/whatsapp-bg.png"
import ChatSidebar from '../components/ChatSidebar'
import ChatWindow from "../components/ChatWindow"
import db from "../../instantDB";

const chatapp = () => {
 const [selectedContact, setSelectedContact] = useState()
 const { isLoading, error, data } = db.useQuery({ users: {} });
  if (isLoading) {
    return;
  }
  if (error) {
    return <div>Error querying data: {error.message}</div>;
  }
  const { users } = data;
  // const fetchedUsers = fetchAllUsers();
  return (
    <main className="flex h-screen overflow-hidden">
    <div className="bg-white-500 w-1/3 overflow-y-auto">
      <ChatSidebar users={users} setSelectedContact={setSelectedContact}/>
    </div>
    <div className="w-full overflow-y-auto flex  justify-center bg-blue-50">
      
    {selectedContact ? (
        <ChatWindow selectedContact={selectedContact} /> 
      ) : (
        <Image
          src={BackgroundImage}
          alt="Next.js Logo"
          width={2500}
          height={2500}
        />
      )}
      
    </div>
  </main>
  )
}

export default chatapp
