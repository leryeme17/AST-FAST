import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Cpu, Loader2 } from 'lucide-react';
import Groq from 'groq-sdk';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Hello! I can help you with questions about the F-AST Racing Championship rules, schedule, or registration.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Ref to hold the Groq client instance
  const groqClient = useRef<Groq | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Initialize Groq Client
  const getGroqClient = () => {
  if (!groqClient.current) {
    groqClient.current = new Groq({
      apiKey: import.meta.env.VITE_GROQ_API_KEY,
      dangerouslyAllowBrowser: true
    });
  }
  return groqClient.current;
};

  const systemMessage = `You are the F-AST Racing website assistant. Your job is to answer user questions about the event using the information below.

                **Instructions:**
- Answer EXACTLY what the user asks. If the user greets you (e.g., "hi", "hello"), simply return a polite greeting. Do NOT summarize the event or list details unless asked.
- Speak in a normal, helpful, and professional tone. Avoid forced racing slang or being overly dramatic.
- Do NOT mention specific cash prize amounts. Just mention there are awards for Top 3, Best Design, etc.
- If you don't know the answer based on the provided info, suggest they check the relevant section on the page.

**Website Information:**
- Event: F-AST High-Speed Line Follower competition
- Schedule: 13rd February
- Location: National higher school of autonomous systems technologies
- Tech Specs: Max robot dimensions: 20cm x 30cm x 15cm
- Rules: Original designs only, full autonomy required, onboard batteries only
- Registration: Open now. Levels: Beginner, Intermediate, Advanced
- Duration: 3 minutes per run, 5 minutes for finals
- Contact: Instagram @ast_.club`;


  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const client = getGroqClient();

      // Convert messages to Groq format
      const chatMessages = [
        { role: 'system' as const, content: systemMessage },
        ...messages.map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.text
        })),
        { role: 'user' as const, content: userMessage }
      ];

      const completion = await client.chat.completions.create({
        messages: chatMessages,
        model: 'llama-3.3-70b-versatile',
        temperature: 0.7,
        max_tokens: 1024,
      });

      const responseText = completion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";

      setMessages(prev => [...prev, { role: 'assistant', text: responseText }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', text: "Sorry, I'm having trouble connecting right now. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button - Skewed Box Shape */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 z-50 w-16 h-16 bg-black border-2 border-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)] flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-[0_0_30px_rgba(220,38,38,0.8)] -skew-x-12 group ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        aria-label="Open Chat"
      >
        {/* Un-skew wrapper to keep icon normal */}
        <div className="relative flex items-center justify-center w-full h-full skew-x-12">
          <Bot
            className="w-8 h-8 text-white transition-transform duration-300"
            strokeWidth={1.5}
          />
        </div>
      </button>

      {/* Chat Window - Reduced Size */}
      <div
        className={`fixed bottom-8 right-8 z-[60] w-[300px] md:w-[340px] h-[450px] bg-[#050505] border border-neutral-800 shadow-2xl transition-all duration-500 ease-in-out transform origin-bottom-right flex flex-col ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-neutral-800 bg-neutral-900/50">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-600/20 border border-red-600/50 flex items-center justify-center rounded">
              <Cpu className="w-4 h-4 text-red-500" />
            </div>
            <div>
              <h3 className="font-bold text-white text-xs uppercase tracking-wider">Assistant</h3>
              <div className="flex items-center gap-1">
                <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-[9px] text-neutral-400 font-mono">ONLINE</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-neutral-500 hover:text-white transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-hide">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-2.5 text-xs md:text-sm leading-relaxed ${msg.role === 'user'
                  ? 'bg-red-900/20 border border-red-900/50 text-white rounded-tl-lg rounded-bl-lg rounded-br-lg'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-tr-lg rounded-bl-lg rounded-br-lg'
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-neutral-900 border border-neutral-800 p-2.5 rounded-tr-lg rounded-bl-lg rounded-br-lg">
                <Loader2 className="w-3 h-3 text-red-500 animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-3 border-t border-neutral-800 bg-black">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="w-full bg-neutral-900 border border-neutral-800 text-white pl-3 pr-10 py-2.5 focus:outline-none focus:border-red-600 transition-colors text-xs font-mono placeholder:text-neutral-600"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-red-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};