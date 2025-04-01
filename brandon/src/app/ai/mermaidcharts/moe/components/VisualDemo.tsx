'use client';

import React, { useState } from 'react';

const VisualDemo: React.FC = () => {
  const [input, setInput] = useState('');
  const [activeExperts, setActiveExperts] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const experts = [
    { id: 1, name: 'Language Expert', specialty: 'Grammar and language structure' },
    { id: 2, name: 'Math Expert', specialty: 'Mathematical calculations and concepts' },
    { id: 3, name: 'Science Expert', specialty: 'Scientific knowledge and reasoning' },
    { id: 4, name: 'Logic Expert', specialty: 'Logical reasoning and problem-solving' },
    { id: 5, name: 'Creative Expert', specialty: 'Creative writing and storytelling' },
  ];
  
  const handleInputSubmit = () => {
    setIsProcessing(true);
    
    // Simulate expert selection based on input
    setTimeout(() => {
      // Simple selection logic (in real MoE this would be much more sophisticated)
      const selected = [];
      
      if (input.match(/math|calculation|equation|number|formula|solve/i)) {
        selected.push(2);
      }
      
      if (input.match(/science|physics|chemistry|biology|theory/i)) {
        selected.push(3);
      }
      
      if (input.match(/story|creative|imagine|fiction|write/i)) {
        selected.push(5);
      }
      
      if (input.match(/logic|reason|argument|if|then|therefore/i)) {
        selected.push(4);
      }
      
      // Language expert is activated for almost any input
      selected.push(1);
      
      setActiveExperts(selected);
      setIsProcessing(false);
    }, 1000);
  };
  
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Interactive MoE Demo</h2>
      
      <div className="flex flex-col items-center mb-8">
        <div className="w-full max-w-lg mb-4">
          <label htmlFor="prompt" className="block text-sm font-medium mb-2">Enter a prompt:</label>
          <div className="flex gap-2">
            <input
              id="prompt"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., Calculate the square root of 144" 
              className="flex-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800"
            />
            <button
              onClick={handleInputSubmit}
              disabled={!input.trim() || isProcessing}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
            >
              Process
            </button>
          </div>
        </div>
        
        <div className="w-full max-w-3xl mt-8">
          <h3 className="text-xl font-semibold mb-4">Experts Network</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {experts.map((expert) => (
              <div 
                key={expert.id}
                className={`border rounded-lg p-4 transition-all ${
                  activeExperts.includes(expert.id)
                    ? 'border-green-500 bg-green-50 dark:bg-green-950/30 shadow-md scale-105'
                    : 'border-gray-300 dark:border-gray-700'
                }`}
              >
                <div className="font-bold">{expert.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{expert.specialty}</div>
                {activeExperts.includes(expert.id) && (
                  <div className="mt-2 text-green-600 dark:text-green-400 text-sm font-medium">
                    Active ✓
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {activeExperts.length > 0 && (
            <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
              <h4 className="font-bold mb-2">Response Strategy:</h4>
              <p>
                For this input, the router has activated {activeExperts.length} expert(s). 
                The system will combine knowledge from {activeExperts.map(id => experts.find(e => e.id === id)?.name).join(', ')}.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisualDemo; 