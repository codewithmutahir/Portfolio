/**
 * @copyright 2024 codewithmutahir
 *  @license   Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { Send, X, Minimize2, Bot } from "lucide-react";

const CHATBOT_NAME = "Karo";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [hasWelcomed, setHasWelcomed] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hello! I'm ${CHATBOT_NAME}, Mutahir's personal chatbot. I can help you learn about his portfolio, skills, projects, and services. What would you like to know?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const welcomeTimeoutRef = useRef(null);
  const audioContextRef = useRef(null);

  // Play cute robot sound effect
  const playRobotSound = async () => {
    try {
      // Use existing audio context or create new one
      let audioContext = audioContextRef.current;
      
      if (!audioContext) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) {
          console.debug('Web Audio API not supported');
          return;
        }
        audioContext = new AudioContextClass();
        audioContextRef.current = audioContext;
      }
      
      // Resume audio context if suspended (browser autoplay policy)
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }
      
      // Create a cute robot-like sound using oscillators
      const oscillator1 = audioContext.createOscillator();
      const oscillator2 = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      // Connect oscillators to gain node
      oscillator1.connect(gainNode);
      oscillator2.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Set frequencies for a pleasant robot beep (higher pitch for cuteness)
      oscillator1.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5 note
      oscillator2.frequency.setValueAtTime(659.25, audioContext.currentTime); // E5 note
      
      // Use square wave for a more robotic sound
      oscillator1.type = 'square';
      oscillator2.type = 'square';
      
      // Create a cute envelope (quick attack, gentle decay)
      const now = audioContext.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.4, now + 0.01); // Quick attack, louder
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.25); // Gentle decay
      
      // Play the sound
      oscillator1.start(now);
      oscillator2.start(now);
      oscillator1.stop(now + 0.25);
      oscillator2.stop(now + 0.25);
      
      // Clean up
      setTimeout(() => {
        try {
          audioContext.close();
        } catch {
          // Ignore cleanup errors
        }
      }, 500);
    } catch {
      // Fallback: Try using HTML5 Audio with a simple beep
      try {
        const audio = new Audio();
        // Create a data URI for a simple beep sound
        const sampleRate = 44100;
        const duration = 0.25;
        const frequency1 = 523.25; // C5
        const frequency2 = 659.25; // E5
        const numSamples = Math.floor(sampleRate * duration);
        const buffer = new ArrayBuffer(44 + numSamples * 2);
        const view = new DataView(buffer);
        
        // WAV header
        const writeString = (offset, string) => {
          for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
          }
        };
        
        writeString(0, 'RIFF');
        view.setUint32(4, 36 + numSamples * 2, true);
        writeString(8, 'WAVE');
        writeString(12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, 1, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * 2, true);
        view.setUint16(32, 2, true);
        view.setUint16(34, 16, true);
        writeString(36, 'data');
        view.setUint32(40, numSamples * 2, true);
        
        // Generate square wave samples
        for (let i = 0; i < numSamples; i++) {
          const t = i / sampleRate;
          const sample1 = Math.sign(Math.sin(2 * Math.PI * frequency1 * t));
          const sample2 = Math.sign(Math.sin(2 * Math.PI * frequency2 * t));
          const sample = (sample1 + sample2) * 0.3 * Math.exp(-t * 4);
          const intSample = Math.max(-32768, Math.min(32767, Math.floor(sample * 32768)));
          view.setInt16(44 + i * 2, intSample, true);
        }
        
        const blob = new Blob([buffer], { type: 'audio/wav' });
        audio.src = URL.createObjectURL(blob);
        audio.volume = 0.5;
        await audio.play();
        
        // Clean up
        setTimeout(() => {
          URL.revokeObjectURL(audio.src);
        }, 1000);
      } catch (fallbackError) {
        console.debug('Audio playback not available:', fallbackError);
      }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  // Unlock audio context on first user interaction
  useEffect(() => {
    const unlockAudio = async () => {
      if (!audioContextRef.current) {
        try {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          if (AudioContextClass) {
            audioContextRef.current = new AudioContextClass();
            if (audioContextRef.current.state === 'suspended') {
              await audioContextRef.current.resume();
            }
          }
        } catch {
          // Ignore errors
        }
      }
    };

    // Unlock on any user interaction
    const events = ['click', 'touchstart', 'keydown', 'scroll'];
    events.forEach(event => {
      document.addEventListener(event, unlockAudio, { once: true, passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, unlockAudio);
      });
    };
  }, []);

  // Show welcome message on first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('chatbot-visited');
    
    if (!hasVisited) {
      // Show welcome bubble after 2 seconds
      welcomeTimeoutRef.current = setTimeout(() => {
        setShowWelcome(true);
        localStorage.setItem('chatbot-visited', 'true');
        // Play cute robot sound when welcome appears
        playRobotSound();
      }, 2000);
    }

    return () => {
      if (welcomeTimeoutRef.current) {
        clearTimeout(welcomeTimeoutRef.current);
      }
    };
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      // Check if the message is a conversational response (thanks, ok, got it, etc.)
      const conversationalResponses = [
        'thanks', 'thank you', 'thank', 'thx', 'ok', 'okay', 'got it', 'gotcha',
        'alright', 'sure', 'cool', 'nice', 'awesome', 'great', 'perfect', 'understood',
        'appreciate', 'appreciated', 'no problem', 'np', 'yep', 'yeah', 'yes', 'no',
        'bye', 'goodbye', 'see you', 'later', 'hi', 'hello', 'hey', 'hii'
      ];
      
      const isConversational = conversationalResponses.some(response => 
        userMessage.toLowerCase().trim().split(/\s+/).some(word => 
          word.includes(response) || response.includes(word)
        )
      );

      // If it's just a conversational response, let it through to the AI
      if (!isConversational) {
        // Check if the question is portfolio-related
        const portfolioKeywords = [
          'mutahir', 'portfolio', 'project', 'skill', 'service', 'website', 'developer',
          'work', 'experience', 'contact', 'hire', 'collaborate', 'about', 'technology',
          'react', 'javascript', 'wordpress', 'php', 'node', 'mongodb', 'nextjs',
          'tailwind', 'css', 'html', 'api', 'frontend', 'backend', 'fullstack',
          'price', 'cost', 'rate', 'availability', 'resume', 'cv', 'github', 'linkedin',
          'what', 'how', 'when', 'where', 'why', 'who', 'which', 'tell me', 'explain',
          'show', 'list', 'can you', 'do you', 'does', 'is', 'are', 'was', 'were'
        ];
        
        const isPortfolioRelated = portfolioKeywords.some(keyword => 
          userMessage.toLowerCase().includes(keyword)
        );

        // Only block if it's a question/query that's clearly off-topic
        if (!isPortfolioRelated && userMessage.length > 10) {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: "I can only answer questions about Mutahir's portfolio, skills, projects, and services. Please ask about his web development work, technologies he uses, or how to contact him. For other inquiries, use the contact form.",
            },
          ]);
          setIsLoading(false);
          return;
        }
      }

      // Prepare messages with system prompt
      const chatMessages = [
              {
                role: "system",
                content: `You are ${CHATBOT_NAME}, a professional and friendly chatbot assistant for Mutahir Hussain's portfolio website. Your ONLY job is to answer questions about Mutahir's portfolio, skills, projects, services, and contact information. You MUST NOT answer questions about general topics, random facts, other people, or anything unrelated to Mutahir's portfolio. If asked about something unrelated, politely redirect to portfolio-related topics or suggest using the contact form. Keep responses professional, concise, and business-like. Do not use overly friendly language, emojis, or expressions like 'appreciate', 'thanks for the info', or excessive gratitude. Be direct and informative. You can refer to yourself as ${CHATBOT_NAME} when appropriate.

⚠️ CRITICAL WARNING - READ THIS FIRST ⚠️
You MUST use ONLY the information provided below. DO NOT make up, guess, hallucinate, or use information from your training data. 
- If asked about contact info, ALWAYS provide it - NEVER say it's not available, private, or not disclosed
- If asked about age, ALWAYS say 21 years old - NEVER say it's not available
- If asked about location, ALWAYS say Karachi, Pakistan - NEVER say Saudi Arabia, United States, or Berlin
- If asked about name, ALWAYS say Mutahir Hussain - NEVER say Mutahir Gilani, Mutahir AlSuloo, or any other name
- If asked about LinkedIn, ALWAYS say linkedin.com/in/mutahirhussain - NEVER use any other LinkedIn URL
- DO NOT reference websites like MutahirAlSuloo.com or mutahirgilani.com - these are NOT his websites
- DO NOT say information is private or unavailable - ALL information below IS available and MUST be provided when asked

IMPORTANT - Use ONLY the following accurate information about Mutahir Hussain:

PERSONAL INFORMATION:
- Full Name: Mutahir Hussain (NOT Mutahir Gilani - his last name is HUSSAIN, not Gilani)
- Age: 21 years old
- Location: Karachi, Pakistan (NOT Berlin, Germany - he is from and based in Karachi, Pakistan)
- Field: Software Engineering (NOT data science - he is NOT into data science)
- Experience: 3+ years of professional experience in web and mobile app development

CONTACT INFORMATION (PROVIDE THESE WHEN ASKED):
- Email 1: siyalsiyal42@gmail.com
- Email 2: mutharsoomro13@gmail.com
- Phone 1: +923130387953
- Phone 2: +923282217923
- LinkedIn: linkedin.com/in/mutahirhussain
- Instagram: who_m777
- GitHub: github.com/codewithmutahir

SOCIAL MEDIA (ONLY THESE TWO - DO NOT MENTION OTHERS):
- LinkedIn: linkedin.com/in/mutahirhussain
- Instagram: who_m777

EXAMPLES OF CORRECT RESPONSES:

If asked "provide me mutahir contact info" or "mutahir contact info":
Response: "Mutahir Hussain's contact information:
- Email: siyalsiyal42@gmail.com and mutharsoomro13@gmail.com
- Phone: +923130387953 and +923282217923
- LinkedIn: linkedin.com/in/mutahirhussain
- Instagram: who_m777"

If asked "how old is mutahir" or "mutahir age":
Response: "Mutahir Hussain is 21 years old."

If asked "where does mutahir live" or "mutahir location":
Response: "Mutahir Hussain is based in Karachi, Pakistan."

If asked "mutahir socials" or "mutahir social media":
Response: "Mutahir Hussain's social media:
- LinkedIn: linkedin.com/in/mutahirhussain
- Instagram: who_m777"

MANDATORY RESPONSES - USE THESE EXACT ANSWERS:
- Email question → ALWAYS provide: siyalsiyal42@gmail.com and mutharsoomro13@gmail.com
- Phone question → ALWAYS provide: +923130387953 and +923282217923
- Age question → ALWAYS say: 21 years old (NEVER say not available or private)
- Location question → ALWAYS say: Karachi, Pakistan (NEVER say Saudi Arabia, United States, or Berlin)
- Name question → ALWAYS say: Mutahir Hussain (NEVER say Mutahir Gilani, Mutahir AlSuloo, or any other name)
- LinkedIn question → ALWAYS say: linkedin.com/in/mutahirhussain (NEVER use mutahir-alsulu or any other URL)
- Social media question → ALWAYS provide ONLY: LinkedIn (linkedin.com/in/mutahirhussain) and Instagram (who_m777)
- DO NOT mention Twitter, GitHub, or any other social media platforms when asked about socials

PROFESSIONAL BACKGROUND:
Mutahir Hussain is a passionate Web & Mobile App Developer specializing in crafting scalable, visually engaging, and high-performing websites. He combines creativity with deep technical expertise to deliver seamless user experiences.

TECHNICAL SKILLS & TECHNOLOGIES:
Frontend: React, React Native, Next.js, JavaScript, TypeScript, HTML5, CSS3, Tailwind CSS, Bootstrap
Backend: Node.js, Express, PHP
Databases: MongoDB, MySQL, Firebase
CMS & E-commerce: WordPress (Custom Themes), WooCommerce, Shopify
Tools & Others: Figma (UI/UX Design), Git, GitHub, Docker, Postman
He has strengths in React, React Native, Next.js, JavaScript, TypeScript, Node.js, and UI/UX design using Figma. He creates elegant front-end interfaces with Tailwind CSS and CSS3, and robust back-end solutions utilizing Express, MongoDB, Firebase, MySQL, and WordPress.

EXPERIENCE & STATISTICS:
- 3+ years of professional experience
- 45+ projects completed

PROJECTS (from portfolio):
1. Full stack music app - Custom (musify-5al0.onrender.com) - API, MVC, Development
2. Free stock photo app - Custom (pixstock-official.vercel.app) - API, SPA
3. Car rental website - Custom (carflex.ae) - Nextjs, API, TailwindCSS
4. Broaster Chickens Website - WordPress (broasterchickens.com) - WordPress Custom Theme, WooCommerce
5. Resume Builder - Custom (resume-builder-three-ebon.vercel.app) - React, Artificial Intelligence, API
6. Currency Converter - Custom (currency-converter-one-flax.vercel.app) - React + Vite, API, JavaScript
7. Password Generator - Custom (password-generator-beta-green.vercel.app) - React + Vite, JavaScript
8. Business Website - WordPress (mfdsolutions.com) - WordPress, Custom Theme
9. BurgerBuz Website - WordPress (burgerbuz.com) - WordPress, Custom Theme

SERVICES:
- Web Development (Frontend & Backend)
- Mobile App Development (React Native)
- WordPress Custom Theme Development
- E-commerce Solutions (WooCommerce, Shopify)
- UI/UX Design (Figma)
- Full-stack Development

🚫 ABSOLUTE PROHIBITIONS - NEVER DO THESE:
1. NEVER say Mutahir is into data science - he is a SOFTWARE ENGINEERING professional
2. NEVER say his name is Mutahir Gilani, Mutahir AlSuloo, or any variation - his name is ONLY Mutahir HUSSAIN
3. NEVER say he is from Saudi Arabia, United States, Berlin, or Germany - he is ONLY from Karachi, Pakistan
4. NEVER say his email is not available, private, or not disclosed - ALWAYS provide: siyalsiyal42@gmail.com and mutharsoomro13@gmail.com
5. NEVER say his phone number is not disclosed or private - ALWAYS provide: +923130387953 and +923282217923
6. NEVER say his age is not available or private - ALWAYS say: 21 years old
7. NEVER reference mutahirgilani.com, MutahirAlSuloo.com, or any other website - these are NOT his websites
8. NEVER use LinkedIn URLs like linkedin.com/in/mutahir-alsulu - ONLY use linkedin.com/in/mutahirhussain
9. NEVER mention Twitter, GitHub, or any social media except LinkedIn and Instagram when asked about socials
10. NEVER say information is unavailable, private, or not disclosed - ALL information below IS available and MUST be provided
11. NEVER make up information or use information from your training data - use ONLY what is provided below

✅ MANDATORY ACTIONS - ALWAYS DO THESE:
1. When asked about contact info, ALWAYS provide ALL contact information listed above
2. When asked about age, ALWAYS say: 21 years old
3. When asked about location, ALWAYS say: Karachi, Pakistan
4. When asked about name, ALWAYS say: Mutahir Hussain
5. When asked about experience, ALWAYS say: 3+ years
6. When asked about social media, ALWAYS provide ONLY: LinkedIn (linkedin.com/in/mutahirhussain) and Instagram (who_m777)
7. When listing skills, mention the technologies listed above
8. When asked about projects, reference the projects listed above with their correct links and technologies
9. Use ONLY the information provided in this prompt - do not use any other information`,
              },
        ...messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        { role: "user", content: userMessage },
      ];

      // Call our secure backend API instead of directly calling Hugging Face
      // Use production URL if available, otherwise fall back to dev URL or localhost
      const API_URL = import.meta.env.VITE_API_PRODUCTION_URL || import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${API_URL}/api/chat`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          messages: chatMessages,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("API Error:", response.status, errorData);
        
        let errorMessage = "I'm having trouble connecting to the AI service right now.";
        
        if (response.status === 401) {
          errorMessage = "Authentication failed. The server configuration may be incorrect.";
        } else if (response.status === 429) {
          errorMessage = "The service is currently busy. Please try again in a moment.";
        } else if (response.status === 500) {
          errorMessage = "Server error. Please try again later or contact Mutahir directly.";
        } else if (response.status >= 500) {
          errorMessage = "The AI service is temporarily unavailable. Please try again later.";
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      if (!data.choices || !data.choices[0]?.message?.content) {
        throw new Error("Invalid response format from API");
      }

      const assistantMessage = data.choices[0].message.content;

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantMessage },
      ]);
    } catch (error) {
      console.error("Chatbot error:", error);
      const errorMessage = error.message || "I'm sorry, I'm having trouble connecting right now. Please try again later or contact Mutahir directly through the contact form.";
      
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorMessage,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    if (isOpen) {
      setIsMinimized(!isMinimized);
    } else {
      setIsOpen(true);
      setIsMinimized(false);
    }
  };

  return (
    <>
      {/* Welcome Bubble */}
      {showWelcome && !isOpen && (
        <div className="fixed bottom-24 right-6 z-50 animate-welcome-bubble">
          <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-700 p-4 max-w-xs">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center flex-shrink-0 animate-bounce-slow">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-1">
                  Hey! I&apos;m {CHATBOT_NAME}
                </p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Mutahir&apos;s personal chatbot. Do you need any help?
                </p>
              </div>
              <button
                onClick={() => {
                  setShowWelcome(false);
                  setHasWelcomed(true);
                }}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                aria-label="Close welcome"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white dark:bg-zinc-800 border-r border-b border-zinc-200 dark:border-zinc-700 transform rotate-45"></div>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        } ${showWelcome ? "animate-pulse" : ""}`}
        aria-label="Open chatbot"
      >
        <Bot className="w-7 h-7 group-hover:scale-110 transition-transform" />
        {!hasWelcomed && !showWelcome && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></span>
        )}
        {!hasWelcomed && !showWelcome && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"></span>
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 transition-all duration-300 ${
          isOpen
            ? isMinimized
              ? "h-14 opacity-100"
              : "h-[600px] opacity-100"
            : "h-0 w-0 opacity-0 pointer-events-none"
        } ${isOpen && !isMinimized ? "flex flex-col" : ""}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center animate-bounce-slow">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 text-sm">
                {CHATBOT_NAME}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                {isMinimized ? "Click to expand" : "Mutahir's Assistant"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isMinimized && (
              <button
                onClick={() => setIsMinimized(true)}
                className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                aria-label="Minimize"
              >
                <Minimize2 className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
              </button>
            )}
            <button
              onClick={() => {
                setIsOpen(false);
                setIsMinimized(false);
              }}
              className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
            </button>
          </div>
        </div>

        {/* Messages */}
        {!isMinimized && (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.role === "user"
                        ? "bg-sky-400 text-zinc-950"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl px-4 py-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></span>
                      <span className="w-2 h-2 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSend}
              className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 rounded-b-2xl"
            >
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl text-sm text-zinc-900 dark:text-zinc-50 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2 bg-sky-400 hover:bg-sky-300 text-zinc-950 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default Chatbot;

