import type { Achievement } from '../types/game';

interface AchievementDefinition {
  id: string;
  name: string;
  description: string;
  requiredPoints?: number;
  requiredFossils?: number;
  requiredEras?: number;
}

export const ACHIEVEMENTS: Record<string, AchievementDefinition> = {
  time_traveler: {
    id: 'time_traveler',
    name: 'Time Traveler',
    description: 'Begin your dinosaur adventure',
  },
  era_explorer: {
    id: 'era_explorer',
    name: 'Era Explorer',
    description: 'Visit all dinosaur eras',
    requiredEras: 4,
  },
  fossil_finder: {
    id: 'fossil_finder',
    name: 'Fossil Finder',
    description: 'Collect 10 unique fossils',
    requiredFossils: 10,
  },
  memory_master: {
    id: 'memory_master',
    name: 'Memory Master',
    description: 'Win the Dino Name Memory Game',
  },
  point_master: {
    id: 'point_master',
    name: 'Point Master',
    description: 'Earn 1000 points',
    requiredPoints: 1000,
  }
};

export function mapUnlockedAchievements(unlockedIds: string[]): Achievement[] {
  return unlockedIds.map(id => {
    const def = ACHIEVEMENTS[id];
    return {
      ...def,
      isUnlocked: true
    };
  }).filter(Boolean);
}

export function getLockedAchievements(unlockedIds: string[]): Achievement[] {
  return Object.values(ACHIEVEMENTS)
    .filter(def => !unlockedIds.includes(def.id))
    .map(def => ({
      ...def,
      isUnlocked: false
    }));
}

export function getAllAchievements(unlockedIds: string[]): Achievement[] {
  return Object.values(ACHIEVEMENTS).map(def => ({
    ...def,
    isUnlocked: unlockedIds.includes(def.id)
  }));
}
