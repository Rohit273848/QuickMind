import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useChat } from "../hooks/useChat";
import { setCurrentChatId } from "../chat.slice";
import { Plus, Search, Trash2, MessageSquare, X } from "lucide-react";

export default function Sidebar({ isOpen, setIsOpen }) {
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const dispatch = useDispatch();
  const { handleGetChats, handleGetMessages, handleDeleteChat } = useChat();
  
  // Get state from Redux
  const chats = useSelector((state) => state.chat.chats);
  const loading = useSelector((state) => state.chat.loading);
  const currentChatId = useSelector((state) => state.chat.currentChatId);

  // Filter and sort chats
  const filteredChats = Object.values(chats)
    .filter((chat) => {
      const searchText = search.trim().toLowerCase();
      if (!searchText) return true;
      
      const titleMatch = chat.title?.toLowerCase().includes(searchText);
      const messageMatch = chat.messages?.some((msg) =>
        msg.content?.toLowerCase().includes(searchText)
      );
      return titleMatch || messageMatch;
    })
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  useEffect(() => {
    handleGetChats();
  }, []);

  const handleDelete = (id) => {
    handleDeleteChat(id);
    setDeletingId(null);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative z-50 h-full w-64 sm:w-72 md:translate-x-0 flex flex-col bg-slate-900/80 backdrop-blur-xl border-r border-slate-700/50 transition-all duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-700/30">
          <div className="flex items-center gap-2">
            {/* <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold shadow-lg">
              P
            </div> */}
            <h1 className="text-base sm:text-lg font-bold text-white hidden sm:block">
              QuickMind
            </h1>
          </div>

          {/* Close button (mobile) */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-1.5 hover:bg-slate-700/30 rounded-lg transition text-slate-300"
          >
            <X size={20} />
          </button>
        </div>

        {/* New Chat Button */}
        <button
          onClick={() => {
            dispatch(setCurrentChatId(null));
            setIsOpen(false);
          }}
          className="m-4 sm:m-5 flex items-center justify-center sm:justify-start gap-3 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-4 py-3 rounded-xl font-semibold text-sm sm:text-base shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95 duration-200"
        >
          <Plus size={20} className="shrink-0" />
          <span className="hidden sm:inline">New Chat</span>
        </button>

        {/* Search Box */}
        <div className="mx-4 sm:mx-5 mb-4">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800/40 border border-slate-700/50 focus-within:border-blue-500/50 transition-all duration-200">
            <Search size={18} className="text-slate-400 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search chats..."
              className="bg-transparent outline-none w-full text-sm text-white placeholder:text-slate-500 font-medium"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-slate-400 hover:text-slate-300 transition"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto px-2 sm:px-3 space-y-1">
          {loading && Object.keys(chats).length === 0 ? (
            // Loading Skeleton
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 rounded-lg bg-slate-800/40 border border-slate-700/30 animate-pulse"
                />
              ))}
            </div>
          ) : filteredChats.length === 0 ? (
            // Empty State
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <MessageSquare size={40} className="text-slate-600 mb-3" />
              <p className="text-sm text-slate-400 font-medium">
                {search ? "No chats found" : "No chats yet"}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {search ? "Try a different search" : "Start a new conversation"}
              </p>
            </div>
          ) : (
            // Chat Items
            <div className="space-y-1">
              <div className="sticky top-0 px-2 py-2.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 bg-slate-900/60 rounded-lg">
                Recent
              </div>

              {filteredChats.map((chat) => (
                <div
                  key={chat._id || chat.id}
                  onMouseEnter={() => setHoveredId(chat._id || chat.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => {
                    handleGetMessages(chat._id || chat.id);
                    setIsOpen(false);
                  }}
                  className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 ${
                    currentChatId === (chat._id || chat.id)
                      ? "bg-blue-600/40 border border-blue-500/40 text-blue-100"
                      : "hover:bg-slate-800/40 border border-transparent text-slate-300 hover:text-white"
                  }`}
                >
                  {/* Icon */}
                  <div className="p-2 rounded-lg bg-slate-800/60 group-hover:bg-slate-700/60 transition shrink-0">
                    <MessageSquare
                      size={16}
                      className={
                        currentChatId === (chat._id || chat.id)
                          ? "text-blue-400"
                          : "text-slate-400"
                      }
                    />
                  </div>

                  {/* Title */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate line-clamp-2">
                      {chat.title || "Untitled Chat"}
                    </p>
                  </div>

                  {/* Delete Button */}
                  {hoveredId === (chat._id || chat.id) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeletingId(chat._id || chat.id);
                      }}
                      className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-700/30 p-4 sm:p-5 text-xs text-slate-500 text-center">
          <p>© 2026 QuickMind</p>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setDeletingId(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-700/50 max-w-sm w-full"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                <Trash2 size={24} className="text-red-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">
                  Delete Chat?
                </h3>
                <p className="text-sm text-slate-400 mb-6">
                  This action cannot be undone. The chat and all its messages
                  will be permanently deleted.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setDeletingId(null)}
                className="flex-1 px-4 py-2.5 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 text-white font-medium transition border border-slate-700/50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deletingId)}
                className="flex-1 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-medium transition shadow-lg hover:shadow-red-500/20"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}