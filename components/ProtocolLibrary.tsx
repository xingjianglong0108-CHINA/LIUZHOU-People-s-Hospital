import React, { useState } from 'react';
import { DETAILED_PROTOCOLS } from '../constants';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: 'text' | 'table';
  protocolId: string;
}

const ProtocolModal: React.FC<ModalProps> = ({ isOpen, onClose, title, type, protocolId }) => {
  if (!isOpen) return null;

  const renderContent = () => {
    if (type === 'table') {
      return (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-gray-100/50">
                <th className="p-4 font-bold text-gray-700 border-b">药物/操作</th>
                <th className="p-4 font-bold text-gray-700 border-b">标准剂量</th>
                <th className="p-4 font-bold text-gray-700 border-b">给药方式</th>
                <th className="p-4 font-bold text-gray-700 border-b">注意事项</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="p-4 text-gray-800 font-medium">长春新碱 (VCR)</td>
                <td className="p-4 text-gray-600">1.5 mg/m² (max 2mg)</td>
                <td className="p-4 text-gray-600">IV Push</td>
                <td className="p-4 text-gray-600">注意周围神经毒性</td>
              </tr>
              <tr>
                <td className="p-4 text-gray-800 font-medium">柔红霉素 (DNR)</td>
                <td className="p-4 text-gray-600">30 mg/m²</td>
                <td className="p-4 text-gray-600">IV Drip > 1h</td>
                <td className="p-4 text-gray-600">心脏毒性监测，尿液变红告知</td>
              </tr>
              <tr>
                <td className="p-4 text-gray-800 font-medium">环磷酰胺 (CTX)</td>
                <td className="p-4 text-gray-600">1000 mg/m²</td>
                <td className="p-4 text-gray-600">IV Drip</td>
                <td className="p-4 text-gray-600">水化碱化，预防出血性膀胱炎</td>
              </tr>
              <tr>
                <td className="p-4 text-gray-800 font-medium">鞘内注射 (IT)</td>
                <td className="p-4 text-gray-600">按年龄调整</td>
                <td className="p-4 text-gray-600">IT</td>
                <td className="p-4 text-gray-600">三联鞘注：MTX/Ara-C/Dex</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-6 text-[10px] text-gray-400 italic">注：以上数据仅为 {protocolId} 方案示例，具体剂量请以协作组正式下发文件为准。</p>
        </div>
      );
    }

    return (
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <section>
          <h4 className="text-lg font-bold text-gray-900 mb-2">一、 方案概述</h4>
          <p>本方案依据 SCCCG 协作组 2023-2025 年度最新临床研究成果修订，旨在通过更加精准的风险分层降低低危组毒性，并引入免疫治疗提高高危组生存率。</p>
        </section>
        <section>
          <h4 className="text-lg font-bold text-gray-900 mb-2">二、 诱导缓解治疗 (Induction)</h4>
          <p>所有入组患者需在 D0 进行骨髓细胞学、免疫分型及基因检测。诱导期核心目标为达到形态学完全缓解 (CR) 且 MRD &lt; 0.01%。</p>
        </section>
        <section>
          <h4 className="text-lg font-bold text-gray-900 mb-2">三、 巩固与强化 (Consolidation)</h4>
          <p>根据第 15 天及第 33 天的 MRD 结果动态调整后续强度。MRD 持续阳性者建议转入高危路径或评估造血干细胞移植 (HSCT) 指征。</p>
        </section>
        <section className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
          <h4 className="text-sm font-bold text-amber-900 mb-1">特别警示</h4>
          <p className="text-xs text-amber-800">高剂量 MTX 治疗期间必须严密监测血药浓度及肾功能，排泄延迟时需启动加强解救方案。</p>
        </section>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-3xl max-h-[90vh] glass-panel rounded-[32px] ios-shadow overflow-hidden flex flex-col bg-white">
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
          <div>
            <h3 className="text-xl font-extrabold text-gray-900">{title}</h3>
            <p className="text-xs text-[#007AFF] font-bold uppercase tracking-widest mt-0.5">{type === 'text' ? 'Full Protocol Document' : 'Dosage Reference Chart'}</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8">
          {renderContent()}
        </div>
        
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-[#007AFF] text-white rounded-full text-sm font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
          >
            确认查阅
          </button>
        </div>
      </div>
    </div>
  );
};

const ProtocolLibrary: React.FC = () => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    title: string;
    type: 'text' | 'table';
    protocolId: string;
  }>({
    isOpen: false,
    title: '',
    type: 'text',
    protocolId: ''
  });

  const openModal = (protocolTitle: string, type: 'text' | 'table', id: string) => {
    setModalState({
      isOpen: true,
      title: `${protocolTitle} - ${type === 'text' ? '全文查阅' : '剂量表'}`,
      type: type,
      protocolId: id
    });
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
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
                <button 
                  onClick={() => openModal(protocol.title, 'text', protocol.id)}
                  className="flex-1 bg-[#007AFF] text-white text-[13px] font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
                >
                  查阅全文 (PDF)
                </button>
                <button 
                  onClick={() => openModal(protocol.title, 'table', protocol.id)}
                  className="flex-1 glass-panel text-[#007AFF] text-[13px] font-bold py-4 rounded-2xl border-[#007AFF]/20 active:scale-95 transition-all"
                >
                  剂量表
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProtocolModal 
        isOpen={modalState.isOpen}
        onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))}
        title={modalState.title}
        type={modalState.type}
        protocolId={modalState.protocolId}
      />
    </div>
  );
};

export default ProtocolLibrary;