'use client';

import React, { useEffect, useState } from 'react';
import { DinoGame } from './components/DinoGame';
import { getProgress, saveProgress, updateMathProgress, updateAchievement } from './utils/storage';
import { EraId, ERAS } from './utils/era-utils';
import { Button } from '@/components/ui/button';

export default function DinoGamePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [gameState, setGameState] = useState(() => getProgress());

  // Initialize game state
  useEffect(() => {
    const progress = getProgress();
    setGameState(progress);
    setIsLoading(false);
  }, []);

  // Handle score updates
  const handleScoreUpdate = (newScore: number) => {
    setGameState(prev => ({
      ...prev,
      score: newScore
    }));

    // Check for era unlocks
    if (newScore >= 100 && !gameState.unlockedEras.includes('jurassic')) {
      unlockNewEra('jurassic');
    }
    if (newScore >= 300 && !gameState.unlockedEras.includes('cretaceous')) {
      unlockNewEra('cretaceous');
    }
  };

  // Unlock a new era
  const unlockNewEra = (era: EraId) => {
    const updatedEras = [...gameState.unlockedEras, era];
    saveProgress({ unlockedEras: updatedEras });
    
    // Update local state
    setGameState(prev => ({
      ...prev,
      unlockedEras: updatedEras
    }));
  };

  // Switch to a different era
  const switchEra = (era: EraId) => {
    if (!gameState.unlockedEras.includes(era)) return;
    
    saveProgress({ currentEra: era });
    setGameState(prev => ({
      ...prev,
      currentEra: era
    }));
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newPrefs = {
      ...gameState.preferences,
      darkMode: !gameState.preferences.darkMode
    };
    
    saveProgress({ preferences: newPrefs });
    setGameState(prev => ({
      ...prev,
      preferences: newPrefs
    }));
  };

  // Reset progress (for testing)
  const resetAllProgress = () => {
    if (window.confirm('Are you sure you want to reset all game progress? This cannot be undone.')) {
      localStorage.removeItem('dino_math_game_progress');
      window.location.reload();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-2xl font-bold">
          Loading Dino Math Adventure...
        </div>
      </div>
    );
  }

  return (
    <main className={`min-h-screen ${gameState.preferences.darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="fixed top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-4">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <div className="flex items-center mb-2 md:mb-0">
            <span className="text-2xl mr-2">🦖</span>
            <h1 className="text-xl font-bold text-white">Dino Math Adventure</h1>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {gameState.unlockedEras.map(era => (
              <Button
                key={era}
                onClick={() => switchEra(era)}
                className={`transition-colors ${
                  gameState.currentEra === era
                    ? 'bg-blue-500 hover:bg-blue-600'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
                size="sm"
              >
                {ERAS[era].name} Era
              </Button>
            ))}
            
            <Button
              onClick={toggleDarkMode}
              variant="outline"
              size="icon"
              className="ml-2"
            >
              {gameState.preferences.darkMode ? '☀️' : '🌙'}
            </Button>
          </div>
        </div>
      </div>

      <div className="pt-24 pb-12">
        <DinoGame
          darkMode={gameState.preferences.darkMode}
          currentEra={gameState.currentEra}
          onScoreUpdate={handleScoreUpdate}
        />
      </div>
      
      <footer className={`py-6 ${gameState.preferences.darkMode ? 'bg-gray-800' : 'bg-white'} border-t`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-bold">Dino Math Adventure</h3>
              <p className="text-sm opacity-70">Learn math through the exciting world of dinosaurs!</p>
            </div>
            
            <div className="flex gap-4">
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  resetAllProgress();
                }}
                className="text-sm opacity-70 hover:opacity-100"
              >
                Reset Progress
              </a>
              <span className="text-sm opacity-70">|</span>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  alert('How to Play:\n\n1. Explore the Dino World to collect crystals\n2. Answer math problems to earn points\n3. Dig for fossils by solving equations\n4. Take quizzes to test your dinosaur knowledge\n5. Unlock new eras as you score more points');
                }}
                className="text-sm opacity-70 hover:opacity-100"
              >
                How to Play
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
