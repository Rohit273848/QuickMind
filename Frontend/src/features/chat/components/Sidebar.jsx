import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import { useDispatch } from "react-redux";
import { setCurrentChatId } from "../chat.slice";

export default function Sidebar({ isOpen, setIsOpen }) {


  const dispatch = useDispatch()
  const { handleGetChats, handleGetMessages } = useChat();
  const chats = useSelector((state) => state.chat.chats);

  // console.log("Sidebar chats:", chats);
  useEffect(() => {
    handleGetChats(); // 🔥 load chats on mount
  }, []);

  return (
    <>
      {/* Overlay (Mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative z-50 h-full w-78 bg-[#574964]/30 backdrop-blur-xl border-r border-[#C8AAAA]/20 p-4 flex flex-col transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Close button (mobile) */}
        <div className="flex justify-between items-center md:hidden mb-4">
          <h2 className="font-semibold text-lg text-[#FFDAB3]">Menu</h2>

          <button onClick={() => setIsOpen(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-[#FFDAB3]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* New Chat */}
        <button 
        onClick={() => dispatch(setCurrentChatId(null)) }
         className="flex cursor-pointer items-center gap-2 bg-[#574964] hover:bg-[#6b5a78] transition-all duration-200 p-2 rounded-lg mb-4 text-[#FFDAB3] shadow-md hover:scale-[1.02]">

          {/* Plus Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>

          New Chat
        </button>

        {/* Search */}
        <div className="flex items-center bg-[#9F8383]/20 rounded-lg px-2 mb-4 border border-[#C8AAAA]/20 focus-within:border-[#FFDAB3]/40 transition">

          {/* Search Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-[#C8AAAA]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>

          <input
            type="text"
            placeholder="Search chats..."
            className="bg-transparent p-2 outline-none w-full text-sm text-[#FFDAB3] placeholder:text-[#C8AAAA]"
          />
        </div>

        {/* Chat List */}
        <div className="flex-1  hide-scrollbar overflow-y-auto custom-scroll">
          <p className="text-xs text-[#C8AAAA] mb-2">Today</p>

          {Object.values(chats)
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .map((chat) => (
              <div
                key={chat._id}
                onClick={() => handleGetMessages(chat._id)} // 🔥 CLICK
                className="p-2 rounded-lg hover:bg-[#9F8383]/20 cursor-pointer transition text-[#FFDAB3] hover:translate-x-1"
              >
                {chat.title}
              </div>
            ))}
        </div>

        {/* Delete */}
        <button className="flex items-center gap-2 bg-[#9F8383]/10 hover:bg-[#9F8383]/20 transition-all duration-200 p-2 rounded-lg mt-4 text-[#FFDAB3] hover:scale-[1.02] border border-[#C8AAAA]/20">

          {/* Trash Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 7h12M9 7V4h6v3M8 7v12m4-12v12m4-12v12M5 7h14l-1 14H6L5 7z"
            />
          </svg>

          Clear History
        </button>
      </div>
    </>
  );
}