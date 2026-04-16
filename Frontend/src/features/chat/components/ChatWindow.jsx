import Message from "./Message";
import InputBox from "./InputBox";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

export default function ChatWindow() {
  const currentChatId = useSelector(
    (state) => state.chat.currentChatId
  );
  const chats = useSelector((state) => state.chat.chats);
  const loading = useSelector((state) => state.chat.loading);

  const messages = chats[currentChatId]?.messages || [];

  const bottomRef = useRef();

  const containerRef = useRef(); 
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop =
        containerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  return (
    <div className="flex-1 flex flex-col h-full bg-[#151026]">
      
      {/* Messages Area */}
      <div ref={containerRef} className="  flex-1 overflow-y-auto px-2 sm:px-4 md:px-6 py-3 sm:py-4">
        
        <div className="max-w-3xl mx-auto space-y-4 pb-24   ">
          
          {messages.length === 0 ? (
            <p className="text-center text-gray-400 mt-10">
              No messages yet 👋
            </p>
          ) : (
            messages.map((msg, i) => (
              <Message key={i} msg={msg} />
            ))
          )}

          {/* Typing Indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="px-3 py-2 rounded-xl bg-[#9F8383]/20 text-sm text-gray-300 animate-pulse">
                AI is typing...
              </div>
            </div>
          )}

          <div ref={bottomRef}></div>
        </div>
      </div>

      {/* Input Section */}
      <div className="sticky bottom-0 bg-learn-to-t from-[#151026] via-[#151026]/95 to-transparent">
        <InputBox />
      </div>
    </div>
  );
}