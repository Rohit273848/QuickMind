import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";
import remarkGfm from "remark-gfm";
import { Copy, CheckCircle2, ExternalLink } from "lucide-react";

export default function Message({ msg }) {
  const [copied, setCopied] = useState(false);

  if (!msg) return null; // Safety check

  const handleCopy = (text) => {
    navigator.clipboard.writeText(String(text));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Check role safely
  const isAI =
    msg.role === "assistant" ||
    msg.role === "ai" ||
    msg.role === "bot";

  return (
    <div
      className={`flex w-full gap-3 sm:gap-4 ${
        isAI ? "flex-row" : "flex-row-reverse"
      }`}
    >
      {/* Avatar Section */}
      {/* {isAI && (
        // <div className="shrink-0 mt-1">
        //   <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shadow-lg">
        //     Q
        //   </div>
        // </div>
      )} */}

      {/* Message Bubble Container */}
      <div
        className={`flex flex-col gap-2 flex-1 ${
          isAI ? "" : "items-end pr-2"
        }`}
      >
        {/* Main Message Bubble */}
        <div
          className={`px-4 sm:px-5 py-3 sm:py-4 rounded-2xl max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl text-sm sm:text-base leading-relaxed shadow-lg transition-all duration-200 backdrop-blur-sm ${
            isAI
              ? "bg-linear-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80 border border-slate-700/50 text-slate-100"
              : "bg-linear-to-br from-blue-600 to-blue-500 text-white shadow-blue-500/20 border border-blue-400/30"
          }`}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // ========== HEADINGS ==========
              h1: ({ children }) => (
                <h1 className="text-2xl sm:text-3xl font-bold mt-4 mb-3 tracking-tight">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl sm:text-2xl font-bold mt-4 mb-2.5 tracking-tight border-b border-current/20 pb-2">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg sm:text-xl font-semibold mt-3 mb-2 tracking-tight">
                  {children}
                </h3>
              ),
              h4: ({ children }) => (
                <h4 className="text-base sm:text-lg font-semibold mt-2.5 mb-1.5">
                  {children}
                </h4>
              ),

              // ========== PARAGRAPHS & TEXT ==========
              p: ({ children }) => (
                <p className="mb-3 last:mb-0 text-base leading-relaxed">
                  {children}
                </p>
              ),

              // ========== LISTS ==========
              ul: ({ children }) => (
                <ul className="mb-3 ml-4 space-y-2 list-disc list-inside">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-3 ml-4 space-y-2 list-decimal list-inside">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-base leading-relaxed">{children}</li>
              ),

              // ========== BLOCKQUOTES ==========
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-current/40 pl-4 py-1 my-3 italic opacity-80 bg-current/5 rounded-r-lg pr-3">
                  {children}
                </blockquote>
              ),

              // ========== LINKS ==========
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity inline-flex items-center gap-1"
                >
                  {children}
                  <ExternalLink size={14} className="inline -mt-0.5" />
                </a>
              ),

              // ========== INLINE CODE ==========
              code({ inline, children }) {
                if (inline) {
                  return (
                    <code className="bg-current/10 px-2 py-1 rounded text-sm font-mono border border-current/20">
                      {children}
                    </code>
                  );
                }
                return <>{children}</>;
              },

              // ========== CODE BLOCKS ==========
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                const lang = match ? match[1] : "code";
                const code = String(children).replace(/\n$/, "");
                const [blockCopied, setBlockCopied] = useState(false);

                const handleBlockCopy = async () => {
                  await navigator.clipboard.writeText(code);
                  setBlockCopied(true);
                  setTimeout(() => setBlockCopied(false), 2000);
                };

                if (inline) {
                  return (
                    <code className="bg-current/10 px-2 py-1 rounded text-sm font-mono border border-current/20">
                      {children}
                    </code>
                  );
                }

                return (
                  <div className="my-4 rounded-xl overflow-hidden border border-slate-700/50 shadow-xl bg-slate-950/50">
                    {/* Code Block Header */}
                    <div className="flex items-center justify-between bg-slate-900/80 px-4 py-3 border-b border-slate-700/50">
                      <span className="text-xs font-semibold text-cyan-400 tracking-widest uppercase">
                        {lang}
                      </span>
                      <button
                        onClick={handleBlockCopy}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                          blockCopied
                            ? "bg-green-500/20 text-green-400 border border-green-500/40"
                            : "bg-slate-800/60 text-slate-300 hover:bg-slate-700/60 border border-slate-600/40 active:scale-95"
                        }`}
                      >
                        {blockCopied ? (
                          <>
                            <CheckCircle2 size={14} />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Syntax Highlighted Code */}
                    <SyntaxHighlighter
                      style={oneDark}
                      language={lang}
                      PreTag="div"
                      customStyle={{
                        margin: 0,
                        background: "transparent",
                        padding: "1rem",
                        fontSize: "0.875rem",
                        borderRadius: 0,
                        border: "none",
                      }}
                      codeTagProps={{
                        style: { background: "transparent", padding: 0 },
                      }}
                      wrapLongLines={true}
                      useInlineStyles={true}
                      {...props}
                    >
                      {code}
                    </SyntaxHighlighter>
                  </div>
                );
              },

              // ========== TABLES ==========
              table: ({ children }) => (
                <div className="my-4 overflow-x-auto rounded-lg border border-slate-700/50 shadow-lg">
                  <table className="w-full text-sm">{children}</table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-slate-900/60 border-b border-slate-700/50">
                  {children}
                </thead>
              ),
              tbody: ({ children }) => (
                <tbody className="divide-y divide-slate-700/30">
                  {children}
                </tbody>
              ),
              tr: ({ children }) => (
                <tr className="hover:bg-slate-800/40 transition-colors">
                  {children}
                </tr>
              ),
              th: ({ children }) => (
                <th className="px-4 py-3 text-left font-semibold text-cyan-300">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="px-4 py-2.5">{children}</td>
              ),

              // ========== HORIZONTAL RULE ==========
              hr: () => <hr className="my-4 border-slate-700/30" />,
            }}
          >
            {msg.content || ""}
          </ReactMarkdown>
        </div>

        {/* Sources Section */}
        {isAI && msg.sources && msg.sources.length > 0 && (
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl">
            <p className="text-xs font-semibold text-slate-400 mb-2.5 px-1 uppercase tracking-widest">
              📚 Sources
            </p>

            <div className="flex flex-wrap gap-2">
              {msg.sources.map((source, i) => {
                let domain = "";
                try {
                  domain = new URL(source.url).hostname;
                } catch {}

                return (
                  <a
                    key={i}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 text-xs text-slate-300 transition-all active:scale-95 group"
                  >
                    {domain && (
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${domain}`}
                        alt=""
                        className="w-4 h-4 rounded opacity-75 group-hover:opacity-100 transition-opacity"
                      />
                    )}
                    <span className="truncate max-w-35 sm:max-w-40 md:max-w-50 group-hover:text-cyan-300 transition-colors">
                      {source.title || domain}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}