import React, { useState, useEffect } from 'react';

/**
 * DinoAdventure
 * 
 * An all-out, socks-blowing, dinosaur-themed interactive React game
 * that takes you on a time-traveling journey through prehistoric eras.
 *
 * Features:
 * - Dark Mode Toggle
 * - Character Selection
 * - Multiple Eras to Explore
 * - Score & Achievement System
 * - Memory Game (Dino Name Memory)
 * - Floating Background Animations
 * - Intro Dialog & Celebration Effects
 * - Random Dino Facts
 * - And lots of fun interactive elements and fancy animations!
 */

const DinoAdventure = () => {
  // Theme
  const [darkMode, setDarkMode] = useState(false);
  
  // Game
  const [gameStarted, setGameStarted] = useState(false);
  const [activeEra, setActiveEra] = useState(0);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  
  // Achievements
  const [achievements, setAchievements] = useState([
    { id: 'time_traveler', name: 'Time Traveler', description: 'Begin your dinosaur adventure', unlocked: false },
    { id: 'era_explorer', name: 'Era Explorer', description: 'Visit all dinosaur eras', unlocked: false },
    { id: 'fossil_finder', name: 'Fossil Finder', description: 'Collect 10 unique fossils', unlocked: false },
    { id: 'memory_master', name: 'Memory Master', description: 'Win the Dino Name Memory Game', unlocked: false },
  ]);
  
  // Eras
  const eras = [
    { name: "Triassic Trails", color: "#4CAF50", description: "Where dinosaurs first roamed!", icon: "🌱" },
    { name: "Jurassic Jungle", color: "#8BC34A", description: "Home to the giant sauropods!", icon: "🌴" },
    { name: "Cretaceous Caves", color: "#FFC107", description: "Where T-Rex rose to fame!", icon: "🦖" },
    { name: "Paleozoic Portal", color: "#FF5722", description: "Travel back even before the dinos!", icon: "⏳" },
  ];
  
  // Track visited eras
  const [erasVisited, setErasVisited] = useState([0]);
  useEffect(() => {
    if (!erasVisited.includes(activeEra)) {
      setErasVisited([...erasVisited, activeEra]);
      setScore(prev => prev + 20);
      showCelebrationEffect(`You discovered ${eras[activeEra].name}! +20 points`);
    }
  }, [activeEra]);

  // Characters
  const characters = {
    drFossil: { name: "Dr. Fossil", color: "#795548", emoji: "🧑‍🔬" },
    captainClaw: { name: "Captain Claw", color: "#673AB7", emoji: "🦕" },
    xenoTraveler: { name: "Xeno Traveler", color: "#009688", emoji: "🚀" },
  };
  const [character, setCharacter] = useState('drFossil');
  
  // Intro & Dialogue
  const [showIntro, setShowIntro] = useState(true);
  const [introStep, setIntroStep] = useState(0);
  const introSteps = [
    { text: "Welcome to DinoAdventure! I'm Dr. Fossil, your guide through time.", character: "drFossil" },
    { text: "Prepare to explore prehistoric eras and collect fossils along the way.", character: "drFossil" },
    { text: "Each era has surprises, trivia, and a chance to earn points and achievements.", character: "drFossil" },
    { text: "Strap on your boots. It's time to travel millions of years back in time!", character: "drFossil" }
  ];
  const nextIntroStep = () => {
    if (introStep < introSteps.length - 1) {
      setIntroStep(introStep + 1);
    } else {
      setShowIntro(false);
    }
  };
  
  // Random Dino Facts
  const dinoFacts = [
    "The word 'dinosaur' means 'terrible lizard' in Greek.",
    "Velociraptors likely had feathers and were much smaller than in movies.",
    "Triceratops had up to 800 teeth, constantly replaced throughout its lifetime.",
    "Some sauropods could grow longer than 3 school buses end to end.",
    "The T. rex's roar in Jurassic Park was a mix of a baby elephant, a tiger, and an alligator.",
    "Pterosaurs are not dinosaurs but are closely related flying reptiles.",
    "The first dinosaur fossil was recognized in the early 19th century.",
    "Dinosaurs lived on all continents, including Antarctica.",
    "Paleontologists have named over 700 different dinosaur genera.",
    "Some dinosaurs, like the Microraptor, were as small as a crow!"
  ];
  const [currentFact, setCurrentFact] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact(prev => (prev + 1) % dinoFacts.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);
  
  // Fossil Collection
  const [fossilCollection, setFossilCollection] = useState([]);
  const availableFossils = [
    "Triceratops Horn", "T-Rex Tooth", "Stegosaurus Plate",
    "Sauropod Vertebra", "Dino Egg Fragment", "Pterodactyl Wing",
    "Velociraptor Claw", "Mosasaur Tooth", "Ankylosaurus Club",
    "Ammonite Shell"
  ];
  
  const collectFossil = () => {
    // Collect a random fossil not yet in the collection
    const uncollected = availableFossils.filter(f => !fossilCollection.includes(f));
    if (uncollected.length === 0) {
      showCelebrationEffect("You've collected all fossils! Incredible!");
      return;
    }
    const randomIndex = Math.floor(Math.random() * uncollected.length);
    const newFossil = uncollected[randomIndex];
    setFossilCollection([...fossilCollection, newFossil]);
    setScore(prev => prev + 10);
    showCelebrationEffect(`You found a ${newFossil}! +10 points`);
  };
  
  // Memory Game
  const [memoryGameActive, setMemoryGameActive] = useState(false);
  const [memoryDinoNames, setMemoryDinoNames] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [memoryResult, setMemoryResult] = useState(null);
  
  const dinoNamePool = [
    "Tyrannosaurus", "Velociraptor", "Triceratops", 
    "Stegosaurus", "Brachiosaurus", "Allosaurus",
    "Ankylosaurus", "Parasaurolophus", "Spinosaurus",
    "Pteranodon", "Iguanodon", "Diplodocus"
  ];
  
  const startMemoryGame = () => {
    // Random 3-5 dinosaur names from the pool
    const length = Math.floor(Math.random() * 3) + 3;
    const selectedNames = [...dinoNamePool]
      .sort(() => 0.5 - Math.random()) // shuffle
      .slice(0, length);
    
    setMemoryDinoNames(selectedNames);
    setMemoryGameActive('show');
    
    // After 4 seconds, hide the dino names
    setTimeout(() => {
      setMemoryGameActive('input');
    }, 4000);
  };
  
  const submitMemoryAnswer = () => {
    // We check if user typed exactly the dino names in the correct order (joined by spaces)
    const correct = userAnswer.trim().toLowerCase() === memoryDinoNames.map(name => name.toLowerCase()).join(" ");
    setMemoryResult(correct);
    if (correct) {
      const points = memoryDinoNames.length * 10;
      setScore(prev => prev + points);
      showCelebrationEffect(`Correct! +${points} points`);
      // Unlock Memory Master if not already
      unlockAchievement('memory_master', "Achievement Unlocked: Memory Master!");
    }
    setTimeout(() => {
      setMemoryGameActive(false);
      setMemoryResult(null);
      setUserAnswer('');
    }, 2000);
  };
  
  // Achievements Handling
  const unlockAchievement = (id, message) => {
    const newAchievements = [...achievements];
    const foundIndex = newAchievements.findIndex(a => a.id === id);
    if (foundIndex !== -1 && !newAchievements[foundIndex].unlocked) {
      newAchievements[foundIndex].unlocked = true;
      setAchievements(newAchievements);
      showCelebrationEffect(message);
    }
  };
  
  // Check achievements
  useEffect(() => {
    // Check "Time Traveler" (start game)
    if (gameStarted) {
      unlockAchievement('time_traveler', "Achievement Unlocked: Time Traveler!");
    }
    
    // Check "Era Explorer" (visit all eras)
    if (erasVisited.length === eras.length) {
      unlockAchievement('era_explorer', "Achievement Unlocked: Era Explorer!");
    }
    
    // Check "Fossil Finder" (collect 10 unique fossils)
    if (fossilCollection.length >= 10) {
      unlockAchievement('fossil_finder', "Achievement Unlocked: Fossil Finder!");
    }
  }, [gameStarted, erasVisited, fossilCollection]);
  
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
    showCelebrationEffect("Dinosaur adventure begins! +10 points");
  };
  
  // Toggle Dark Mode
  const toggleTheme = () => setDarkMode(prev => !prev);
  
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: darkMode ? '#212121' : '#E8F5E9',
        color: darkMode ? '#ffffff' : '#333333',
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
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes sparkle {
            0%, 100% { opacity: 0; transform: scale(0); }
            50% { opacity: 1; transform: scale(1); }
          }
          .floating { animation: float 10s ease-in-out infinite; }
          .spinning { animation: spin 15s linear infinite; }
          .blinking { animation: blink 1s infinite; }
          .fadeInUp { animation: fadeInUp 0.5s ease-out; }
          .sparkle { animation: sparkle 1s ease-in-out; }
          .hover-scale:hover { transform: scale(1.05); transition: transform 0.2s; }
        `}
      </style>
      
      {/* Floating Background Elements (Bones, Fossils, etc.) */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        {Array.from({ length: 18 }).map((_, i) => {
          // We'll alternate bone / footprint / fossil icons
          const icons = ["🦴", "🦕", "🦖", "👣", "🌋", "🦴"];
          const icon = icons[i % icons.length];
          const size = Math.random() * 50 + 30;
          return (
            <div
              key={i}
              className="floating"
              style={{
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${size}px`,
                opacity: 0.15,
                animationDelay: `${Math.random() * 5}s`
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
          backgroundColor: darkMode ? 'rgba(33, 33, 33, 0.7)' : 'rgba(232, 245, 233, 0.7)',
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
          <span style={{ fontSize: '2.5rem' }}>🦕</span>
          DinoAdventure
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
          
          <div style={{ position: 'absolute', inset: '-20px', pointerEvents: 'none' }}>
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="sparkle"
                style={{
                  position: 'absolute',
                  width: '10px',
                  height: '10px',
                  backgroundColor: ['#4CAF50', '#FFC107', '#FF5722', '#673AB7'][i % 4],
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
            <div style={{ fontSize: '6rem', marginBottom: '1rem' }}>🦖</div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Welcome to DinoAdventure!
            </h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
              Travel back in time, collect fossils, and learn awesome dinosaur facts!
            </p>
            
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>Choose Your Guide</h3>
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
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {/* Era Selection */}
            <div
              style={{
                backgroundColor: darkMode ? 'rgba(66, 66, 66, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(5px)',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span>🗺️</span> Choose an Era
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {eras.map((era, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveEra(index)}
                    className={`hover-scale ${activeEra === index ? 'blinking' : ''}`}
                    style={{
                      backgroundColor: activeEra === index ? era.color : 'transparent',
                      color: activeEra === index ? '#fff' : darkMode ? '#fff' : '#333',
                      border: `2px solid ${era.color}`,
                      borderRadius: '0.5rem',
                      padding: '0.75rem',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      position: 'relative'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>{era.icon}</span>
                        <span>{era.name}</span>
                      </div>
                      <div>{erasVisited.includes(index) ? '✔️' : ''}</div>
                    </div>
                    <div style={{ fontSize: '0.9rem', marginTop: '0.25rem', opacity: 0.8 }}>
                      {era.description}
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Dino Fact */}
              <div
                style={{
                  marginTop: '1.5rem',
                  backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.6)',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  borderLeft: '4px solid #4CAF50',
                  fontSize: '0.9rem'
                }}
              >
                <p style={{ fontWeight: 'bold', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>💡</span> Dino Fact:
                </p>
                <p className="fadeInUp" key={currentFact}>{dinoFacts[currentFact]}</p>
              </div>
            </div>
            
            {/* Active Era Panel */}
            <div
              style={{
                backgroundColor: darkMode ? 'rgba(66, 66, 66, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(5px)',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                position: 'relative'
              }}
            >
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: eras[activeEra].color,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span>{eras[activeEra].icon}</span> {eras[activeEra].name}
              </h2>
              
              {/* Character Badge */}
              <div style={{
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
              }}>
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
                    padding: '2rem',
                    transition: 'all 0.3s'
                  }}
                >
                  <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Dino Name Memory Game</h3>
                  
                  {memoryGameActive === 'show' && !memoryResult && (
                    <div className="fadeInUp" style={{ textAlign: 'center' }}>
                      <p>Memorize these dinosaur names:</p>
                      <div
                        style={{
                          margin: '1rem 0',
                          fontSize: '1.2rem',
                          fontWeight: 'bold',
                          color: eras[1].color,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.5rem',
                          maxWidth: '300px'
                        }}
                      >
                        {memoryDinoNames.map((name, idx) => (
                          <div key={idx} style={{ animation: 'blink 2s infinite' }}>
                            {name}
                          </div>
                        ))}
                      </div>
                      <p>They will disappear in 4 seconds...</p>
                    </div>
                  )}
                  
                  {memoryGameActive === 'input' && !memoryResult && (
                    <div className="fadeInUp">
                      <p>Type the names in order, separated by spaces:</p>
                      <input
                        type="text"
                        value={userAnswer}
                        onChange={e => setUserAnswer(e.target.value)}
                        style={{
                          padding: '0.75rem',
                          fontSize: '1rem',
                          borderRadius: '0.5rem',
                          border: `2px solid ${eras[1].color}`,
                          width: '250px',
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
                          backgroundColor: eras[1].color,
                          color: '#fff',
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
                        fontSize: '4rem',
                        marginBottom: '1rem'
                      }}>
                        {memoryResult ? '🎉' : '❌'}
                      </div>
                      {memoryResult ? (
                        <p style={{ color: '#4CAF50', fontWeight: 'bold' }}>Correct!</p>
                      ) : (
                        <>
                          <p style={{ color: '#f44336', fontWeight: 'bold' }}>Wrong!</p>
                          <p style={{ fontSize: '0.9rem' }}>The correct sequence was: {memoryDinoNames.join(" ")}</p>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
              
              {/* Different content for each era could go here */}
              <div className="fadeInUp">
                <p
                  style={{
                    backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    marginBottom: '1rem'
                  }}
                >
                  Explore {eras[activeEra].name} to find unique dinosaur fossils
                  and learn more about the creatures from this era!
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
                    onClick={collectFossil}
                    className="hover-scale"
                    style={{
                      backgroundColor: eras[activeEra].color,
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
                    <span>🦴</span> Collect Fossil (+10 points)
                  </button>
                  
                  <button
                    onClick={startMemoryGame}
                    className="hover-scale"
                    style={{
                      backgroundColor: '#FFC107',
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
                    <span>🎮</span> Dino Name Memory Game
                  </button>
                </div>
              </div>
            </div>
            
            {/* Progress / Achievements Panel */}
            <div
              style={{
                backgroundColor: darkMode ? 'rgba(66, 66, 66, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(5px)',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span>🏆</span> Your Progress
              </h2>
              
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
                    background: 'linear-gradient(135deg, #8BC34A, #CDDC39)',
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
              
              {/* Fossil Collection */}
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
                  <span>🦴</span> Fossils Collected
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
                  {fossilCollection.length === 0 ? (
                    <span>No fossils yet. Start collecting!</span>
                  ) : (
                    fossilCollection.map((fossil, i) => (
                      <div
                        key={i}
                        style={{
                          backgroundColor: '#4CAF50',
                          color: '#fff',
                          borderRadius: '0.25rem',
                          padding: '0.25rem 0.5rem',
                          fontSize: '0.85rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {fossil}
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              {/* Eras Explored */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem'
                  }}
                >
                  <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>🗺️</span> Eras Explored
                  </div>
                  <div>{erasVisited.length} / {eras.length}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {eras.map((era, index) => (
                    <div
                      key={index}
                      style={{
                        width: `calc(${100 / eras.length}% - ${(eras.length - 1) * 0.5 / eras.length}rem)`,
                        aspectRatio: '1',
                        borderRadius: '50%',
                        backgroundColor: erasVisited.includes(index)
                          ? era.color
                          : darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem'
                      }}
                    >
                      {erasVisited.includes(index) ? era.icon : ''}
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
                <p style={{ fontWeight: 'bold', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>🦖</span> Did you know?
                </p>
                <p>
                  Paleontologists are constantly discovering new species of dinosaurs
                  and unearthing fossils that reshape our understanding of prehistory.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DinoAdventure;
