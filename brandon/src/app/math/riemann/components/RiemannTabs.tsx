import React from 'react';
import ZetaFunctionPlot from './ZetaFunctionPlot';
import ZeroFinder from './ZeroFinder';
import PrimeDistribution from './PrimeDistribution';
import ExplanationPanel from './ExplanationPanel';
import RiemannVisualization from './RiemannVisualization';

interface RiemannTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const RiemannTabs: React.FC<RiemannTabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'explanation', label: 'Explanation' },
    { id: 'zetaFunction', label: 'Zeta Function' },
    { id: 'zeros', label: 'Non-trivial Zeros' },
    { id: 'visualization', label: '3D Visualization' },
    { id: 'primeDistribution', label: 'Prime Distribution' },
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
        {activeTab === 'explanation' && (
          <ExplanationPanel explanation="The Riemann zeta function is a fundamental function in number theory that extends the concept of summing series to complex numbers. It has deep connections to prime numbers and the distribution of primes." />
        )}
        {activeTab === 'zetaFunction' && <ZetaFunctionPlot />}
        {activeTab === 'zeros' && <ZeroFinder />}
        {activeTab === 'visualization' && <RiemannVisualization />}
        {activeTab === 'primeDistribution' && <PrimeDistribution />}
      </div>
    </div>
  );
};

export default RiemannTabs;
