import React, { useState, useEffect } from 'react';

/**
 * AI Odyssey
 *
 * A grand, epic, all-in-one interactive React adventure about Artificial Intelligence.
 * 
 * Features:
 * - Multiple futuristic "realms" of AI to explore
 * - Dark Mode Toggle
 * - Character (Avatar) Selection
 * - Score & Achievement System
 * - Data-Token Collection
 * - AI Acronym Memory Game
 * - Dynamic AI Facts
 * - Celebration Animations
 * - Fancy Animations for backgrounds and UI elements
 * - Step-by-step Intro Dialog
 * - And a whole lot more, going all out for an epic user experience!
 */

const AIOdyssey = () => {
  // Theme State
  const [darkMode, setDarkMode] = useState(false);

  // Game State
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [activeRealm, setActiveRealm] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [introStep, setIntroStep] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  // Achievements
  const [achievements, setAchievements] = useState([
    { id: 'initiate', name: 'AI Initiate', description: 'Begin your AI Odyssey', unlocked: false },
    { id: 'realm_explorer', name: 'Realm Explorer', description: 'Visit all AI Realms', unlocked: false },
    { id: 'data_collector', name: 'Data Collector', description: 'Collect 10 unique Data Tokens', unlocked: false },
    { id: 'memory_master', name: 'Memory Master', description: 'Win the AI Acronym Memory Game', unlocked: false },
  ]);

  // Realms
  const realms = [
    { name: "Data Mines", color: "#FF9800", description: "Where raw data is unearthed!", icon: "⛏️" },
    { name: "Neural Nexus", color: "#3F51B5", description: "Home of the deep learning networks!", icon: "🧠" },
    { name: "Quantum Quarry", color: "#9C27B0", description: "Where qubits shape the future!", icon: "⚛️" },
    { name: "Algorithmic Archipelago", color: "#4CAF50", description: "Where design meets intelligence!", icon: "🌐" },
    { name: "Singularity Summit", color: "#E91E63", description: "The horizon of AI consciousness!", icon: "🌌" },
  ];

  // Realms visited
  const [visitedRealms, setVisitedRealms] = useState([0]);
  useEffect(() => {
    if (!visitedRealms.includes(activeRealm)) {
      setVisitedRealms([...visitedRealms, activeRealm]);
      setScore(prev => prev + 20);
      showCelebrationEffect(`You discovered ${realms[activeRealm].name}! +20 points`);
    }
  }, [activeRealm]);

  // Characters
  const characters = {
    codeRunner: { name: "Code Runner", color: "#F44336", emoji: "💻" },
    dataSeer: { name: "Data Seer", color: "#2196F3", emoji: "🔮" },
    roboGuru: { name: "Robo Guru", color: "#FFC107", emoji: "🤖" },
  };
  const [character, setCharacter] = useState('codeRunner');

  // Data Token Collection
  const [dataTokens, setDataTokens] = useState([]);
  const availableTokens = [
    "Structured Schema", "Unstructured Blob", "Vector Embedding",
    "Quantum Entanglement Record", "Labeled Dataset", "GAN Sample",
    "Time Series Slice", "Multimodal Fusion", "Anomaly Signature",
    "Graph Embedding", "Reinforcement Trajectory", "Bayesian Prior"
  ];
  
  const collectToken = () => {
    // Collect a random token not yet collected
    const uncollected = availableTokens.filter(token => !dataTokens.includes(token));
    if (uncollected.length === 0) {
      showCelebrationEffect("You’ve collected ALL data tokens! Incredible!");
      return;
    }
    const randomIndex = Math.floor(Math.random() * uncollected.length);
    const newToken = uncollected[randomIndex];
    setDataTokens([...dataTokens, newToken]);
    setScore(prev => prev + 10);
    showCelebrationEffect(`You gathered a "${newToken}"! +10 points`);
  };

  // Memory Game
  const [memoryGameActive, setMemoryGameActive] = useState(false);
  const [memoryItems, setMemoryItems] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [memoryResult, setMemoryResult] = useState(null);

  // Possible AI acronyms to memorize
  const aiAcronyms = [
    "CNN", "RNN", "GAN", "NLP", "RL", "ML", "AI", "AGI", "LSTM", "BERT", 
    "GPT", "SVM", "PCA", "KNN", "DBN", "AE", "DT", "HMM"
  ];
  
  const startMemoryGame = () => {
    // Random 3-5 acronyms
    const length = Math.floor(Math.random() * 3) + 3; // 3 to 5
    const selected = [...aiAcronyms]
      .sort(() => 0.5 - Math.random()) // shuffle
      .slice(0, length);

    setMemoryItems(selected);
    setMemoryGameActive('show');

    // Hide after 4 seconds
    setTimeout(() => {
      setMemoryGameActive('input');
    }, 4000);
  };

  const submitMemoryAnswer = () => {
    // check if user typed the acronyms in the correct order (space separated, ignoring case)
    const correct =
      userAnswer.trim().toUpperCase() === memoryItems.map(item => item.toUpperCase()).join(" ");
    setMemoryResult(correct);

    if (correct) {
      const pointsEarned = memoryItems.length * 10;
      setScore(prev => prev + pointsEarned);
      showCelebrationEffect(`Correct! +${pointsEarned} points`);
      unlockAchievement('memory_master', "Achievement Unlocked: Memory Master!");
    }
    setTimeout(() => {
      setMemoryGameActive(false);
      setMemoryResult(null);
      setUserAnswer('');
    }, 2000);
  };

  // AI Facts
  const aiFacts = [
    "The term 'Artificial Intelligence' was coined by John McCarthy in 1956.",
    "Deep Learning uses multi-layered neural networks to automatically learn features.",
    "Modern AI draws heavily on statistics, computer science, and cognitive sciences.",
    "GANs can generate extremely realistic images, audio, and even video.",
    "GPT stands for Generative Pre-trained Transformer, originally developed by OpenAI.",
    "The Turing Test, proposed by Alan Turing, is a measure of a machine's ability to exhibit intelligent behavior indistinguishable from a human.",
    "Self-driving cars use AI that combines computer vision, sensor fusion, and reinforcement learning.",
    "Quantum computing may revolutionize AI by drastically speeding up complex computations.",
    "Neural networks were inspired by the structure of the human brain, but are much simpler in comparison.",
    "There are over 100+ AI frameworks and libraries used worldwide."
  ];
  const [currentFact, setCurrentFact] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact(prev => (prev + 1) % aiFacts.length);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  // Intro
  const introSteps = [
    { text: "Greetings, traveler! Welcome to AI Odyssey, a journey across realms of Artificial Intelligence.", character: "codeRunner" },
    { text: "I’m your guide, here to help you discover the wonders of machine learning, deep learning, and beyond.", character: "codeRunner" },
    { text: "Collect data tokens, test your memory, and explore each realm to unlock epic achievements!", character: "codeRunner" },
    { text: "Shall we begin our quest to push the boundaries of intelligence?", character: "codeRunner" }
  ];
  const nextIntroStep = () => {
    if (introStep < introSteps.length - 1) {
      setIntroStep(introStep + 1);
    } else {
      setShowIntro(false);
    }
  };

  // Achievements Check
  useEffect(() => {
    // AI Initiate achievement
    if (gameStarted) {
      unlockAchievement('initiate', "Achievement Unlocked: AI Initiate!");
    }
    // Realm Explorer
    if (visitedRealms.length === realms.length) {
      unlockAchievement('realm_explorer', "Achievement Unlocked: Realm Explorer!");
    }
    // Data Collector
    if (dataTokens.length >= 10) {
      unlockAchievement('data_collector', "Achievement Unlocked: Data Collector!");
    }
  }, [gameStarted, visitedRealms, dataTokens]);

  const unlockAchievement = (id, message) => {
    const newAchievements = [...achievements];
    const found = newAchievements.findIndex(a => a.id === id);
    if (found !== -1 && !newAchievements[found].unlocked) {
      newAchievements[found].unlocked = true;
      setAchievements(newAchievements);
      showCelebrationEffect(message);
    }
  };

  // Celebration
  const showCelebrationEffect = (message) => {
    setShowCelebration({ active: true, message });
    setTimeout(() => {
      setShowCelebration(false);
    }, 3000);
  };

  // Start the Game
  const startGame = () => {
    setGameStarted(true);
    setScore(10);
    showCelebrationEffect("Your AI Odyssey begins! +10 points");
  };

  // Toggle Dark Mode
  const toggleTheme = () => setDarkMode(prev => !prev);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: darkMode ? '#1E1E1E' : '#F1F8E9',
        color: darkMode ? '#FFF' : '#333',
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
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes sparkle {
            0%, 100% { opacity: 0; transform: scale(0); }
            50% { opacity: 1; transform: scale(1); }
          }
          
          .floating { animation: float 10s ease-in-out infinite; }
          .rotating { animation: rotate 15s linear infinite; }
          .pulsing { animation: pulse 2s infinite; }
          .blinking { animation: blink 1.2s infinite; }
          .fadeInUp { animation: fadeInUp 0.5s ease-out; }
          .sparkle { animation: sparkle 1s ease-in-out; }
          .hover-scale:hover { transform: scale(1.05); transition: transform 0.2s; }
        `}
      </style>

      {/* Background Icons (AI/Tech Themed) */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        {Array.from({ length: 25 }).map((_, i) => {
          const icons = ["🤖", "📡", "⚙️", "🔬", "⚛️", "💡"];
          const icon = icons[i % icons.length];
          const size = Math.random() * 60 + 20;
          const styleType = Math.random() > 0.5 ? 'floating' : 'rotating';
          return (
            <div
              key={i}
              className={styleType}
              style={{
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${size}px`,
                opacity: 0.15,
                animationDelay: `${Math.random() * 3}s`
              }}
            >
              {icon}
            </div>
          );
        })}
      </div>

      {/* Header */}
      <header
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem',
          backgroundColor: darkMode ? 'rgba(30, 30, 30, 0.7)' : 'rgba(241, 248, 233, 0.7)',
          backdropFilter: 'blur(6px)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: darkMode ? '#FFEA00' : '#4CAF50',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <span style={{ fontSize: '2.5rem' }}>🤖</span>
          AI Odyssey
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Score */}
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

          {/* Dark Mode Toggle */}
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
              backgroundColor: darkMode ? '#FFEA00' : '#333',
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
            zIndex: 50,
            textAlign: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            animation: 'fadeInUp 0.5s ease-out'
          }}
        >
          {showCelebration.message}
          <div style={{ position: 'absolute', inset: '-20px', pointerEvents: 'none' }}>
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="sparkle"
                style={{
                  position: 'absolute',
                  width: '10px',
                  height: '10px',
                  backgroundColor: ['#FF9800', '#3F51B5', '#9C27B0', '#4CAF50', '#E91E63'][i % 5],
                  borderRadius: '50%',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 0.5}s`
                }}
              />
            ))}
          </div>
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
              backgroundColor: darkMode ? '#2C2C2C' : '#FFFFFF',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
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
          // Intro / Character Select Screen
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ fontSize: '7rem', marginBottom: '1rem' }}>🤖</div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Welcome to AI Odyssey!
            </h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
              Embark on a quest through the realms of Artificial Intelligence – 
              collect data, test your memory, and become an AI legend!
            </p>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>Choose Your Avatar</h3>
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
                      width: '120px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.5rem',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      transition: 'all 0.2s'
                    }}
                    className="hover-scale"
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
                background: 'linear-gradient(90deg, #2196F3, #E91E63)',
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
              Start Odyssey
            </button>
          </div>
        ) : (
          // Game UI
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {/* Realm Selection */}
            <div
              style={{
                backgroundColor: darkMode ? 'rgba(46, 46, 46, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(5px)',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              <h2
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>🌌</span> Choose a Realm
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {realms.map((realm, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveRealm(index)}
                    className={activeRealm === index ? 'pulsing hover-scale' : 'hover-scale'}
                    style={{
                      backgroundColor: activeRealm === index ? realm.color : 'transparent',
                      color: activeRealm === index ? '#fff' : darkMode ? '#fff' : '#333',
                      border: `2px solid ${realm.color}`,
                      borderRadius: '0.5rem',
                      padding: '0.75rem',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>{realm.icon}</span>
                        <span>{realm.name}</span>
                      </div>
                      <div>{visitedRealms.includes(index) ? '✔️' : ''}</div>
                    </div>
                    <div style={{ fontSize: '0.9rem', marginTop: '0.25rem', opacity: 0.8 }}>
                      {realm.description}
                    </div>
                  </button>
                ))}
              </div>

              {/* AI Fact */}
              <div
                style={{
                  marginTop: '1.5rem',
                  backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.6)',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  borderLeft: '4px solid #3F51B5',
                  fontSize: '0.9rem'
                }}
              >
                <p
                  style={{
                    fontWeight: 'bold',
                    marginBottom: '0.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span>💡</span> AI Fact:
                </p>
                <p className="fadeInUp" key={currentFact}>
                  {aiFacts[currentFact]}
                </p>
              </div>
            </div>

            {/* Active Realm Panel */}
            <div
              style={{
                backgroundColor: darkMode ? 'rgba(46, 46, 46, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(5px)',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                position: 'relative'
              }}
            >
              <h2
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  color: realms[activeRealm].color,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>{realms[activeRealm].icon}</span> {realms[activeRealm].name}
              </h2>

              {/* Character Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: characters[character].color,
                  color: '#fff',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '9999px',
                  fontSize: '0.8rem'
                }}
              >
                <span>{characters[character].emoji}</span>
                <span>{characters[character].name}</span>
              </div>

              {/* Memory Game Modal */}
              {memoryGameActive && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(3px)',
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem'
                  }}
                >
                  <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>AI Acronym Memory Game</h3>

                  {memoryGameActive === 'show' && memoryResult === null && (
                    <div className="fadeInUp" style={{ textAlign: 'center' }}>
                      <p>Memorize these acronyms:</p>
                      <div
                        style={{
                          margin: '1rem 0',
                          fontSize: '1.3rem',
                          fontWeight: 'bold',
                          color: realms[1].color,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.5rem'
                        }}
                      >
                        {memoryItems.map((item, idx) => (
                          <div key={idx} className="blinking">
                            {item}
                          </div>
                        ))}
                      </div>
                      <p>They will vanish in 4 seconds...</p>
                    </div>
                  )}

                  {memoryGameActive === 'input' && memoryResult === null && (
                    <div className="fadeInUp" style={{ textAlign: 'center' }}>
                      <p>Type the acronyms in order, separated by spaces:</p>
                      <input
                        type="text"
                        value={userAnswer}
                        onChange={e => setUserAnswer(e.target.value)}
                        style={{
                          padding: '0.75rem',
                          fontSize: '1rem',
                          borderRadius: '0.5rem',
                          border: `2px solid ${realms[1].color}`,
                          width: '260px',
                          textAlign: 'center',
                          marginBottom: '1rem',
                          backgroundColor: darkMode ? '#333' : '#fff',
                          color: darkMode ? '#fff' : '#333'
                        }}
                        autoFocus
                      />
                      <button
                        onClick={submitMemoryAnswer}
                        className="hover-scale"
                        style={{
                          backgroundColor: realms[1].color,
                          color: '#fff',
                          border: 'none',
                          borderRadius: '0.5rem',
                          padding: '0.5rem 1rem',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}
                      >
                        Check Answer
                      </button>
                    </div>
                  )}

                  {memoryResult !== null && (
                    <div className="fadeInUp" style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                        {memoryResult ? '🎉' : '❌'}
                      </div>
                      {memoryResult ? (
                        <p style={{ color: '#4CAF50', fontWeight: 'bold' }}>You got them right!</p>
                      ) : (
                        <>
                          <p style={{ color: '#f44336', fontWeight: 'bold' }}>Oops, that’s not correct.</p>
                          <p>The correct sequence was: <b>{memoryItems.join(" ")}</b></p>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Realm-Specific Content */}
              <div className="fadeInUp">
                <p
                  style={{
                    backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    marginBottom: '1rem'
                  }}
                >
                  Exploring {realms[activeRealm].name} deepens your understanding of AI’s facets. 
                  Gather data tokens, try the memory game, and unlock new achievements here!
                </p>

                <div
                  style={{
                    backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.7)',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    marginBottom: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                  }}
                >
                  <button
                    onClick={collectToken}
                    className="hover-scale"
                    style={{
                      backgroundColor: realms[activeRealm].color,
                      color: '#fff',
                      border: 'none',
                      borderRadius: '0.5rem',
                      padding: '0.75rem 1rem',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <span>📂</span> Collect Data Token (+10 points)
                  </button>

                  <button
                    onClick={startMemoryGame}
                    className="hover-scale"
                    style={{
                      backgroundColor: '#9C27B0',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '0.5rem',
                      padding: '0.75rem 1rem',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <span>🎮</span> AI Acronym Memory Game
                  </button>
                </div>
              </div>
            </div>

            {/* Progress / Achievements Panel */}
            <div
              style={{
                backgroundColor: darkMode ? 'rgba(46, 46, 46, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(5px)',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              <h2
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>🏆</span> Your AI Journey
              </h2>

              {/* Score Display */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                  padding: '1rem',
                  backgroundColor: darkMode ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.05)',
                  borderRadius: '0.5rem'
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FF9800, #3F51B5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#fff'
                  }}
                >
                  {score}
                </div>
                <div>
                  <div style={{ fontWeight: 'bold' }}>Points</div>
                  <div style={{ fontSize: '0.9rem' }}>Keep exploring to earn more!</div>
                </div>
              </div>

              {/* Data Tokens Collected */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div
                  style={{
                    marginBottom: '0.5rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span>📂</span> Data Tokens Collected
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    backgroundColor: darkMode ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.05)',
                    padding: '0.75rem',
                    borderRadius: '0.5rem'
                  }}
                >
                  {dataTokens.length === 0 ? (
                    <span>No tokens yet. Go collect some data!</span>
                  ) : (
                    dataTokens.map((token, i) => (
                      <div
                        key={i}
                        style={{
                          backgroundColor: '#FF9800',
                          color: '#fff',
                          borderRadius: '0.25rem',
                          padding: '0.25rem 0.5rem',
                          fontSize: '0.85rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {token}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Realms Explored */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem'
                  }}
                >
                  <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>🌌</span> Realms Explored
                  </div>
                  <div>{visitedRealms.length} / {realms.length}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {realms.map((realm, index) => (
                    <div
                      key={index}
                      style={{
                        width: `calc(${100 / realms.length}% - ${(realms.length - 1) * 0.5 / realms.length}rem)`,
                        aspectRatio: '1',
                        borderRadius: '50%',
                        backgroundColor: visitedRealms.includes(index)
                          ? realm.color
                          : darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem'
                      }}
                    >
                      {visitedRealms.includes(index) ? realm.icon : ''}
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div
                  style={{
                    marginBottom: '0.75rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span>🏅</span> Achievements
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {achievements.map(a => (
                    <div
                      key={a.id}
                      style={{
                        backgroundColor: a.unlocked
                          ? (darkMode ? 'rgba(76, 175, 80, 0.2)' : 'rgba(76, 175, 80, 0.1)')
                          : (darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)'),
                        borderRadius: '0.5rem',
                        padding: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        opacity: a.unlocked ? 1 : 0.6,
                        border: a.unlocked ? '1px solid #4CAF50' : 'none'
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: a.unlocked ? '#4CAF50' : (darkMode ? '#666' : '#ccc'),
                          color: '#fff',
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1rem'
                        }}
                      >
                        {a.unlocked ? '✓' : '?'}
                      </div>
                      <div>
                        <div style={{ fontWeight: 'bold' }}>{a.name}</div>
                        <div style={{ fontSize: '0.8rem' }}>{a.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div
                style={{
                  backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.9rem'
                }}
              >
                <p
                  style={{
                    fontWeight: 'bold',
                    marginBottom: '0.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span>🤖</span> Did you know?
                </p>
                <p className="fadeInUp" key={currentFact}>
                  AI is rapidly evolving, with new techniques and breakthroughs happening every year!
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AIOdyssey;
