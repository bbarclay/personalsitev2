"use client";

import React from 'react';
import { GameState, Theme } from '../types';

interface HeaderProps {
  gameState: GameState;
  theme: Theme;
  toggleTheme: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  gameState, 
  theme, 
  toggleTheme,
  soundEnabled,
  toggleSound 
}) => {
  return (
    <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-amber-200 dark:border-gray-700 shadow-md py-3 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-amber-600 dark:text-amber-400">
          <span className="text-3xl">🏺</span> 
          Pyramid Builders 
          <span className="text-base font-normal text-gray-500 dark:text-gray-400 hidden sm:inline-block">🔺 Architects</span>
        </h1>
        
        {gameState.gameStarted && (
          <div className="hidden md:flex items-center gap-6 text-sm">
            <span className="flex items-center gap-1">
              <span>👑 Pharaoh:</span> 
              <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{gameState.pharaohName}</span>
            </span>
            
            <span className="flex items-center gap-1">
              <span>📜 Knowledge:</span> 
              <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{gameState.knowledgePoints}</span>
            </span>
            
            <span className="flex items-center gap-2">
              <span className="whitespace-nowrap">🏗️ Progress:</span>
              <div className="relative w-32 h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="absolute left-0 top-0 h-full bg-amber-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${gameState.pyramidProgress}%` }}
                ></div>
              </div>
              <span className="font-mono text-xs">{Math.round(gameState.pyramidProgress)}%</span>
            </span>
          </div>
        )}
        
        <div className="flex items-center gap-2">
          {/* Sound Toggle Button */}
          <button 
            onClick={toggleSound} 
            className="p-2 rounded-full border border-amber-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-amber-400 dark:hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            aria-label={soundEnabled ? "Mute sound" : "Unmute sound"}
            title={soundEnabled ? "Mute sound" : "Unmute sound"}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
          
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full border border-amber-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-amber-400 dark:hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            aria-label="Toggle theme"
            title={theme === 'day' ? "Switch to night mode" : "Switch to day mode"}
          >
            {theme === 'day' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 