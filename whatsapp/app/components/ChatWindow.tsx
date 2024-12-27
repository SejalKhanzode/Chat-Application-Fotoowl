"use client";
import React, { useState } from "react";
import { CiVideoOn } from "react-icons/ci";
import { IoMdMore } from "react-icons/io";
import { IoCallOutline } from "react-icons/io5";
import MessageList from "./Window/MessageList";
import { useMessages } from "../../context/MessageContext";
import { VscSend } from "react-icons/vsc";
import { BsEmojiSmile } from "react-icons/bs";
import { FiPaperclip } from "react-icons/fi";
import db from "../../instantDB";

type Message = {
    id?: string;
    text: string;
    timestamp: number;
    userId: string;
  };


const ChatWindow = ({selectedContact }) => {
  const { sendMessage } = useMessages();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  
 
  
  const handleSendMessage = async (e) => {
    e.preventDefault();
    const newMessage = {
      text: message,
      timestamp: Date.now(),
      userId: selectedContact.id, // Ensure this is the correct user ID
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    console.log(`Message to ${selectedContact.username}: ${message}`);
    setMessage(""); // Clear the input
  };


  return (
    <div className="relative w-full flex flex-col h-screen bg-white border-l border-gray-300">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-300">
        <div className="flex items-center">
          <img
            src={selectedContact.icon} // Assuming contact has an icon property
            alt={`${selectedContact.username}'s icon`}
            className="w-10 h-10 rounded-full mr-2"
          />
          <h2 className="text-lg font-semibold">{selectedContact.username}</h2>
        </div>
        <div className="flex space-x-2">
          <button className="text-gray-600 hover:text-gray-800">
            <CiVideoOn /> {/* Video Call Icon */}
          </button>
          <button className="text-gray-600 hover:text-gray-800">
            <IoCallOutline /> {/* Phone Call Icon */}
          </button>
          <button className="text-gray-600 hover:text-gray-800">
            <IoMdMore /> {/* More Options Icon */}
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <MessageList selectedContactId={selectedContact.id} />

      {/* Text Input Area */}
      <div className="absolute inset-x-0 bottom-0 p-4 border-t border-gray-300 ">
        <form className="flex items-center" onSubmit={handleSendMessage}>
          <button
            type="button"
            className="text-gray-600 hover:text-gray-800 mr-2"
          >
            <BsEmojiSmile size={20} />
          </button>
          <button
            type="button"
            className="text-gray-600 hover:text-gray-800 mr-2"
          >
            <FiPaperclip size={20} />
          </button>
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-2 outline-none border-none focus:ring-0"
          />
          <button
            type="submit"
            className="ml-2rounded-lg px-4 py-2 flex items-center"
          >
            <VscSend size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
