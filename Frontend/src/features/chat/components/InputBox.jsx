import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import { useState } from "react";
import { Send, Paperclip } from "lucide-react";

export default function InputBox() {
  const chat = useChat();
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const loading = useSelector((state) => state.chat.loading);

  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSend = () => {
    // Check if message is empty
    if (!message.trim()) return;

    // Call the chat hook to send message
    chat.handleSendMessage({
      message: message.trim(),
      chatId: currentChatId,
    });

    // Clear input
    setMessage("");
  };

  const isDisabled = loading || !message.trim();

  return (
    <div className="px-3 sm:px-4 py-4 sm:py-5">
      <div className="max-w-4xl mx-auto">
        <div
          className={`flex  gap-3 px-4 sm:px-5 py-3 rounded-2xl backdrop-blur-xl transition-all duration-200 border shadow-lg ${
            isFocused
              ? "bg-slate-900/90 border-blue-500/50 shadow-blue-500/20"
              : "bg-slate-900/60 border-slate-700/50 shadow-slate-900/50"
          }`}
        >
          {/* Attachment Button */}
          <button
            disabled={loading}
            className="p-2 text-slate-400 hover:text-slate-300 hover:bg-slate-800/40 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            title="Attach file"
          >
            <Paperclip size={20} />
          </button>

          {/* Input Field */}
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !loading) {
                e.preventDefault();
                handleSend();
              }
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={loading}
            type="text"
            placeholder="Ask me anything..."
            className="flex-1 bg-transparent outline-none text-sm sm:text-base text-white placeholder:text-slate-500 font-medium disabled:opacity-50"
          />

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={isDisabled}
            className={`flex items-center justify-center gap-2 px-4 sm:px-5 py-2 rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 shrink-0 ${
              isDisabled
                ? "bg-slate-800/50 text-slate-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-500/40 active:scale-95"
            }`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
            ) : (
              <>
                <Send size={18} />
                <span className="hidden sm:inline">Send</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}



