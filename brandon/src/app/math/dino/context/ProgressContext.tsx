'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { ERA_MATH_CONTENT } from '../constants/math-concepts';
import { EraId } from '../utils/era-utils';

interface Milestone {
  id: string;
  title: string;
  description: string;
  achieved: boolean;
  date?: Date;
}

interface ConceptProgress {
  conceptName: string;
  totalAttempts: number;
  correctAttempts: number;
  lastPracticed?: Date;
  milestones: Milestone[];
}

interface ProgressContextType {
  conceptProgress: Record<string, ConceptProgress>;
  updateConceptProgress: (concept: string, correct: boolean) => void;
  getMasteryLevel: (concept: string) => number;
  getNextMilestone: (concept: string) => Milestone | null;
  getSuggestedConcept: () => string;
  getStreak: (concept: string) => number;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

// Helper function to create initial milestones for a concept
function createConceptMilestones(concept: string): Milestone[] {
  return [
    {
      id: `${concept}_beginner`,
      title: 'Getting Started',
      description: 'Complete your first problem in this concept',
      achieved: false
    },
    {
      id: `${concept}_streak`,
      title: 'Building Momentum',
      description: 'Get 3 correct answers in a row',
      achieved: false
    },
    {
      id: `${concept}_mastery`,
      title: 'Concept Mastery',
      description: 'Achieve 80% accuracy with at least 10 attempts',
      achieved: false
    }
  ];
}

// Initialize concept progress for all concepts
function initializeConceptProgress(): Record<string, ConceptProgress> {
  const progress: Record<string, ConceptProgress> = {};
  
  Object.values(ERA_MATH_CONTENT).forEach((era) => {
    era.mathConcepts.forEach((concept) => {
      if (!progress[concept]) {
        progress[concept] = {
          conceptName: concept,
          totalAttempts: 0,
          correctAttempts: 0,
          milestones: createConceptMilestones(concept)
        };
      }
    });
  });
  
  return progress;
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [conceptProgress, setConceptProgress] = useState<Record<string, ConceptProgress>>(
    initializeConceptProgress()
  );

  const updateConceptProgress = useCallback((concept: string, correct: boolean) => {
    setConceptProgress(prev => {
      const progress = { ...prev };
      const conceptData = progress[concept] || {
        conceptName: concept,
        totalAttempts: 0,
        correctAttempts: 0,
        milestones: createConceptMilestones(concept)
      };

      // Update attempts
      conceptData.totalAttempts++;
      if (correct) {
        conceptData.correctAttempts++;
      }
      conceptData.lastPracticed = new Date();

      // Check milestones
      const milestones = conceptData.milestones;
      
      // First attempt milestone
      if (!milestones[0].achieved) {
        milestones[0].achieved = true;
        milestones[0].date = new Date();
      }

      // Streak milestone
      if (!milestones[1].achieved && getStreak(concept) >= 3) {
        milestones[1].achieved = true;
        milestones[1].date = new Date();
      }

      // Mastery milestone
      if (!milestones[2].achieved && 
          conceptData.totalAttempts >= 10 &&
          (conceptData.correctAttempts / conceptData.totalAttempts) >= 0.8) {
        milestones[2].achieved = true;
        milestones[2].date = new Date();
      }

      progress[concept] = conceptData;
      return progress;
    });
  }, []);

  const getMasteryLevel = useCallback((concept: string): number => {
    const progress = conceptProgress[concept];
    if (!progress || progress.totalAttempts === 0) return 0;
    return Math.round((progress.correctAttempts / progress.totalAttempts) * 100);
  }, [conceptProgress]);

  const getNextMilestone = useCallback((concept: string): Milestone | null => {
    const progress = conceptProgress[concept];
    if (!progress) return null;
    return progress.milestones.find(m => !m.achieved) || null;
  }, [conceptProgress]);

  const getSuggestedConcept = useCallback((): string => {
    const concepts = Object.entries(conceptProgress);
    concepts.sort((a, b) => {
      // Prioritize concepts with lower mastery levels
      const aMastery = getMasteryLevel(a[0]);
      const bMastery = getMasteryLevel(b[0]);
      if (Math.abs(aMastery - bMastery) > 20) {
        return aMastery - bMastery;
      }
      // If mastery levels are similar, prioritize recently practiced concepts
      const aDate = a[1].lastPracticed || new Date(0);
      const bDate = b[1].lastPracticed || new Date(0);
      return bDate.getTime() - aDate.getTime();
    });
    return concepts[0][0];
  }, [conceptProgress, getMasteryLevel]);

  const getStreak = useCallback((concept: string): number => {
    // For now, return a simple streak based on mastery level
    const mastery = getMasteryLevel(concept);
    return Math.floor(mastery / 20); // 0-5 streak levels
  }, [getMasteryLevel]);

  const resetProgress = useCallback(() => {
    setConceptProgress(initializeConceptProgress());
  }, []);

  const value = {
    conceptProgress,
    updateConceptProgress,
    getMasteryLevel,
    getNextMilestone,
    getSuggestedConcept,
    getStreak,
    resetProgress
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
