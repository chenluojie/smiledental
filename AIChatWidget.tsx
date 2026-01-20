import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User, Bot, Sparkles } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { GenerateContentResponse } from '@google/genai';

const AIChatWidget: React.FC = () => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize greeting based on language
  useEffect(() => {
    // Only reset/init if no user messages yet, or just update the greeting? 
    // Updating greeting dynamically might be weird if chat has started.
    // Let's just set it if it's empty or only contains the init message.
    setMessages(prev => {
        if (prev.length === 0) {
            return [{ id: 'init', role: 'model', text: t.chat.greeting }];
        }
        return prev;
    });
  }, [t.chat.greeting]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsgId = Date.now().toString();
    const newUserMessage: ChatMessage = { id: userMsgId, role: 'user', text: inputValue };
    
    // Add user message
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Create a placeholder for the AI response
      const botMsgId = (Date.now() + 1).toString();
      const placeholderBotMessage: ChatMessage = { id: botMsgId, role: 'model', text: '', isStreaming: true };
      setMessages(prev => [...prev, placeholderBotMessage]);

      // Note: We might want to prepend "Answer in Chinese:" or similar if the app is in Chinese mode, 
      // but the system prompt already says "Detect user language".
      // However, to be safe, we can append a hidden instruction if the user input is short/ambiguous.
      // But usually Gemini is good at context.
      const streamResponse = await sendMessageToGemini(newUserMessage.text);
      
      let fullText = '';
      
      for await (const chunk of streamResponse) {
          const c = chunk as GenerateContentResponse;
          const chunkText = c.text || '';
          fullText += chunkText;
          
          setMessages(prev => prev.map(msg => 
            msg.id === botMsgId 
              ? { ...msg, text: fullText } 
              : msg
          ));
      }
      
      // Finalize the message state
       setMessages(prev => prev.map(msg => 
            msg.id === botMsgId 
              ? { ...msg, isStreaming: false } 
              : msg
        ));

    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'model', 
        text: language === 'zh' ? "抱歉，我现在无法连接到牙科数据库。请稍后再试。" : "I'm sorry, I'm having trouble connecting to the dental database right now. Please try again later." 
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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[90vw] sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 transition-all transform origin-bottom-right animate-fade-in-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-secondary-500 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-full backdrop-blur-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">{t.chat.title}</h3>
                <p className="text-xs text-blue-100 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full inline-block animate-pulse"></span>
                  {t.chat.online}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-1 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4 scroll-smooth">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'user' ? 'bg-primary-100 text-primary-600' : 'bg-secondary-100 text-secondary-600'
                }`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div 
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-primary-600 text-white rounded-br-none' 
                      : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                  {msg.isStreaming && (
                     <span className="inline-block w-1.5 h-4 ml-1 align-middle bg-secondary-500 animate-pulse"></span>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={t.chat.placeholder}
                className="flex-1 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-full focus:ring-primary-500 focus:border-primary-500 block w-full pl-4 p-3 outline-none transition-all"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                className={`absolute right-1.5 bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  isLoading ? 'animate-pulse' : ''
                }`}
              >
                {isLoading ? <Sparkles size={16} /> : <Send size={16} />}
              </button>
            </div>
            <div className="text-center mt-2">
               <p className="text-[10px] text-gray-400">{t.chat.disclaimer}</p>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen ? 'bg-gray-400 rotate-90 scale-90' : 'bg-gradient-to-r from-primary-600 to-secondary-500 hover:scale-110 shadow-lg hover:shadow-primary-500/30'
        } text-white p-4 rounded-full transition-all duration-300 ease-in-out flex items-center justify-center`}
        aria-label="Toggle Chat"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default AIChatWidget;
