"use client";

import { useState } from "react";
import { id, i, init, InstaQLEntity } from "@instantdb/react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { useAuth } from "../../context/AuthContext";
import Image from "next/image";
import logo from "../assets/logo.png"

// ID for app: ChatApplication
const APP_ID = "0c0593fa-1d63-4df3-b7b0-5049b2a027dc";

// Optional: Declare your schema!
const schema = i.schema({
  entities: {
    users: i.entity({
      username: i.string(),
      email: i.string(),
      password: i.string(), 
      icon:i.string()
    }),
  },
});

type User = InstaQLEntity<typeof schema, "users">;

const db = init({ appId: APP_ID, schema });

export default function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Get the router for navigation
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    createUser();
    setError("");

    function createUser() {
      db.transact(
        db.tx.users[id()].update({
          username,
          email,
          password,
          icon: `https://api.dicebear.com/5.x/initials/svg?seed=${username}`
        })
      );
    }

    // Redirect to the main app page
    login({username});
    router.push("/"); // Change this to "/"
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen ">

      <div className="flex">
        <Image src={logo} alt="logo" className="h-11 w-11"/>
      <h2 className="text-2xl font-bold mb-4">Fotoowl Messenger</h2>
      </div>
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="border border-gray-300 p-2 mb-4 w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-300 p-2 mb-4 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border border-gray-300 p-2 mb-4 w-full"
        />
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}
