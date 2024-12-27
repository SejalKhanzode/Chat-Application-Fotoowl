//*********************Instantdb**************************
import { id, i, init, InstaQLEntity } from "@instantdb/react";

// import { createContext, useReducer } from "react";
const APP_ID = "0c0593fa-1d63-4df3-b7b0-5049b2a027dc";

const schema = i.schema({
  entities: {
    users: i.entity({
      username:i.string(),
      email:i.string(),
      password:i.string(),
      icon:i.string(),
    }),
    messages: i.entity({
      text: i.string(),
      timestamp: i.number(),
      userId: i.string(),
    }),
  },
});

const db = init({ appId: APP_ID, schema });

type Users = InstaQLEntity<typeof schema, "users">;
type Messages = InstaQLEntity<typeof schema, "messages">;

export function fetchAllUsers(users: Users[]) {
  db.transact(users.map((user) => db.tx.users[user.id]));
}


export function saveMessage(text: string) {
  db.transact(db.tx.messages[id()].update({}));
}

export async function fetchMessagesByUser(userId: string): Promise<Messages[]> {
  try {
    // Fetch all messages from the messages table
    const allMessages = await db.tx.messages.toArray;
    console.log("allMessages>>", allMessages)
    if (!Array.isArray(allMessages)) {
      console.error("Expected an array but got:", allMessages);
      return []; // Return an empty array if not an array
    }

    // Filter messages by userId
    const filteredMessages = allMessages.filter(
      (message) => message.userId === userId
    );

    return filteredMessages; // Return the filtered messages
  } catch (error) {
    console.error("Error fetching messages:", error);
    return []; // Return an empty array in case of error
  }
}



export async function addMessage(message: {
  text: string;
  timestamp: number;
  userId: string;
}) {
  try {
    await db.transact(
      db.tx.messages[id()].update({
        text: message.text,
        timestamp: message.timestamp,
        userId: message.userId,
      })
    );
  } catch (error) {
    console.error("Error adding message:", error);
  }
}

export default db;
export type { Users, Messages };
