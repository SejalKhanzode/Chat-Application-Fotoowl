"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { useAuth } from "../context/AuthContext"; // Import the Auth context
import Login from "./login/page"; // Import the Login component
import ChatApp from "./pages/chatapp"; // Import the ChatApp component

export default function Home() {
  const { isAuthenticated, username } = useAuth(); // Get the authentication state
  const router = useRouter(); // Get the router for navigation

console.log("username>app>page", username);


  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push("/login");
    }
    console.log("!isAuthenticated", !isAuthenticated)
  }, [isAuthenticated, router]);


  return <div>{isAuthenticated ? <ChatApp/>  :<Login />}</div>;
}
