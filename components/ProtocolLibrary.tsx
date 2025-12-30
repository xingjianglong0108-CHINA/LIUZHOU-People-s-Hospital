
import React from 'react';
import { DETAILED_PROTOCOLS } from '../constants';

const ProtocolLibrary: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">SCCCG 方案库</h2>
        <span className="text-sm text-gray-500">更新于 2025年2月</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DETAILED_PROTOCOLS.map((protocol) => (
          <div key={protocol.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:border-blue-300 transition-all group">
            <div className="bg-blue-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-blue-900">{protocol.title}</h3>
              <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-tighter">
                {protocol.status}
              </span>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <span className="text-xs font-semibold text-gray-400 uppercase">适用人群</span>
                <p className="text-sm text-gray-700 font-medium">{protocol.target}</p>
              </div>
              <div className="mb-6">
                <span className="text-xs font-semibold text-gray-400 uppercase">关键更新</span>
                <ul className="mt-2 space-y-2">
                  {protocol.updates.map((update, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      {update}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 bg-blue-800 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  查看全文 (PDF)
                </button>
                <button className="flex-1 border border-blue-800 text-blue-800 text-sm font-medium py-2 rounded-lg hover:bg-blue-50 transition-colors">
                  剂量对照表
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
