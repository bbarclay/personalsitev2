import { useState, useCallback, useEffect } from 'react';
import { ERA_MATH_CONTENT } from '../constants/math-concepts';

interface ProgressState {
  [era: string]: {
    problemsAttempted: number;
    correctAnswers: number;
    concepts: {
      [concept: string]: number; // Mastery level 0-100
    };
  };
}

interface MathAward {
  title: string;
  description: string;
  type: 'concept' | 'achievement' | 'milestone';
  icon: string;
}

export function useMathProgress(
  currentEra: string,
  updatePoints: (points: number) => void,
  unlockAchievement: (id: string) => void
) {
  const [progress, setProgress] = useState<ProgressState>(() => ({
    triassic: { problemsAttempted: 0, correctAnswers: 0, concepts: {} },
    jurassic: { problemsAttempted: 0, correctAnswers: 0, concepts: {} },
    cretaceous: { problemsAttempted: 0, correctAnswers: 0, concepts: {} }
  }));

  // Track mastery levels for each math concept
  const [conceptMastery, setConceptMastery] = useState<Record<string, number>>({});

  // Handle correct answer
  const handleCorrectAnswer = useCallback((era: string, conceptsUsed: string[]) => {
    // Update progress
    setProgress(prev => ({
      ...prev,
      [era]: {
        ...prev[era],
        problemsAttempted: prev[era].problemsAttempted + 1,
        correctAnswers: prev[era].correctAnswers + 1
      }
    }));

    // Update concept mastery
    setConceptMastery(prev => {
      const updated = { ...prev };
      conceptsUsed.forEach(concept => {
        updated[concept] = (updated[concept] || 0) + 10; // Increase mastery by 10%
        if (updated[concept] >= 100) {
          unlockAchievement(`mastery_${concept.toLowerCase().replace(/\s+/g, '_')}`);
        }
      });
      return updated;
    });

    // Award points based on difficulty and concepts
    const basePoints = 10;
    const conceptBonus = conceptsUsed.length * 5;
    const streakBonus = progress[era].correctAnswers >= 3 ? 15 : 0;
    const totalPoints = basePoints + conceptBonus + streakBonus;

    updatePoints(totalPoints);

    // Check for achievements
    checkAchievements(era);
  }, [progress, updatePoints, unlockAchievement]);

  // Handle incorrect answer
  const handleIncorrectAnswer = useCallback((era: string) => {
    setProgress(prev => ({
      ...prev,
      [era]: {
        ...prev[era],
        problemsAttempted: prev[era].problemsAttempted + 1
      }
    }));
  }, []);

  // Calculate accuracy for an era
  const getEraAccuracy = useCallback((era: string) => {
    const { problemsAttempted, correctAnswers } = progress[era];
    if (problemsAttempted === 0) return 0;
    return (correctAnswers / problemsAttempted) * 100;
  }, [progress]);

  // Check achievements based on progress
  const checkAchievements = useCallback((era: string) => {
    const accuracy = getEraAccuracy(era);
    const totalProblems = progress[era].problemsAttempted;

    if (accuracy >= 80 && totalProblems >= 10) {
      unlockAchievement(`${era}_master`);
    }

    if (Object.values(conceptMastery).some(mastery => mastery >= 100)) {
      unlockAchievement('concept_master');
    }

    // Check total progress across all eras
    const totalCorrect = Object.values(progress).reduce(
      (sum, eraProgress) => sum + eraProgress.correctAnswers,
      0
    );

    if (totalCorrect >= 50) {
      unlockAchievement('math_explorer');
    }
  }, [progress, conceptMastery, getEraAccuracy, unlockAchievement]);

  // Get current learning awards
  const getCurrentAwards = useCallback((): MathAward[] => {
    const awards: MathAward[] = [];

    // Check concept mastery
    Object.entries(conceptMastery).forEach(([concept, level]) => {
      if (level >= 100) {
        awards.push({
          title: `${concept} Master`,
          description: `Achieved mastery in ${concept}`,
          type: 'concept',
          icon: '🎓'
        });
      }
    });

    // Check era progress
    Object.entries(progress).forEach(([era, data]) => {
      const accuracy = (data.correctAnswers / Math.max(1, data.problemsAttempted)) * 100;
      if (accuracy >= 80 && data.problemsAttempted >= 10) {
        awards.push({
          title: `${era.charAt(0).toUpperCase() + era.slice(1)} Expert`,
          description: `Maintained high accuracy in ${era} problems`,
          type: 'achievement',
          icon: '🏆'
        });
      }
    });

    return awards;
  }, [conceptMastery, progress]);

  return {
    progress,
    conceptMastery,
    handleCorrectAnswer,
    handleIncorrectAnswer,
    getEraAccuracy,
    getCurrentAwards
  };
}
