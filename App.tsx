import React, { useState } from 'react';
import RiskCalculator from './components/RiskCalculator';
import ChatAssistant from './components/ChatAssistant';
import ProtocolLibrary from './components/ProtocolLibrary';
import { PROTOCOL_BRIEFS } from './constants';

type TabType = 'workbench' | 'protocols';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('workbench');

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      {/* Header - iOS Frosted Glass */}
      <header className="glass-panel sticky top-0 z-[100] w-full shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#007AFF] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
              S
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900 tracking-tight">SCCCG 智能专家顾问</h1>
              <p className="text-[10px] text-[#007AFF] font-bold tracking-widest uppercase opacity-80">Decision Support System</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {[
              { id: 'workbench', label: '工作台' },
              { id: 'protocols', label: '方案库' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-[#007AFF] text-white' 
                    : 'text-gray-500 hover:bg-gray-200/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
        {activeTab === 'workbench' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-6">
              <section className="glass-panel rounded-3xl p-8 ios-shadow overflow-hidden relative">
                <div className="relative z-10">
                  <h2 className="text-3xl font-extrabold mb-3 tracking-tight text-gray-900">临床决策支持</h2>
                  <p className="text-gray-500 max-w-xl leading-relaxed">
                    整合 2023-2025 最新方案，通过 AI 与结构化评估，为华南地区儿科血液肿瘤医生提供即时辅助。
                  </p>
                </div>
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" className="text-[#007AFF]"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
                </div>
              </section>

              <RiskCalculator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(PROTOCOL_BRIEFS).map(([key, brief]) => (
                  <div key={key} className="glass-panel p-6 rounded-2xl ios-shadow hover:scale-[1.01] transition-transform">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1.5 h-6 bg-[#007AFF] rounded-full"></div>
                      <h3 className="font-bold text-gray-800">{key} 动态</h3>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{brief}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                <ChatAssistant />
                <div className="glass-panel rounded-2xl p-6 ios-shadow border-none">
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    操作指南
                  </h4>
                  <ul className="space-y-3">
                    {['左侧输入指标自动计算 BSA 及风险分层', '右侧 AI 可解答剂量细节与监测要求', '方案库可查阅最新修订全文'].map((text, i) => (
                      <li key={i} className="text-xs text-gray-500 flex gap-2">
                        <span className="text-[#007AFF] font-bold">{i+1}.</span>
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'protocols' && <ProtocolLibrary />}
      </main>

      {/* Footer */}
      <footer className="mt-auto py-8 text-center text-gray-400 text-xs px-4">
        <p>© 2024 SCCCG 华南地区儿童癌症协作组 | 泛华南临床决策支持系统 v1.5</p>
        <div className="mt-4 flex justify-center gap-6">
          <button className="hover:text-[#007AFF]">隐私政策</button>
          <button className="hover:text-[#007AFF]">使用条款</button>
          <button className="hover:text-[#007AFF]">技术支持</button>
        </div>
      </footer>

      {/* iOS Mobile Bottom Tab Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 glass-panel h-20 px-6 flex items-center justify-center gap-16 z-[100] border-t border-gray-200/50">
        {[
          { id: 'workbench', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', label: '工作台' },
          { id: 'protocols', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', label: '方案库' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === tab.id ? 'text-[#007AFF]' : 'text-gray-400'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tab.icon}></path>
            </svg>
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;