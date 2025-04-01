import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { Polynomial } from '../types';
import ExplanationPanel from './ExplanationPanel';
import PolynomialGrapher from './PolynomialGrapher';
import RootFinder from './RootFinder';
import FactorizationPanel from './FactorizationPanel';
import OperationsPanel from './OperationsPanel';

interface PolynomialTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  polynomialA: Polynomial;
  polynomialB: Polynomial;
  onPolynomialAChange: (polynomial: Polynomial) => void;
  onPolynomialBChange: (polynomial: Polynomial) => void;
}

const PolynomialTabs: React.FC<PolynomialTabsProps> = ({ 
  activeTab, 
  setActiveTab, 
  polynomialA, 
  polynomialB, 
  onPolynomialAChange, 
  onPolynomialBChange 
}) => {
  const tabs = [
    { id: 'explanation', label: 'Explanation' },
    { id: 'grapher', label: 'Polynomial Grapher' },
    { id: 'roots', label: 'Root Finder' },
    { id: 'factorization', label: 'Factorization' },
    { id: 'operations', label: 'Operations' },
  ];

  return (
    <div>
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        {activeTab === 'explanation' && <ExplanationPanel explanation="Polynomial operations and analysis tool" />}
        {activeTab === 'grapher' && <PolynomialGrapher polynomial={polynomialA} />}
        {activeTab === 'roots' && <RootFinder polynomial={polynomialA} />}
        {activeTab === 'factorization' && <FactorizationPanel polynomial={polynomialA} />}
        {activeTab === 'operations' && (
          <OperationsPanel
            polynomialA={polynomialA}
            polynomialB={polynomialB}
            onPolynomialAChange={onPolynomialAChange}
            onPolynomialBChange={onPolynomialBChange}
          />
        )}
      </div>
    </div>
  );
};

export default PolynomialTabs;
