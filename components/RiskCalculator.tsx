import React, { useState, useMemo } from 'react';
import { PatientData, RiskCategory } from '../types.ts';
import { GENETIC_OPTIONS } from '../constants.ts';

const RiskCalculator: React.FC = () => {
  const [data, setData] = useState<PatientData>({
    age: 5,
    weight: 20,
    height: 110,
    wbcCount: 15,
    diagnosis: 'AML',
    geneticMarkers: []
  });

  const bsa = useMemo(() => {
    return Math.sqrt((data.height * data.weight) / 3600).toFixed(2);
  }, [data.height, data.weight]);

  const assessment = useMemo((): RiskCategory => {
    if (data.diagnosis === 'AML') {
      if (data.geneticMarkers.some(m => ['t(8;21)(q22;q22.1)', 'inv(16)(p13.1q22)'].includes(m))) {
        return { level: 'Favorable', description: '预后好', recommendedProtocol: 'AML-2025 Favorable Branch' };
      }
      if (data.geneticMarkers.some(m => ['t(6;9)(p22.3;q34.1)', 'inv(3)(q21.3q26.2)', '复杂核型'].includes(m))) {
        return { level: 'Adverse', description: '预后差', recommendedProtocol: 'AML-2025 Adverse Branch' };
      }
      return { level: 'Intermediate', description: '预后中等', recommendedProtocol: 'AML-2025 Intermediate Branch' };
    }
    
    if (data.diagnosis === 'APL') {
      return data.wbcCount > 10 
        ? { level: 'High', description: '高危 (WBC > 10)', recommendedProtocol: 'APL-2024 High Risk' }
        : { level: 'Low', description: '非高危 (WBC <= 10)', recommendedProtocol: 'APL-2024 Non-High Risk' };
    }

    if (data.diagnosis === 'ALL') {
       if (data.age >= 1 && data.age < 10 && data.wbcCount < 50 && data.geneticMarkers.includes('t(12;21) / ETV6-RUNX1')) {
         return { level: 'Low', description: '低危 (符合年龄/WBC/基因标准)', recommendedProtocol: 'ALL-2023 LR Protocol' };
       }
       return { level: 'Intermediate', description: '需结合诱导后 MRD 进一步判断', recommendedProtocol: 'ALL-2023 IR/HR Protocols' };
    }

    if (data.diagnosis === 'CML') {
      return { level: 'Intermediate', description: '需根据 IS 国际标准监测分期', recommendedProtocol: 'SCCCG-CML-2023' };
    }

    return { level: 'None', description: '待评估', recommendedProtocol: 'N/A' };
  }, [data]);

  const toggleMarker = (marker: string) => {
    setData(prev => ({
      ...prev,
      geneticMarkers: prev.geneticMarkers.includes(marker)
        ? prev.geneticMarkers.filter(m => m !== marker)
        : [...prev.geneticMarkers, marker]
    }));
  };

  const inputClass = "w-full bg-gray-100/50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#007AFF] transition-all outline-none";
  const labelClass = "block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1";

  return (
    <div className="glass-panel rounded-3xl p-8 ios-shadow">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-[#007AFF]/10 rounded-full flex items-center justify-center text-[#007AFF]">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2-2V19a2 2 0 002 2z"></path></svg>
        </div>
        <h2 className="text-xl font-bold tracking-tight text-gray-900">参数化评估</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div>
            <label className={labelClass}>主要诊断</label>
            <select 
              className={inputClass}
              value={data.diagnosis}
              onChange={(e) => setData({...data, diagnosis: e.target.value as any, geneticMarkers: []})}
            >
              <option value="AML">AML (急性髓系白血病)</option>
              <option value="ALL">ALL (急性淋巴细胞白血病)</option>
              <option value="APL">APL (急性早幼粒细胞白血病)</option>
              <option value="CML">CML (慢性粒细胞白血病)</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>年龄 (岁)</label>
              <input type="number" className={inputClass} value={data.age} onChange={(e) => setData({...data, age: Number(e.target.value)})}/>
            </div>
            <div>
              <label className={labelClass}>WBC (×10⁹/L)</label>
              <input type="number" className={inputClass} value={data.wbcCount} onChange={(e) => setData({...data, wbcCount: Number(e.target.value)})}/>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>身高 (cm)</label>
              <input type="number" className={inputClass} value={data.height} onChange={(e) => setData({...data, height: Number(e.target.value)})}/>
            </div>
            <div>
              <label className={labelClass}>体重 (kg)</label>
              <input type="number" className={inputClass} value={data.weight} onChange={(e) => setData({...data, weight: Number(e.target.value)})}/>
            </div>
          </div>

          <div className="p-6 bg-[#007AFF] rounded-3xl text-white flex justify-between items-center shadow-lg shadow-blue-500/20">
             <div>
               <div className="text-[10px] font-bold opacity-70 uppercase tracking-widest">体表面积 (BSA)</div>
               <div className="text-3xl font-black mt-1">{bsa} <span className="text-sm font-medium">m²</span></div>
             </div>
             <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/><path d="M7 12h2v5H7zm4-7h2v12h-2zm4 4h2v8h-2z"/></svg>
             </div>
          </div>
        </div>

        <div className="flex flex-col">
          <label className={labelClass}>基因与分子标记</label>
          <div className="flex flex-wrap gap-2 mb-8 bg-gray-50/50 p-4 rounded-2xl border border-dashed border-gray-200 min-h-[120px] content-start">
            {GENETIC_OPTIONS[data.diagnosis].map(marker => (
              <button
                key={marker}
                onClick={() => toggleMarker(marker)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                  data.geneticMarkers.includes(marker) 
                  ? 'bg-[#007AFF] text-white shadow-md scale-105' 
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-[#007AFF]'
                }`}
              >
                {marker}
              </button>
            ))}
          </div>

          <div className="mt-auto bg-gray-50/80 rounded-3xl p-6 border border-gray-100">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">初步分层建议</div>
            <div className={`text-xl font-black p-4 rounded-2xl inline-block ${
              assessment.level === 'Favorable' || assessment.level === 'Low' ? 'text-green-600 bg-green-50' :
              assessment.level === 'Adverse' || assessment.level === 'High' ? 'text-red-600 bg-red-50' :
              'text-amber-600 bg-amber-50'
            }`}>
              {assessment.level}: {assessment.description}
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#007AFF]"></span>
              推荐方案：<span className="text-[#007AFF]">{assessment.recommendedProtocol}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskCalculator;