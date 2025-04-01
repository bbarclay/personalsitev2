import { useState, useEffect } from 'react';
import { ShowCelebration } from '../types';
import { INITIAL_ACHIEVEMENTS, ERAS } from '../constants/game-data';

export const useGameState = () => {
  // Theme
  const [darkMode, setDarkMode] = useState(false);
  
  // Core game state
  const [gameStarted, setGameStarted] = useState(false);
  const [activeEra, setActiveEra] = useState(0);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState<ShowCelebration | false>(false);
  const [character, setCharacter] = useState('drFossil');
  
  // Achievement tracking
  const [achievements, setAchievements] = useState(INITIAL_ACHIEVEMENTS);
  const [erasVisited, setErasVisited] = useState([0]);

  // Track visited eras and update score
  useEffect(() => {
    if (!erasVisited.includes(activeEra)) {
      setErasVisited([...erasVisited, activeEra]);
      setScore(prev => prev + 20);
      showCelebrationEffect(`You discovered ${ERAS[activeEra].name}! +20 points`);
    }
  }, [activeEra]);

  // Check achievements
  useEffect(() => {
    // Check "Time Traveler" (start game)
    if (gameStarted) {
      unlockAchievement('time_traveler', "Achievement Unlocked: Time Traveler!");
    }

    // Check "Era Explorer" (visit all eras)
    if (erasVisited.length === ERAS.length) {
      unlockAchievement('era_explorer', "Achievement Unlocked: Era Explorer!");
    }
  }, [gameStarted, erasVisited]);

  const unlockAchievement = (id: string, message: string) => {
    setAchievements(prev => {
      const newAchievements = [...prev];
      const foundIndex = newAchievements.findIndex(a => a.id === id);
      if (foundIndex !== -1 && !newAchievements[foundIndex].unlocked) {
        newAchievements[foundIndex].unlocked = true;
        showCelebrationEffect(message);
      }
      return newAchievements;
    });
  };

  const showCelebrationEffect = (message: string) => {
    setShowCelebration({ active: true, message });
    setTimeout(() => {
      setShowCelebration(false);
    }, 3000);
  };

  const toggleTheme = () => setDarkMode(prev => !prev);

  const startGame = () => {
    setGameStarted(true);
    setScore(10);
    showCelebrationEffect("Dinosaur adventure begins! +10 points");
  };

  return {
    // Theme
    darkMode,
    toggleTheme,
    
    // Game state
    gameStarted,
    activeEra,
    score,
    showCelebration,
    character,
    achievements,
    erasVisited,
    
    // Actions
    setActiveEra,
    setCharacter,
    startGame,
    showCelebrationEffect,
    unlockAchievement
  };
};
