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

  const containerRef = useRef();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth", // 👈 smooth scroll
      });
    }
  }, [messages, loading]);

  return (
    <div className="flex-1 flex flex-col h-full bg-gradient-to-b from-[#151026] to-[#0f0b1f]">

      {/* Messages Area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-3 sm:px-6 py-6 hide-scrollbar"
      >
        <div className="max-w-4xl mx-auto space-y-4 pb-28">

          {/* Empty State */}
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
              <h2 className="text-lg sm:text-xl font-medium text-gray-300">
                How can I help you today?
              </h2>
              <p className="text-sm text-gray-500 max-w-md">
                Ask anything. Get clean, structured, and intelligent answers.
              </p>
            </div>
          ) : (
            messages.map((msg, i) => (
              <Message key={i} msg={msg} />
            ))
          )}

          {/* Typing Indicator */}
          {loading && (
            <div className="flex justify-start pl-2">
              <div className="px-4 py-2 rounded-xl bg-[#9F8383]/20 text-sm text-gray-300 flex gap-1">
                <span className="animate-bounce">•</span>
                <span className="animate-bounce delay-150">•</span>
                <span className="animate-bounce delay-300">•</span>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Input Section */}
      <div className="sticky bottom-0 bg-gradient-to-t from-[#151026] via-[#151026]/90 to-transparent backdrop-blur-md">
        <InputBox />
      </div>
    </div>
  );
}