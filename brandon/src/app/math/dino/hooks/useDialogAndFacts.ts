import { useState, useEffect } from 'react';
import { INTRO_STEPS, DINO_FACTS } from '../constants/game-data';

export const useDialogAndFacts = () => {
  // Intro dialog state
  const [showIntro, setShowIntro] = useState(true);
  const [introStep, setIntroStep] = useState(0);

  // Dino facts state
  const [currentFact, setCurrentFact] = useState(0);

  // Auto-rotate dino facts
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact(prev => (prev + 1) % DINO_FACTS.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  const nextIntroStep = () => {
    if (introStep < INTRO_STEPS.length - 1) {
      setIntroStep(introStep + 1);
    } else {
      setShowIntro(false);
    }
  };

  return {
    // Intro dialog
    showIntro,
    introStep,
    nextIntroStep,
    introSteps: INTRO_STEPS,

    // Dino facts
    currentFact,
    dinoFacts: DINO_FACTS
  };
};
