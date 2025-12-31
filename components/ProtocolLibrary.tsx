
import React from 'react';
import { DETAILED_PROTOCOLS } from '../constants';

const ProtocolLibrary: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex items-end justify-between px-2">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">方案知识库</h2>
          <p className="text-sm text-gray-500 font-medium mt-1 uppercase tracking-widest">SCCCG Official Protocols</p>
        </div>
        <div className="bg-[#007AFF]/10 text-[#007AFF] text-[10px] font-bold px-3 py-1 rounded-full border border-[#007AFF]/20">
          最后更新: 2025.02
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {DETAILED_PROTOCOLS.map((protocol) => (
          <div key={protocol.id} className="glass-panel rounded-3xl ios-shadow overflow-hidden group hover:scale-[1.02] transition-all duration-300">
            <div className="bg-[#007AFF]/5 px-8 py-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-extrabold text-gray-900 group-hover:text-[#007AFF] transition-colors">{protocol.title}</h3>
              <span className="bg-white text-gray-400 text-[10px] font-black px-2.5 py-1 rounded-full border border-gray-100 shadow-sm">
                {protocol.status}
              </span>
            </div>
            <div className="p-8">
              <div className="mb-6">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">适应人群</span>
                <p className="text-sm text-gray-700 font-semibold bg-gray-50 p-3 rounded-xl border border-gray-100">{protocol.target}</p>
              </div>
              <div className="mb-8">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-3">关键更新亮点</span>
                <ul className="space-y-3">
                  {protocol.updates.map((update, idx) => (
                    <li key={idx} className="text-[13px] text-gray-600 flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      <span className="leading-relaxed">{update}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-4">
                <button className="flex-1 bg-[#007AFF] text-white text-[13px] font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
                  查阅全文 (PDF)
                </button>
                <button className="flex-1 glass-panel text-[#007AFF] text-[13px] font-bold py-4 rounded-2xl border-[#007AFF]/20 active:scale-95 transition-all">
                  剂量表
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProtocolLibrary;
