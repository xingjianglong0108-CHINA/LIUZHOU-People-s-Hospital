
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
    <div className="space-y-10 max-w-4xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">协作网络</h2>
          <p className="text-sm text-gray-500 font-medium mt-1">泛华南地区（粤港澳桂琼）临床协作网络单位名录</p>
        </div>
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            type="text" 
            placeholder="搜索单位或城市..." 
            className="w-full bg-gray-100/80 border-none rounded-2xl pl-12 pr-4 py-4 text-sm focus:ring-2 focus:ring-[#007AFF] outline-none shadow-inner"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-12">
        {sortedProvinces.length > 0 ? (
          sortedProvinces.map(province => (
            <div key={province} className="space-y-4">
              <div className="sticky top-[64px] z-20 glass-panel py-2 px-4 -mx-2 mb-4 rounded-xl">
                 <h3 className="text-sm font-black text-[#007AFF] uppercase tracking-[0.2em] flex items-center gap-3">
                  {province}{['香港', '澳门'].includes(province) ? '' : '省'}
                  <div className="h-[2px] bg-[#007AFF]/10 flex-1"></div>
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groupedUnits[province].map((unit, idx) => (
                  <div key={idx} className="glass-panel p-6 rounded-3xl ios-shadow border-none hover:bg-white transition-colors cursor-pointer group flex items-center gap-5">
                    <div className="w-14 h-14 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center text-gray-400 group-hover:from-blue-50 group-hover:to-blue-100 group-hover:text-[#007AFF] transition-all border border-gray-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-lg tracking-tight group-hover:text-[#007AFF] transition-colors">{unit.name}</h4>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-[10px] font-black text-[#007AFF] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                          {unit.city}
                        </span>
                        <span className="text-[11px] text-gray-400 font-medium">{unit.specialty}</span>
                      </div>
                    </div>
                    <div className="text-gray-300 group-hover:text-[#007AFF] transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="py-24 text-center glass-panel rounded-3xl border-dashed border-gray-200">
            <svg className="w-16 h-16 text-gray-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <p className="text-gray-400 font-bold">无匹配单位</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollaborativeUnits;
