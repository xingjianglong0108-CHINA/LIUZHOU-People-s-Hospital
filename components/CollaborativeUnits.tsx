
import React, { useState, useMemo } from 'react';
import { COLLABORATIVE_UNITS } from '../constants';

const CollaborativeUnits: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUnits = useMemo(() => {
    return COLLABORATIVE_UNITS.filter(unit => 
      unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.province.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const groupedUnits = useMemo(() => {
    const groups: Record<string, typeof COLLABORATIVE_UNITS> = {};
    filteredUnits.forEach(unit => {
      if (!groups[unit.province]) {
        groups[unit.province] = [];
      }
      groups[unit.province].push(unit);
    });
    return groups;
  }, [filteredUnits]);

  // Sort provinces - keep Guangdong first, then alphabetical or regional order
  const provinceOrder = ['广东', '香港', '澳门', '广西', '海南'];
  const sortedProvinces = Object.keys(groupedUnits).sort((a, b) => {
    const indexA = provinceOrder.indexOf(a);
    const indexB = provinceOrder.indexOf(b);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.localeCompare(b);
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">协作组单位名录</h2>
          <p className="text-sm text-gray-500">泛华南地区（粤港澳桂琼）临床协作网络单位</p>
        </div>
        <div className="relative w-full md:w-72">
          <input 
            type="text" 
            placeholder="搜索单位、城市或省份..." 
            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="space-y-10">
        {sortedProvinces.length > 0 ? (
          sortedProvinces.map(province => (
            <div key={province} className="space-y-4">
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-bold text-blue-900 bg-blue-50 px-3 py-1 rounded-md border border-blue-100 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  {province}{['香港', '澳门'].includes(province) ? '' : '省'}
                </h3>
                <div className="h-px bg-gray-200 flex-1"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groupedUnits[province].map((unit, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-blue-600 shrink-0 border border-gray-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-base">{unit.name}</h4>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <span className="flex items-center gap-1 font-medium text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                          {unit.city}
                        </span>
                        <span className="text-gray-300">|</span>
                        <span>{unit.specialty}</span>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center bg-white rounded-2xl border border-dashed border-gray-300">
            <p className="text-gray-400">未找到相关单位</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollaborativeUnits;
