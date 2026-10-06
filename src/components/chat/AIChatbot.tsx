import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Paperclip, Loader2, Star, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Provider } from '../../types';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text?: string;
  image?: string;
  technicians?: Provider[];
}

export const AIChatbot: React.FC = () => {
  const { setBookingProvider, providers } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'bot', text: 'Hi! I am ServeMate. Upload a photo of the problem and I will help you find the right technician.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    const newMsg: Message = { id: Date.now().toString(), sender: 'user', text: userText };
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    
    simulateBotResponse(false, userText);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    const newMsg: Message = { id: Date.now().toString(), sender: 'user', image: imageUrl };
    setMessages(prev => [...prev, newMsg]);
    
    simulateBotResponse(true);
  };

  const simulateBotResponse = (hasImage: boolean, userText?: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      let recommended: Provider[] = [];
      let botResponse = "I understand. Can you provide a bit more detail or upload a photo of the issue so I can connect you with the right professional?";

      if (hasImage) {
        recommended = providers.filter(p => p.category.toLowerCase().includes('plumb')).slice(0, 2);
        if (recommended.length === 0) recommended = providers.slice(0, 2);
        botResponse = "I've analyzed the image. It looks like you have a plumbing leak. Here are some top-rated plumbers available near you:";
      } else if (userText) {
        const text = userText.toLowerCase();
        
        // Dynamic Pricing Matcher
        const priceMatch = text.match(/(?:price|cost|charge|medium|average)(?:\s+for|\s+of)\s+(.+)/);
        
        if (priceMatch && !/\bac\b|\bair condition/.test(text)) {
          const item = priceMatch[1].trim().replace('?', '');
          botResponse = `The average price for ${item} typically ranges from ₹250 to ₹800 depending on the exact requirements and parts needed. Here are some top-rated professionals near you who can give you an exact quote:`;
          // Try to guess category from the item
          if (item.includes('tap') || item.includes('pipe') || item.includes('leak')) {
            recommended = providers.filter(p => p.category.toLowerCase().includes('plumb')).slice(0, 2);
          } else if (item.includes('wire') || item.includes('switch') || item.includes('fan')) {
            recommended = providers.filter(p => p.category.toLowerCase().includes('electric')).slice(0, 2);
          } else {
            recommended = providers.slice(0, 2); // default fallback
          }
        } 
        else if (/\bac\b|\bair condition/i.test(text)) {
          botResponse = "The average price for AC servicing and repair is around ₹500 - ₹800 depending on the type (Split/Window). Here are some top-rated AC technicians near you who can help:";
          recommended = providers.filter(p => p.category.toLowerCase().includes('ac') || p.category.toLowerCase().includes('appliance')).slice(0, 2);
        } 
        else if (/\bplumb|\bleak|\btap\b|\bpipe\b/i.test(text)) {
          botResponse = "Plumbing issues? I can definitely help with that. Here are some top-rated plumbers in your area:";
          recommended = providers.filter(p => p.category.toLowerCase().includes('plumb')).slice(0, 2);
        } 
        else if (/\bclean|\bmaid\b/i.test(text)) {
          botResponse = "Looking for cleaning services? Here are some top-rated cleaners ready to assist you:";
          recommended = providers.filter(p => p.category.toLowerCase().includes('clean')).slice(0, 2);
        } 
        else if (/\bhelp\b/i.test(text)) {
          botResponse = "I am ServeMate, your personal assistant. You can upload a photo of your problem or describe it (e.g., 'what is the price for tap replacement', or 'I need a plumber'). I will connect you with the best professionals!";
        }
        
        if (recommended.length === 0 && !/\bhelp\b/i.test(text)) {
           // fallback if no category matched
           if (text.length > 5) {
             botResponse = "I can definitely help with that! Here are some available professionals in your area who might be able to assist:";
             recommended = providers.slice(0, 2);
           }
        }
      }

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'bot',
        text: botResponse,
        technicians: recommended.length > 0 ? recommended : undefined
      }]);
    }, 1500);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 right-4 sm:bottom-6 sm:right-6 p-4 rounded-full bg-ns-navy text-white shadow-[0_8px_22px_-10px_rgba(20,29,68,0.5)] hover:scale-105 transition-all z-40 flex items-center justify-center ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
        aria-label="Open AI Chatbot"
      >
        <Bot size={28} />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-20 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[400px] h-[550px] max-h-[80vh] bg-ns-bg rounded-2xl shadow-elevated flex flex-col overflow-hidden transition-all duration-300 transform origin-bottom-right z-50 border border-ns-border ${isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-ns-navy text-white shadow-sm border-b-2 border-[var(--color-kolam-marigold)]">
          <div className="flex items-center gap-3">
            <div className="bg-ns-primary p-2 rounded-full">
              <Bot size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-lg leading-tight">ServeMate AI</h3>
              <p className="text-xs text-white/80">Intelligent Assistant</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors focus:outline-none">
            <X size={20} />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto bg-ns-bg flex flex-col gap-4 scroll-smooth">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-2xl shadow-soft ${msg.sender === 'user' ? 'bg-ns-primary text-white rounded-br-sm' : 'bg-white text-ns-text rounded-bl-sm border border-ns-border'}`}>
                {msg.image && (
                  <img src={msg.image} alt="Uploaded problem" className="w-full h-auto rounded-lg mb-2 object-cover border border-white/10" />
                )}
                {msg.text && (
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</p>
                )}
                {msg.technicians && msg.technicians.length > 0 && (
                  <div className="mt-3 flex flex-col gap-2">
                    {msg.technicians.map(tech => (
                      <div key={tech.id} className="bg-[var(--color-kolam-wash)] border border-ns-border rounded-lg p-3 shadow-soft text-ns-text">
                        <div className="flex items-center gap-3 mb-2">
                          <img src={tech.avatar} alt={tech.name} className="w-10 h-10 rounded-full object-cover" />
                          <div>
                            <div className="flex items-center gap-1">
                              <h4 className="font-semibold text-sm truncate max-w-[120px]">{tech.name}</h4>
                              {tech.isVerified && <ShieldCheck size={14} className="text-[var(--color-kolam-teal)] shrink-0" />}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-ns-text-secondary">
                              <Star size={12} className="text-[var(--color-kolam-marigold)] fill-[var(--color-kolam-marigold)]" />
                              <span>{tech.rating}</span>
                              <span>({tech.reviewCount})</span>
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => {
                            setBookingProvider(tech);
                            setIsOpen(false);
                          }}
                          className="w-full py-1.5 bg-[var(--color-kolam-marigold)] text-ns-navy hover:bg-opacity-90 rounded-md text-sm font-semibold transition-colors focus:outline-none"
                        >
                          Book Now
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white p-3 rounded-2xl rounded-bl-sm shadow-soft flex items-center gap-3 border border-ns-border">
                <Loader2 size={16} className="animate-spin text-[var(--color-kolam-marigold)]" />
                <span className="text-xs text-ns-text-secondary font-medium">ServeMate is analyzing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-1" />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-[var(--color-kolam-wash)] border-t border-ns-border">
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-full border border-ns-border focus-within:border-[var(--color-kolam-marigold)] focus-within:ring-2 focus-within:ring-[var(--color-kolam-marigold-soft)] transition-all">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 text-ns-text-secondary hover:text-[var(--color-kolam-marigold)] transition-colors rounded-full hover:bg-[var(--color-kolam-sunk)] focus:outline-none"
              title="Upload Photo"
            >
              <Paperclip size={20} />
            </button>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
            <input 
              type="text" 
              placeholder="Type your problem..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-transparent border-none focus:outline-none text-sm px-2 text-ns-text placeholder-ns-text-secondary"
            />
            <button 
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className={`p-2.5 rounded-full transition-all flex items-center justify-center focus:outline-none ${inputValue.trim() ? 'bg-[var(--color-kolam-marigold)] text-ns-navy hover:bg-opacity-90 shadow-soft' : 'bg-[var(--color-kolam-sunk)] text-ns-text-secondary cursor-not-allowed'}`}
            >
              <Send size={18} className={inputValue.trim() ? "ml-0.5" : ""} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
