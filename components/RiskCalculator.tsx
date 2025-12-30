
import React, { useState, useMemo } from 'react';
import { PatientData, RiskCategory } from '../types';
import { GENETIC_OPTIONS } from '../constants';

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

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold mb-6 text-blue-800">快速评估与计算</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">主要诊断</label>
            <select 
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
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
              <label className="block text-sm font-medium text-gray-700 mb-1">年龄 (岁)</label>
              <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" value={data.age} onChange={(e) => setData({...data, age: Number(e.target.value)})}/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">初诊 WBC (×10⁹/L)</label>
              <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" value={data.wbcCount} onChange={(e) => setData({...data, wbcCount: Number(e.target.value)})}/>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">身高 (cm)</label>
              <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" value={data.height} onChange={(e) => setData({...data, height: Number(e.target.value)})}/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">体重 (kg)</label>
              <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" value={data.weight} onChange={(e) => setData({...data, weight: Number(e.target.value)})}/>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
             <div className="text-sm text-blue-600 font-semibold uppercase tracking-wider">计算结果 (BSA)</div>
             <div className="text-3xl font-bold text-blue-800">{bsa} <span className="text-lg">m²</span></div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">细胞遗传学/分子生物学标记</label>
          <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto border border-gray-100 p-2 rounded-lg">
            {GENETIC_OPTIONS[data.diagnosis].map(marker => (
              <button
                key={marker}
                onClick={() => toggleMarker(marker)}
                className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                  data.geneticMarkers.includes(marker) 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {marker}
              </button>
            ))}
          </div>

          <div className="mt-6 border-t pt-6">
            <div className="text-sm text-gray-500 mb-1">初步评估结论</div>
            <div className={`text-lg font-bold p-3 rounded-lg ${
              assessment.level === 'Favorable' || assessment.level === 'Low' ? 'bg-green-100 text-green-800' :
              assessment.level === 'Adverse' || assessment.level === 'High' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {assessment.level}: {assessment.description}
            </div>
            <div className="mt-2 text-sm text-gray-600">
              推荐方案：<span className="font-semibold">{assessment.recommendedProtocol}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskCalculator;
