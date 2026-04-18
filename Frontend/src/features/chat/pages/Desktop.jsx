import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../auth/auth.slice";
import { logout } from "../../auth/services/auth.api";
import { useNavigate } from "react-router-dom";


const Desktop = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const chat = useChat();
  const { user } = useSelector((state) => state.auth);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    chat.initializeSocketConnection();
  }, []);

  const handleLogout = async () => {
    try {
      await logout(); // backend call
  
      dispatch(logoutUser()); // clear redux
  
      navigate("/"); // go to welcome page
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen bg-[#151026] text-[#FFDAB3] overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col border-l border-[#C8AAAA]/20">
        
        {/* Top Header */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-[#C8AAAA]/20 bg-[#574964]/20 backdrop-blur-md bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
          
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
          <div className="flex gap-3 items-center">
  <button
    onClick={() => navigate("/chat")}
    className="text-sm hover:text-gray-300"
  >
  </button>

  <button
    onClick={handleLogout}
    className="px-3 py-1.5 text-sm bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/20 transition"
  >
    Logout
  </button>
</div>
          </div>
        </div>

        {/* Chat Window */}
        <ChatWindow />
      </div>
    </div>
  );
};

export default Desktop;