import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import { useState } from "react";

export default function InputBox() {

  const chat = useChat();

  const currentChatId = useSelector(
    (state) => state.chat.currentChatId
  );


  
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!currentChatId && !message) return;
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      return
    }
    chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId })
    setMessage('')
  };

  return (
    <div className="mt-4 px-3 pb-3">
      <div className="flex items-center bg-[#574964]/30 backdrop-blur-xl border border-[#C8AAAA]/20 rounded-2xl px-3 py-2 shadow-md focus-within:border-[#FFDAB3]/40 transition-all">

        {/* Plus Button */}
        <button className="p-2 text-[#C8AAAA] hover:text-[#FFDAB3] transition text-lg">
          
        </button>

        {/* Input */}
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          type="text"
          placeholder="Ask anything"
          className="flex-1 bg-transparent outline-none px-2 text-sm text-[#FFDAB3] placeholder:text-[#C8AAAA]"
        />

        {/* Send Button */}
        <button 
          onClick={() => { handleSend() }}
          className="bg-[#574964] hover:bg-[#6b5a78] text-[#FFDAB3] px-4 py-2 rounded-xl transition-all duration-200 shadow hover:scale-[1.05] active:scale-95">
          ↑
        </button>
      </div>
    </div>
  );
}