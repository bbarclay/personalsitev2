'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { BotLab } from './game/BotLab';
import { TrainingArena } from './game/TrainingArena';
import { ChatSimulator } from './game/ChatSimulator';
import { ChallengeZone } from './game/ChallengeZone';
import { ThemeToggle } from './shared/ThemeToggle';
import confetti from 'canvas-confetti';

type GameSection = 'botlab' | 'training' | 'simulator' | 'challenge' | 'completion';

interface GameStep {
  id: GameSection;
  title: string;
  description: string;
  emoji: string;
  mood: string;
  color: string;
  component?: React.ReactNode;
}

const ChatPanel: React.FC = () => {
  const { colors, theme } = useTheme();
  const [currentSection, setCurrentSection] = useState<GameSection>('botlab');
  const [progress, setProgress] = useState(0);
  const [completedSections, setCompletedSections] = useState<GameSection[]>([]);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);

  // Update progress based on completed sections
  useEffect(() => {
    const totalSections = 4; // botlab, training, simulator, challenge
    const completedCount = completedSections.length;
    const newProgress = Math.min(100, Math.round((completedCount / totalSections) * 100));
    setProgress(newProgress);
    
    // Check if all main sections are completed
    const mainSections: GameSection[] = ['botlab', 'training', 'simulator', 'challenge'];
    const allSectionsCompleted = mainSections.every(section => 
      completedSections.includes(section)
    );
    
    if (allSectionsCompleted && !completedSections.includes('completion')) {
      // Trigger completion celebration
      setShowCompletionMessage(true);
      
      // Trigger confetti celebration
      const duration = 3 * 1000;
      const end = Date.now() + duration;
      
      const celebrateWithConfetti = () => {
        confetti({
          particleCount: 100,
          startVelocity: 30,
          spread: 360,
          origin: { x: Math.random(), y: Math.random() * 0.3 },
          colors: [colors.primary, colors.secondary, colors.accent, colors.neon],
          ticks: 60,
          disableForReducedMotion: true
        });
        
        if (Date.now() < end) {
          requestAnimationFrame(celebrateWithConfetti);
        }
      };
      
      celebrateWithConfetti();
      
      // Move to completion section after a short delay
      setTimeout(() => {
        setCurrentSection('completion');
        setCompletedSections(prev => [...prev, 'completion']);
      }, 2000);
    }
  }, [completedSections, colors]);

  // Mark sections as completed when navigating away
  useEffect(() => {
    if (currentSection !== 'completion' && !completedSections.includes(currentSection)) {
      setCompletedSections(prev => [...prev, currentSection]);
    }
  }, [currentSection, completedSections]);

  const gameSteps: Record<GameSection, GameStep> = {
    botlab: {
      id: 'botlab',
      title: 'Bot Lab',
      description: 'Design your virtual assistant and customize its personality',
      emoji: '🧪',
      mood: 'curious',
      color: colors.secondary,
      component: <BotLab />
    },
    training: {
      id: 'training',
      title: 'Training Arena',
      description: 'Learn the fundamentals of chatbot development',
      emoji: '📚',
      mood: 'focused',
      color: colors.accent,
      component: <TrainingArena />
    },
    simulator: {
      id: 'simulator',
      title: 'Chat Simulator',
      description: 'Test your chatbot in realistic conversations',
      emoji: '💬',
      mood: 'chatty',
      color: colors.neon,
      component: <ChatSimulator />
    },
    challenge: {
      id: 'challenge',
      title: 'Challenge Zone',
      description: 'Put your knowledge to the test with interactive challenges',
      emoji: '🏆',
      mood: 'determined',
      color: colors.primary,
      component: <ChallengeZone />
    },
    completion: {
      id: 'completion',
      title: 'Congratulations!',
      description: 'You\'ve completed all sections of the ChatBot Academy!',
      emoji: '🎓',
      mood: 'accomplished',
      color: colors.neon
    }
  };

  const currentStep = gameSteps[currentSection];

  return (
    <div className="space-y-6">
      {/* Navigation Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(Object.keys(gameSteps) as GameSection[])
          .filter(key => key !== 'completion')
          .map((section) => (
          <motion.button
            key={section}
            whileHover={{ y: -5 }}
            whileTap={{ y: 2 }}
            className={`p-3 rounded-xl text-center transition-all duration-300 ${
              completedSections.includes(section) ? 'border-opacity-100' : 'border-opacity-50'
            } ${
              currentSection === section ? 'ring-2' : ''
            }`}
            style={{
              background: currentSection === section 
                ? gameSteps[section].color + '20' 
                : theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
              border: `2px solid ${gameSteps[section].color}`,
              color: completedSections.includes(section) ? gameSteps[section].color : colors.text,
              ...(currentSection === section ? { '--tw-ring-color': gameSteps[section].color } as React.CSSProperties : {})
            }}
            onClick={() => setCurrentSection(section)}
          >
            <div className="text-2xl mb-1">{gameSteps[section].emoji}</div>
            <div className="font-bold">{gameSteps[section].title}</div>
            {completedSections.includes(section) && (
              <div 
                className="text-xs inline-block px-2 py-1 rounded-full mt-1"
                style={{ 
                  background: gameSteps[section].color + '30',
                  color: gameSteps[section].color
                }}
              >
                Completed ✓
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Progress Bar */}
      <div>
        <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
          <motion.div 
            className="absolute top-0 left-0 h-full rounded-full"
            style={{ 
              background: `linear-gradient(to right, ${colors.primary}, ${colors.neon})`,
              width: `${progress}%` 
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>Progress: {progress}%</span>
          <span>{completedSections.length} / 4 sections completed</span>
        </div>
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{currentStep.emoji}</span>
            <div>
              <h2 
                className="text-2xl font-bold"
                style={{ color: currentStep.color }}
              >
                {currentStep.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {currentStep.description}
              </p>
            </div>
          </div>

          {currentStep.component}
        </motion.div>
      </AnimatePresence>

      {/* Completion Message */}
      <AnimatePresence>
        {showCompletionMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 100 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 px-8 py-6 rounded-xl text-center max-w-md z-50"
            style={{
              background: colors.neon,
              boxShadow: `0 8px 32px rgba(0,0,0,0.2)`
            }}
          >
            <h3 className="text-2xl font-bold mb-2" style={{ color: theme === 'dark' ? '#121212' : '#121212' }}>
              🎉 You've completed all sections!
            </h3>
            <p style={{ color: theme === 'dark' ? '#121212' : '#121212' }}>
              Congratulations on mastering the ChatBot Academy! Get ready for your graduation...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatPanel;
