<UPDATED_CODE>import React, { useState, useEffect } from 'react';

const CosmicQuest = () => {
  // State variables
  const [darkMode, setDarkMode] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [activeZone, setActiveZone] = useState(0);
  const [score, setScore] = useState(0);
  const [spaceKnowledge, setSpaceKnowledge] = useState(0);
  const [rocketFuel, setRocketFuel] = useState(50);
  const [showConstellation, setShowConstellation] = useState(false);
  const [character, setCharacter] = useState('astronaut');
  const [showCelebration, setShowCelebration] = useState(false);
  const [quizActive, setQuizActive] = useState(false);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [quizResult, setQuizResult] = useState(null);
  const [achievements, setAchievements] = useState([
    { id: 'starter', name: 'Space Cadet', description: 'Begin your cosmic journey', unlocked: false },
    { id: 'explorer', name: 'Zone Explorer', description: 'Visit all cosmic zones', unlocked: false },
    { id: 'quiz', name: 'Astronomy Ace', description: 'Answer 5 quiz questions correctly', unlocked: false },
    { id: 'knowledge', name: 'Cosmic Scholar', description: 'Reach 50 space knowledge points', unlocked: false },
  ]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState({ title: '', content: '' });
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showIntro, setShowIntro] = useState(true);
  const [introStep, setIntroStep] = useState(0);
  const [planetsDiscovered, setPlanetsDiscovered] = useState([]);
  const [orbitSpeed, setOrbitSpeed] = useState(50);
  const [observatoryZoom, setObservatoryZoom] = useState(1);
  const [quizCorrectAnswers, setQuizCorrectAnswers] = useState(0);
  const [blackholeSimulationActive, setBlackholeSimulationActive] = useState(false);
  const [blackholeGravity, setBlackholeGravity] = useState(50);
  const [showGravityWaves, setShowGravityWaves] = useState(false);
  
  // Characters
  const characters = {
    astronaut: { name: "Captain Nova", color: "#2196F3", emoji: "👩‍🚀" },
    alien: { name: "Zorb", color: "#7CB342", emoji: "👽" },
    robot: { name: "Astro-Bot", color: "#F44336", emoji: "🤖" }
  };
  
  // Define zones
  const zones = [
    { name: "Solar System", color: "#FF9800", description: "Explore our home in the universe!", icon: "☀️" },
    { name: "Observatory", color: "#9C27B0", description: "Study stars and constellations!", icon: "🔭" },
    { name: "Space Station", color: "#2196F3", description: "Learn about living in space!", icon: "🛰️" },
    { name: "Black Hole Lab", color: "#607D8B", description: "Discover the secrets of black holes!", icon: "🌌" }
  ];
  
  // Planets for solar system zone
  const planets = [
    { name: "Mercury", color: "#999", description: "The smallest and closest planet to the Sun", distanceFromSun: 0.39, size: 24, funFact: "Mercury's daytime temperature can reach 800°F, while nights can be as cold as -290°F!" },
    { name: "Venus", color: "#E8A735", description: "The hottest planet in our solar system", distanceFromSun: 0.72, size: 60, funFact: "Venus rotates in the opposite direction compared to most planets, so the sun rises in the west and sets in the east." },
    { name: "Earth", color: "#3F51B5", description: "Our home planet - the only known planet with life", distanceFromSun: 1, size: 64, funFact: "Earth is the only planet not named after a Greek or Roman god." },
    { name: "Mars", color: "#F44336", description: "The red planet that humans want to visit", distanceFromSun: 1.52, size: 34, funFact: "Mars is home to the tallest mountain in our solar system, Olympus Mons, which is nearly 3 times the height of Mount Everest!" },
    { name: "Jupiter", color: "#E8A735", description: "The largest planet with a big red spot", distanceFromSun: 5.2, size: 142, funFact: "Jupiter's Great Red Spot is a storm that has been raging for at least 400 years, and it's so big that three Earths could fit inside it!" },
    { name: "Saturn", color: "#FFD54F", description: "The planet famous for its beautiful rings", distanceFromSun: 9.54, size: 120, funFact: "Saturn's rings are mostly made of ice and rock particles that range in size from a grain of sand to as large as a house." },
    { name: "Uranus", color: "#81D4FA", description: "The planet that rotates on its side", distanceFromSun: 19.22, size: 51, funFact: "Uranus rotates on its side, like a rolling ball, making its seasons extremely long - each pole gets 42 years of continuous sunlight followed by 42 years of darkness." },
    { name: "Neptune", color: "#1A237E", description: "A windy and stormy ice giant", distanceFromSun: 30.06, size: 49, funFact: "Neptune has the strongest winds in the solar system, reaching speeds of over 1,200 miles per hour." }
  ];
  
  // Constellations for observatory zone
  const constellations = [
    { name: "Orion", stars: 7, type: "Winter", mythology: "Represents the hunter Orion from Greek mythology" },
    { name: "Ursa Major", stars: 7, type: "Northern", mythology: "Known as the Great Bear and contains the Big Dipper" },
    { name: "Cassiopeia", stars: 5, type: "Northern", mythology: "Named after the vain queen Cassiopeia in Greek mythology" },
    { name: "Leo", stars: 9, type: "Zodiac", mythology: "Represents the Nemean Lion, killed by Hercules" },
    { name: "Scorpius", stars: 15, type: "Southern", mythology: "Represents the scorpion that killed Orion" }
  ];
  
  // Space facts for random display
  const spaceFacts = [
    "Light from the Sun takes about 8 minutes to reach Earth.",
    "There are more stars in the universe than grains of sand on all the beaches on Earth.",
    "The footprints left by the Apollo astronauts on the Moon will likely stay there for at least 100 million years.",
    "A day on Venus is longer than a year on Venus! Venus takes 243 Earth days to rotate once on its axis.",
    "The Milky Way galaxy is expected to collide with the Andromeda galaxy in about 4 billion years.",
    "There's a planet made of diamonds, called 55 Cancri e.",
    "The largest known star, UY Scuti, is more than 1,700 times the size of our Sun.",
    "Space is completely silent because there is no air for sound waves to travel through.",
    "The space between galaxies is not completely empty - it contains about one atom per cubic meter.",
    "The core of Jupiter is so hot that it's a liquid metal ocean of hydrogen."
  ];
  
  // Quiz questions for each zone
  const quizQuestions = {
    0: [ // Solar System
      {
        question: "Which planet has the Great Red Spot?",
        options: ["Mars", "Jupiter", "Venus", "Saturn"],
        answer: "Jupiter"
      },
      {
        question: "Which planet is known as the 'Red Planet'?",
        options: ["Mercury", "Venus", "Earth", "Mars"],
        answer: "Mars"
      },
      {
        question: "Which planet has the most moons?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Saturn"
      }
    ],
    1: [ // Observatory
      {
        question: "What is the name of the galaxy we live in?",
        options: ["Andromeda", "Milky Way", "Triangulum", "Messier 87"],
        answer: "Milky Way"
      },
      {
        question: "What is the closest star to Earth?",
        options: ["Proxima Centauri", "Alpha Centauri", "The Sun", "Sirius"],
        answer: "The Sun"
      },
      {
        question: "Which constellation contains the 'North Star' (Polaris)?",
        options: ["Ursa Major", "Ursa Minor", "Orion", "Cassiopeia"],
        answer: "Ursa Minor"
      }
    ],
    2: [ // Space Station
      {
        question: "What do astronauts use to prevent floating away during spacewalks?",
        options: ["Suction boots", "Tethers", "Magnetic gloves", "Jet packs"],
        answer: "Tethers"
      },
      {
        question: "How do astronauts wash their hair in space?",
        options: ["With regular shampoo and water", "With no-rinse shampoo", "They don't until returning to Earth", "With specialized space shower units"],
        answer: "With no-rinse shampoo"
      },
      {
        question: "What happens to human height in space?",
        options: ["People shrink", "People grow taller", "No change", "People grow wider"],
        answer: "People grow taller"
      }
    ],
    3: [ // Black Hole Lab
      {
        question: "What happens when you cross the event horizon of a black hole?",
        options: ["You get transported to another dimension", "Nothing can escape, not even light", "You instantly vaporize", "You travel back in time"],
        answer: "Nothing can escape, not even light"
      },
      {
        question: "What is Stephen Hawking's famous discovery about black holes?",
        options: ["They can explode", "They emit radiation", "They contain wormholes", "They have a solid surface"],
        answer: "They emit radiation"
      },
      {
        question: "What is at the center of most galaxies?",
        options: ["A giant star", "A supernova", "A supermassive black hole", "A neutron star"],
        answer: "A supermassive black hole"
      }
    ]
  };
  
  // Check for achievements
  useEffect(() => {
    const newAchievements = [...achievements];
    
    // Check starter achievement
    if (gameStarted && !achievements[0].unlocked) {
      newAchievements[0].unlocked = true;
      showCelebrationEffect("Achievement Unlocked: Space Cadet!");
    }
    
    // Check explorer achievement
    const allZonesVisited = Array(zones.length).fill(0).map((_, i) => i).every(
      zoneIndex => zonesVisited.includes(zoneIndex)
    );
    if (allZonesVisited && !achievements[1].unlocked) {
      newAchievements[1].unlocked = true;
      showCelebrationEffect("Achievement Unlocked: Zone Explorer!");
    }
    
    // Check knowledge achievement
    if (spaceKnowledge >= 50 && !achievements[3].unlocked) {
      newAchievements[3].unlocked = true;
      showCelebrationEffect("Achievement Unlocked: Cosmic Scholar!");
    }
    
    // Check quiz achievement
    if (quizCorrectAnswers >= 5 && !achievements[2].unlocked) {
      newAchievements[2].unlocked = true;
      showCelebrationEffect("Achievement Unlocked: Astronomy Ace!");
    }
    
    setAchievements(newAchievements);
  }, [gameStarted, spaceKnowledge, quizCorrectAnswers, zonesVisited]);
  
  // Track visited zones
  const [zonesVisited, setZonesVisited] = useState([0]);
  useEffect(() => {
    if (!zonesVisited.includes(activeZone)) {
      setZonesVisited([...zonesVisited, activeZone]);
      // Add points for exploring a new zone
      setScore(prev => prev + 20);
      showCelebrationEffect(`You discovered ${zones[activeZone].name}! +20 points`);
    }
  }, [activeZone]);
  
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
    showCelebrationEffect("Adventure started! Let's explore the cosmos!");
  };
  
  const increaseKnowledge = () => {
    setSpaceKnowledge(prev => prev + 1);
    setScore(prev => prev + 5);
    
    // Celebration on milestone knowledge points
    if (spaceKnowledge + 1 === 10) {
      showCelebrationEffect("You've gained 10 knowledge points! Keep learning!");
    } else if (spaceKnowledge + 1 === 25) {
      showCelebrationEffect("25 knowledge points! You're becoming a space expert!");
    } else if (spaceKnowledge + 1 === 50) {
      showCelebrationEffect("50 knowledge points! You're a cosmic genius!");
    }
  };
  
  const adjustOrbitSpeed = (amount) => {
    setOrbitSpeed(prev => Math.max(10, Math.min(100, prev + amount)));
    setScore(prev => prev + 2);
  };
  
  const adjustZoom = (amount) => {
    setObservatoryZoom(prev => Math.max(0.5, Math.min(3, prev + amount)));
    setScore(prev => prev + 2);
  };
  
  const toggleConstellation = () => {
    setShowConstellation(!showConstellation);
    if (!showConstellation) {
      setScore(prev => prev + 5);
      showCelebrationEffect("You unlocked constellation patterns! +5 points");
    }
  };
  
  const adjustBlackholeGravity = (amount) => {
    setBlackholeGravity(prev => Math.max(10, Math.min(100, prev + amount)));
    setScore(prev => prev + 2);
  };
  
  const toggleGravityWaves = () => {
    setShowGravityWaves(!showGravityWaves);
    if (!showGravityWaves) {
      setScore(prev => prev + 8);
      showCelebrationEffect("You visualized gravity waves! +8 points");
    }
  };
  
  const refuelRocket = (amount) => {
    setRocketFuel(prev => Math.min(100, prev + amount));
    setScore(prev => prev + 3);
    showCelebrationEffect(`Rocket refueled! +${amount} fuel units`);
  };
  
  const discoverPlanet = (planetIndex) => {
    if (!planetsDiscovered.includes(planetIndex)) {
      setPlanetsDiscovered([...planetsDiscovered, planetIndex]);
      setScore(prev => prev + 15);
      increaseKnowledge();
      showCelebrationEffect(`You discovered ${planets[planetIndex].name}! +15 points`);
    }
  };
  
  const startQuiz = () => {
    setQuizActive(true);
    setCurrentQuizQuestion(0);
    setUserAnswer('');
    setQuizResult(null);
  };
  
  const submitQuizAnswer = (selectedAnswer) => {
    const correctAnswer = quizQuestions[activeZone][currentQuizQuestion].answer;
    const isCorrect = selectedAnswer === correctAnswer;
    
    if (isCorrect) {
      const pointsEarned = 10;
      setScore(prev => prev + pointsEarned);
      setQuizCorrectAnswers(prev => prev + 1);
      showCelebrationEffect(`Correct! +${pointsEarned} points`);
      increaseKnowledge();
    }
    
    setQuizResult({ isCorrect, correctAnswer });
    
    // Move to next question after a delay
    setTimeout(() => {
      if (currentQuizQuestion < quizQuestions[activeZone].length - 1) {
        setCurrentQuizQuestion(prev => prev + 1);
        setUserAnswer('');
        setQuizResult(null);
      } else {
        // End of quiz
        setQuizActive(false);
        showCelebrationEffect("Quiz completed! Great job exploring the cosmos!");
      }
    }, 2000);
  };
  
  const startBlackholeSimulation = () => {
    setBlackholeSimulationActive(true);
    setScore(prev => prev + 10);
    showCelebrationEffect("Black hole simulation activated! +10 points");
  };
  
  const stopBlackholeSimulation = () => {
    setBlackholeSimulationActive(false);
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
    { text: "Welcome to Cosmic Quest! I'm Captain Nova, your guide to the universe.", character: "astronaut" },
    { text: "Our mission is to explore the wonders of space and learn about cosmic phenomena.", character: "astronaut" },
    { text: "We'll visit different zones, from our Solar System to the mysterious Black Holes!", character: "astronaut" },
    { text: "You'll earn space knowledge and unlock achievements. Ready for liftoff?", character: "astronaut" }
  ];
  
  const nextIntroStep = () => {
    if (introStep < introSteps.length - 1) {
      setIntroStep(introStep + 1);
    } else {
      setShowIntro(false);
    }
  };
  
  // Random space fact
  const [currentFact, setCurrentFact] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact(prev => (prev + 1) % spaceFacts.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div style={{
      fontFamily: 'system-ui, sans-serif',
      minHeight: '100vh',
      backgroundColor: darkMode ? '#0a0e17' : '#e1f5fe',
      color: darkMode ? '#ffffff' : '#333333',
      transition: 'background-color 0.3s, color 0.3s',
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: darkMode 
        ? 'radial-gradient(circle at 10% 20%, rgba(40, 60, 150, 0.2) 0%, rgba(10, 14, 23, 0) 80%)' 
        : 'radial-gradient(circle at 10% 20%, rgba(40, 170, 250, 0.2) 0%, rgba(225, 245, 254, 0) 80%)'
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
          @keyframes twinkle {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 0.2; }
          }
          @keyframes orbit {
            from { transform: rotate(0deg) translateX(var(--orbit-distance)) rotate(0deg); }
            to { transform: rotate(360deg) translateX(var(--orbit-distance)) rotate(-360deg); }
          }
          @keyframes glow {
            0%, 100% { filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.7)); }
            50% { filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.9)); }
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
          @keyframes waveEffect {
            0% { transform: scale(1); opacity: 0.8; }
            100% { transform: scale(2); opacity: 0; }
          }
          .floating { animation: float 6s ease-in-out infinite; }
          .pulsing { animation: pulse 2s infinite; }
          .bouncing { animation: bounce 2s infinite; }
          .blinking { animation: blink 1s infinite; }
          .spinning { animation: spin 40s linear infinite; }
          .twinkle { animation: twinkle 3s ease-in-out infinite; }
          .orbiting { animation: orbit var(--orbit-time) linear infinite; }
          .glowing { animation: glow 2s ease-in-out infinite; }
          .sparkle { animation: sparkle 1s ease-in-out; }
          .fadeInUp { animation: fadeInUp 0.5s ease-out; }
          .slideIn { animation: slideIn 0.5s ease-out; }
          .hover-scale:hover { transform: scale(1.05); transition: transform 0.2s; }
        `}
      </style>
      
      {/* Background stars */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        {Array.from({ length: 100 }).map((_, i) => {
          const size = Math.random() * 2 + 1;
          const isLargeStar = Math.random() > 0.9;
          return (
            <div 
              key={i}
              className={isLargeStar ? "twinkle" : ""}
              style={{
                position: 'absolute',
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: '50%',
                backgroundColor: isLargeStar 
                  ? ['#61d9ff', '#ffbe3d', '#ff7272'][Math.floor(Math.random() * 3)] 
                  : '#ffffff',
                opacity: isLargeStar ? 0.9 : 0.6,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                boxShadow: isLargeStar ? '0 0 4px white' : 'none'
              }}
            />
          );
        })}
        
        {/* Distant Galaxies */}
        {Array.from({ length: 5 }).map((_, i) => {
          const size = Math.random() * 100 + 50;
          return (
            <div 
              key={`galaxy-${i}`}
              className="spinning"
              style={{
                position: 'absolute',
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: '50%',
                background: `radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 40%, rgba(0,0,0,0) 70%)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 100 + 100}s`,
                opacity: 0.3
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
        backdropFilter: 'blur(10px)',
        backgroundColor: darkMode ? 'rgba(10, 14, 23, 0.7)' : 'rgba(225, 245, 254, 0.7)',
        boxShadow: darkMode ? '0 4px 12px rgba(0, 0, 0, 0.4)' : '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          background: 'linear-gradient(90deg, #2196F3, #9C27B0)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span className="bouncing" style={{ fontSize: '3rem' }}>🚀</span>
          Cosmic Quest
        </h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="pulsing" style={{
            backgroundColor: '#2196F3',
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
              backgroundColor: darkMode ? '#f9a825' : '#263238',
              color: darkMode ? '#263238' : 'white',
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
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '0.5rem',
          zIndex: 100,
          textAlign: 'center',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          animation: 'fadeInUp 0.5s ease-out',
          boxShadow: '0 0 30px rgba(33, 150, 243, 0.5)'
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
                  backgroundColor: ['#FF9800', '#2196F3', '#9C27B0', '#F44336'][i % 4],
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
          backgroundColor: darkMode ? '#1E272E' : 'white',
          color: darkMode ? 'white' : '#333',
          padding: '0.75rem',
          borderRadius: '0.5rem',
          boxShadow: darkMode ? '0 4px 12px rgba(0, 0, 0, 0.6)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
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
            borderTop: `8px solid ${darkMode ? '#1E272E' : 'white'}`
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
            backgroundColor: darkMode ? '#1E272E' : 'white',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            boxShadow: darkMode ? '0 10px 25px -5px rgba(0, 0, 0, 0.6)' : '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
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
            <div className="floating" style={{ fontSize: '9rem', marginBottom: '1.5rem' }}>🚀</div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Welcome to Cosmic Quest!
            </h2>
            <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
              Explore the wonders of space through exciting adventures and cosmic challenges!
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
                background: 'linear-gradient(90deg, #2196F3, #9C27B0)',
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
              Begin Cosmic Journey
            </button>
          </div>
        ) : (
          // Game Interface
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {/* Zone Selection */}
            <div style={{
              backgroundColor: darkMode ? 'rgba(30, 39, 46, 0.8)' : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: darkMode ? '0 10px 25px -5px rgba(0, 0, 0, 0.3)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span>🗺️</span> Cosmic Zones
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {zones.map((zone, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveZone(index)}
                    className={`hover-scale ${index === activeZone ? 'pulsing' : ''}`}
                    style={{
                      backgroundColor: index === activeZone ? zone.color : 'transparent',
                      color: index === activeZone ? 'white' : darkMode ? 'white' : '#333',
                      border: `2px solid ${zone.color}`,
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
                        <span>{zone.icon}</span>
                        <span>{zone.name}</span>
                      </div>
                      <div>
                        {zonesVisited.includes(index) ? '✓' : ''}
                        {index === activeZone && <span className="blinking">🔍</span>}
                      </div>
                    </div>
                    <div style={{ fontSize: '0.8rem', marginTop: '0.25rem', opacity: 0.8 }}>
                      {zone.description}
                    </div>
                    
                    {/* Background animation for active zone */}
                    {index === activeZone && (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: zone.color,
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
              
              {/* Space Fact */}
              <div style={{
                marginTop: '1.5rem',
                backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.5)',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                borderLeft: '4px solid #2196F3',
                fontSize: '0.9rem',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <p style={{ fontWeight: 'bold', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>🪐</span> Space Fact:
                </p>
                <p className="fadeInUp" key={currentFact}>{spaceFacts[currentFact]}</p>
              </div>
            </div>
            
            {/* Interactive Area */}
            <div style={{
              backgroundColor: darkMode ? 'rgba(30, 39, 46, 0.8)' : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: darkMode ? '0 10px 25px -5px rgba(0, 0, 0, 0.3)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                marginBottom: '1rem', 
                color: zones[activeZone].color,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span>{zones[activeZone].icon}</span> {zones[activeZone].name}
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
              
              {/* Quiz Modal */}
              {quizActive && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  zIndex: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2rem',
                  color: darkMode ? 'white' : '#333',
                  animation: 'fadeInUp 0.3s ease-out'
                }}>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem', color: zones[activeZone].color }}>Space Quiz</h3>
                  
                  <div className="fadeInUp" style={{ width: '100%', maxWidth: '500px' }}>
                    <p style={{ marginBottom: '1.5rem' }}>
                      {quizQuestions[activeZone][currentQuizQuestion].question}
                    </p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {quizQuestions[activeZone][currentQuizQuestion].options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => submitQuizAnswer(option)}
                          className="hover-scale"
                          style={{
                            backgroundColor: darkMode ? 'rgba(30, 39, 46, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                            color: darkMode ? 'white' : '#333',
                            border: `2px solid ${zones[activeZone].color}`,
                            borderRadius: '0.5rem',
                            padding: '0.75rem',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            textAlign: 'left',
                            opacity: quizResult ? 0.7 : 1
                          }}
                          disabled={quizResult !== null}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    
                    {quizResult !== null && (
                      <div className="fadeInUp" style={{ 
                        marginTop: '1.5rem',
                        backgroundColor: quizResult.isCorrect ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        textAlign: 'center',
                        borderLeft: `4px solid ${quizResult.isCorrect ? '#4CAF50' : '#F44336'}`
                      }}>
                        <p style={{ fontWeight: 'bold', color: quizResult.isCorrect ? '#4CAF50' : '#F44336' }}>
                          {quizResult.isCorrect ? '✓ Correct!' : '✗ Incorrect!'}
                        </p>
                        {!quizResult.isCorrect && (
                          <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                            The correct answer is: {quizResult.correctAnswer}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Black Hole Simulation Modal */}
              {blackholeSimulationActive && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'black',
                  zIndex: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2rem',
                  color: 'white',
                  animation: 'fadeInUp 0.3s ease-out'
                }}>
                  <div style={{ 
                    width: '200px', 
                    height: '200px', 
                    borderRadius: '50%', 
                    background: 'radial-gradient(circle at center, #000 60%, rgba(75, 0, 130, 0.7) 70%, rgba(0, 0, 255, 0.3) 100%)',
                    boxShadow: showGravityWaves ? '0 0 100px rgba(75, 0, 130, 0.4)' : 'none',
                    position: 'relative',
                    marginBottom: '2rem'
                  }}>
                    {showGravityWaves && Array.from({ length: 3 }).map((_, i) => (
                      <div 
                        key={i}
                        style={{
                          position: 'absolute',
                          inset: `-${(i + 1) * 20}px`,
                          border: '1px solid rgba(75, 0, 130, 0.3)',
                          borderRadius: '50%',
                          animation: `waveEffect ${(i + 1) * 2}s infinite linear`
                        }}
                      />
                    ))}
                  </div>
                  
                  <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                    <p>Black Hole Gravity Strength: {blackholeGravity}%</p>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                      <button
                        onClick={() => adjustBlackholeGravity(-10)}
                        style={{
                          backgroundColor: '#F44336',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.5rem',
                          padding: '0.5rem',
                          cursor: 'pointer'
                        }}
                      >
                        -
                      </button>
                      <div style={{
                        flex: 1,
                        height: '10px',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '5px',
                        alignSelf: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${blackholeGravity}%`,
                          height: '100%',
                          backgroundColor: '#9C27B0',
                          borderRadius: '5px'
                        }} />
                      </div>
                      <button
                        onClick={() => adjustBlackholeGravity(10)}
                        style={{
                          backgroundColor: '#4CAF50',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.5rem',
                          padding: '0.5rem',
                          cursor: 'pointer'
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                    <button
                      onClick={toggleGravityWaves}
                      className="hover-scale"
                      style={{
                        backgroundColor: showGravityWaves ? '#673AB7' : 'rgba(255, 255, 255, 0.1)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.5rem',
                        padding: '0.75rem 1rem',
                        fontSize: '1rem',
                        cursor: 'pointer'
                      }}
                    >
                      {showGravityWaves ? 'Hide Gravity Waves' : 'Show Gravity Waves'}
                    </button>
                  </div>
                  
                  <button
                    onClick={stopBlackholeSimulation}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      padding: '0.5rem 1rem',
                      cursor: 'pointer'
                    }}
                  >
                    Return to Lab
                  </button>
                </div>
              )}
              
              {/* Solar System Zone Content */}
              {activeZone === 0 && !quizActive && (
                <div className="fadeInUp">
                  <div style={{
                    backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    <p style={{ marginBottom: '0.5rem' }}>
                      Our Solar System consists of the Sun, eight planets, dwarf planets, moons, asteroids, and comets.
                    </p>
                    <p>
                      Explore the planets to learn about their unique characteristics!
                    </p>
                  </div>
                  
                  <div style={{ 
                    position: 'relative',
                    height: '300px',
                    marginBottom: '1.5rem',
                    backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.05)',
                    borderRadius: '0.5rem',
                    overflow: 'hidden'
                  }}>
                    {/* Sun */}
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle at center, #FFF176 0%, #FF9800 60%, #F57F17 100%)',
                      boxShadow: '0 0 40px rgba(255, 152, 0, 0.8)',
                      zIndex: 2
                    }} />
                    
                    {/* Planets */}
                    {planets.map((planet, index) => {
                      const discovered = planetsDiscovered.includes(index);
                      const orbitRadius = 40 + planet.distanceFromSun * 20;
                      const planetSize = discovered ? planet.size / 4 : 10;
                      const orbitTime = (15 / (orbitSpeed / 50)) * Math.sqrt(planet.distanceFromSun);
                      
                      return (
                        <div key={index}>
                          {/* Orbit path */}
                          <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            width: orbitRadius * 2,
                            height: orbitRadius * 2,
                            borderRadius: '50%',
                            border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                            transform: 'translate(-50%, -50%)'
                          }} />
                          
                          {/* Planet */}
                          <div 
                            className="orbiting hover-scale"
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              width: `${planetSize}px`,
                              height: `${planetSize}px`,
                              borderRadius: '50%',
                              backgroundColor: discovered ? planet.color : '#888',
                              cursor: 'pointer',
                              zIndex: 3,
                              boxShadow: discovered ? `0 0 10px ${