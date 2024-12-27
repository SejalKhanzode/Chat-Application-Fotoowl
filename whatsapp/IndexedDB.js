   // whatsapp/utils/db.js
   import { openDB } from 'idb';

   const DB_NAME = 'UserDB';
   const STORE_NAME = 'users';

   export const initDB = async () => {
     const db = await openDB(DB_NAME, 1, {
       upgrade(db) {
         db.createObjectStore(STORE_NAME);
       },
     });
     return db;
   };

   export const setUser = async (user) => {
     const db = await initDB();
     await db.put(STORE_NAME, user, 'currentUser');
   };

   export const getUser = async () => {
     const db = await initDB();
     return await db.get(STORE_NAME, 'currentUser');
   };

   export const clearUser = async () => {
     const db = await initDB();
     await db.delete(STORE_NAME, 'currentUser');
   };

   export const getAllUsers = async () => {
    const db = await initDB();
    return await db.getAll(STORE_NAME); 
  };

  export const saveMessage = async (message) => {
    const db = await initDB();
    await db.put(STORE_NAME, message);
  };
  
  export const getMessages = async () => {
    const db = await initDB();
    return await db.getAll(STORE_NAME);
  };