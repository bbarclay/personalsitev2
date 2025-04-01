"use client";

import React, { useState, useEffect } from 'react';

interface TutorialProps {
  step: number;
  totalSteps: number;
  message: string;
  onNext: () => void;
}

const Tutorial: React.FC<TutorialProps> = ({ step, totalSteps, message, onNext }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate in when mounted
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Animate when step changes
  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div className="fixed bottom-6 right-6 max-w-md z-50">
      <div 
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-amber-200 dark:border-gray-600 transition-all duration-300 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="p-4">
          <div className="flex gap-3">
            <div className="text-3xl flex-shrink-0">🧑‍🏫</div>
            <div className="flex-1">
              <div className="text-gray-700 dark:text-gray-300 mb-4">
                {message}
              </div>
              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {step + 1} of {totalSteps}
                </div>
                <button 
                  onClick={onNext}
                  className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded transition-colors transform hover:scale-105 active:scale-95"
                >
                  {step < totalSteps - 1 ? 'Next →' : 'Begin!'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial; 