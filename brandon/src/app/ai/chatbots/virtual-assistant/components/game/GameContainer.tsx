import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { BotLab } from './BotLab';
import { TrainingArena } from './TrainingArena';
import { ChatSimulator } from './ChatSimulator';
import { ChallengeZone } from './ChallengeZone';
import { ThemeToggle } from '../shared/ThemeToggle';
import confetti from 'canvas-confetti';

type GameSection = 'intro' | 'botlab' | 'training' | 'simulator' | 'challenge' | 'completion';

interface GameStep {
  id: GameSection;
  title: string;
  description: string;
  emoji: string;
  mood: string;
  color: string;
  component?: React.ReactNode;
}

export const GameContainer: React.FC = () => {
  const { colors, theme, toggleTheme } = useTheme();
  const [currentSection, setCurrentSection] = useState<GameSection>('intro');
  const [progress, setProgress] = useState(0);
  const [completedSections, setCompletedSections] = useState<GameSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Update progress based on completed sections
  useEffect(() => {
    // Calculate progress (excluding intro and completion from the calculation)
    const totalSections = Object.keys(gameSteps).length - 2; // subtract intro and completion
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
    if (currentSection !== 'intro' && currentSection !== 'completion' && !completedSections.includes(currentSection)) {
      setCompletedSections(prev => [...prev, currentSection]);
    }
  }, [currentSection, completedSections]);
  
  const gameSteps: Record<GameSection, GameStep> = {
    intro: {
      id: 'intro',
      title: 'Welcome to ChatBot Academy',
      description: 'Build, train, and master the art of chatbot creation',
      emoji: '🤖',
      mood: 'excited',
      color: colors.primary
    },
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
  
  const sectionVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-6xl mb-6"
          >
            🤖
          </motion.div>
          <h2 
            className="text-2xl font-bold mb-4"
            style={{ color: colors.primary }}
          >
            Preparing your ChatBot Academy experience...
          </h2>
          <div 
            className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto"
          >
            <motion.div 
              className="h-full"
              style={{ background: colors.primary }}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5 }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen transition-colors duration-300 pt-6 md:pt-8 pb-16"
      style={{ 
        background: theme === 'dark' 
          ? '#121212' 
          : 'linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%)',
        color: colors.text
      }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header with Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 
              className="text-3xl md:text-4xl font-bold"
              style={{ color: colors.primary }}
            >
              ChatBot Academy
            </h1>
            <ThemeToggle />
          </div>
          
          {/* Progress Bar */}
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
        
        {/* Navigation Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {(Object.keys(gameSteps) as GameSection[])
            .filter(key => key !== 'intro' && key !== 'completion')
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
        
        {/* Main Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-xl"
            style={{ 
              background: theme === 'dark' ? '#1F2937' : 'white',
              boxShadow: `0 4px 20px ${currentStep.color}30`
            }}
          >
            {currentSection === 'intro' && (
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <motion.div 
                  className="w-full md:w-1/2"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <h2 
                    className="text-3xl font-bold mb-4"
                    style={{ color: colors.primary }}
                  >
                    Welcome to ChatBot Academy!
                  </h2>
                  <p className="mb-6 text-lg" style={{ color: colors.text }}>
                    Your journey to mastering chatbot creation begins here. Explore the labs, train with interactive exercises, and test your skills in challenges.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {(Object.keys(gameSteps) as GameSection[])
                      .filter(key => key !== 'intro' && key !== 'completion')
                      .map((section) => (
                      <li 
                        key={section} 
                        className="flex items-start"
                      >
                        <span 
                          className="text-xl mr-3 flex-shrink-0 mt-0.5"
                          style={{ color: gameSteps[section].color }}
                        >
                          {gameSteps[section].emoji}
                        </span>
                        <div>
                          <h3 
                            className="font-bold"
                            style={{ color: gameSteps[section].color }}
                          >
                            {gameSteps[section].title}
                          </h3>
                          <p className="text-sm" style={{ color: colors.text }}>
                            {gameSteps[section].description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-xl font-bold text-center"
                    style={{
                      background: colors.primary,
                      color: theme === 'dark' ? '#121212' : 'white'
                    }}
                    onClick={() => setCurrentSection('botlab')}
                  >
                    Start Your Journey
                  </motion.button>
                </motion.div>
                <motion.div
                  className="w-full md:w-1/2 flex justify-center"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div 
                    className="relative w-64 h-64 rounded-full flex items-center justify-center"
                    style={{ background: `radial-gradient(circle, ${colors.primary}30 0%, transparent 70%)` }}
                  >
                    <motion.div
                      animate={{ 
                        y: [0, -15, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 5,
                        ease: "easeInOut"
                      }}
                      className="text-8xl"
                    >
                      🤖
                    </motion.div>
                    
                    {/* Orbiting elements */}
                    {['💬', '🧠', '📊', '⚙️'].map((emoji, index) => (
                      <motion.div
                        key={index}
                        className="absolute w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                          background: theme === 'dark' ? '#111827' : 'white',
                          boxShadow: `0 4px 8px ${colors.primary}30`,
                          border: `2px solid ${colors.primary}30`
                        }}
                        animate={{
                          x: Math.cos(index * Math.PI/2) * 120,
                          y: Math.sin(index * Math.PI/2) * 120,
                          rotate: 360
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 20 + index * 2,
                          ease: "linear",
                          delay: index * 0.5
                        }}
                      >
                        <span className="text-2xl">{emoji}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}
            
            {currentSection === 'completion' && (
              <div className="flex flex-col items-center text-center py-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: 720 }}
                  transition={{ duration: 1, type: 'spring' }}
                  className="text-8xl mb-8"
                >
                  🎓
                </motion.div>
                
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-4xl font-bold mb-4"
                  style={{ color: colors.neon }}
                >
                  Congratulations!
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-xl mb-8 max-w-2xl"
                  style={{ color: colors.text }}
                >
                  You've successfully completed all sections of the ChatBot Academy! You now have the knowledge and skills to build, train, and deploy sophisticated chatbot systems.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 w-full max-w-3xl"
                >
                  {['Bot Builder', 'NLP Expert', 'Conversation Designer', 'AI Implementer'].map((title, index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-lg text-center"
                      style={{
                        background: `${[colors.primary, colors.secondary, colors.accent, colors.neon][index % 4]}20`,
                        border: `2px solid ${[colors.primary, colors.secondary, colors.accent, colors.neon][index % 4]}`
                      }}
                    >
                      <div className="text-2xl mb-2">
                        {['🔧', '🧠', '💬', '🤖'][index]}
                      </div>
                      <div 
                        className="font-bold"
                        style={{ color: [colors.primary, colors.secondary, colors.accent, colors.neon][index % 4] }}
                      >
                        {title}
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: colors.text }}
                      >
                        Mastered
                      </div>
                    </div>
                  ))}
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-xl font-bold text-center"
                    style={{
                      background: colors.neon,
                      color: theme === 'dark' ? '#121212' : '#121212'
                    }}
                    onClick={() => setCurrentSection('botlab')}
                  >
                    Start Again
                  </motion.button>
                </motion.div>
              </div>
            )}
            
            {currentSection !== 'intro' && currentSection !== 'completion' && (
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{currentStep.emoji}</span>
                      <h2 
                        className="text-2xl md:text-3xl font-bold"
                        style={{ color: currentStep.color }}
                      >
                        {currentStep.title}
                      </h2>
                    </div>
                    <p className="mt-1 text-gray-600 dark:text-gray-300">
                      {currentStep.description}
                    </p>
                  </div>
                  
                  <motion.div
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 5,
                      ease: "easeInOut"
                    }}
                    className="p-3 rounded-full text-center"
                    style={{
                      background: currentStep.color + '20',
                      border: `2px dashed ${currentStep.color}`,
                      color: currentStep.color
                    }}
                  >
                    Bot mood: <span className="font-bold">{currentStep.mood}</span>
                  </motion.div>
                </div>
                
                {/* Component Content */}
                {currentStep.component}
              </div>
            )}
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
    </div>
  );
}; 