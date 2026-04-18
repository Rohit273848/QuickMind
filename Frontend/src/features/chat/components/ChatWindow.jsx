import Message from "./Message";
import InputBox from "./InputBox";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";

export default function ChatWindow() {
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const chats = useSelector((state) => state.chat.chats);
  const loading = useSelector((state) => state.chat.loading);

  // Get messages from current chat, handle if chat doesn't exist
  const messages = currentChatId && chats[currentChatId] 
    ? chats[currentChatId].messages || [] 
    : [];
    
  const containerRef = useRef();

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      const timer = setTimeout(() => {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [messages, loading]);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Messages Area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8"
        style={{ scrollBehavior: "smooth" }}
      >
        <div className="max-w-4xl mx-auto space-y-5 pb-40">
          {/* Empty State - No Chat Selected */}
          {!currentChatId && messages.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center min-h-96 text-center space-y-6">
              {/* Icon */}
              <div className="w-20 h-20 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/30 animate-pulse">
                <Sparkles size={40} className="text-blue-400" />
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  What can I help you with?
                </h2>
                <p className="text-sm sm:text-base text-slate-400 max-w-md">
                  Ask me anything about any topic. I'll provide detailed,
                  well-researched answers with sources.
                </p>
              </div>

              {/* Quick Suggestions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md pt-4">
                {[
                  "Explain quantum computing",
                  "How to learn programming?",
                  "Latest AI breakthroughs",
                  "Best productivity tips",
                ].map((suggestion, idx) => (
                  <button
                    key={idx}
                    className="px-4 py-3 rounded-xl bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 text-sm text-slate-300 hover:text-white transition-all font-medium"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Empty State - Chat Exists but No Messages */}
          {currentChatId && messages.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center min-h-96 text-center space-y-6">
              <div className="w-20 h-20 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/30 animate-pulse">
                <Sparkles size={40} className="text-blue-400" />
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Start the conversation
                </h2>
                <p className="text-sm sm:text-base text-slate-400 max-w-md">
                  Send your first message to begin chatting.
                </p>
              </div>
            </div>
          )}

          {/* Messages */}
          {messages && messages.length > 0 && (
            <div>
              {messages.map((msg, i) => (
                <div className="pt-5" key={i}>
                  <Message msg={msg} />
                </div>
              ))}
            </div>
          )}

          {/* AI Loading State */}
          {loading && (
            <div className="flex gap-4">
              {/* Avatar */}
              <div className="shrink-0 mt-1">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                  P
                </div>
              </div>

              {/* Loading Bubble */}
              <div
                className="flex items-end gap-2 px-5 py-4 rounded-2xl max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(30, 27, 60, 0.8) 0%, rgba(20, 20, 40, 0.6) 100%)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(59, 130, 246, 0.2)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                }}
              >
                {/* Typing Dots */}
                <div className="flex gap-2">
                  {[0, 1, 2].map((dot) => (
                    <div
                      key={dot}
                      className="w-2.5 h-2.5 rounded-full bg-linear-to-r from-blue-400 to-cyan-400 animate-bounce"
                      style={{
                        animationDelay: `${dot * 0.15}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Thinking Text */}
                <p className="text-xs text-slate-400 ml-2 font-medium">
                  Thinking...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Section - Sticky */}
      <div
        className="sticky bottom-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(15, 11, 31, 0) 0%, rgba(15, 11, 31, 0.8) 50%, rgba(15, 11, 31, 0.95) 100%)",
          backdropFilter: "blur(10px)",
        }}
      >
        <InputBox />
      </div>
    </div>
  );
}