import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import confetti from 'canvas-confetti';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

export const ChallengeZone: React.FC = () => {
  const { colors } = useTheme();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [streakCount, setStreakCount] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [showAchievement, setShowAchievement] = useState(false);
  const [latestAchievement, setLatestAchievement] = useState('');
  
  const questions: Question[] = [
    {
      id: 1,
      text: "What is the main purpose of a chatbot's intent recognition system?",
      options: [
        "To generate random responses",
        "To understand what the user wants to achieve",
        "To correct user spelling mistakes",
        "To translate between languages"
      ],
      correctAnswer: 1,
      explanation: "Intent recognition helps chatbots understand the user's purpose or goal in a conversation, allowing them to provide appropriate responses.",
      difficulty: 'easy',
      points: 10
    },
    {
      id: 2,
      text: "Which of the following is NOT typically a component of a chatbot architecture?",
      options: [
        "Natural Language Understanding (NLU)",
        "Dialog Manager",
        "Quantum Encryption Layer",
        "Response Generator"
      ],
      correctAnswer: 2,
      explanation: "While NLU, Dialog Managers, and Response Generators are standard chatbot components, Quantum Encryption is not typically part of chatbot architectures.",
      difficulty: 'medium',
      points: 15
    },
    {
      id: 3,
      text: "What technique do advanced chatbots use to maintain context across multiple messages?",
      options: [
        "Context forgetting",
        "Session variables",
        "One-time passwords",
        "Image recognition"
      ],
      correctAnswer: 1,
      explanation: "Session variables or conversation state tracking allow chatbots to maintain context across multiple messages, remembering previous inputs and their own responses.",
      difficulty: 'medium',
      points: 15
    },
    {
      id: 4,
      text: "Which of these is an example of entity extraction in chatbot processing?",
      options: [
        "Understanding that 'I'm feeling happy' has positive sentiment",
        "Identifying 'New York' as a location in 'I want to fly to New York'",
        "Responding with 'Hello' when a user says 'Hi'",
        "Correcting 'teh' to 'the' in user input"
      ],
      correctAnswer: 1,
      explanation: "Entity extraction involves identifying specific pieces of information (like locations, dates, names) from user input. Recognizing 'New York' as a location is a classic example.",
      difficulty: 'hard',
      points: 20
    },
    {
      id: 5,
      text: "What is a 'fallback' in chatbot design?",
      options: [
        "A bug that causes the chatbot to crash",
        "A secondary server for handling overflow traffic",
        "A response used when the bot doesn't understand the input",
        "The process of resetting a conversation"
      ],
      correctAnswer: 2,
      explanation: "A fallback is a default response triggered when a chatbot cannot match the user's input to any known pattern or intent, preventing conversation dead-ends.",
      difficulty: 'easy',
      points: 10
    },
    {
      id: 6,
      text: "Which model architecture revolutionized NLP and powers many modern chatbots?",
      options: [
        "Transformers",
        "Recurrent Neural Networks (RNNs)",
        "Convolutional Neural Networks (CNNs)",
        "Decision Trees"
      ],
      correctAnswer: 0,
      explanation: "Transformer architecture, introduced in the 'Attention is All You Need' paper, revolutionized NLP with models like BERT and GPT, enabling far more sophisticated chatbots.",
      difficulty: 'hard',
      points: 20
    }
  ];
  
  const currentQuestion = questions[currentQuestionIndex];
  
  useEffect(() => {
    // Reset states when changing questions
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setShowExplanation(false);
    setShowFeedback(false);
    
    // Set timer for medium and hard questions
    if (currentQuestion.difficulty === 'medium') {
      setTimeLeft(30);
    } else if (currentQuestion.difficulty === 'hard') {
      setTimeLeft(45);
    } else {
      setTimeLeft(null);
    }
    
    // Timer countdown
    let timer: NodeJS.Timeout | null = null;
    if (timeLeft !== null) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === null || prev <= 1) {
            if (timer) clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [currentQuestionIndex, currentQuestion.difficulty]);
  
  // Time's up effect
  useEffect(() => {
    if (timeLeft === 0 && !isAnswerSubmitted) {
      handleSubmit();
    }
  }, [timeLeft]);
  
  const checkAchievements = () => {
    const newAchievements = [...achievements];
    let hasNewAchievement = false;
    
    // Check for first correct answer
    if (!achievements.includes('First Victory') && 
        selectedOption === currentQuestion.correctAnswer) {
      newAchievements.push('First Victory');
      setLatestAchievement('First Victory: Answer your first question correctly!');
      hasNewAchievement = true;
    }
    
    // Check for streak achievement
    if (!achievements.includes('On Fire') && streakCount >= 2) {
      newAchievements.push('On Fire');
      setLatestAchievement('On Fire: Answer 3 questions correctly in a row!');
      hasNewAchievement = true;
    }
    
    // Check for score milestone
    if (!achievements.includes('Point Collector') && score >= 50) {
      newAchievements.push('Point Collector');
      setLatestAchievement('Point Collector: Earn 50 points in the challenge!');
      hasNewAchievement = true;
    }
    
    // Check for completing all questions
    if (!achievements.includes('Challenge Master') && 
        completedQuestions.length === questions.length - 1) {
      newAchievements.push('Challenge Master');
      setLatestAchievement('Challenge Master: Complete all questions!');
      hasNewAchievement = true;
    }
    
    if (hasNewAchievement) {
      setAchievements(newAchievements);
      setShowAchievement(true);
      setTimeout(() => setShowAchievement(false), 3000);
    }
  };
  
  const handleOptionSelect = (index: number) => {
    if (!isAnswerSubmitted) {
      setSelectedOption(index);
    }
  };
  
  const handleSubmit = () => {
    if (selectedOption === null && timeLeft !== 0) return;
    
    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    
    // Update score
    if (isCorrect) {
      setScore(prev => prev + currentQuestion.points);
      setStreakCount(prev => prev + 1);
      setFeedbackMessage(`Correct! +${currentQuestion.points} points`);
      
      // Trigger confetti for correct answers
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      setStreakCount(0);
      setFeedbackMessage('Incorrect. Try again or see explanation.');
    }
    
    setShowFeedback(true);
    setCompletedQuestions(prev => [...prev, currentQuestion.id]);
    
    // Check for achievements
    checkAchievements();
  };
  
  const handleNext = () => {
    const nextIndex = (currentQuestionIndex + 1) % questions.length;
    setCurrentQuestionIndex(nextIndex);
  };
  
  const handlePrevious = () => {
    const prevIndex = (currentQuestionIndex - 1 + questions.length) % questions.length;
    setCurrentQuestionIndex(prevIndex);
  };
  
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setStreakCount(0);
    setCompletedQuestions([]);
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return colors.primary;
      case 'medium': return colors.secondary;
      case 'hard': return colors.accent;
      default: return colors.primary;
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header with Navigation and Score */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h2 
            className="text-2xl font-bold"
            style={{ color: colors.primary }}
          >
            Chatbot Challenge Zone
          </h2>
          <p style={{ color: colors.text }}>
            Test your knowledge with these challenges!
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 rounded-xl"
            style={{
              background: colors.neon + '20',
              border: `2px solid ${colors.neon}`,
              color: colors.neon
            }}
          >
            <span className="font-bold">Score: {score}</span>
            {streakCount > 1 && (
              <span className="ml-2 text-sm">
                🔥 {streakCount} streak
              </span>
            )}
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRestart}
            className="px-3 py-1 rounded-lg text-sm"
            style={{
              background: 'transparent',
              border: `1px solid ${colors.secondary}`,
              color: colors.secondary
            }}
          >
            Restart
          </motion.button>
        </div>
      </div>
      
      {/* Question Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 rounded-xl"
        style={{
          background: getDifficultyColor(currentQuestion.difficulty) + '10',
          border: `2px solid ${getDifficultyColor(currentQuestion.difficulty)}`,
          boxShadow: `0 4px 20px ${getDifficultyColor(currentQuestion.difficulty)}20`
        }}
      >
        {/* Question Header */}
        <div className="flex justify-between items-center mb-4">
          <div 
            className="px-3 py-1 rounded-full text-sm"
            style={{
              background: getDifficultyColor(currentQuestion.difficulty) + '20',
              color: getDifficultyColor(currentQuestion.difficulty)
            }}
          >
            {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)} • {currentQuestion.points} pts
          </div>
          
          {timeLeft !== null && (
            <div 
              className="flex items-center"
              style={{ color: timeLeft < 10 ? colors.accent : colors.text }}
            >
              <span role="img" aria-label="timer" className="mr-1">⏱️</span>
              <span>{timeLeft}s</span>
            </div>
          )}
        </div>
        
        {/* Question Text */}
        <h3 
          className="text-xl font-bold mb-6"
          style={{ color: colors.text }}
        >
          {currentQuestion.text}
        </h3>
        
        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-4 rounded-lg text-left flex items-center"
              style={{
                background: isAnswerSubmitted 
                  ? index === currentQuestion.correctAnswer 
                    ? colors.neon + '30'
                    : index === selectedOption 
                      ? colors.accent + '30' 
                      : colors.background
                  : selectedOption === index 
                    ? getDifficultyColor(currentQuestion.difficulty) + '30' 
                    : colors.background,
                border: `1px solid ${
                  isAnswerSubmitted 
                    ? index === currentQuestion.correctAnswer 
                      ? colors.neon 
                      : index === selectedOption && index !== currentQuestion.correctAnswer 
                        ? colors.accent
                        : getDifficultyColor(currentQuestion.difficulty) + '30'
                    : selectedOption === index 
                      ? getDifficultyColor(currentQuestion.difficulty)
                      : getDifficultyColor(currentQuestion.difficulty) + '30'
                }`,
                color: colors.text
              }}
              onClick={() => handleOptionSelect(index)}
              disabled={isAnswerSubmitted}
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                style={{
                  background: isAnswerSubmitted 
                    ? index === currentQuestion.correctAnswer 
                      ? colors.neon
                      : index === selectedOption 
                        ? colors.accent 
                        : 'transparent'
                    : selectedOption === index 
                      ? getDifficultyColor(currentQuestion.difficulty) 
                      : 'transparent',
                  border: `2px solid ${
                    isAnswerSubmitted 
                      ? index === currentQuestion.correctAnswer 
                        ? colors.neon
                        : index === selectedOption 
                          ? colors.accent
                          : getDifficultyColor(currentQuestion.difficulty)
                      : getDifficultyColor(currentQuestion.difficulty)
                  }`,
                  color: isAnswerSubmitted || selectedOption === index 
                    ? colors.background 
                    : getDifficultyColor(currentQuestion.difficulty)
                }}
              >
                {String.fromCharCode(65 + index)}
              </div>
              
              <span>{option}</span>
              
              {isAnswerSubmitted && index === currentQuestion.correctAnswer && (
                <span 
                  className="ml-auto text-lg"
                  style={{ color: colors.neon }}
                >
                  ✓
                </span>
              )}
              
              {isAnswerSubmitted && index === selectedOption && index !== currentQuestion.correctAnswer && (
                <span 
                  className="ml-auto text-lg"
                  style={{ color: colors.accent }}
                >
                  ✗
                </span>
              )}
            </motion.button>
          ))}
        </div>
        
        {/* Feedback Message */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-3 rounded-lg"
              style={{
                background: selectedOption === currentQuestion.correctAnswer 
                  ? colors.neon + '20'
                  : colors.accent + '20',
                border: `1px solid ${
                  selectedOption === currentQuestion.correctAnswer 
                    ? colors.neon
                    : colors.accent
                }`
              }}
            >
              <p 
                className="font-bold"
                style={{
                  color: selectedOption === currentQuestion.correctAnswer 
                    ? colors.neon
                    : colors.accent
                }}
              >
                {feedbackMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Explanation */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 rounded-lg"
              style={{
                background: colors.secondary + '10',
                border: `1px solid ${colors.secondary}`
              }}
            >
              <h4 
                className="font-bold mb-2"
                style={{ color: colors.secondary }}
              >
                Explanation:
              </h4>
              <p style={{ color: colors.text }}>
                {currentQuestion.explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap justify-between items-center gap-3">
          <div className="flex flex-wrap gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevious}
              className="px-4 py-2 rounded-lg"
              style={{
                background: 'transparent',
                border: `1px solid ${colors.primary}`,
                color: colors.primary
              }}
            >
              Previous
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="px-4 py-2 rounded-lg"
              style={{
                background: 'transparent',
                border: `1px solid ${colors.primary}`,
                color: colors.primary
              }}
            >
              Next
            </motion.button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {isAnswerSubmitted && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowExplanation(!showExplanation)}
                className="px-4 py-2 rounded-lg"
                style={{
                  background: colors.secondary + '10',
                  border: `1px solid ${colors.secondary}`,
                  color: colors.secondary
                }}
              >
                {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
              </motion.button>
            )}
            
            {!isAnswerSubmitted && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                disabled={selectedOption === null}
                className="px-4 py-2 rounded-lg"
                style={{
                  background: colors.neon,
                  color: colors.background,
                  opacity: selectedOption === null ? 0.6 : 1
                }}
              >
                Submit Answer
              </motion.button>
            )}
            
            {isAnswerSubmitted && selectedOption !== currentQuestion.correctAnswer && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedOption(null);
                  setIsAnswerSubmitted(false);
                  setShowExplanation(false);
                  setShowFeedback(false);
                }}
                className="px-4 py-2 rounded-lg"
                style={{
                  background: colors.neon,
                  color: colors.background
                }}
              >
                Try Again
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
      
      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full"
          style={{
            width: `${(completedQuestions.length / questions.length) * 100}%`,
            background: `linear-gradient(to right, ${colors.primary}, ${colors.neon})`
          }}
        />
      </div>
      <div className="flex justify-between text-xs" style={{ color: colors.text + '80' }}>
        <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
        <span>{completedQuestions.length} completed</span>
      </div>
      
      {/* Achievements Popup */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 p-4 rounded-lg max-w-xs"
            style={{
              background: colors.neon + '20',
              border: `2px solid ${colors.neon}`,
              color: colors.neon,
              zIndex: 10
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏆</span>
              <div>
                <p className="font-bold">Achievement Unlocked!</p>
                <p className="text-sm">{latestAchievement}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Achievements Section */}
      {achievements.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 p-4 rounded-lg"
          style={{
            background: colors.background,
            border: `1px solid ${colors.primary}`
          }}
        >
          <h3 
            className="text-lg font-bold mb-3"
            style={{ color: colors.primary }}
          >
            Your Achievements
          </h3>
          
          <div className="flex flex-wrap gap-2">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  background: colors.neon + '20',
                  color: colors.neon
                }}
              >
                🏆 {achievement}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}; 