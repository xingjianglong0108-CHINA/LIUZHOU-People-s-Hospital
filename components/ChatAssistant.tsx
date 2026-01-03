import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types.ts';
import { generateProtocolResponse } from '../services/geminiService.ts';

const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: '您好，我是 SCCCG 智能专家顾问。请提供患者信息，我将为您调取协作组 AML/ALL/APL 方案的特定建议。' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await generateProtocolResponse([...messages, userMsg]);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "网络超时或 API 配置异常，请刷新页面重试。" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[650px] glass-panel rounded-3xl ios-shadow overflow-hidden border-none">
      <div className="glass-panel sticky top-0 z-10 px-6 py-4 flex items-center justify-between border-b border-gray-200/30">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-tr from-[#007AFF] to-[#5856D6] rounded-full flex items-center justify-center text-white shadow-md">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <span className="block text-sm font-bold text-gray-900 leading-none">AI 专家顾问</span>
            <span className="text-[10px] text-gray-400 font-medium">Gemini-3-Pro 真人式响应</span>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-white/30">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-5 py-3 text-[13px] leading-relaxed shadow-sm ${
              msg.role === 'user' 
              ? 'bg-[#007AFF] text-white rounded-2xl rounded-tr-none font-medium' 
              : 'glass-panel text-gray-800 rounded-2xl rounded-tl-none border-gray-100'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="glass-panel px-5 py-4 rounded-2xl rounded-tl-none shadow-sm">
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-white/50 border-t border-gray-100">
        <div className="relative group">
          <input 
            type="text" 
            className="w-full bg-white border border-gray-200 rounded-2xl pl-5 pr-14 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:border-transparent transition-all shadow-inner"
            placeholder="询问方案细节，如剂量、解救点..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="absolute right-2 top-2 bg-[#007AFF] text-white rounded-xl w-10 h-10 flex items-center justify-center hover:bg-blue-600 disabled:opacity-30 disabled:grayscale transition-all shadow-lg active:scale-90"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
          </button>
        </div>
        <p className="text-[9px] text-gray-400 mt-3 text-center leading-tight">
          重要提示：AI 建议仅供医疗参考。临床决策请务必核实协作组纸质版正式方案。
        </p>
      </div>
    </div>
  );
};

export default ChatAssistant;