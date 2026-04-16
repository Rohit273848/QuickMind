import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

const Desktop = () => {
  const chat = useChat();
  const { user } = useSelector((state) => state.auth);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    chat.initializeSocketConnection();
  }, []);

  return (
    <div className="flex h-screen bg-[#151026] text-[#FFDAB3] overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col border-l border-[#C8AAAA]/20">
        
        {/* Top Header */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-[#C8AAAA]/20 bg-[#574964]/20 backdrop-blur-md">
          
          {/* Hamburger (Mobile Only) */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden text-[#FFDAB3]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
</svg>
          </button>

          <h1 className="text-sm md:text-base font-semibold">
            QuickMind
          </h1>

          {/* User    */}
          <div className="text-xs md:text-sm text-[#C8AAAA]">
            {user?.name || "Guest"}
          </div>
        </div>

        {/* Chat Window */}
        <ChatWindow />
      </div>
    </div>
  );
};

export default Desktop;