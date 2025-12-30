
import React from 'react';
import { COLLABORATIVE_UNITS } from '../constants';

const CollaborativeUnits: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">协作组单位名录</h2>
          <p className="text-sm text-gray-500">泛华南地区（粤港澳桂琼）临床协作网络</p>
        </div>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="搜索单位或地区..." 
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100">
        {COLLABORATIVE_UNITS.map((unit, idx) => (
          <div key={idx} className="p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{unit.name}</h3>
                <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {unit.region}
                  </span>
                  <span className="text-gray-300">|</span>
                  <span className="text-blue-600 font-medium">{unit.role}</span>
                </div>
                <p className="mt-2 text-xs text-gray-400">专长方向：{unit.specialty}</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <button className="px-4 py-1.5 border border-gray-200 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                联系方式
              </button>
              <button className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors">
                机构详情
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollaborativeUnits;
