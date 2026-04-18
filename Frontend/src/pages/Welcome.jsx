import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/auth.slice";
import { logout } from "../features/auth/services/auth.api";

export default function Welcome() {
    const [query, setQuery] = useState("");
    const [expandedFaq, setExpandedFaq] = useState(null);
    const navigate = useNavigate();
    const user = useSelector((state)=>state.auth.user);


    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
          await logout(); // backend call
      
          dispatch(logoutUser()); // clear redux
      
          navigate("/"); // go to welcome page
        } catch (error) {
          console.error(error);
        }
      };


    const handleSubmit = () => {
        if (!query.trim()) return;
        navigate("/chat", { state: { message: query } });
    };

    const examples = [
        "Latest AI news",
        "Stock market trends today",
        "Best React resources",
    ];

    const features = [
        {
            icon: "⚡",
            title: "Real-time Data",
            desc: "Fetches live information from trusted sources instantly",
            details: "Get the latest news, trends, and updates as they happen with our real-time data pipeline."
        },
        {
            icon: "🧠",
            title: "AI Summaries",
            desc: "Only important insights, no unnecessary content",
            details: "Our advanced AI filters through noise to show you what matters most in seconds."
        },
        {
            icon: "✅",
            title: "Verified Sources",
            desc: "Direct links to original sources for trust and transparency",
            details: "Every answer comes with citations so you can verify and explore further independently."
        },
        {
            icon: "📚",
            title: "Chat History",
            desc: "Access and manage all your previous searches",
            details: "Keep a searchable history of all your queries and never lose important insights."
        },
    ];

    const useCases = [
        {
            title: "Professional Research",
            desc: "Gather market insights, competitor analysis, and industry trends in minutes instead of hours."
        },
        {
            title: "Student Learning",
            desc: "Get detailed explanations on any topic with verified sources for academic integrity."
        },
        {
            title: "Content Creation",
            desc: "Research trends, find inspiration, and stay updated on your industry effortlessly."
        },
        {
            title: "Investment Research",
            desc: "Analyze stock movements, company news, and market conditions with real-time data."
        },
        {
            title: "News Aggregation",
            desc: "Stay informed on multiple topics without scrolling through endless social media feeds."
        },
        {
            title: "Personal Development",
            desc: "Learn new skills, explore emerging technologies, and grow your knowledge base."
        },
    ];

    const faqs = [
        {
            q: "How is QuickMind different from Google?",
            a: "QuickMind uses advanced AI to synthesize information from multiple sources and provide you with direct answers rather than a list of links. You get instant summaries with verified sources—no need to visit 10 different websites."
        },
        {
            q: "How accurate is the information provided?",
            a: "We source data from verified, trusted sources and use AI to cross-reference information. Each answer includes direct links to original sources so you can verify independently. We continuously improve our accuracy through user feedback."
        },
        {
            q: "Is my search history private?",
            a: "Your search history is stored securely and encrypted. You have full control over your data—you can delete searches anytime, or clear all history with one click. We never sell your data to third parties."
        },
        {
            q: "Can I use QuickMind for academic purposes?",
            a: "Yes! QuickMind is perfect for research papers and academic work. Every answer comes with citations and source links, making it easy to build your bibliography and maintain academic integrity."
        },
        {
            q: "What topics can I search?",
            a: "You can search virtually any topic—news, technology, business, science, history, entertainment, health, and more. Our AI is trained to handle complex questions and provide nuanced answers."
        },
        {
            q: "Do you have an API for developers?",
            a: "Yes! We offer a developer API for integrating QuickMind into your applications. Contact our team for details and pricing."
        }
    ];

    return (
        <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-white flex flex-col overflow-x-hidden">
            <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.05);
          }
          50% {
            box-shadow: 0 0 30px rgba(255, 255, 255, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.1);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-down {
          animation: fadeInDown 0.6s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          animation-delay: 0.2s;
        }

        .animate-slide-up {
          animation: slideUp 0.7s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }

        .glow-text {
          animation: glow 3s ease-in-out infinite;
        }

        .search-input-focus {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .search-input-focus:focus {
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2), 
                      0 0 20px rgba(255, 255, 255, 0.15),
                      inset 0 0 20px rgba(255, 255, 255, 0.05);
          transform: scale(1.01);
        }

        .feature-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .nav-item {
          animation: fadeInDown 0.6s ease-out forwards;
        }

        .nav-item:nth-child(2) {
          animation-delay: 0.1s;
        }

        .nav-item:nth-child(3) {
          animation-delay: 0.2s;
        }

        .feature-item {
          animation: slideUp 0.7s ease-out forwards;
        }

        .feature-item:nth-child(1) { animation-delay: 0.2s; }
        .feature-item:nth-child(2) { animation-delay: 0.35s; }
        .feature-item:nth-child(3) { animation-delay: 0.5s; }
        .feature-item:nth-child(4) { animation-delay: 0.65s; }

        .use-case-item {
          animation: slideUp 0.7s ease-out forwards;
        }

        .use-case-item:nth-child(1) { animation-delay: 0.1s; }
        .use-case-item:nth-child(2) { animation-delay: 0.2s; }
        .use-case-item:nth-child(3) { animation-delay: 0.3s; }
        .use-case-item:nth-child(4) { animation-delay: 0.4s; }
        .use-case-item:nth-child(5) { animation-delay: 0.5s; }
        .use-case-item:nth-child(6) { animation-delay: 0.6s; }

        .example-button {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .example-button:hover {
          background-color: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .search-btn {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .search-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
        }

        .search-btn:active {
          transform: scale(0.95);
        }

        .gradient-bg {
          background: radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
                      radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.02) 0%, transparent 50%);
        }

        .hero-glow {
          position: relative;
        }

        .hero-glow::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 500px;
          height: 300px;
          background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.08) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .hero-content {
          position: relative;
          z-index: 1;
        }

        .faq-item {
          transition: all 0.3s ease-out;
        }

        .faq-button {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .faq-button:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .faq-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out;
        }

        .faq-content.open {
          max-height: 500px;
        }

        .stat-card {
          animation: slideUp 0.7s ease-out forwards;
        }

        .stat-card:nth-child(1) { animation-delay: 0.1s; }
        .stat-card:nth-child(2) { animation-delay: 0.2s; }
        .stat-card:nth-child(3) { animation-delay: 0.3s; }
      `}</style>

            {/* BACKGROUND */}
            <div className="fixed inset-0 gradient-bg pointer-events-none z-0" />

            {/* NAVBAR */}
            <nav className="relative z-50 flex justify-between items-center px-6 py-4 border-b border-white/10 backdrop-blur-md">
                <h1 className="text-2xl font-bold tracking-wide nav-item">
                    QuickMind
                </h1>

                {user ? (
                    <button
                        onClick={() => navigate("/chat")}
                        className="px-4 py-1.5 rounded-lg bg-white text-black hover:opacity-90 transition font-medium"
                    >
                        Go to Chat
                    </button>
                ) : (
                    <> <div className="gap-4 flex ">
                        <button
                            onClick={() => navigate("/login")}
                            className="nav-item hover:text-gray-300 cursor-pointer transition duration-300"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate("/register")}
                            className="nav-item px-4 py-1.5 rounded-lg bg-white text-black cursor-pointer hover:opacity-90 hover:shadow-lg transition duration-300 font-medium"
                        >
                            Register
                        </button>
                        </div>
                    </>
                )}
            </nav>

            {/* ===== HERO SECTION ===== */}
            <section className="relative z-10 min-h-[70vh] flex flex-col items-center justify-center flex-1 px-4 text-center hero-glow py-20">
                <div className="hero-content w-full max-w-4xl">
                    <h1 className="animate-fade-in-down text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        Search Smarter with{" "}
                        <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                            QuickMind
                        </span>
                    </h1>

                    <p className="animate-fade-in-up text-gray-400 max-w-2xl mx-auto mb-12 text-lg md:text-xl leading-relaxed">
                        Get instant, AI-powered answers with verified sources. No more endless scrolling through search results.
                    </p>

                    {/* CENTERED SEARCH INPUT */}
                    <div className="w-full max-w-2xl mx-auto relative mb-8 animate-slide-up">
                        <input
                            autoFocus
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Ask anything… latest news, trading trends, tech updates"
                            className="search-input-focus w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md outline-none text-white placeholder-gray-500 text-base"
                            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                        />

                        <button
                            onClick={handleSubmit}
                            className="search-btn absolute right-2 top-2.5 px-5 py-2.5 bg-white text-black rounded-lg text-sm font-semibold hover:bg-gray-100"
                        >
                            Search
                        </button>
                    </div>

                    {/* EXAMPLE QUERIES */}
                    <div className="flex flex-wrap gap-3 justify-center mb-2">
                        <p className="w-full text-sm text-gray-500 mb-4">Try these searches:</p>
                        {examples.map((ex, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    setQuery(ex);
                                    navigate("/chat", { state: { message: ex } });
                                }}
                                className="example-button px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-full hover:border-white/30"
                            >
                                {ex}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== HOW IT WORKS ===== */}
            <section className="relative z-10 py-20 px-4 border-t border-white/10 bg-gradient-to-b from-white/5 to-transparent">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16 animate-fade-in-up">
                        How QuickMind Works
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="animate-slide-in-left feature-card p-8 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-center">
                            <div className="text-5xl mb-4">🔍</div>
                            <h3 className="text-xl font-semibold mb-3">You Ask</h3>
                            <p className="text-gray-400">Enter any question or topic you want to know about. Natural language questions work best.</p>
                        </div>

                        <div className="animate-fade-in-up feature-card p-8 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-center" style={{ animationDelay: '0.2s' }}>
                            <div className="text-5xl mb-4">🤖</div>
                            <h3 className="text-xl font-semibold mb-3">AI Processes</h3>
                            <p className="text-gray-400">Our AI searches the web in real-time, gathers information, and synthesizes it into a coherent answer.</p>
                        </div>

                        <div className="animate-slide-in-right feature-card p-8 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-center">
                            <div className="text-5xl mb-4">✨</div>
                            <h3 className="text-xl font-semibold mb-3">You Get Answers</h3>
                            <p className="text-gray-400">Receive instant, accurate summaries with direct links to sources for verification.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== FEATURES IN DETAIL ===== */}
            <section className="relative z-10 py-20 px-4 border-t border-white/10">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16 animate-fade-in-up">
                        Powerful Features
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {features.map((feature, idx) => (
                            <div key={idx} className="feature-item feature-card p-8 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                                <div className="text-5xl mb-4">{feature.icon}</div>
                                <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-400 mb-4">{feature.desc}</p>
                                <p className="text-gray-500 text-sm">{feature.details}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== USE CASES ===== */}
            <section className="relative z-10 py-20 px-4 border-t border-white/10 bg-gradient-to-b from-transparent to-white/5">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16 animate-fade-in-up">
                        Perfect For Any Use Case
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {useCases.map((useCase, idx) => (
                            <div key={idx} className="use-case-item feature-card p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/8">
                                <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{useCase.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== STATS SECTION ===== */}
            {/* <section className="relative z-10 py-20 px-4 border-t border-white/10">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16 animate-fade-in-up">
                        Trusted by Thousands
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="stat-card text-center">
                            <div className="text-5xl font-bold text-white mb-2">500K+</div>
                            <p className="text-gray-400">Active Users Worldwide</p>
                        </div>
                        <div className="stat-card text-center">
                            <div className="text-5xl font-bold text-white mb-2">50M+</div>
                            <p className="text-gray-400">Queries Processed Monthly</p>
                        </div>
                        <div className="stat-card text-center">
                            <div className="text-5xl font-bold text-white mb-2">99.9%</div>
                            <p className="text-gray-400">Uptime Guarantee</p>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* ===== FAQ SECTION ===== */}
            <section className="relative z-10 py-20 px-4 border-t border-white/10 bg-gradient-to-b from-white/5 to-transparent">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16 animate-fade-in-up">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="faq-item rounded-xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden">
                                <button
                                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                                    className="faq-button w-full px-6 py-4 text-left flex justify-between items-center hover:bg-white/8 transition"
                                >
                                    <span className="font-semibold text-lg">{faq.q}</span>
                                    <span className="text-2xl transition-transform" style={{
                                        transform: expandedFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.3s ease-out'
                                    }}>
                                        ▼
                                    </span>
                                </button>
                                <div className={`faq-content ${expandedFaq === idx ? 'open' : ''}`}>
                                    <div className="px-6 py-4 text-gray-400 border-t border-white/10">
                                        {faq.a}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="relative z-10 py-20 px-4 border-t border-white/10">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6 animate-fade-in-up">
                        Ready to Search Smarter?
                    </h2>
                    <p className="text-gray-400 mb-10 text-lg animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        Join thousands of users who are already getting better answers faster with QuickMind.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <button
                            onClick={() => {
                                navigate('/chat')
                            }}
                            className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:opacity-90 transition duration-300"
                        >
                            Start Searching Now
                        </button>

                        {user?(<button></button>):(
                            <>
                        <button
                            onClick={() => navigate("/register")}
                            className="px-8 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition duration-300"
                        >
                            Create Free Account
                        </button>
                        </>
                    )
                    }
                    </div>
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer className="relative z-10 border-t border-white/10 bg-gradient-to-b from-transparent to-white/5 py-12 px-4 mt-20">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-12">
                        <div>
                            <h3 className="font-semibold mb-4">Product</h3>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white transition">Features</a></li>
                                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                                <li><a href="#" className="hover:text-white transition">API</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Company</h3>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white transition">About</a></li>
                                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Legal</h3>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                                <li><a href="#" className="hover:text-white transition">Security</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Social</h3>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                                <li><a href="#" className="hover:text-white transition">LinkedIn</a></li>
                                <li><a href="#" className="hover:text-white transition">GitHub</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
                        <p>© {new Date().getFullYear()} QuickMind. All rights reserved. | Built with ❤️ for knowledge seekers</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}