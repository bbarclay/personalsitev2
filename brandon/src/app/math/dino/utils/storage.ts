import { EraId } from './era-utils';

interface GameProgress {
  currentEra: EraId;
  score: number;
  unlockedEras: EraId[];
  completedChallenges: string[];
  mathProgress: {
    [concept: string]: {
      attempts: number;
      correct: number;
      lastAttempt: number;
    };
  };
  achievements: {
    [id: string]: {
      earned: boolean;
      earnedAt: number;
    };
  };
  preferences: {
    darkMode: boolean;
    soundEnabled: boolean;
    musicEnabled: boolean;
  };
}

const STORAGE_KEY = 'dino_math_game_progress';

const DEFAULT_PROGRESS: GameProgress = {
  currentEra: 'triassic',
  score: 0,
  unlockedEras: ['triassic'],
  completedChallenges: [],
  mathProgress: {},
  achievements: {},
  preferences: {
    darkMode: false,
    soundEnabled: true,
    musicEnabled: true
  }
};

/**
 * Save game progress to local storage
 */
export function saveProgress(progress: Partial<GameProgress>): void {
  try {
    const currentProgress = getProgress();
    const updatedProgress = {
      ...currentProgress,
      ...progress,
      // Ensure preferences are merged properly
      preferences: {
        ...currentProgress.preferences,
        ...(progress.preferences || {})
      },
      // Ensure math progress is merged properly
      mathProgress: {
        ...currentProgress.mathProgress,
        ...(progress.mathProgress || {})
      },
      // Ensure achievements are merged properly
      achievements: {
        ...currentProgress.achievements,
        ...(progress.achievements || {})
      }
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProgress));
  } catch (error) {
    console.error('Failed to save game progress:', error);
  }
}

/**
 * Get game progress from local storage
 */
export function getProgress(): GameProgress {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return DEFAULT_PROGRESS;

    const parsed = JSON.parse(saved) as Partial<GameProgress>;
    return {
      ...DEFAULT_PROGRESS,
      ...parsed
    };
  } catch (error) {
    console.error('Failed to load game progress:', error);
    return DEFAULT_PROGRESS;
  }
}

/**
 * Update math concept progress
 */
export function updateMathProgress(concept: string, correct: boolean): void {
  const progress = getProgress();
  const conceptProgress = progress.mathProgress[concept] || {
    attempts: 0,
    correct: 0,
    lastAttempt: 0
  };

  progress.mathProgress[concept] = {
    attempts: conceptProgress.attempts + 1,
    correct: conceptProgress.correct + (correct ? 1 : 0),
    lastAttempt: Date.now()
  };

  saveProgress({ mathProgress: progress.mathProgress });
}

/**
 * Check if an era is unlocked
 */
export function isEraUnlocked(era: EraId): boolean {
  const progress = getProgress();
  return progress.unlockedEras.includes(era);
}

/**
 * Unlock a new era
 */
export function unlockEra(era: EraId): void {
  const progress = getProgress();
  if (!progress.unlockedEras.includes(era)) {
    progress.unlockedEras.push(era);
    saveProgress({ unlockedEras: progress.unlockedEras });
  }
}

/**
 * Update achievement status
 */
export function updateAchievement(achievementId: string, earned: boolean = true): void {
  const progress = getProgress();
  if (!progress.achievements[achievementId]?.earned && earned) {
    progress.achievements[achievementId] = {
      earned,
      earnedAt: Date.now()
    };
    saveProgress({ achievements: progress.achievements });
  }
}

/**
 * Get player preferences
 */
export function getPreferences() {
  return getProgress().preferences;
}

/**
 * Update player preferences
 */
export function updatePreferences(preferences: Partial<GameProgress['preferences']>): void {
  const progress = getProgress();
  progress.preferences = {
    ...progress.preferences,
    ...preferences
  };
  saveProgress({ preferences: progress.preferences });
}

/**
 * Reset all game progress
 */
export function resetProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to reset game progress:', error);
  }
}

/**
 * Mark a challenge as completed
 */
export function markChallengeCompleted(challengeId: string): void {
  const progress = getProgress();
  if (!progress.completedChallenges.includes(challengeId)) {
    progress.completedChallenges.push(challengeId);
    saveProgress({ completedChallenges: progress.completedChallenges });
  }
}

/**
 * Check if a challenge is completed
 */
export function isChallengeCompleted(challengeId: string): boolean {
  const progress = getProgress();
  return progress.completedChallenges.includes(challengeId);
}

/**
 * Get mastery level for a math concept
 * Returns a number between 0 and 1
 */
export function getConceptMastery(concept: string): number {
  const progress = getProgress();
  const conceptProgress = progress.mathProgress[concept];
  if (!conceptProgress || conceptProgress.attempts === 0) return 0;

  return conceptProgress.correct / conceptProgress.attempts;
}

/**
 * Get math progress stats
 */
export function getMathStats() {
  const progress = getProgress();
  const concepts = Object.keys(progress.mathProgress);
  
  return {
    totalAttempts: concepts.reduce((sum, concept) => 
      sum + progress.mathProgress[concept].attempts, 0),
    totalCorrect: concepts.reduce((sum, concept) => 
      sum + progress.mathProgress[concept].correct, 0),
    conceptsMastered: concepts.filter(concept => 
      getConceptMastery(concept) >= 0.8).length,
    lastActive: Math.max(...concepts.map(concept => 
      progress.mathProgress[concept].lastAttempt))
  };
}
