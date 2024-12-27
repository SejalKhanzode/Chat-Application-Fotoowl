"use client";
import db from "../instantDB"

import React, { createContext, useContext, useState, useEffect } from "react";
type Message = {
    id: string;
    text: string;
    timestamp: number;
    userId: string;
  };
  const MessageContext = createContext<MessageContextType | undefined>(undefined);

  interface MessageContextType {
    messages: Message[];
    sendMessage: (text: string, userId: string) => void;
  }
  export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [messages, setMessages] = useState<Message[]>([]);
  
    const sendMessage = (text: string, userId: string) => {
      const newMessage: Message = {
        id: Date.now().toString(), 
        text,
        timestamp: Date.now(),
        userId,
      };

    //   db.saveMessage(newMessage); 
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };
  
    return (
      <MessageContext.Provider value={{ messages, sendMessage }}>
        {children}
      </MessageContext.Provider>
    );
  };
  
  export const useMessages = () => useContext(MessageContext);