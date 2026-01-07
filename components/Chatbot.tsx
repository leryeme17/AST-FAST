import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Cpu, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello! I can help you with questions about the F-AST Racing Competition rules, schedule, or registration.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatHistory = useRef<Message[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    const newUserMsg: Message = { role: 'user', text: userMessage };
    setMessages(prev => [...prev, newUserMsg]);
    chatHistory.current.push(newUserMsg);
    setIsLoading(true);

    try {
      const API_KEY = "AIzaSyCzQkiNjWZlFt855l0BVTTp72hq2n_NlC4";
      
      // Build conversation history for context
      const contents = chatHistory.current.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: contents,
            systemInstruction: {
              parts: [{
                text: `You are the F-AST Racing website assistant. Your job is to answer user questions about the event using the information below.

**Instructions:**
- Answer EXACTLY what the user asks. If the user greets you (e.g., "hi", "hello"), simply return a polite greeting. Do NOT summarize the event or list details unless asked.
- Speak in a normal, helpful, and professional tone. Avoid forced racing slang or being overly dramatic.
- Do NOT mention specific cash prize amounts (like $5000). Just mention there are awards for Top 3, Best Design, etc.
- If you don't know the answer based on the provided info, suggest they check the relevant section on the page.

**Website Information:**
- **Event:** F-AST High-Speed Line Follower competition.
- **Concept:** Autonomous line-following robot racing.
- **Schedule:** 13rd February.
- **Location:** National higher school of autonomous systems technologies.
- **Competitions:** Line Following (Navigation/PID) and Speed Trap (Velocity).
- **Divisions:** Stock and Modified classes.
- **Tech Specs:** 
    - Max robot dimensions: 20cm x 30cm x 15cm.
    - Track: Vinyl matte finish with a black line on white substrate.
- **Rules:** All robots must be originally designed and built by the participating team, with pre-built robots, commercial kits, and Lego systems strictly forbidden; they must operate in full autonomy from start to finish without any remote control, off-board computation, or external assistance, and be powered exclusively by onboard batteries, while also adhering to physical requirements ensuring they cause no damage to the track surface and maintain structural integrity throughout the entire run.
- **Registration:** Open now. Levels: Beginner, Intermediate, Advanced.
- **Duration:** Each run lasts 3 minutes, except the final which is 5 minutes.
- **Judging:** Based on fastest time and accuracy in line following.
- **Prizes:** Awards for Top 3 teams, speed based.
- **Contact:** Follow on Instagram @ast_.club for updates.
- **FAQ:** 
    - Any microcontroller (Arduino, Raspberry Pi) and language (C++, Python) allowed.
    - Minor repairs allowed in pits; no major structural changes during event.
    - Bring your own tools, laptop, and spares.`
              }]
            },
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500,
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (responseText) {
        const botMsg: Message = { role: 'model', text: responseText };
        setMessages(prev => [...prev, botMsg]);
        chatHistory.current.push(botMsg);
      } else {
        throw new Error('No response from API');
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "Sorry, I'm having trouble connecting right now. Please try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 z-50 w-16 h-16 bg-black border-2 border-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)] flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-[0_0_30px_rgba(220,38,38,0.8)] -skew-x-12 group ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        aria-label="Open Chat"
      >
        <div className="relative flex items-center justify-center w-full h-full skew-x-12">
          <Bot 
            className="w-8 h-8 text-white transition-transform duration-300" 
            strokeWidth={1.5}
          />
        </div>
      </button>

      {/* Chat Window */}
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
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] p-2.5 text-xs md:text-sm leading-relaxed ${
                  msg.role === 'user' 
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
        <div className="p-3 border-t border-neutral-800 bg-black">
          <div className="relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a question..."
              className="w-full bg-neutral-900 border border-neutral-800 text-white pl-3 pr-10 py-2.5 focus:outline-none focus:border-red-600 transition-colors text-xs font-mono placeholder:text-neutral-600"
              disabled={isLoading}
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-red-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}