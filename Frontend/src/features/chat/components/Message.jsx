import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";

export default function Message({ msg }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(String(text));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className={`flex ${
        msg.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`px-3 sm:px-4 py-2 sm:py-3 rounded-2xl 
        max-w-[85%] sm:max-w-[75%] md:max-w-2xl 
        text-sm sm:text-base leading-relaxed wrap-break-word shadow-md
        transition-all duration-200
        ${
          msg.role === "user"
            ? "bg-[#574964] text-[#FFDAB3]"
            : "bg-[#9F8383]/20 backdrop-blur-md text-[#FFDAB3] border border-[#C8AAAA]/30"
        } flex-1 overflow-y-auto hide-scrollbar`}
      >
        <ReactMarkdown
          components={{
            code({ inline, className, children }) {
              const match = /language-(\w+)/.exec(className || "");

              // BLOCK CODE
              if (!inline) {
                return (
                  <div className="my-3 rounded-lg overflow-hidden border border-[#C8AAAA]/20">
                    
                    {/* Header */}
                    <div className="flex justify-between items-center bg-[#2d2d2d] px-3 py-1 text-xs">
                      <span className="opacity-70">
                        {match?.[1] || "code"}
                      </span>
                      <button
                        onClick={() => handleCopy(children)}
                        className="text-[#FFDAB3] hover:opacity-80"
                      >
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>

                    {/* Code */}
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match?.[1] || "javascript"}
                      customStyle={{
                        margin: 0,
                        padding: "12px",
                        fontSize: "0.85rem",
                        overflowX: "auto",
                      }}
                    >
                      {String(children).trim()}
                    </SyntaxHighlighter>
                  </div>
                );
              }

              // INLINE CODE
              return (
                <code className="bg-gray-700 px-1.5 py-0.5 rounded text-xs">
                  {children}
                </code>
              );
            },
          }}
        >
          {msg.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}