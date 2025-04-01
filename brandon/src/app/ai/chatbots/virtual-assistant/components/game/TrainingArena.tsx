import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { TypingGame } from './TypingGame';

interface CodeExample {
  title: string;
  description: string;
  code: string;
  explanation: string;
}

const codeExamples: CodeExample[] = [
  {
    title: 'Pattern Matching',
    description: 'Simple keyword matching is the foundation of basic chatbots',
    code: `function simpleBot(input) {
  const keywords = {
    'hello': 'Hi there!',
    'help': 'How can I assist you?',
    'bye': 'Goodbye!'
  };
  
  for (const [keyword, response] of Object.entries(keywords)) {
    if (input.toLowerCase().includes(keyword)) {
      return response;
    }
  }
  
  return "I'm not sure how to respond to that.";
}`,
    explanation: 'This bot checks if user input contains keywords and returns predefined responses. It\'s simple but limited.'
  },
  {
    title: 'Natural Language Processing',
    description: 'NLP helps bots understand human language better',
    code: `// Using a hypothetical NLP library
import { tokenize, extractEntities, getSentiment } from 'nlp-lib';

function nlpBot(input) {
  const tokens = tokenize(input);
  const entities = extractEntities(input);
  const sentiment = getSentiment(input);
  
  if (sentiment === 'positive') {
    return "I'm glad you're happy!";
  } else if (sentiment === 'negative') {
    return "I'm sorry to hear that.";
  }
  
  if (entities.includes('weather')) {
    return "The weather is sunny today!";
  }
  
  return "Could you please rephrase that?";
}`,
    explanation: 'This more advanced bot analyzes the input text for sentiment and entities, allowing more contextual responses.'
  },
  {
    title: 'Machine Learning Integration',
    description: 'ML models can make chatbots smarter over time',
    code: `// Pseudocode for ML integration
async function mlBot(input) {
  // Preprocess the input
  const processedInput = preprocess(input);
  
  // Get intent from ML model
  const intent = await model.predictIntent(processedInput);
  
  // Get entities from ML model
  const entities = await model.extractEntities(processedInput);
  
  // Use intent and entities to generate response
  const response = responseGenerator(intent, entities);
  
  // Log the interaction for future training
  logInteraction(input, response);
  
  return response;
}`,
    explanation: 'Machine learning chatbots can identify user intent and extract entities, improving with each interaction.'
  }
];

interface TrainingTab {
  id: string;
  label: string;
  icon: string;
}

