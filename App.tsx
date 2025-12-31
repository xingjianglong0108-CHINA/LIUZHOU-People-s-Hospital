
import React, { useState } from 'react';
import RiskCalculator from './components/RiskCalculator';
import ChatAssistant from './components/ChatAssistant';
import ProtocolLibrary from './components/ProtocolLibrary';
import { PROTOCOL_BRIEFS } from './constants';

type TabType = 'workbench' | 'protocols';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('workbench');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-800 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-inner">
              S
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-tight">SCCCG 智能专家顾问</h1>
              <p className="text-xs text-blue-600 font-medium tracking-wide uppercase">泛华南地区儿童癌症协作组方案助手</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 h-full">
            <button 
              onClick={() => setActiveTab('workbench')}
              className={`text-sm font-medium h-full px-2 transition-all border-b-2 ${activeTab === 'workbench' ? 'text-blue-800 border-blue-800' : 'text-gray-500 border-transparent hover:text-blue-800'}`}
            >
              工作台
            </button>
            <button 
              onClick={() => setActiveTab('protocols')}
              className={`text-sm font-medium h-full px-2 transition-all border-b-2 ${activeTab === 'protocols' ? 'text-blue-800 border-blue-800' : 'text-gray-500 border-transparent hover:text-blue-800'}`}
            >
              方案库
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
        {activeTab === 'workbench' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section>
                <div className="bg-gradient-to-r from-blue-800 to-indigo-900 rounded-2xl p-6 text-white mb-8 relative overflow-hidden shadow-lg">
                  <div className="relative z-10">
                    <h2 className="text-2xl font-bold mb-2">欢迎使用协作组决策支持系统</h2>
                    <p className="text-blue-100 max-w-lg">
                      整合 2023-2025 年最新修订方案，支持 AML, ALL, APL 和 CML 的全流程临床决策辅助。
                    </p>
                  </div>
                  <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20"></div>
                </div>
                <RiskCalculator />
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(PROTOCOL_BRIEFS).map(([key, brief]) => (
                  <div key={key} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">{key}</span>
                      <h3 className="font-bold text-gray-800">最新动态</h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{brief}</p>
                  </div>
                ))}
              </section>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <ChatAssistant />
                <div className="mt-6 p-5 bg-white rounded-xl border border-gray-200 shadow-sm text-xs text-gray-500">
                  <h4 className="font-bold text-gray-800 mb-2">操作提示</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>使用左侧工具进行风险预评估</li>
                    <li>右侧咨询 AI 获取具体的给药方案建议</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'protocols' && <ProtocolLibrary />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-gray-400">
            © 2024 SCCCG 华南地区儿童癌症协作组 | 医学决策支持系统 v1.2
          </div>
          <div className="flex gap-4">
            <button className="text-xs text-blue-600 hover:underline">隐私条款</button>
            <button className="text-xs text-blue-600 hover:underline">协作组公约</button>
            <button className="text-xs text-blue-600 hover:underline">联系技术支持</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
