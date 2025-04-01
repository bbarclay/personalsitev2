import React, { useState, useEffect } from 'react';

/**
 * MathQuest
 * 
 * An engaging, interactive math-themed adventure game
 * where players solve math problems to progress through levels.
 *
 * Features:
 * - Dark Mode Toggle
 * - Character Selection
 * - Multiple Levels to Explore
 * - Score & Achievement System
 * - Math Challenge Game
 * - Random Math Facts
 * - Celebration Effects for achievements
 */

const MathQuest = () => {
  // Removed dark mode logic
  
  // Game
  const [gameStarted, setGameStarted] = useState(false);
  const [activeLevel, setActiveLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  
  // Achievements
  const [achievements, setAchievements] = useState([
    { id: 'math_master', name: 'Math Master', description: 'Complete your first math challenge', unlocked: false },
    { id: 'level_explorer', name: 'Level Explorer', description: 'Visit all math levels', unlocked: false },
    { id: 'problem_solver', name: 'Problem Solver', description: 'Solve 10 math problems', unlocked: false },
  ]);
  
  // Levels
  const levels = [
    { name: "Addition Alley", color: "#4CAF50", description: "Solve addition problems!", icon: "➕" },
    { name: "Subtraction Station", color: "#8BC34A", description: "Tackle subtraction challenges!", icon: "➖" },
    { name: "Multiplication Mountain", color: "#FFC107", description: "Climb to multiplication mastery!", icon: "✖️" },
    { name: "Division Domain", color: "#FF5722", description: "Conquer division problems!", icon: "➗" },
  ];
  
  // Track visited levels
  const [levelsVisited, setLevelsVisited] = useState([0]);
  useEffect(() => {
    if (!levelsVisited.includes(activeLevel)) {
      setLevelsVisited([...levelsVisited, activeLevel]);
      setScore(prev => prev + 20);
      showCelebrationEffect(`You completed ${levels[activeLevel].name}! +20 points`);
    }
  }, [activeLevel]);

  // Characters
  const characters = {
    mathWizard: { name: "Math Wizard", color: "#795548", emoji: "🧙‍♂️" },
    numberNinja: { name: "Number Ninja", color: "#673AB7", emoji: "🥷" },
  };
  const [character, setCharacter] = useState('mathWizard');
  
  // Intro & Dialogue
  const [showIntro, setShowIntro] = useState(true);
  const [introStep, setIntroStep] = useState(0);
  const introSteps = [
    { text: "Welcome to MathQuest! I'm your guide through the world of math.", character: "mathWizard" },
    { text: "Prepare to solve problems and earn points along the way.", character: "mathWizard" },
    { text: "Each level has unique challenges and surprises.", character: "mathWizard" },
    { text: "Let's embark on this math adventure together!", character: "mathWizard" }
  ];
  const nextIntroStep = () => {
    if (introStep < introSteps.length - 1) {
      setIntroStep(introStep + 1);
    } else {
      setShowIntro(false);
    }
  };
  
  // Random Math Facts
  const mathFacts = [
    "Did you know? The number zero was invented in India.",
    "Math is used in many fields, including science, engineering, and economics.",
    "The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones.",
    "Pi (π) is an irrational number, meaning it cannot be expressed as a simple fraction.",
    "The concept of infinity is used in mathematics to describe something that is unbounded or limitless."
  ];
  const [currentFact, setCurrentFact] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact(prev => (prev + 1) % mathFacts.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);
  
  // Math Problems
  const [currentProblem, setCurrentProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [problemResult, setProblemResult] = useState(null);
  
  const generateProblem = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operation = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
    let answer;
    
    switch (operation) {
      case '+':
        answer = num1 + num2;
        setCurrentProblem(`${num1} + ${num2}`);
        break;
      case '-':
        answer = num1 - num2;
        setCurrentProblem(`${num1} - ${num2}`);
        break;
      case '*':
        answer = num1 * num2;
        setCurrentProblem(`${num1} * ${num2}`);
        break;
      case '/':
        answer = num1 / num2;
        setCurrentProblem(`${num1} / ${num2}`);
        break;
      default:
        break;
    }
    
    return answer;
  };
  
  const checkAnswer = () => {
    const correctAnswer = generateProblem();
    const isCorrect = parseFloat(userAnswer) === correctAnswer;
    setProblemResult(isCorrect);
    if (isCorrect) {
      setScore(prev => prev + 10);
      showCelebrationEffect(`Correct! +10 points`);
    }
    setTimeout(() => {
      setProblemResult(null);
      setUserAnswer('');
      generateProblem();
    }, 2000);
  };
  
  // Celebration
  const showCelebrationEffect = (message) => {
    setShowCelebration({ active: true, message });
    setTimeout(() => {
      setShowCelebration(false);
    }, 3000);
  };
  
  // Start the game
  const startGame = () => {
    setGameStarted(true);
    setScore(10);
    showCelebrationEffect("Math adventure begins! +10 points");
    generateProblem();
  };
  
  // Toggle Dark Mode
  const toggleTheme = () => setDarkMode(prev => !prev);
  
  return (
    <div
      style={{
        minHeight: '100vh',
      className={`min-h-screen ${gameStarted ? 'bg-white' : 'bg-gray-100'} transition-all duration-300`}
        transition: 'all 0.3s',
        fontFamily: 'system-ui, sans-serif',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* CSS Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          .floating { animation: float 10s ease-in-out infinite; }
          .hover-scale:hover { transform: scale(1.05); transition: transform 0.2s; }
        `}
      </style>
      
      {/* Header */}
      <header
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem',
        className={`relative z-10 flex justify-between items-center p-4 bg-gray-800 bg-opacity-70 shadow-md`}
          backdropFilter: 'blur(6px)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: darkMode ? '#FFEB3B' : '#4CAF50'
          }}
        >
          <span style={{ fontSize: '2.5rem' }}>🧙‍♂️</span>
          MathQuest
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              backgroundColor: '#4CAF50',
              color: '#fff',
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>⭐</span>
            <span>{score}</span>
          </div>
          
          <button
            onClick={toggleTheme}
            className="hover-scale"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              backgroundColor: darkMode ? '#FFEB3B' : '#333',
              color: darkMode ? '#333' : '#fff'
            }}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>
      
      {/* Celebration */}
      {showCelebration && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            padding: '1rem 2rem',
            borderRadius: '0.5rem',
            zIndex: 10,
            textAlign: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            animation: 'fadeInUp 0.5s ease-out'
          }}
        >
          {showCelebration.message}
        </div>
      )}
      
      {/* Main Content */}
      <main
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '2rem 1rem',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Intro Dialog */}
        {showIntro && gameStarted && (
          <div
            style={{
              position: 'fixed',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80%',
              maxWidth: '600px',
              backgroundColor: darkMode ? '#424242' : '#FFFFFF',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              animation: 'fadeInUp 0.5s ease-out'
            }}
          >
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: characters[introSteps[introStep].character].color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem'
                }}
              >
                {characters[introSteps[introStep].character].emoji}
              </div>
              <div>
                <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                  {characters[introSteps[introStep].character].name}
                </div>
                <div className="fadeInUp">{introSteps[introStep].text}</div>
              </div>
            </div>
            
            <button
              onClick={nextIntroStep}
              className="hover-scale"
              style={{
                alignSelf: 'flex-end',
                backgroundColor: characters[introSteps[introStep].character].color,
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                padding: '0.5rem 1rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              {introStep < introSteps.length - 1 ? 'Next' : 'Let’s Go!'}
            </button>
          </div>
        )}
        
        {!gameStarted ? (
          // Intro Screen (Character Select, Start Game)
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Welcome to MathQuest!
            </h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
              Solve math problems and earn points!
            </p>
            
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>Choose Your Character</h3>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                {Object.entries(characters).map(([id, char]) => (
                  <button
                    key={id}
                    onClick={() => setCharacter(id)}
                    style={{
                      backgroundColor: character === id ? char.color : 'transparent',
                      color: character === id ? '#fff' : darkMode ? '#fff' : '#333',
                      border: `2px solid ${char.color}`,
                      borderRadius: '0.75rem',
                      padding: '0.75rem',
                      width: '110px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.5rem',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      transition: 'all 0.2s'
                    }}
                    className={character === id ? 'hover-scale' : 'hover-scale'}
                  >
                    <span style={{ fontSize: '2rem' }}>{char.emoji}</span>
                    <span>{char.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={startGame}
              className="hover-scale"
              style={{
                background: 'linear-gradient(90deg, #8BC34A, #CDDC39)',
                color: '#fff',
                padding: '0.75rem 2rem',
                borderRadius: '9999px',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                border: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer'
              }}
            >
              Start Adventure
            </button>
          </div>
        ) : (
          // Game UI
          <div>
            <h2>Current Problem: {currentProblem}</h2>
            <input
              type="text"
              value={userAnswer}
              onChange={e => setUserAnswer(e.target.value)}
              placeholder="Your answer"
            />
            <button onClick={checkAnswer}>Submit Answer</button>
            {problemResult !== null && (
              <div>
                {problemResult ? "Correct!" : "Wrong!"}
              </div>
            )}
            <div>
              <p>Math Fact: {mathFacts[currentFact]}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MathQuest;
