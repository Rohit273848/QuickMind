import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import { useDispatch } from "react-redux";
import { setCurrentChatId } from "../chat.slice";

export default function Sidebar({ isOpen, setIsOpen }) {

  const [search, setSearch] = useState("");

  const dispatch = useDispatch()
  const { handleGetChats, handleGetMessages, handleDeleteChat } = useChat();
  const chats = useSelector((state) => state.chat.chats);

  // 🔥 NEW: prepare filtered chats
  const filteredChats = Object.values(chats)
  .filter((chat) => {
    const searchText = search.trim().toLowerCase();

    // 🔹 match title
    const titleMatch = chat.title
      ?.toLowerCase()
      .includes(searchText);

    // 🔹 match messages
    const messageMatch = chat.messages?.some((msg) =>
      msg.content?.toLowerCase().includes(searchText)
    );

    return titleMatch || messageMatch;
  })
  .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));


  const searchText = search.trim().toLowerCase();

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
        className={`fixed md:relative z-50 h-full w-64 sm:w-72 bg-[#574964]/30 backdrop-blur-xl border-r border-[#C8AAAA]/20 p-3 sm:p-4 flex flex-col transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Close button (mobile) */}
        <div className="flex justify-between items-center md:hidden mb-4">
          <h2 className="font-semibold text-base sm:text-lg text-[#FFDAB3]">Menu</h2>

          <button onClick={() => setIsOpen(false)} className="p-1 hover:opacity-80 transition-opacity">
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
          onClick={() => dispatch(setCurrentChatId(null))}
          className="flex cursor-pointer items-center justify-center sm:justify-start gap-2 bg-[#574964] hover:bg-[#6b5a78] transition-all duration-200 p-2 sm:p-3 rounded-lg mb-4 text-[#FFDAB3] text-sm sm:text-base shadow-md hover:scale-[1.02] active:scale-95">

          {/* Plus Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>

          <span className="hidden sm:inline">New Chat</span>
        </button>

        {/* Search */}
        <div className="flex items-center bg-[#9F8383]/20 rounded-lg px-2 sm:px-3 py-2 mb-4 border border-[#C8AAAA]/20 focus-within:border-[#FFDAB3]/40 transition">

          {/* Search Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-[#C8AAAA] shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>

          <input
            value={search}
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="bg-transparent p-2 outline-none w-full text-xs sm:text-sm text-[#FFDAB3] placeholder:text-[#C8AAAA]"
          />
        </div>

        {/* Chat List */}
        <div className="flex-1 hide-scrollbar overflow-y-auto custom-scroll min-w-0">
          <p className="text-xs text-[#C8AAAA] mb-3 px-1">Today</p>

          {filteredChats.length === 0 ? (
            <p className="text-sm text-gray-400 text-center mt-4">
              No chats found
            </p>
          ) : (
            filteredChats.map((chat) => (
              <div
                key={chat._id}
                className="flex items-center gap-2 p-2 sm:p-3 rounded-lg hover:bg-[#9F8383]/20 transition mb-1 group active:scale-95 min-w-0"
              >
                <div
                  onClick={() => handleGetMessages(chat._id)}
                  className="flex-1 min-w-0 cursor-pointer text-[#FFDAB3] hover:translate-x-1 transition text-sm sm:text-base truncate"
                >
                  {chat.title}
                </div>
                <button
                  onClick={() => handleDeleteChat(chat._id)}
                  className="shrink-0 p-1.5 text-[#C8AAAA] hover:text-red-400 hover:bg-red-400/10 rounded transition-colors opacity-0 group-hover:opacity-100 active:scale-95"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
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
                </button>
              </div>
            )))}
        </div>

        {/* Delete All */}

      </div>
    </>
  );
}