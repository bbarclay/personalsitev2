"use client";

import React, { useState, useEffect } from 'react';

interface StartScreenProps {
  tempPharaohName: string;
  setTempPharaohName: (name: string) => void;
  startGame: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({
  tempPharaohName,
  setTempPharaohName,
  startGame
}) => {
  const [animationStage, setAnimationStage] = useState(0);
  
  // Sequential entrance animations
  useEffect(() => {
    const timers = [
      setTimeout(() => setAnimationStage(1), 300),
      setTimeout(() => setAnimationStage(2), 800),
      setTimeout(() => setAnimationStage(3), 1300),
    ];
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      startGame();
    }
  };

  return (
    <div className="text-center py-8 px-4">
      <h1 
        className={`text-4xl font-bold mb-6 text-amber-600 dark:text-amber-400 transition-all duration-700 transform ${
          animationStage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
        }`}
      >
        Enter the Architect's Chamber
      </h1>
      
      <div className="relative mb-10 max-w-2xl mx-auto">
        {/* Pyramid Illustration */}
        <div 
          className={`w-full max-w-md mx-auto mb-6 transition-all duration-700 transform ${
            animationStage >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <div className="relative">
            <div className="flex flex-col items-center">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className="h-10 bg-amber-500 border border-amber-700" 
                  style={{ 
                    width: `${80 - i * 15}%`, 
                    transitionDelay: `${i * 100}ms`,
                    opacity: animationStage >= 1 ? 1 : 0,
                    transition: 'opacity 0.5s, transform 0.5s',
                    transform: animationStage >= 1 ? 'translateY(0)' : 'translateY(20px)'
                  }}
                />
              ))}
            </div>
            
            {/* Sun behind pyramid */}
            <div 
              className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ 
                width: '60px', 
                height: '60px', 
                background: 'radial-gradient(circle, rgba(251,191,36,0.7) 0%, rgba(251,191,36,0) 70%)',
                opacity: animationStage >= 1 ? 1 : 0,
                transition: 'opacity 1s, transform 1s',
                transform: animationStage >= 1 ? 'scale(5)' : 'scale(3)'
              }}
            />
          </div>
        </div>
        
        <p 
          className={`text-lg mb-8 text-gray-700 dark:text-gray-300 transition-all duration-700 ease-in-out ${
            animationStage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          The great pharaoh awaits a monument for the ages! Prove your knowledge of triangles 
          to construct the perfect pyramid. Apply geometry to solve challenges and rise to become
          the kingdom's Master Architect.
        </p>
        
        <div 
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ease-in-out ${
            animationStage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <input
            type="text"
            value={tempPharaohName}
            onChange={(e) => setTempPharaohName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter Pharaoh's Name"
            maxLength={20}
            className="px-4 py-3 w-full sm:w-64 border border-amber-200 dark:border-gray-600 rounded-md bg-white/90 dark:bg-gray-700/90 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-500"
            autoFocus
          />
          
          <button 
            onClick={startGame}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-md transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-md"
          >
            Begin Construction
          </button>
        </div>
      </div>
      
      <div 
        className={`mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto transition-all duration-1000 ease-in-out ${
          animationStage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="bg-amber-50 dark:bg-gray-700/50 p-4 rounded-lg shadow-md hover:shadow-lg transition-transform hover:-translate-y-1">
          <div className="text-3xl mb-2">🧮</div>
          <h3 className="text-lg font-bold mb-2 text-amber-700 dark:text-amber-300">Master Geometry</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Calculate missing angles and identify triangle types to build your pyramid one block at a time.</p>
        </div>
        
        <div className="bg-amber-50 dark:bg-gray-700/50 p-4 rounded-lg shadow-md hover:shadow-lg transition-transform hover:-translate-y-1">
          <div className="text-3xl mb-2">🏗️</div>
          <h3 className="text-lg font-bold mb-2 text-amber-700 dark:text-amber-300">Build Your Legacy</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Watch your monument grow as you solve increasingly complex geometric challenges.</p>
        </div>
        
        <div className="bg-amber-50 dark:bg-gray-700/50 p-4 rounded-lg shadow-md hover:shadow-lg transition-transform hover:-translate-y-1">
          <div className="text-3xl mb-2">🏆</div>
          <h3 className="text-lg font-bold mb-2 text-amber-700 dark:text-amber-300">Earn Achievements</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Unlock achievements and titles as you demonstrate your mastery of triangular principles.</p>
        </div>
      </div>
    </div>
  );
};

export default StartScreen; 