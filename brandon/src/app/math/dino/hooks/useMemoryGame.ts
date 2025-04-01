import { useState } from 'react';
import { MemoryGameState } from '../types';
import { DINO_NAME_POOL } from '../constants/game-data';

export const useMemoryGame = (
updatePoints: (points: number) => void, showCelebrationEffect: (message: string) => void, minNames: number, maxNames: number, unlockAchievement: (id: string, message: string) => void, updateScore: (points: number) => void) => {
  const [memoryGameActive, setMemoryGameActive] = useState<MemoryGameState>(false);
  const [memoryDinoNames, setMemoryDinoNames] = useState<string[]>([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [memoryResult, setMemoryResult] = useState<boolean | null>(null);

  const startMemoryGame = () => {
    // Random 3-5 dinosaur names from the pool
    const length = Math.floor(Math.random() * 3) + 3;
    const selectedNames = [...DINO_NAME_POOL]
      .sort(() => 0.5 - Math.random()) // shuffle
      .slice(0, length);

    setMemoryDinoNames(selectedNames);
    setMemoryGameActive('show');

    // After 4 seconds, hide the dino names
    setTimeout(() => {
      setMemoryGameActive('input');
    }, 4000);
  };

  const submitMemoryAnswer = () => {
    // Check if user typed exactly the dino names in the correct order (joined by spaces)
    const correct = userAnswer.trim().toLowerCase() === memoryDinoNames.map(name => name.toLowerCase()).join(" ");
    setMemoryResult(correct);

    if (correct) {
      const points = memoryDinoNames.length * 10;
      updateScore(points);
      showCelebrationEffect(`Correct! +${points} points`);
      // Unlock Memory Master if not already
      unlockAchievement('memory_master', "Achievement Unlocked: Memory Master!");
    }

    setTimeout(() => {
      resetMemoryGame();
    }, 2000);
  };

  const resetMemoryGame = () => {
    setMemoryGameActive(false);
    setMemoryResult(null);
    setUserAnswer('');
  };

  return {
    memoryGameActive,
    memoryDinoNames,
    userAnswer,
    memoryResult,
    setUserAnswer,
    startMemoryGame,
    submitMemoryAnswer
  };
};
