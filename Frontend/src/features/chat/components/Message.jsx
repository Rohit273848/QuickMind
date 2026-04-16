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
      className={`flex flex-col w-full gap-2 ${msg.role === "user"
          ? "items-end pr-2 sm:pr-4"
          : "items-start pl-2 sm:pl-4"
        }`}
    >
      {/* MESSAGE BUBBLE */}
      <div
        className={`px-3 sm:px-4 md:px-5 py-2 sm:py-3 rounded-2xl max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl text-xs sm:text-sm md:text-base leading-relaxed break-words shadow-md transition-all duration-200 overflow-hidden ${msg.role === "user"
            ? "bg-[#574964] text-[#FFDAB3]"
            : "bg-[#9F8383]/20 backdrop-blur-md text-[#FFDAB3] border border-[#C8AAAA]/30"
          }`}
      >
        <ReactMarkdown
          components={{
            code({ inline, className, children }) {
              const match = /language-(\w+)/.exec(className || "");

              if (!inline) {
                return (
                  <div className="my-2 sm:my-3 rounded-lg overflow-hidden border border-[#C8AAAA]/20">
                    <div className="flex justify-between items-center bg-[#2d2d2d] px-2 sm:px-3 py-1 text-xs gap-2">
                      <span className="opacity-70 truncate">
                        {match?.[1] || "code"}
                      </span>
                      <button
                        onClick={() => handleCopy(children)}
                        className="text-[#FFDAB3] hover:opacity-80 whitespace-nowrap shrink-0 transition-opacity"
                      >
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>

                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match?.[1] || "javascript"}
                      customStyle={{
                        margin: 0,
                        padding: "12px",
                        fontSize: "0.75rem",
                        overflowX: "auto",
                        maxWidth: "100%",
                      }}
                    >
                      {String(children).trim()}
                    </SyntaxHighlighter>
                  </div>
                );
              }

              return (
                <code className="bg-gray-700 px-1.5 py-0.5 rounded text-xs break-all">
                  {children}
                </code>
              );
            },
          }}
        >
          {msg.content}
        </ReactMarkdown>
      </div>

      {/* SOURCES */}
      {msg.role === "ai" && msg.sources?.length > 0 && (
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl">
          <p className="text-[10px] sm:text-xs text-gray-400 mb-2 sm:mb-2.5 px-1">
            Sources
          </p>

          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {msg.sources.map((source, i) => {
              let domain = "";
              try {
                domain = new URL(source.url).hostname;
              } catch { }

              return (
                <a
                  key={i}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-[#1f1a33] hover:bg-[#2a2245] border border-[#C8AAAA]/20 text-[10px] sm:text-xs transition-all active:scale-95 min-w-0"
                >
                  {domain && (
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${domain}`}
                      alt=""
                      className="w-3 h-3 sm:w-4 sm:h-4 shrink-0"
                    />
                  )}

                  <span className="truncate max-w-[120px] sm:max-w-[140px] md:max-w-[200px]">
                    {source.title}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}