import React from 'react';
import { PythagoreanCalculator } from './PythagoreanCalculator';
import VisualProof from './VisualProof';
import ApplicationsPanel from './ApplicationsPanel';
import PythagoreanTriples from './PythagoreanTriples';
import ExplanationPanel from './ExplanationPanel';

interface PythagoreanTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const PythagoreanTabs: React.FC<PythagoreanTabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'solver', label: 'Calculator' },
    { id: 'explanation', label: 'How It Works' },
    { id: 'visualProof', label: 'Visual Proof' },
    { id: 'triples', label: 'Pythagorean Triples' },
    { id: 'applications', label: 'Real-World Applications' },
  ];

  // Map of tab IDs to components
  const panelComponents = {
    solver: PythagoreanCalculator,
    explanation: ExplanationPanel,
    visualProof: VisualProof,
    triples: PythagoreanTriples,
    applications: ApplicationsPanel,
  };

  // Dynamically render the active component
  const ActivePanel = panelComponents[activeTab];

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
        {ActivePanel && <ActivePanel />}
      </div>
    </div>
  );
};

export default PythagoreanTabs; 