export const TrainingArena: React.FC = () => {
  const { colors } = useTheme();
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('learn');
  
  const currentExample = codeExamples[currentExampleIndex];
  
  const tabs: TrainingTab[] = [
    { id: 'learn', label: 'Learn', icon: '📚' },
    { id: 'practice', label: 'Practice', icon: '⌨️' },
    { id: 'visualize', label: 'Visualize', icon: '📊' }
  ];
  
  const handleNext = () => {
    setShowExplanation(false);
    setCurrentExampleIndex((prev) => (prev + 1) % codeExamples.length);
  };
  
  const handlePrevious = () => {
    setShowExplanation(false);
    setCurrentExampleIndex((prev) => (prev - 1 + codeExamples.length) % codeExamples.length);
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex border-b" style={{ borderColor: colors.accent + '30' }}>
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{ y: -2 }}
            whileTap={{ y: 1 }}
            className="px-6 py-3 text-lg border-b-2 flex items-center space-x-2"
            style={{ 
              borderColor: activeTab === tab.id ? colors.primary : 'transparent',
              color: activeTab === tab.id ? colors.primary : colors.text + 'CC'
            }}
            onClick={() => setActiveTab(tab.id)}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </motion.button>
        ))}
      </div>
      
      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'learn' && (
          <motion.div
            key="learn"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-8"
          >
            <div 
              className="p-6 rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`,
                border: `2px solid ${colors.primary}`
              }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 
                  className="text-2xl font-bold"
                  style={{ color: colors.primary }}
                >
                  {currentExample.title}
                </h3>
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePrevious}
                    className="px-4 py-2 rounded-lg"
                    style={{
                      background: 'transparent',
                      border: `2px solid ${colors.accent}`,
                      color: colors.accent
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
                      background: colors.accent,
                      color: colors.background
                    }}
                  >
                    Next
                  </motion.button>
                </div>
              </div>
              
              <p 
                className="mb-4"
                style={{ color: colors.text }}
              >
                {currentExample.description}
              </p>
              
              <div
                className="p-4 rounded-lg mb-4 overflow-x-auto font-mono text-sm"
                style={{
                  background: '#1E1E1E',
                  color: '#D4D4D4',
                  border: `1px solid ${colors.secondary}`
                }}
              >
                <pre>{currentExample.code}</pre>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowExplanation(!showExplanation)}
                className="w-full px-4 py-2 rounded-lg text-center"
                style={{
                  background: colors.neon + '20',
                  border: `2px solid ${colors.neon}`,
                  color: colors.neon
                }}
              >
                {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
              </motion.button>
              
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 rounded-lg"
                  style={{
                    background: colors.background,
                    border: `1px solid ${colors.neon}`,
                    color: colors.text
                  }}
                >
                  {currentExample.explanation}
                </motion.div>
              )}
            </div>
            
            {/* Visual Learning */}
            <div 
              className="p-6 rounded-2xl"
              style={{
                background: colors.background,
                border: `2px solid ${colors.secondary}`
              }}
            >
              <h3 
                className="text-xl font-bold mb-4"
                style={{ color: colors.secondary }}
              >
                How Chatbots Work
              </h3>
              
              <div className="flex flex-col md:flex-row gap-4">
                <motion.div 
                  className="flex-1 p-4 rounded-lg"
                  whileHover={{ y: -5 }}
                  style={{
                    background: colors.secondary + '15',
                    border: `1px solid ${colors.secondary}`
                  }}
                >
                  <h4 
                    className="text-lg font-bold mb-2"
                    style={{ color: colors.secondary }}
                  >
                    1. Input Processing
                  </h4>
                  <p style={{ color: colors.text }}>
                    The chatbot receives user input and processes it by tokenizing, normalizing, and analyzing the text structure.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="flex-1 p-4 rounded-lg"
                  whileHover={{ y: -5 }}
                  style={{
                    background: colors.accent + '15',
                    border: `1px solid ${colors.accent}`
                  }}
                >
                  <h4 
                    className="text-lg font-bold mb-2"
                    style={{ color: colors.accent }}
                  >
                    2. Understanding Intent
                  </h4>
                  <p style={{ color: colors.text }}>
                    The bot determines what the user wants to achieve, classifying the input into predefined categories.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="flex-1 p-4 rounded-lg"
                  whileHover={{ y: -5 }}
                  style={{
                    background: colors.neon + '15',
                    border: `1px solid ${colors.neon}`
                  }}
                >
                  <h4 
                    className="text-lg font-bold mb-2"
                    style={{ color: colors.neon }}
                  >
                    3. Generating Response
                  </h4>
                  <p style={{ color: colors.text }}>
                    Based on the understood intent, the bot formulates a response using predefined templates or sophisticated AI.
                  </p>
                </motion.div>
              </div>
            </div>
            
            {/* Interactive Quiz */}
            <motion.div
              className="p-6 rounded-2xl"
              whileHover={{ boxShadow: `0 0 20px ${colors.primary}40` }}
              style={{
                background: colors.background,
                border: `2px solid ${colors.primary}`
              }}
            >
              <h3 
                className="text-xl font-bold mb-4"
                style={{ color: colors.primary }}
              >
                Test Your Knowledge
              </h3>
              
              <p className="mb-4" style={{ color: colors.text }}>
                Which of these is NOT typically part of a chatbot's architecture?
              </p>
              
              <div className="space-y-3">
                {[
                  'Natural Language Understanding (NLU) Module',
                  'Dialog Management System',
                  'Quantum Entanglement Processor',
                  'Response Generation Engine'
                ].map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-3 rounded-lg text-left"
                    style={{
                      background: index === 2 ? colors.primary + '20' : 'transparent',
                      border: `1px solid ${colors.primary}`,
                      color: colors.text
                    }}
                    onClick={() => index === 2 ? setShowExplanation(true) : null}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
        
        {activeTab === 'practice' && (
          <motion.div
            key="practice"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="mb-6">
              <h3 
                className="text-2xl font-bold mb-2"
                style={{ color: colors.primary }}
              >
                Chatbot Typing Practice
              </h3>
              <p style={{ color: colors.text }}>
                Test your knowledge of chatbot terminology with this fun typing challenge! Type the words as they fall to score points.
              </p>
            </div>
            
            <TypingGame />
          </motion.div>
        )}
        
        {activeTab === 'visualize' && (
          <motion.div
            key="visualize"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-6"
          >
            <div 
              className="p-6 rounded-2xl"
              style={{
                background: colors.background,
                border: `2px solid ${colors.primary}`
              }}
            >
              <h3 
                className="text-xl font-bold mb-4"
                style={{ color: colors.primary }}
              >
                Chatbot Processing Flow
              </h3>
              
              <div className="relative h-[400px]">
                {/* Flowchart connections */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  style={{ zIndex: 1 }}
                >
                  {/* Connection lines */}
                  <path
                    d="M150,80 L150,150"
                    stroke={colors.neon}
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M150,210 L150,280"
                    stroke={colors.neon}
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M150,340 L150,380 L400,380 L400,80 L250,80"
                    stroke={colors.neon}
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                  />
                  <path
                    d="M220,180 L300,180"
                    stroke={colors.accent}
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M220,310 L300,310"
                    stroke={colors.secondary}
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
                
                {/* Input Node */}
                <motion.div
                  className="absolute left-[75px] top-[30px] p-4 rounded-lg w-[150px] text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  style={{
                    background: colors.primary + '30',
                    border: `2px solid ${colors.primary}`,
                    zIndex: 2
                  }}
                >
                  <span className="text-xl mb-2">📝</span>
                  <h4 style={{ color: colors.primary }}>User Input</h4>
                </motion.div>
                
                {/* NLU Node */}
                <motion.div
                  className="absolute left-[75px] top-[150px] p-4 rounded-lg w-[150px] text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    background: colors.accent + '30',
                    border: `2px solid ${colors.accent}`,
                    zIndex: 2
                  }}
                >
                  <span className="text-xl mb-2">🧠</span>
                  <h4 style={{ color: colors.accent }}>NLU Processing</h4>
                </motion.div>
                
                {/* Intent Classification */}
                <motion.div
                  className="absolute left-[300px] top-[150px] p-4 rounded-lg w-[150px] text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    background: colors.accent + '20',
                    border: `2px solid ${colors.accent}`,
                    zIndex: 2
                  }}
                >
                  <span className="text-xl mb-2">🎯</span>
                  <h4 style={{ color: colors.accent }}>Intent Classification</h4>
                </motion.div>
                
                {/* Dialog Manager */}
                <motion.div
                  className="absolute left-[75px] top-[280px] p-4 rounded-lg w-[150px] text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  style={{
                    background: colors.secondary + '30',
                    border: `2px solid ${colors.secondary}`,
                    zIndex: 2
                  }}
                >
                  <span className="text-xl mb-2">🔄</span>
                  <h4 style={{ color: colors.secondary }}>Dialog Manager</h4>
                </motion.div>
                
                {/* Knowledge Base */}
                <motion.div
                  className="absolute left-[300px] top-[280px] p-4 rounded-lg w-[150px] text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  style={{
                    background: colors.secondary + '20',
                    border: `2px solid ${colors.secondary}`,
                    zIndex: 2
                  }}
                >
                  <span className="text-xl mb-2">📚</span>
                  <h4 style={{ color: colors.secondary }}>Knowledge Base</h4>
                </motion.div>
              </div>
            </div>
            
            <div 
              className="p-6 rounded-2xl"
              style={{
                background: colors.background,
                border: `2px solid ${colors.neon}`
              }}
            >
              <h3 
                className="text-xl font-bold mb-4"
                style={{ color: colors.neon }}
              >
                Chatbot Technology Progression
              </h3>
              
              <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                  <div 
                    className="w-[30%] text-right pr-4"
                    style={{ color: colors.text }}
                  >
                    1960s - 1980s
                  </div>
                  <div 
                    className="w-[70%] p-3 rounded-lg"
                    style={{
                      background: colors.primary + '20',
                      border: `1px solid ${colors.primary}`
                    }}
                  >
                    <h4 
                      className="font-bold"
                      style={{ color: colors.primary }}
                    >
                      Rule-Based Systems
                    </h4>
                    <p className="text-sm" style={{ color: colors.text }}>
                      Simple pattern matching like ELIZA, using predefined rules and templates
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div 
                    className="w-[30%] text-right pr-4"
                    style={{ color: colors.text }}
                  >
                    1990s - 2000s
                  </div>
                  <div 
                    className="w-[70%] p-3 rounded-lg"
                    style={{
                      background: colors.secondary + '20',
                      border: `1px solid ${colors.secondary}`
                    }}
                  >
                    <h4 
                      className="font-bold"
                      style={{ color: colors.secondary }}
                    >
                      Statistical Models
                    </h4>
                    <p className="text-sm" style={{ color: colors.text }}>
                      Early NLP and machine learning approaches, with basic intent classification
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div 
                    className="w-[30%] text-right pr-4"
                    style={{ color: colors.text }}
                  >
                    2010s
                  </div>
                  <div 
                    className="w-[70%] p-3 rounded-lg"
                    style={{
                      background: colors.accent + '20',
                      border: `1px solid ${colors.accent}`
                    }}
                  >
                    <h4 
                      className="font-bold"
                      style={{ color: colors.accent }}
                    >
                      Neural Networks
                    </h4>
                    <p className="text-sm" style={{ color: colors.text }}>
                      Advanced ML models like RNNs and LSTMs for more natural language understanding
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div 
                    className="w-[30%] text-right pr-4"
                    style={{ color: colors.text }}
                  >
                    Present
                  </div>
                  <div 
                    className="w-[70%] p-3 rounded-lg"
                    style={{
                      background: colors.neon + '20',
                      border: `1px solid ${colors.neon}`
                    }}
                  >
                    <h4 
                      className="font-bold"
                      style={{ color: colors.neon }}
                    >
                      Large Language Models
                    </h4>
                    <p className="text-sm" style={{ color: colors.text }}>
                      Transformer-based models like GPT providing human-like conversational abilities
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}; 