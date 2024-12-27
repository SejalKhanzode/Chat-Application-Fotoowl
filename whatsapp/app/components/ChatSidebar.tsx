"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from "../../context/AuthContext"; 
import { MdGroups } from "react-icons/md";
import { TbCircleDashed } from "react-icons/tb";
import { IoCallOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { MdFilterList } from "react-icons/md";
import { FaUser } from "react-icons/fa";


const ChatSidebar = ({users, setSelectedContact }) => {
  const { username, icon, logout } = useAuth();
  const [showTooltip, setShowTooltip] = useState(false); // State to manage tooltip visibility
  const [showLogout, setShowLogout] = useState(false); // State to manage logout visibility

  return (
    <div>
      {/* Sidebar Header */}
      <div className="flex gap-10 justify-evenly items-center px-2 py-4 h-16 border-r border-r-solid border-r-gray-200 border-b border-b-solid border-b-gray-200 bg-white z-10">
      <div 
          className="relative" 
          onMouseEnter={() => {
            setShowTooltip(true);
            setShowLogout(true); // Show logout option on hover
          }} 
          onMouseLeave={() => {
            setShowTooltip(false);
            setShowLogout(false); // Hide logout option when not hovering
          }}
        >
       
          <FaUser/>
            <div className="rounded-full cursor-pointer hover:opacity-90 absolute  transform -translate-x-1/2 ml-2 w-32 text-center text-sm rounded py-1">
              {username}
            </div>

          {showLogout && (
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-10 w-32 bg-red-500 text-white text-center text-sm rounded py-1 cursor-pointer" onClick={logout}>
              Logout
            </div>
          )}
        </div>

        <MdGroups />
        <TbCircleDashed />
        <IoCallOutline />
      </div>

      {/* Searchbar */}
      <div className="flex sticky top-0 bg-white justify-between items-center px-4 h-20 w-full border-b overflow-hidden border-gray-400 gap-2">
        <div className="flex items-start bg-gray-200 px-4 py-2 border-r-16 gap-4 rounded-lg w-full">
          <CiSearch className="text-gray-600" />
          <input
            className="border-none outline-0 bg-gray-200 w-full"
            placeholder="Search in chats"
            type="text"
          />
        </div>
        <MdFilterList />
      </div>

     {/* Contact List */}
     {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center p-2 hover:bg-gray-100 rounded-md transition duration-200 cursor-pointer"
          onClick={() => setSelectedContact(user)}
        >
          <img 
            src={user.icon}
            alt={`${user.name}'s icon`} 
            className="rounded-full w-8 h-8 mr-3"
          />
          <span className="text-gray-800 font-medium">{user.username}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatSidebar;