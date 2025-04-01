import { useState, useEffect } from 'react';
import { AVAILABLE_FOSSILS } from '../constants/game-data';

export const useFossilCollection = (
  showCelebrationEffect: (message: string) => void,
  unlockAchievement: (id: string, message: string) => void,
  updateScore: (points: number) => void
) => {
  const [fossilCollection, setFossilCollection] = useState<string[]>([]);

  // Check fossil finder achievement
  useEffect(() => {
    if (fossilCollection.length >= 10) {
      unlockAchievement('fossil_finder', "Achievement Unlocked: Fossil Finder!");
    }
  }, [fossilCollection, unlockAchievement]);

  const collectFossil = () => {
    // Get fossils that haven't been collected yet
    const uncollected = AVAILABLE_FOSSILS.filter(f => !fossilCollection.includes(f));
    
    if (uncollected.length === 0) {
      showCelebrationEffect("You've collected all fossils! Incredible!");
      return;
    }

    // Select a random uncollected fossil
    const randomIndex = Math.floor(Math.random() * uncollected.length);
    const newFossil = uncollected[randomIndex];
    
    // Add to collection
    setFossilCollection(prev => [...prev, newFossil]);
    
    // Update score
    updateScore(10);
    showCelebrationEffect(`You found a ${newFossil}! +10 points`);
  };

  return {
    fossilCollection,
    collectFossil
  };
};
