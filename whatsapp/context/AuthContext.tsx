"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { setUser, getUser, clearUser } from "../IndexedDB";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [icon, setIcon] = useState()
  const [loading, setLoading] = useState(true); 
  const [selectedContact, setSelectedContact] = useState()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loadUser = async () => {
        const user = await getUser();
        if (user) {
          setIsAuthenticated(true);
          setUsername(user.username);
          setIcon(user.icon)
        }
        setLoading(false); 
      };
      loadUser();
    }
  }, []);

  
  const login = async (user) => {
    setIsAuthenticated(true);
    setUsername(user.username);
    setIcon(user.icon)
    console.log("seticon>context>", user.icon);
    await setUser(user);
  };

  const logout = async () => {
    setIsAuthenticated(false);
    setUsername("");
    await clearUser();
  };

  if (loading) {
    return <div>Loading...</div>; // You can customize this loading state
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated,icon, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
