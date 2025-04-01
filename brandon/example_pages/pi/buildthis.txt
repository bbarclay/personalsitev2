import React, { useState, useEffect } from 'react';

const PiAdventure = () => {
  // State variables
  const [darkMode, setDarkMode] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [activeWorld, setActiveWorld] = useState(0);
  const [score, setScore] = useState(0);
  const [piDigits] = useState('3.14159265358979323846264338327950288419716939937510');
  const [revealedDigits, setRevealedDigits] = useState(3);
  const [circleRadius, setCircleRadius] = useState(50);
  const [showFormula, setShowFormula] = useState(false);
  const [character, setCharacter] = useState('professor');
  const [showCelebration, setShowCelebration] = useState(false);
  const [memoryGameActive, setMemoryGameActive] = useState(false);
  const [memoryDigits, setMemoryDigits] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [memoryResult, setMemoryResult] = useState(null);
  const [achievements, setAchievements] = useState([
    { id: 'starter', name: 'Pi Beginner', description: 'Start your Pi adventure', unlocked: false },
    { id: 'explorer', name: 'World Explorer', description: 'Visit all Pi worlds', unlocked: false },
    { id: 'memory', name: 'Memory Master', description: 'Win the memory game', unlocked: false },
    { id: 'digits', name: 'Digit Hunter', description: 'Reveal 10 digits of Pi', unlocked: false },
  ]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState({ title: '', content: '' });
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showIntro, setShowIntro] = useState(true);
  const [introStep, setIntroStep] = useState(0);
  
  // Calculate circle properties
  const diameter = circleRadius * 2;
  const circumference = 2 * Math.PI * circleRadius;
  
  // Characters
  const characters = {
    professor: { name: "Professor Pi", color: "#9c27b0", emoji: "👨‍🏫" },
    robot: { name: "Robo Pi", color: "#2196F3", emoji: "🤖" },
    alien: { name: "Alien Pi", color: "#FF5252", emoji: "👽" }
  };
  
  // Define worlds
  const worlds = [
    { name: "Pi Planet", color: "#FF5252", description: "Discover what Pi really is!", icon: "🌍" },
    { name: "Circle City", color: "#2196F3", description: "See how Pi connects to circles!", icon: "⭕" },
    { name: "Digit Dungeon", color: "#FFC107", description: "Explore the infinite digits of Pi!", icon: "🔢" },
    { name: "Ratio Rocket", color: "#9C27B0", description: "Launch into Pi applications!", icon: "🚀" }
  ];
  
  // Pi facts for random display
  const piFacts = [
    "Pi is approximately 3.14159, but its digits go on forever!",
    "Pi Day is celebrated on March 14th (3/14) around the world.",
    "The symbol for Pi (π) was first used in 1706 by mathematician William Jones.",
    "The current world record for memorizing Pi is over 70,000 digits!",
    "Pi appears in many physics formulas, including Einstein's field equation.",
    "Ancient Egyptians used an approximation of Pi when building the pyramids.",
    "NASA uses Pi for calculating spacecraft trajectories.",
    "In the movie 'The Matrix,' a license plate contains the first few digits of Pi.",
    "Some people write 'Pi-ku' poetry with syllable counts based on Pi digits.",
    "If you write out Pi to 31 decimal places, you could calculate the circumference of the observable universe to the accuracy of a single atom!"
  ];
  
  // Check for achievements
  useEffect(() => {
    const newAchievements = [...achievements];
    
    // Check starter achievement
    if (gameStarted && !achievements[0].unlocked) {
      newAchievements[0].unlocked = true;
      showCelebrationEffect("Achievement Unlocked: Pi Beginner!");
    }
    
    // Check explorer achievement
    const allWorldsVisited = Array(worlds.length).fill(0).map((_, i) => i).every(
      worldIndex => worldsVisited.includes(worldIndex)
    );
    if (allWorldsVisited && !achievements[1].unlocked) {
      newAchievements[1].unlocked = true;
      showCelebrationEffect("Achievement Unlocked: World Explorer!");
    }
    
    // Check digits achievement
    if (revealedDigits >= 10 && !achievements[3].unlocked) {
      newAchievements[3].unlocked = true;
      showCelebrationEffect("Achievement Unlocked: Digit Hunter!");
    }
    
    setAchievements(newAchievements);
  }, [gameStarted, revealedDigits]);
  
  // Track visited worlds
  const [worldsVisited, setWorldsVisited] = useState([0]);
  useEffect(() => {
    if (!worldsVisited.includes(activeWorld)) {
      setWorldsVisited([...worldsVisited, activeWorld]);
      // Add points for exploring a new world
      setScore(prev => prev + 20);
      showCelebrationEffect(`You discovered ${worlds[activeWorld].name}! +20 points`);
    }
  }, [activeWorld]);
  
  // Show a celebration effect
  const showCelebrationEffect = (message) => {
    setShowCelebration({ active: true, message });
    setTimeout(() => {
      setShowCelebration(false);
    }, 3000);
  };
  
  // Game functions
  const toggleTheme = () => setDarkMode(!darkMode);
  
  const startGame = () => {
    setGameStarted(true);
    setScore(10);
    showCelebrationEffect("Adventure started! Let's explore Pi!");
  };
  
  const revealMoreDigits = () => {
    if (revealedDigits < piDigits.length) {
      setRevealedDigits(prev => prev + 1);
      setScore(prev => prev + 5);
      
      // Celebration on milestone digits
      if (revealedDigits + 1 === 10) {
        showCelebrationEffect("You've revealed 10 digits of Pi! Amazing!");
      }
    }
  };
  
  const adjustCircle = (amount) => {
    setCircleRadius(prev => Math.max(10, Math.min(100, prev + amount)));
    setScore(prev => prev + 2);
  };
  
  const toggleFormula = () => {
    setShowFormula(!showFormula);
    if (!showFormula) {
      setScore(prev => prev + 5);
      showCelebrationEffect("You unlocked Pi formulas! +5 points");
    }
  };
  
  const startMemoryGame = () => {
    // Generate 3-5 random digits from pi to memorize
    const length = Math.floor(Math.random() * 3) + 3; // 3-5 digits
    const start = Math.floor(Math.random() * (piDigits.length - length - 2)) + 2; // Random starting position after 3.
    const digits = piDigits.substring(start, start + length);
    
    setMemoryDigits(digits);
    setMemoryGameActive('show');
    
    // After 3 seconds, hide the digits and show input
    setTimeout(() => {
      setMemoryGameActive('input');
    }, 3000);
  };
  
  const submitMemoryAnswer = () => {
    const correct = userAnswer === memoryDigits;
    setMemoryResult(correct);
    
    if (correct) {
      const pointsEarned = memoryDigits.length * 10;
      setScore(prev => prev + pointsEarned);
      showCelebrationEffect(`Correct! +${pointsEarned} points`);
      
      // Unlock achievement
      if (!achievements[2].unlocked) {
        const newAchievements = [...achievements];
        newAchievements[2].unlocked = true;
        setAchievements(newAchievements);
        setTimeout(() => {
          showCelebrationEffect("Achievement Unlocked: Memory Master!");
        }, 1000);
      }
    }
    
    // Reset game after showing result
    setTimeout(() => {
      setMemoryGameActive(false);
      setMemoryResult(null);
      setUserAnswer('');
    }, 2000);
  };
  
  const showInfoTooltip = (title, content, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + (rect.width / 2),
      y: rect.top - 10
    });
    setTooltipContent({ title, content });
    setShowTooltip(true);
  };
  
  const hideInfoTooltip = () => {
    setShowTooltip(false);
  };
  
  // Introduction steps
  const introSteps = [
    { text: "Welcome to Pi Adventure! I'm Professor Pi, and I'll be your guide.", character: "professor" },
    { text: "Pi is a special number that's incredibly important in mathematics.", character: "professor" },
    { text: "We're going to explore different worlds to learn all about Pi!", character: "professor" },
    { text: "You'll earn points and unlock achievements as you learn. Ready to start?", character: "professor" }
  ];
  
  const nextIntroStep = () => {
    if (introStep < introSteps.length - 1) {
      setIntroStep(introStep + 1);
    } else {
      setShowIntro(false);
    }
  };
  
  // Random Pi fact
  const [currentFact, setCurrentFact] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact(prev => (prev + 1) % piFacts.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div style={{
      fontFamily: 'system-ui, sans-serif',
      minHeight: '100vh',
      backgroundColor: darkMode ? '#121212' : '#e3f2fd',
      color: darkMode ? '#ffffff' : '#333333',
      transition: 'background-color 0.3s, color 0.3s',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* CSS for animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes sparkle {
            0%, 100% { opacity: 0; transform: scale(0); }
            50% { opacity: 1; transform: scale(1); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideIn {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }
          .floating { animation: float 10s ease-in-out infinite; }
          .pulsing { animation: pulse 2s infinite; }
          .bouncing { animation: bounce 2s infinite; }
          .blinking { animation: blink 1s infinite; }
          .spinning { animation: spin 10s linear infinite; }
          .sparkle { animation: sparkle 1s ease-in-out; }
          .fadeInUp { animation: fadeInUp 0.5s ease-out; }
          .slideIn { animation: slideIn 0.5s ease-out; }
          .hover-scale:hover { transform: scale(1.05); transition: transform 0.2s; }
        `}
      </style>
      
      {/* Background circles */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        {Array.from({ length: 20 }).map((_, i) => {
          const size = Math.random() * 100 + 20;
          const isLargeBubble = Math.random() > 0.8;
          return (
            <div 
              key={i}
              className={isLargeBubble ? "spinning" : "floating"}
              style={{
                position: 'absolute',
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: '50%',
                backgroundColor: isLargeBubble ? 'transparent' : worlds[i % worlds.length].color,
                border: isLargeBubble ? `3px solid ${worlds[i % worlds.length].color}` : 'none',
                opacity: isLargeBubble ? 0.3 : 0.15,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`
              }}
            />
          );
        })}
      </div>
      
      {/* Header */}
      <header style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        backdropFilter: 'blur(5px)',
        backgroundColor: darkMode ? 'rgba(18, 18, 18, 0.7)' : 'rgba(227, 242, 253, 0.7)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          background: 'linear-gradient(90deg, #9c27b0, #f44336)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span className="bouncing" style={{ fontSize: '3rem' }}>π</span>
          Pi Adventure
        </h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="pulsing" style={{
            backgroundColor: '#9c27b0',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ fontSize: '1.2rem' }}>✨</span>
            <span>{score}</span>
          </div>
          
          <button 
            onClick={toggleTheme} 
            className="hover-scale"
            style={{
              backgroundColor: darkMode ? '#ffc107' : '#333',
              color: darkMode ? '#333' : 'white',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem'
            }}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>
      
      {/* Celebration Animation */}
      {showCelebration && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '0.5rem',
          zIndex: 100,
          textAlign: 'center',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          animation: 'fadeInUp 0.5s ease-out'
        }}>
          {showCelebration.message}
          <div style={{
            position: 'absolute',
            inset: '-20px',
            pointerEvents: 'none'
          }}>
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="sparkle"
                style={{
                  position: 'absolute',
                  width: '10px',
                  height: '10px',
                  backgroundColor: ['#FF5252', '#FFC107', '#2196F3', '#9C27B0'][i % 4],
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
      
      {/* Info Tooltip */}
      {showTooltip && (
        <div style={{
          position: 'fixed',
          top: tooltipPosition.y,
          left: tooltipPosition.x,
          transform: 'translate(-50%, -100%)',
          backgroundColor: darkMode ? '#333' : 'white',
          color: darkMode ? 'white' : '#333',
          padding: '0.75rem',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          zIndex: 100,
          width: '250px',
          animation: 'fadeInUp 0.3s ease-out'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{tooltipContent.title}</div>
          <div style={{ fontSize: '0.9rem' }}>{tooltipContent.content}</div>
          <div style={{
            position: 'absolute',
            bottom: '-8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: `8px solid ${darkMode ? '#333' : 'white'}`
          }} />
        </div>
      )}
      
      {/* Main Content */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Introduction Dialog */}
        {showIntro && gameStarted && (
          <div style={{
            position: 'fixed',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            maxWidth: '600px',
            backgroundColor: darkMode ? '#1e1e1e' : 'white',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            animation: 'fadeInUp 0.5s ease-out'
          }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: characters[introSteps[introStep].character].color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
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
              {introStep < introSteps.length - 1 ? 'Next' : 'Let\'s Go!'}
            </button>
          </div>
        )}
        
        {!gameStarted ? (
          // Intro Screen
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <div className="bouncing" style={{ fontSize: '9rem', marginBottom: '1.5rem' }}>π</div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Welcome to Pi Adventure!
            </h2>
            <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
              Explore the amazing world of π through fun games and challenges!
            </p>
            
            {/* Character Selection */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>Choose Your Guide</h3>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                {Object.entries(characters).map(([id, char]) => (
                  <button
                    key={id}
                    onClick={() => setCharacter(id)}
                    className={character === id ? 'pulsing' : 'hover-scale'}
                    style={{
                      backgroundColor: character === id ? char.color : 'transparent',
                      color: character === id ? 'white' : darkMode ? 'white' : '#333',
                      border: `2px solid ${char.color}`,
                      borderRadius: '0.75rem',
                      padding: '0.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.5rem',
                      cursor: 'pointer',
                      width: '100px'
                    }}
                  >
                    <span style={{ fontSize: '2rem' }}>{char.emoji}</span>
                    <span>{char.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={startGame}
              className="pulsing hover-scale"
              style={{
                background: 'linear-gradient(90deg, #9c27b0, #e91e63)',
                color: 'white',
                padding: '0.75rem 2rem',
                borderRadius: '9999px',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                border: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              Start Adventure
            </button>
          </div>
        ) : (
          // Game Interface
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {/* World Selection */}
            <div style={{
              backgroundColor: darkMode ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(5px)',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span>🗺️</span> Choose Your World
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {worlds.map((world, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveWorld(index)}
                    className={`hover-scale ${index === activeWorld ? 'pulsing' : ''}`}
                    style={{
                      backgroundColor: index === activeWorld ? world.color : 'transparent',
                      color: index === activeWorld ? 'white' : darkMode ? 'white' : '#333',
                      border: `2px solid ${world.color}`,
                      borderRadius: '0.5rem',
                      padding: '0.75rem',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      position: 'relative',
                      zIndex: 2
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>{world.icon}</span>
                        <span>{world.name}</span>
                      </div>
                      <div>
                        {worldsVisited.includes(index) ? '✓' : ''}
                        {index === activeWorld && <span className="blinking">🚀</span>}
                      </div>
                    </div>
                    <div style={{ fontSize: '0.8rem', marginTop: '0.25rem', opacity: 0.8 }}>
                      {world.description}
                    </div>
                    
                    {/* Background animation for active world */}
                    {index === activeWorld && (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: world.color,
                        opacity: 0.2,
                        zIndex: 1
                      }}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className="sparkle"
                            style={{
                              position: 'absolute',
                              width: '10px',
                              height: '10px',
                              backgroundColor: 'white',
                              borderRadius: '50%',
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                              animationDelay: `${Math.random() * 2}s`,
                              animationDuration: '3s'
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                ))}
              </div>
              
              {/* Pi Fact */}
              <div style={{
                marginTop: '1.5rem',
                backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.5)',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                borderLeft: '4px solid #9c27b0',
                fontSize: '0.9rem',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <p style={{ fontWeight: 'bold', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>💡</span> Pi Fact:
                </p>
                <p className="fadeInUp" key={currentFact}>{piFacts[currentFact]}</p>
              </div>
            </div>
            
            {/* Interactive Area */}
            <div style={{
              backgroundColor: darkMode ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(5px)',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                marginBottom: '1rem', 
                color: worlds[activeWorld].color,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span>{worlds[activeWorld].icon}</span> {worlds[activeWorld].name}
              </h2>
              
              {/* Character advisor */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: characters[character].color,
                borderRadius: '9999px',
                padding: '0.25rem 0.5rem',
                color: 'white',
                fontSize: '0.8rem'
              }}>
                <span>{characters[character].emoji}</span>
                <span>{characters[character].name}</span>
              </div>
              
              {/* Memory Game Modal */}
              {memoryGameActive && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(5px)',
                  zIndex: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2rem',
                  color: darkMode ? 'white' : '#333',
                  animation: 'fadeInUp 0.3s ease-out'
                }}>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Pi Digit Memory Game</h3>
                  
                  {memoryGameActive === 'show' && (
                    <div className="fadeInUp">
                      <p style={{ marginBottom: '1rem' }}>Memorize these digits:</p>
                      <div style={{
                        fontSize: '3rem',
                        fontWeight: 'bold',
                        color: worlds[2].color,
                        textAlign: 'center',
                        letterSpacing: '0.25em',
                        marginBottom: '1rem'
                      }}>
                        {memoryDigits}
                      </div>
                      <p>They will disappear in <span className="blinking">3</span> seconds...</p>
                    </div>
                  )}
                  
                  {memoryGameActive === 'input' && !memoryResult && (
                    <div className="fadeInUp">
                      <p style={{ marginBottom: '1rem' }}>What were the digits you just saw?</p>
                      <input
                        type="text"
                        value={userAnswer}
                        onChange={e => setUserAnswer(e.target.value)}
                        style={{
                          padding: '0.75rem',
                          fontSize: '1.5rem',
                          borderRadius: '0.5rem',
                          border: `2px solid ${worlds[2].color}`,
                          width: '200px',
                          textAlign: 'center',
                          backgroundColor: darkMode ? '#333' : 'white',
                          color: darkMode ? 'white' : '#333',
                          marginBottom: '1rem'
                        }}
                        autoFocus
                      />
                      <button
                        onClick={submitMemoryAnswer}
                        className="hover-scale"
                        style={{
                          backgroundColor: worlds[2].color,
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.5rem',
                          padding: '0.5rem 1rem',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          width: '100%'
                        }}
                      >
                        Check Answer
                      </button>
                    </div>
                  )}
                  
                  {memoryResult !== null && (
                    <div className="fadeInUp" style={{ textAlign: 'center' }}>
                      <div style={{ 
                        fontSize: '5rem', 
                        marginBottom: '1rem',
                        animation: 'pulse 0.5s infinite'
                      }}>
                        {memoryResult ? '🎉' : '😢'}
                      </div>
                      <p style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: 'bold',
                        color: memoryResult ? '#4caf50' : '#f44336'
                      }}>
                        {memoryResult ? 'Correct!' : 'Try Again!'}
                      </p>
                      {!memoryResult && (
                        <p>The correct digits were: {memoryDigits}</p>
                      )}
                    </div>
                  )}
                </div>
              )}
              
              {/* Pi Planet Content */}
              {activeWorld === 0 && (
                <div className="fadeInUp">
                  <div style={{
                    backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    <p style={{ marginBottom: '0.5rem' }}>
                      Pi (π) is a special number that represents the ratio of a circle's circumference to its diameter.
                    </p>
                    <p>
                      No matter how big or small the circle is, this ratio is always the same!
                    </p>
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                    marginBottom: '1.5rem',
                    padding: '1rem',
                    backgroundColor: darkMode ? 'rgba(255, 82, 82, 0.1)' : 'rgba(255, 82, 82, 0.05)',
                    borderRadius: '0.5rem',
                    border: `1px dashed ${worlds[activeWorld].color}`
                  }}>
                    <div style={{
                      position: 'relative',
                      width: '200px',
                      height: '200px'
                    }}>
                      <div style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        border: `4px solid ${worlds[activeWorld].color}`,
                        animation: 'pulse 3s infinite'
                      }} />
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: 0,
                        width: '100%',
                        height: '2px',
                        backgroundColor: '#e91e63',
                        transform: 'translateY(-1px)'
                      }} />
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: worlds[activeWorld].color
                      }}>
                        π
                      </div>
                      
                      <div style={{
                        position: 'absolute',
                        top: '85%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: '0.9rem',
                        backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.8)',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.25rem'
                      }}>
                        Diameter
                      </div>
                      
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '2px',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1rem 0'
                      }}>
                        <div style={{
                          fontSize: '0.9rem',
                          backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.8)',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '0.25rem',
                          textAlign: 'center'
                        }}>
                          Circumference = π × Diameter
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ textAlign: 'center' }}>
                      <div 
                        className="pulsing" 
                        style={{ 
                          fontSize: '2.5rem', 
                          fontWeight: 'bold',
                          color: worlds[activeWorld].color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        π = {piDigits.substring(0, revealedDigits)}
                        <span className="blinking">|</span>
                      </div>
                      
                      <div style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.8 }}>
                        Click the button below to reveal more digits!
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={revealMoreDigits}
                    className="hover-scale"
                    style={{
                      backgroundColor: worlds[activeWorld].color,
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      padding: '0.75rem 1rem',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      marginBottom: '1rem',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <span>🔍</span> Reveal Next Digit (+5 points)
                  </button>
                  
                  <div style={{ 
                    marginTop: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    borderLeft: `4px solid ${worlds[activeWorld].color}`
                  }}>
                    <div style={{
                      minWidth: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: characters[character].color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem'
                    }}>
                      {characters[character].emoji}
                    </div>
                    <div>
                      <p>Pi goes on forever without repeating, which makes it an <b>irrational number</b>!</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Circle City Content */}
              {activeWorld === 1 && (
                <div className="fadeInUp">
                  <div style={{
                    backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    <p>
                      In Circle City, you can see how Pi connects to circles of different sizes.
                      Try adjusting the circle below!
                    </p>
                  </div>
                  
                  <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <div style={{
                      width: `${diameter}px`,
                      height: `${diameter}px`,
                      borderRadius: '50%',
                      border: `4px solid ${worlds[activeWorld].color}`,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      margin: '0 auto'
                    }}>
                      <div style={{
                        width: '2px',
                        height: '100%',
                        backgroundColor: '#e91e63',
                        position: 'absolute'
                      }} />
                      <div style={{
                        width: '100%',
                        height: '2px',
                        backgroundColor: '#e91e63',
                        position: 'absolute'
                      }} />
                      <div className="pulsing" style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: worlds[activeWorld].color
                      }}>
                        π
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    gap: '1rem',
                    marginBottom: '1.5rem',
                    padding: '1rem',
                    backgroundColor: darkMode ? 'rgba(33, 150, 243, 0.1)' : 'rgba(33, 150, 243, 0.05)',
                    borderRadius: '0.5rem',
                    border: `1px dashed ${worlds[activeWorld].color}`
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between'
                    }}>
                      <button
                        onClick={() => adjustCircle(-10)}
                        className="hover-scale"
                        style={{
                          backgroundColor: '#f44336',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.5rem',
                          padding: '0.5rem',
                          fontSize: '1.2rem',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          width: '40px',
                          height: '40px'
                        }}
                      >
                        -
                      </button>
                      
                      <div>Adjust Circle Size</div>
                      
                      <button
                        onClick={() => adjustCircle(10)}
                        className="hover-scale"
                        style={{
                          backgroundColor: '#4caf50',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.5rem',
                          padding: '0.5rem',
                          fontSize: '1.2rem',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          width: '40px',
                          height: '40px'
                        }}
                      >
                        +
                      </button>
                    </div>
                    
                    <div style={{ 
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '0.5rem'
                    }}>
                      <div style={{ 
                        backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.5)',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.25rem',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Radius:</div>
                        <div style={{ fontWeight: 'bold' }}>{circleRadius.toFixed(0)} units</div>
                        <div 
                          className="hover-scale"
                          style={{ position: 'absolute', top: '0.25rem', right: '0.25rem', fontSize: '0.8rem', cursor: 'pointer' }}
                          onMouseEnter={(e) => showInfoTooltip('Radius', 'Distance from center to edge of circle', e)}
                          onMouseLeave={hideInfoTooltip}
                        >
                          ℹ️
                        </div>
                      </div>
                      
                      <div style={{ 
                        backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.5)',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.25rem',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Diameter:</div>
                        <div style={{ fontWeight: 'bold' }}>{diameter.toFixed(0)} units</div>
                        <div 
                          className="hover-scale"
                          style={{ position: 'absolute', top: '0.25rem', right: '0.25rem', fontSize: '0.8rem', cursor: 'pointer' }}
                          onMouseEnter={(e) => showInfoTooltip('Diameter', 'Distance across the circle through the center', e)}
                          onMouseLeave={hideInfoTooltip}
                        >
                          ℹ️
                        </div>
                      </div>
                      
                      <div style={{ 
                        backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.5)',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.25rem',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Circumference:</div>
                        <div style={{ fontWeight: 'bold' }}>{circumference.toFixed(2)} units</div>
                        <div 
                          className="hover-scale"
                          style={{ position: 'absolute', top: '0.25rem', right: '0.25rem', fontSize: '0.8rem', cursor: 'pointer' }}
                          onMouseEnter={(e) => showInfoTooltip('Circumference', 'Distance around the edge of the circle', e)}
                          onMouseLeave={hideInfoTooltip}
                        >
                          ℹ️
                        </div>
                      </div>
                      
                      <div style={{ 
                        backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.5)',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.25rem'
                      }}>
                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Circumference ÷ Diameter:</div>
                        <div style={{ fontWeight: 'bold', color: worlds[activeWorld].color }}>{(circumference / diameter).toFixed(8)}</div>
                      </div>
                    </div>
                    
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      borderLeft: `4px solid ${worlds[activeWorld].color}`
                    }}>
                      <div style={{
                        minWidth: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: characters[character].color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem'
                      }}>
                        {characters[character].emoji}
                      </div>
                      <div>
                        <p>Notice that no matter how big or small the circle gets, the ratio of circumference to diameter is <b>always Pi</b>!</p>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={toggleFormula}
                    className="hover-scale"
                    style={{
                      backgroundColor: worlds[activeWorld].color,
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      padding: '0.75rem 1rem',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <span>📐</span> {showFormula ? "Hide Formulas" : "Show Formulas (+5 points)"}
                  </button>
                  
                  {showFormula && (
                    <div style={{ 
                      marginTop: '1rem',
                      backgroundColor: darkMode ? 'rgba(33, 150, 243, 0.1)' : 'rgba(33, 150, 243, 0.05)',
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      textAlign: 'center',
                      fontSize: '1.2rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                      animation: 'fadeInUp 0.5s ease-out'
                    }}>
                      <div style={{
                        backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.2)' : 'white',
                        borderRadius: '0.5rem',
                        padding: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                      }}>
                        Circumference = π × Diameter
                      </div>
                      <div style={{
                        backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.2)' : 'white',
                        borderRadius: '0.5rem',
                        padding: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                      }}>
                        Circumference = 2π × Radius
                      </div>
                      <div style={{
                        backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.2)' : 'white',
                        borderRadius: '0.5rem',
                        padding: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                      }}>
                        Area = π × Radius²
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Digit Dungeon Content */}
              {activeWorld === 2 && (
                <div className="fadeInUp">
                  <div style={{
                    backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    <p>
                      Pi has been calculated to over 100 trillion digits! Scientists are always pushing to calculate more digits.
                    </p>
                  </div>
                  
                  <div style={{ 
                    padding: '1rem',
                    backgroundColor: darkMode ? 'rgba(255, 193, 7, 0.1)' : 'rgba(255, 193, 7, 0.05)',
                    borderRadius: '0.5rem',
                    border: `1px dashed ${worlds[activeWorld].color}`,
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{ 
                      marginBottom: '1rem',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}>
                      <span>🔢</span> How many digits can you memorize?
                    </div>
                    
                    <div style={{ 
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                      justifyContent: 'center',
                      marginBottom: '1rem'
                    }}>
                      {piDigits.split('').map((digit, index) => {
                        if (index === 1) {
                          // Special styling for decimal point
                          return (
                            <div
                              key={index}
                              style={{
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'transparent',
                                color: darkMode ? 'white' : '#333',
                                fontSize: '1.8rem',
                                fontWeight: 'bold'
                              }}
                            >
                              {digit}
                            </div>
                          );
                        }
                        
                        return (
                          <div
                            key={index}
                            style={{
                              width: '40px',
                              height: '40px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: index < revealedDigits ? worlds[activeWorld].color : darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)',
                              color: index < revealedDigits ? 'white' : darkMode ? '#aaa' : '#999',
                              borderRadius: '0.5rem',
                              fontSize: '1.2rem',
                              fontWeight: 'bold',
                              animation: index === revealedDigits - 1 ? 'pulse 1s infinite' : 'none',
                              position: 'relative',
                              overflow: 'hidden'
                            }}
                          >
                            {index < revealedDigits ? digit : '?'}
                            
                            {/* Highlight for newly revealed digit */}
                            {index === revealedDigits - 1 && (
                              <div style={{
                                position: 'absolute',
                                inset: 0,
                                backgroundColor: 'white',
                                opacity: 0.3,
                                animation: 'pulse 1s infinite'
                              }} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                    
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      marginBottom: '1rem'
                    }}>
                      <div style={{
                        minWidth: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: characters[character].color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem'
                      }}>
                        {characters[character].emoji}
                      </div>
                      <div>
                        <p>Test your memory with the Pi Digit Memory Challenge!</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={startMemoryGame}
                      className="hover-scale pulsing"
                      style={{
                        backgroundColor: worlds[activeWorld].color,
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.5rem',
                        padding: '0.75rem 1rem',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <span>🎮</span> Play Digit Memory Game
                    </button>
                  </div>
                  
                  <div style={{ 
                    backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                  }}>
                    <p style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span>💡</span> Fun Facts About Pi Digits:
                    </p>
                    
                    <div style={{
                      backgroundColor: darkMode ? 'rgba(255, 193, 7, 0.1)' : 'rgba(255, 255, 255, 0.5)',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.9rem'
                    }}>
                      <p>There are no patterns in pi's digits! They appear to be completely random.</p>
                    </div>
                    
                    <div style={{
                      backgroundColor: darkMode ? 'rgba(255, 193, 7, 0.1)' : 'rgba(255, 255, 255, 0.5)',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.9rem'
                    }}>
                      <p>The current world record for memorizing pi is over 70,000 digits!</p>
                    </div>
                    
                    <div style={{
                      backgroundColor: darkMode ? 'rgba(255, 193, 7, 0.1)' : 'rgba(255, 255, 255, 0.5)',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.9rem'
                    }}>
                      <p>Some people celebrate "Pi Approximation Day" on July 22 (22/7 ≈ 3.14).</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Ratio Rocket Content */}
              {activeWorld === 3 && (
                <div className="fadeInUp">
                  <div style={{
                    backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    <p>
                      Pi isn't just a mathematical curiosity - it's used in many real-world applications!
                    </p>
                  </div>
                  
                  <div style={{ 
                    padding: '1rem',
                    backgroundColor: darkMode ? 'rgba(156, 39, 176, 0.1)' : 'rgba(156, 39, 176, 0.05)',
                    borderRadius: '0.5rem',
                    border: `1px dashed ${worlds[activeWorld].color}`,
                    marginBottom: '1.5rem',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div className="floating" style={{
                      position: 'absolute',
                      top: '10%',
                      right: '10%',
                      fontSize: '3rem',
                      opacity: 0.2,
                      color: worlds[activeWorld].color
                    }}>
                      π
                    </div>
                    
                    <div style={{ marginBottom: '1rem', fontWeight: 'bold', textAlign: 'center' }}>
                      π in the Real World
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem',
                      position: 'relative',
                      zIndex: 2
                    }}>
                      <div style={{
                        backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.8)',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        transition: 'transform 0.2s',
                        cursor: 'pointer'
                      }}
                      className="hover-scale"
                      onMouseEnter={(e) => showInfoTooltip('Space Exploration', 'NASA uses pi to calculate orbital trajectories, plan satellite paths, and design space telescopes!', e)}
                      onMouseLeave={hideInfoTooltip}
                      >
                        <div style={{
                          backgroundColor: worlds[activeWorld].color,
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.5rem'
                        }}>
                          🚀
                        </div>
                        <div>
                          <div style={{ fontWeight: 'bold' }}>Space Exploration</div>
                          <div style={{ fontSize: '0.9rem' }}>NASA uses pi to calculate spacecraft trajectories</div>
                        </div>
                      </div>
                      
                      <div style={{
                        backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.8)',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        transition: 'transform 0.2s',
                        cursor: 'pointer'
                      }}
                      className="hover-scale"
                      onMouseEnter={(e) => showInfoTooltip('Technology', 'Pi is used in computer graphics to render curves and circles. It also helps in generating random numbers for security!', e)}
                      onMouseLeave={hideInfoTooltip}
                      >
                        <div style={{
                          backgroundColor: worlds[activeWorld].color,
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.5rem'
                        }}>
                          📱
                        </div>
                        <div>
                          <div style={{ fontWeight: 'bold' }}>Technology</div>
                          <div style={{ fontSize: '0.9rem' }}>Pi helps computers generate random numbers and render graphics</div>
                        </div>
                      </div>
                      
                      <div style={{
                        backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.8)',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        transition: 'transform 0.2s',
                        cursor: 'pointer'
                      }}
                      className="hover-scale"
                      onMouseEnter={(e) => showInfoTooltip('Physics', 'Pi appears in wave equations that describe how sound, light, and water move. It\'s essential for understanding vibrations!', e)}
                      onMouseLeave={hideInfoTooltip}
                      >
                        <div style={{
                          backgroundColor: worlds[activeWorld].color,
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.5rem'
                        }}>
                          🌊
                        </div>
                        <div>
                          <div style={{ fontWeight: 'bold' }}>Physics</div>
                          <div style={{ fontSize: '0.9rem' }}>Pi appears in equations for waves, pendulums, and Einstein's theories</div>
                        </div>
                      </div>
                      
                      <div style={{
                        backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.8)',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        transition: 'transform 0.2s',
                        cursor: 'pointer'
                      }}
                      className="hover-scale"
                      onMouseEnter={(e) => showInfoTooltip('Engineering', 'Pi is crucial for designing wheels, gears, and engines. It helps calculate the strength of curved structures like domes!', e)}
                      onMouseLeave={hideInfoTooltip}
                      >
                        <div style={{
                          backgroundColor: worlds[activeWorld].color,
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.5rem'
                        }}>
                          🔧
                        </div>
                        <div>
                          <div style={{ fontWeight: 'bold' }}>Engineering</div>
                          <div style={{ fontSize: '0.9rem' }}>Pi helps design bridges, engines, and other circular components</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      minWidth: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: characters[character].color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem'
                    }}>
                      {characters[character].emoji}
                    </div>
                    <div>
                      <p>Ready for a Pi adventure game? Launch the rocket to see how far you can go!</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      setScore(prev => prev + 15);
                      showCelebrationEffect("Pi Rocket Launched! +15 points");
                    }}
                    className="hover-scale pulsing"
                    style={{
                      backgroundColor: worlds[activeWorld].color,
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      padding: '0.75rem 1rem',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <span>🚀</span> Launch Pi Rocket Game
                  </button>
                </div>
              )}
            </div>
            
            {/* Progress Panel */}
            <div style={{
              backgroundColor: darkMode ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(5px)',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span>🏆</span> Your Pi Progress
              </h2>
              
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem',
                padding: '1rem',
                backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)',
                borderRadius: '0.5rem'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #9c27b0, #f44336)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'white',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}>
                  {score}
                </div>
                <div>
                  <div style={{ fontWeight: 'bold' }}>Points</div>
                  <div style={{ fontSize: '0.9rem' }}>Keep exploring to earn more!</div>
                </div>
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>🔢</span> Pi Digits Revealed
                  </div>
                  <div>{revealedDigits} / {piDigits.length}</div>
                </div>
                <div style={{
                  height: '8px',
                  backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${(revealedDigits / piDigits.length) * 100}%`,
                    background: 'linear-gradient(90deg, #e91e63, #9c27b0)',
                    borderRadius: '4px'
                  }} />
                </div>
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>🗺️</span> Worlds Explored
                  </div>
                  <div>{worldsVisited.length} / {worlds.length}</div>
                </div>
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  flexWrap: 'wrap'
                }}>
                  {worlds.map((world, index) => (
                    <div
                      key={index}
                      style={{
                        width: `calc(${100 / worlds.length}% - ${(worlds.length - 1) * 0.5 / worlds.length}rem)`,
                        aspectRatio: '1',
                        borderRadius: '50%',
                        backgroundColor: worldsVisited.includes(index) ? world.color : darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem'
                      }}
                    >
                      {worldsVisited.includes(index) ? world.icon : ''}
                    </div>
                  ))}
                </div>
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ marginBottom: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>🏅</span> Achievements
                </div>
                <div style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      style={{
                        backgroundColor: achievement.unlocked ? (darkMode ? 'rgba(76, 175, 80, 0.2)' : 'rgba(76, 175, 80, 0.1)') : (darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)'),
                        borderRadius: '0.5rem',
                        padding: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        opacity: achievement.unlocked ? 1 : 0.6,
                        border: achievement.unlocked ? `1px solid ${darkMode ? '#4caf50' : '#4caf50'}` : 'none'
                      }}
                    >
                      <div style={{
                        backgroundColor: achievement.unlocked ? '#4caf50' : (darkMode ? '#666' : '#ccc'),
                        color: 'white',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1rem'
                      }}>
                        {achievement.unlocked ? '✓' : '?'}
                      </div>
                      <div>
                        <div style={{ fontWeight: 'bold' }}>{achievement.name}</div>
                        <div style={{ fontSize: '0.8rem' }}>{achievement.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div style={{
                backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                fontSize: '0.9rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <p style={{ fontWeight: 'bold', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>💡</span> Did you know?
                </p>
                <p className="fadeInUp" key={currentFact}>March 14 (3/14) is celebrated as Pi Day around the world!</p>
                <p>To earn more points, explore all worlds and complete the challenges!</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PiAdventure;