import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface Word {
  id: number;
  text: string;
  x: number;
  y: number;
  speed: number;
  completed: boolean;
}

interface LevelData {
  words: string[];
  speed: number;
  duration: number;
  description: string;
}

// Chatbot-themed typing challenges
const levels: LevelData[] = [
  {
    words: ['intent', 'entity', 'utterance', 'dialog', 'response', 'fallback', 'context'],
    speed: 0.5,
    duration: 60,
    description: 'Type the basic chatbot terminology as it appears!'
  },
  {
    words: ['natural language', 'sentiment analysis', 'machine learning', 'neural network', 'conversation flow'],
    speed: 0.7,
    duration: 75,
    description: 'Advanced concepts coming at you faster!'
  },
  {
    words: ['Hey chatbot!', 'How are you?', 'What can you do?', 'Tell me a joke', 'What time is it?'],
    speed: 0.9,
    duration: 90,
    description: 'Type common user inputs to chatbots!'
  }
];

export const TypingGame: React.FC = () => {
  const { colors } = useTheme();
  const [currentLevel, setCurrentLevel] = useState(0);
  const [words, setWords] = useState<Word[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [score, setScore] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timeLeft, setTimeLeft] = useState(levels[0].duration);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [correctKeystrokes, setCorrectKeystrokes] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [wordsPerMinute, setWordsPerMinute] = useState(0);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const frameRef = useRef<number | undefined>(undefined);
  const gameContainerRef = useRef<HTMLDivElement>(null);
  
  const containerHeight = 300;
  const containerWidth = gameContainerRef.current?.clientWidth || 600;
  
  useEffect(() => {
    // Resize handler for container width
    const handleResize = () => {
      if (gameContainerRef.current) {
        setWords(prevWords => {
          const newWidth = gameContainerRef.current?.clientWidth || 600;
          return prevWords.map(word => ({
            ...word,
            x: Math.min(word.x, newWidth - 100) // Adjust word positions when resizing
          }));
        });
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Initialize game
  const startGame = () => {
    setGameActive(true);
    setShowResults(false);
    setScore(0);
    setAccuracy(100);
    setTimeLeft(levels[currentLevel].duration);
    setTotalKeystrokes(0);
    setCorrectKeystrokes(0);
    setWords([]);
    setCurrentInput('');
    
    // Focus the input
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    // Start animation frame
    startAnimationFrame();
  };
  
  // End game and show results
  const endGame = () => {
    setGameActive(false);
    setShowResults(true);
    
    // Calculate words per minute (assuming average word is 5 characters)
    const minutes = levels[currentLevel].duration / 60;
    const wpm = Math.round(correctKeystrokes / 5 / minutes);
    setWordsPerMinute(wpm);
    
    // Cancel animation frame
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
  };
  
  // Handle game timer
  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (gameActive && timeLeft === 0) {
      endGame();
    }
  }, [gameActive, timeLeft]);
  
  // Animation logic
  const startAnimationFrame = () => {
    let lastWordTime = Date.now();
    
    const animate = () => {
      // Add new words periodically
      const now = Date.now();
      const level = levels[currentLevel];
      
      if (now - lastWordTime > 2000 / level.speed && words.length < 10) {
        const newWordIndex = Math.floor(Math.random() * level.words.length);
        const newWord = level.words[newWordIndex];
        
        setWords(prevWords => [
          ...prevWords,
          {
            id: now,
            text: newWord,
            x: Math.random() * (containerWidth - 150),
            y: -30,
            speed: level.speed * (0.5 + Math.random()),
            completed: false
          }
        ]);
        
        lastWordTime = now;
      }
      
      // Move words down
      setWords(prevWords => {
        const updatedWords = prevWords
          .filter(word => !word.completed && word.y < containerHeight)
          .map(word => ({
            ...word,
            y: word.y + word.speed
          }));
        
        return updatedWords;
      });
      
      if (gameActive) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };
    
    frameRef.current = requestAnimationFrame(animate);
  };
  
  // Handle user input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setCurrentInput(input);
    
    setTotalKeystrokes(prevTotal => prevTotal + 1);
    
    // Check if the input matches any word
    setWords(prevWords => {
      return prevWords.map(word => {
        if (word.text.toLowerCase() === input.toLowerCase() && !word.completed) {
          // Word completed
          setScore(prevScore => prevScore + word.text.length * 10);
          setCorrectKeystrokes(prev => prev + word.text.length);
          
          // Update accuracy
          if (totalKeystrokes > 0) {
            const newAccuracy = Math.round((correctKeystrokes / totalKeystrokes) * 100);
            setAccuracy(newAccuracy);
          }
          
          return { ...word, completed: true };
        }
        return word;
      });
    });
    
    // Clear input if a word is completed
    const matchedWord = words.find(word => 
      word.text.toLowerCase() === input.toLowerCase() && !word.completed
    );
    
    if (matchedWord) {
      setCurrentInput('');
    }
  };
  
  // Change level
  const changeLevel = (level: number) => {
    if (level >= 0 && level < levels.length) {
      setCurrentLevel(level);
      
      if (gameActive) {
        // Restart game with new level
        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current);
        }
        startGame();
      }
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Game Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 
            className="text-xl font-bold mb-1"
            style={{ color: colors.primary }}
          >
            Chatbot Typing Challenge
          </h3>
          <p style={{ color: colors.text }}>
            {levels[currentLevel].description}
          </p>
        </div>
        
        <div 
          className="px-4 py-2 rounded-lg"
          style={{ 
            background: colors.neon + '20',
            border: `1px solid ${colors.neon}`
          }}
        >
          <div className="text-center">
            <span style={{ color: colors.neon }}>Time: </span>
            <span style={{ color: colors.text }}>{timeLeft}s</span>
          </div>
          <div className="text-center">
            <span style={{ color: colors.neon }}>Score: </span>
            <span style={{ color: colors.text }}>{score}</span>
          </div>
        </div>
      </div>
      
      {/* Level Selection */}
      <div className="flex gap-2">
        {levels.map((level, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-lg"
            style={{
              background: currentLevel === index ? colors.primary : 'transparent',
              color: currentLevel === index ? '#ffffff' : colors.primary,
              border: `1px solid ${colors.primary}`
            }}
            onClick={() => changeLevel(index)}
            disabled={gameActive}
          >
            Level {index + 1}
          </motion.button>
        ))}
      </div>
      
      {/* Game Container */}
      <div 
        ref={gameContainerRef}
        className="relative overflow-hidden rounded-xl"
        style={{
          height: `${containerHeight}px`,
          background: colors.background,
          border: `2px solid ${colors.primary}`,
          boxShadow: `0 0 20px ${colors.primary}30`
        }}
      >
        {!gameActive && !showResults ? (
          <div className="flex flex-col items-center justify-center h-full">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-5xl mb-6"
            >
              ⌨️
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={startGame}
              className="px-8 py-3 rounded-xl text-lg font-bold"
              style={{
                background: colors.neon,
                color: colors.background
              }}
            >
              Start Game
            </motion.button>
            <p className="mt-4 text-sm" style={{ color: colors.text + 'CC' }}>
              Type the falling words as quickly as you can!
            </p>
          </div>
        ) : showResults ? (
          <div className="flex flex-col items-center justify-center h-full p-6">
            <h3 
              className="text-2xl font-bold mb-4"
              style={{ color: colors.primary }}
            >
              Challenge Complete!
            </h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6">
              <div className="text-center">
                <div className="text-sm" style={{ color: colors.text + 'CC' }}>Score</div>
                <div 
                  className="text-2xl font-bold"
                  style={{ color: colors.neon }}
                >
                  {score}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm" style={{ color: colors.text + 'CC' }}>Accuracy</div>
                <div 
                  className="text-2xl font-bold"
                  style={{ color: colors.secondary }}
                >
                  {accuracy}%
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm" style={{ color: colors.text + 'CC' }}>Words Per Minute</div>
                <div 
                  className="text-2xl font-bold"
                  style={{ color: colors.accent }}
                >
                  {wordsPerMinute}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm" style={{ color: colors.text + 'CC' }}>Level</div>
                <div 
                  className="text-2xl font-bold"
                  style={{ color: colors.primary }}
                >
                  {currentLevel + 1}
                </div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="px-6 py-2 rounded-lg"
              style={{
                background: colors.primary,
                color: '#ffffff'
              }}
            >
              Play Again
            </motion.button>
          </div>
        ) : (
          // Active Game
          <AnimatePresence>
            {words.map((word) => (
              !word.completed && (
                <motion.div
                  key={word.id}
                  className="absolute px-3 py-1 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 1,
                    x: word.x,
                    y: word.y,
                    scale: currentInput.toLowerCase() === word.text.substring(0, currentInput.length).toLowerCase() ? 1.1 : 1
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  style={{
                    background: currentInput.toLowerCase() === word.text.substring(0, currentInput.length).toLowerCase() 
                      ? colors.secondary + '40'
                      : colors.primary + '20',
                    border: `1px solid ${
                      currentInput.toLowerCase() === word.text.substring(0, currentInput.length).toLowerCase()
                        ? colors.secondary
                        : colors.primary
                    }`,
                    color: colors.text
                  }}
                >
                  {word.text}
                </motion.div>
              )
            ))}
          </AnimatePresence>
        )}
      </div>
      
      {/* Input Field */}
      {gameActive && (
        <div>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg outline-none"
            style={{
              background: colors.background,
              border: `2px solid ${colors.neon}`,
              color: colors.text,
              boxShadow: `0 0 10px ${colors.neon}30`
            }}
            placeholder="Type the falling words..."
            autoFocus
          />
        </div>
      )}
      
      {/* Game Stats */}
      {gameActive && (
        <div 
          className="grid grid-cols-3 gap-4 p-4 rounded-lg"
          style={{
            background: colors.background,
            border: `1px solid ${colors.accent}`
          }}
        >
          <div className="text-center">
            <div className="text-sm" style={{ color: colors.text + 'CC' }}>Score</div>
            <div className="font-bold" style={{ color: colors.text }}>{score}</div>
          </div>
          <div className="text-center">
            <div className="text-sm" style={{ color: colors.text + 'CC' }}>Accuracy</div>
            <div className="font-bold" style={{ color: colors.text }}>{accuracy}%</div>
          </div>
          <div className="text-center">
            <div className="text-sm" style={{ color: colors.text + 'CC' }}>Time Left</div>
            <div className="font-bold" style={{ color: colors.text }}>{timeLeft}s</div>
          </div>
        </div>
      )}
    </div>
  );
}; 