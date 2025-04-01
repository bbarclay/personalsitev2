import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isTyping?: boolean;
  isError?: boolean;
}

interface PatternExample {
  pattern: string;
  input: string;
  response: string;
  explanation: string;
}

export const ChatSimulator: React.FC = () => {
  const { colors } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      text: "Hi there! I'm your virtual assistant. How can I help you today?", 
      sender: 'bot', 
      timestamp: new Date() 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [activeTip, setActiveTip] = useState<number | null>(null);
  const [selectedPattern, setSelectedPattern] = useState<PatternExample | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const patternExamples: PatternExample[] = [
    {
      pattern: 'greeting pattern',
      input: 'hello',
      response: 'Hi there! How can I help you today?',
      explanation: 'Simple keyword matching: when the bot detects "hello" or similar greeting words, it responds with a greeting.'
    },
    {
      pattern: 'weather pattern',
      input: 'what is the weather like today',
      response: 'I don\'t have access to real-time weather data, but I can tell you it\'s always sunny in bot land!',
      explanation: 'Entity recognition: the bot recognizes "weather" as a topic entity and responds with a predefined weather response.'
    },
    {
      pattern: 'help pattern',
      input: 'can you help me with something',
      response: 'Of course! I\'m here to help. What do you need assistance with?',
      explanation: 'Intent classification: phrases with "help" or "assist" are classified with a "request_help" intent, triggering a helpful response.'
    },
    {
      pattern: 'sentiment analysis',
      input: 'I\'m feeling really great today!',
      response: 'That\'s wonderful to hear! I\'m glad you\'re having a good day.',
      explanation: 'Sentiment analysis: the bot detects positive sentiment and responds with an appropriate positive acknowledgment.'
    }
  ];
  
  const chatResponses = {
    greeting: [
      "Hello! How can I assist you today?",
      "Hi there! What can I help you with?",
      "Hey! How can I make your day better?"
    ],
    question: [
      "I'll try my best to answer that.",
      "Let me think about that...",
      "That's an interesting question."
    ],
    thanks: [
      "You're welcome!",
      "Happy to help!",
      "Anytime! That's what I'm here for."
    ],
    default: [
      "I'm not sure I understand. Could you rephrase that?",
      "I didn't quite catch that. Can you explain differently?",
      "I'm still learning and didn't understand that fully."
    ]
  };
  
  const findPattern = (input: string): keyof typeof chatResponses => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return 'greeting';
    } else if (lowerInput.includes('?') || lowerInput.includes('what') || lowerInput.includes('how') || lowerInput.includes('why') || lowerInput.includes('when')) {
      return 'question';
    } else if (lowerInput.includes('thanks') || lowerInput.includes('thank you')) {
      return 'thanks';
    } else {
      return 'default';
    }
  };

  const getRandomResponse = (type: keyof typeof chatResponses): string => {
    const responses = chatResponses[type];
    return responses[Math.floor(Math.random() * responses.length)];
  };
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Add typing indicator for bot
    setIsTyping(true);
    const botTypingMessage: Message = {
      id: 'typing-' + Date.now().toString(),
      text: '...',
      sender: 'bot',
      timestamp: new Date(),
      isTyping: true
    };
    
    setMessages(prev => [...prev, botTypingMessage]);
    
    // Process the user input
    const patternType = findPattern(inputValue);
    const responseText = getRandomResponse(patternType);
    
    // Wait a bit to simulate thinking/typing
    setTimeout(() => {
      setIsTyping(false);
      
      // Remove typing indicator and add actual response
      setMessages(prev => {
        const withoutTyping = prev.filter(msg => !msg.isTyping);
        return [
          ...withoutTyping, 
          {
            id: Date.now().toString(),
            text: responseText,
            sender: 'bot',
            timestamp: new Date()
          }
        ];
      });
      
      // Add error message in debug mode if using default response
      if (debugMode && patternType === 'default') {
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            {
              id: 'error-' + Date.now().toString(),
              text: 'No specific pattern matched. Using fallback response.',
              sender: 'bot',
              timestamp: new Date(),
              isError: true
            }
          ]);
        }, 500);
      }
    }, 1500);
  };
  
  const handlePatternSelect = (pattern: PatternExample) => {
    setSelectedPattern(pattern);
    setInputValue(pattern.input);
  };
  
  const chatTips = [
    "Try using clear, simple language for better responses.",
    "Questions work best when they're specific and direct.",
    "The chatbot can't access personal information unless you provide it.",
    "Chatbots work by matching patterns in your text to predefined responses.",
    "If you get an unclear response, try rephrasing your message."
  ];
  
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3">
          {/* Chat Interface */}
          <div 
            className="flex flex-col h-[600px] rounded-xl overflow-hidden"
            style={{ border: `2px solid ${colors.primary}` }}
          >
            {/* Chat Header */}
            <div 
              className="p-4 flex justify-between items-center"
              style={{ 
                background: colors.primary,
                color: colors.background
              }}
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="h-10 w-10 rounded-full flex items-center justify-center"
                  style={{ background: colors.neon }}
                >
                  <span role="img" aria-label="robot" className="text-xl">🤖</span>
                </div>
                <div>
                  <h3 className="font-bold">ChatBot Simulator</h3>
                  <div className="text-xs opacity-70">Online</div>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDebugMode(!debugMode)}
                className="px-3 py-1 rounded-lg text-sm font-medium"
                style={{
                  background: debugMode ? colors.neon : 'transparent',
                  border: `1px solid ${colors.neon}`,
                  color: debugMode ? colors.background : colors.background
                }}
              >
                {debugMode ? 'Debug: ON' : 'Debug: OFF'}
              </motion.button>
            </div>
            
            {/* Chat Messages */}
            <div 
              className="flex-1 p-4 overflow-y-auto"
              style={{ background: colors.background }}
            >
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.isError ? 'rounded-lg' : 
                        message.sender === 'user' ? 'rounded-lg' : 'rounded-lg'
                      }`}
                      style={{
                        background: message.isError ? colors.accent + '20' : 
                                   message.sender === 'user' ? colors.primary + '20' : colors.secondary + '20',
                        border: message.isError ? `1px solid ${colors.accent}` : 
                                message.sender === 'user' ? `1px solid ${colors.primary}30` : `1px solid ${colors.secondary}30`,
                        color: message.isError ? colors.accent : colors.text
                      }}
                    >
                      {message.isTyping ? (
                        <div className="flex space-x-1">
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="h-2 w-2 rounded-full"
                            style={{ background: colors.secondary }}
                          />
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                            className="h-2 w-2 rounded-full"
                            style={{ background: colors.secondary }}
                          />
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                            className="h-2 w-2 rounded-full"
                            style={{ background: colors.secondary }}
                          />
                        </div>
                      ) : (
                        <p>{message.text}</p>
                      )}
                      
                      <div 
                        className="text-xs mt-1 text-right"
                        style={{ opacity: 0.6 }}
                      >
                        {!message.isTyping && !message.isError && message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </AnimatePresence>
            </div>
            
            {/* Chat Input */}
            <form 
              onSubmit={handleSubmit}
              className="p-4 flex items-center space-x-2"
              style={{ 
                background: colors.background,
                borderTop: `1px solid ${colors.primary}30`
              }}
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message here..."
                className="flex-1 p-3 rounded-lg"
                style={{
                  background: colors.background,
                  border: `1px solid ${colors.primary}30`,
                  color: colors.text
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="p-3 rounded-lg"
                style={{
                  background: colors.primary,
                  color: colors.background
                }}
                disabled={isTyping}
              >
                <span role="img" aria-label="send">📤</span>
              </motion.button>
            </form>
          </div>
        </div>
        
        <div className="w-full md:w-1/3 space-y-4">
          {/* Pattern Examples */}
          <div 
            className="p-4 rounded-xl"
            style={{
              background: colors.background,
              border: `2px solid ${colors.secondary}`
            }}
          >
            <h3 
              className="text-lg font-bold mb-3"
              style={{ color: colors.secondary }}
            >
              Pattern Examples
            </h3>
            
            <div className="space-y-2">
              {patternExamples.map((example, index) => (
                <motion.button
                  key={index}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 1 }}
                  onClick={() => handlePatternSelect(example)}
                  className="w-full p-2 text-left rounded-lg flex justify-between items-center"
                  style={{
                    background: selectedPattern?.pattern === example.pattern ? colors.secondary + '30' : colors.secondary + '10',
                    border: `1px solid ${colors.secondary}30`,
                    color: colors.text
                  }}
                >
                  <span>{example.pattern}</span>
                  <span className="text-xs opacity-70">Try it →</span>
                </motion.button>
              ))}
            </div>
            
            {selectedPattern && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-3 rounded-lg text-sm"
                style={{
                  background: colors.background,
                  border: `1px solid ${colors.secondary}`
                }}
              >
                <p className="font-bold" style={{ color: colors.secondary }}>
                  {selectedPattern.pattern}
                </p>
                <p className="mt-1 opacity-70" style={{ color: colors.text }}>
                  <span className="opacity-70">Input: </span>
                  "{selectedPattern.input}"
                </p>
                <p className="mt-1 opacity-70" style={{ color: colors.text }}>
                  <span className="opacity-70">Response: </span>
                  "{selectedPattern.response}"
                </p>
                <p className="mt-2 text-xs" style={{ color: colors.neon }}>
                  {selectedPattern.explanation}
                </p>
              </motion.div>
            )}
          </div>
          
          {/* Chat Tips */}
          <div 
            className="p-4 rounded-xl"
            style={{
              background: colors.background,
              border: `2px solid ${colors.neon}`
            }}
          >
            <h3 
              className="text-lg font-bold mb-3"
              style={{ color: colors.neon }}
            >
              Chat Tips
            </h3>
            
            <div className="space-y-2">
              {chatTips.map((tip, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  className="p-2 rounded-lg"
                  style={{
                    background: activeTip === index ? colors.neon + '20' : 'transparent',
                    border: `1px solid ${activeTip === index ? colors.neon : 'transparent'}`,
                    cursor: 'pointer'
                  }}
                  onClick={() => setActiveTip(activeTip === index ? null : index)}
                >
                  <div className="flex items-start space-x-2">
                    <span 
                      className="mt-1 text-lg"
                      style={{ color: colors.neon }}
                    >
                      {activeTip === index ? '💡' : '○'}
                    </span>
                    <p className="text-sm" style={{ color: colors.text }}>
                      {tip}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {debugMode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 rounded-xl"
              style={{
                background: colors.accent + '10',
                border: `2px solid ${colors.accent}`
              }}
            >
              <h3 
                className="text-lg font-bold mb-3"
                style={{ color: colors.accent }}
              >
                Debug Info
              </h3>
              <div className="space-y-2 text-xs font-mono" style={{ color: colors.text }}>
                <div className="p-2 rounded bg-black bg-opacity-20">
                  <p>Pattern Matching Rules:</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>greeting: contains 'hello', 'hi', 'hey'</li>
                    <li>question: contains '?', 'what', 'how', 'why', 'when'</li>
                    <li>thanks: contains 'thanks', 'thank you'</li>
                    <li>default: no pattern matched</li>
                  </ul>
                </div>
                <div className="p-2 rounded bg-black bg-opacity-20">
                  <p>Last processed input: {messages.filter(m => m.sender === 'user').pop()?.text || 'None'}</p>
                  <p>Pattern detected: {messages.filter(m => m.sender === 'user').pop() ? findPattern(messages.filter(m => m.sender === 'user').pop()?.text || '') : 'None'}</p>
                  <p>Response options: {messages.filter(m => m.sender === 'user').pop() ? chatResponses[findPattern(messages.filter(m => m.sender === 'user').pop()?.text || '')].length : 0}</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}; 