// whatsapp/app/components/Window/MessageList.tsx
import React from "react";
import { useMessages } from "../../../context/MessageContext"; // Adjust the path

type Message = {
    id?: string;
    text: string;
    timestamp: number;
    userId: string;
  };

type MessageListProps = {
  messages: Message[];
  selectedContactId: string;
};

const MessageList: React.FC<MessageListProps> = ({ messages = [] ,selectedContactId }) => {
//   const { messages } = useMessages();

  console.log("messages>>", messages);
  
  // Filter messages sent to the selected contact
  const filteredMessages = messages.filter((message) => message.userId === selectedContactId);

  return (
    <div className="mt-4 overflow-y-auto max-h-60">
      {filteredMessages.map((message) => (
        <div
          key={message.id}
          style={{
            backgroundColor: "#e1ffc7",
            padding: "10px",
            borderRadius: "8px",
            margin: "5px 0",
            alignSelf: "flex-end",
          }}
        >
          <p style={{ margin: 0 }}>{message.text}</p>
          <span style={{ fontSize: "0.8em", color: "#555" }}>
            {new Date(message.timestamp).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

export default MessageList;