import React, { useState } from 'react';
import PAdicExpansion from './PAdicExpansion';
import NormCalculator from './NormCalculator';
import ExplanationPanel from './ExplanationPanel';
import PAdicVisualization from './PAdicVisualization';

interface PAdicTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const PAdicTabs: React.FC<PAdicTabsProps> = ({ activeTab, setActiveTab }) => {
  const [selectedPrime, setSelectedPrime] = useState<number>(2);
  
  const tabs = [
    { id: 'explanation', label: 'Explanation' },
    { id: 'expansion', label: 'p-adic Expansion' },
    { id: 'norm', label: 'Norm Calculator' },
    { id: 'visualization', label: '3D Visualization' },
  ];

  return (
    <div>
      <div className="border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          {tabs.map((tab) => (
            <li key={tab.id} className="mr-2">
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`inline-block p-4 rounded-t-lg ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                    : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        {activeTab === 'explanation' && <ExplanationPanel />}
        {activeTab === 'expansion' && <PAdicExpansion prime={selectedPrime} />}
        {activeTab === 'norm' && <NormCalculator prime={selectedPrime} />}
        {activeTab === 'visualization' && (
          <PAdicVisualization 
            prime={selectedPrime}
            depth={4}
            highlightNumber={1}
          />
        )}
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Select Prime (p):
        </label>
        <select
          value={selectedPrime}
          onChange={(e) => setSelectedPrime(Number(e.target.value))}
          className="mt-1 block w-32 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600"
        >
          {[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47].map((p) => (
            <option key={p} value={p}>
              p = {p}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PAdicTabs;
