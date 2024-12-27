"use client"
// whatsapp/context/MessageContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { saveMessage, getMessages } from "../IndexedDB"; // Import the db utility

type Message = {
  id: string;
  text: string;
  timestamp: number;
  userId: string;
};

interface MessageContextType {
  messages: Message[];
  sendMessage: (text: string, userId: string) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = async (text: string, userId: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      timestamp: Date.now(),
      userId,
    };

    // Save to IndexedDB
    await saveMessage(newMessage);

    // Update local state
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const loadMessages = async () => {
    const storedMessages = await getMessages();
    setMessages(storedMessages);
  };

  useEffect(() => {
    loadMessages(); // Load messages on component mount
  }, []);

  return (
    <MessageContext.Provider value={{ messages, sendMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessages must be used within a MessageProvider");
  }
  return context;
};