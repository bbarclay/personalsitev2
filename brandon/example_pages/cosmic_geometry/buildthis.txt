import React, { useState, useEffect, useRef } from 'react';

const CosmicGeometry = () => {
  // State variables
  const [darkMode, setDarkMode] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [geometryKnowledge, setGeometryKnowledge] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [quizActive, setQuizActive] = useState(false);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [quizResult, setQuizResult] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState({ title: '', content: '' });
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showIntro, setShowIntro] = useState(true);
  const [introStep, setIntroStep] = useState(0);
  const [activeShape, setActiveShape] = useState(null);
  const [shapesDiscovered, setShapesDiscovered] = useState([]);
  const [rotationSpeed, setRotationSpeed] = useState(50);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [quizCorrectAnswers, setQuizCorrectAnswers] = useState(0);
  const [fractalDepth, setFractalDepth] = useState(3);
  const [showGoldenRatio, setShowGoldenRatio] = useState(false);
  const [activeSection, setActiveSection] = useState('platonic');
  const [achievements, setAchievements] = useState([
    { id: 'starter', name: 'Geometry Explorer', description: 'Begin your cosmic geometry journey', unlocked: false },
    { id: 'shapes', name: 'Shape Master', description: 'Discover all platonic solids', unlocked: false },
    { id: 'quiz', name: 'Geometry Genius', description: 'Answer 5 quiz questions correctly', unlocked: false },
    { id: 'knowledge', name: 'Cosmic Mathematician', description: 'Reach 50 geometry knowledge points', unlocked: false },
  ]);
  
  const canvasRef = useRef(null);
  
  // Define sections
  const sections = [
    { id: 'platonic', name: "Platonic Solids", color: "#FF9800", description: "Explore the five perfect 3D shapes!", icon: "🔷" },
    { id: 'fractals', name: "Cosmic Fractals", color: "#9C27B0", description: "Discover infinite geometric patterns!", icon: "🌀" },
    { id: 'golden', name: "Golden Ratio", color: "#2196F3", description: "Uncover nature's divine proportion!", icon: "🌟" },
    { id: 'dimensions', name: "Higher Dimensions", color: "#607D8B", description: "Venture beyond 3D space!", icon: "🌌" }
  ];
  
  // Platonic solids
  const platonicSolids = [
    { name: "Tetrahedron", faces: 4, edges: 6, vertices: 4, description: "A pyramid with 4 triangular faces", funFact: "The tetrahedron is the only platonic solid that has no parallel faces." },
    { name: "Cube", faces: 6, edges: 12, vertices: 8, description: "A regular hexahedron with 6 square faces", funFact: "The cube is the only platonic solid that can fill space completely without gaps." },
    { name: "Octahedron", faces: 8, edges: 12, vertices: 6, description: "A shape with 8 triangular faces", funFact: "The octahedron is the dual of the cube, meaning if you place a vertex in the center of each face of a cube and connect them, you get an octahedron." },
    { name: "Dodecahedron", faces: 12, edges: 30, vertices: 20, description: "A shape with 12 pentagonal faces", funFact: "Ancient Greeks associated the dodecahedron with the universe and believed it represented the cosmos." },
    { name: "Icosahedron", faces: 20, edges: 30, vertices: 12, description: "A shape with 20 triangular faces", funFact: "The icosahedron has the most faces of any platonic solid and is used in the design of many modern dice." }
  ];
  
  // Fractal types
  const fractals = [
    { name: "Mandelbrot Set", complexity: "High", discoveredBy: "Benoit Mandelbrot", description: "The most famous fractal, resembling a cosmic beetle" },
    { name: "Julia Set", complexity: "Medium", discoveredBy: "Gaston Julia", description: "A family of fractals related to the Mandelbrot set" },
    { name: "Sierpinski Triangle", complexity: "Low", discoveredBy: "Wacław Sierpiński", description: "A triangle subdivided into smaller triangles infinitely" },
    { name: "Koch Snowflake", complexity: "Low", discoveredBy: "Helge von Koch", description: "A curve with infinite perimeter but finite area" },
    { name: "Dragon Curve", complexity: "Medium", discoveredBy: "NASA physicists", description: "A space-filling curve that resembles a dragon" }
  ];
  
  // Geometry facts
  const geometryFacts = [
    "The sum of angles in a triangle is always 180 degrees, but only in Euclidean geometry!",
    "A hypercube is a 4-dimensional analog of a cube, also called a tesseract.",
    "The golden ratio (approximately 1.618) appears throughout nature and is considered aesthetically pleasing.",
    "A Möbius strip has only one side and one edge, despite appearing to have two of each.",
    "Non-Euclidean geometry is used to describe the curvature of spacetime in Einstein's theory of relativity.",
    "The Klein bottle is a surface with no inside or outside, impossible to create in 3D without self-intersection.",
    "Fractals have fractional dimensions, existing between traditional geometric dimensions.",
    "The Fibonacci sequence is closely related to the golden ratio and appears in spiral patterns in nature.",
    "Platonic solids were believed by ancient Greeks to be the building blocks of the universe.",
    "In hyperbolic geometry, the sum of angles in a triangle is always less than 180 degrees."
  ];
  
  // Quiz questions for each section
  const quizQuestions = {
    'platonic': [
      {
        question: "How many faces does a dodecahedron have?",
        options: ["8", "12", "20", "30"],
        answer: "12"
      },
      {
        question: "Which platonic solid has 20 faces?",
        options: ["Tetrahedron", "Octahedron", "Dodecahedron", "Icosahedron"],
        answer: "Icosahedron"
      },
      {
        question: "What shape are the faces of an octahedron?",
        options: ["Squares", "Triangles", "Pentagons", "Hexagons"],
        answer: "Triangles"
      }
    ],
    'fractals': [
      {
        question: "What is the approximate fractal dimension of the Mandelbrot set boundary?",
        options: ["1", "2", "1.5", "2.5"],
        answer: "2"
      },
      {
        question: "Which fractal is created by repeatedly removing the middle third of line segments?",
        options: ["Mandelbrot Set", "Julia Set", "Cantor Set", "Koch Snowflake"],
        answer: "Cantor Set"
      },
      {
        question: "What key property do all fractals share?",
        options: ["Self-similarity", "Symmetry", "Convexity", "Linearity"],
        answer: "Self-similarity"
      }
    ],
    'golden': [
      {
        question: "What is the approximate value of the golden ratio?",
        options: ["1.414", "1.618", "2.718", "3.142"],
        answer: "1.618"
      },
      {
        question: "Which sequence of numbers approaches the golden ratio as it extends?",
        options: ["Prime numbers", "Perfect squares", "Fibonacci sequence", "Powers of 2"],
        answer: "Fibonacci sequence"
      },
      {
        question: "Which ancient building incorporates the golden ratio in its design?",
        options: ["Colosseum", "Parthenon", "Taj Mahal", "Great Wall of China"],
        answer: "Parthenon"
      }
    ],
    'dimensions': [
      {
        question: "What is a tesseract?",
        options: ["A 3D cube", "A 4D cube", "A 5D cube", "A fractal cube"],
        answer: "A 4D cube"
      },
      {
        question: "In string theory, how many dimensions are typically proposed?",
        options: ["4", "10", "11", "26"],
        answer: "10"
      },
      {
        question: "What happens to the volume of a hypersphere as dimensions increase beyond 5?",
        options: ["It increases forever", "It approaches infinity", "It approaches zero", "It oscillates"],
        answer: "It approaches zero"
      }
    ]
  };
  
  // Check for achievements
  useEffect(() => {
    const newAchievements = [...achievements];
    
    // Check starter achievement
    if (gameStarted && !achievements[0].unlocked) {
      newAchievements[0].unlocked = true;
      showCelebrationEffect("Achievement Unlocked: Geometry Explorer!");
    }
    
    // Check shapes achievement
    if (shapesDiscovered.length === platonicSolids.length && !achievements[1].unlocked) {
      newAchievements[1].unlocked = true;
      showCelebrationEffect("Achievement Unlocked: Shape Master!");
    }
    
    // Check knowledge achievement
    if (geometryKnowledge >= 50 && !achievements[3].unlocked) {
      newAchievements[3].unlocked = true;
      showCelebrationEffect("Achievement Unlocked: Cosmic Mathematician!");
    }
    
    // Check quiz achievement
    if (quizCorrectAnswers >= 5 && !achievements[2].unlocked) {
      newAchievements[2].unlocked = true;
      showCelebrationEffect("Achievement Unlocked: Geometry Genius!");
    }
    
    setAchievements(newAchievements);
  }, [gameStarted, geometryKnowledge, quizCorrectAnswers, shapesDiscovered]);
  
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
    showCelebrationEffect("Adventure started! Let's explore cosmic geometry!");
  };
  
  const increaseKnowledge = () => {
    setGeometryKnowledge(prev => prev + 1);
    setScore(prev => prev + 5);
    
    // Celebration on milestone knowledge points
    if (geometryKnowledge + 1 === 10) {
      showCelebrationEffect("You've gained 10 knowledge points! Keep learning!");
    } else if (geometryKnowledge + 1 === 25) {
      showCelebrationEffect("25 knowledge points! You're becoming a geometry expert!");
    } else if (geometryKnowledge + 1 === 50) {
      showCelebrationEffect("50 knowledge points! You're a cosmic mathematician!");
    }
  };
  
  const adjustRotationSpeed = (amount) => {
    setRotationSpeed(prev => Math.max(10, Math.min(100, prev + amount)));
    setScore(prev => prev + 2);
  };
  
  const adjustZoom = (amount) => {
    setZoomLevel(prev => Math.max(0.5, Math.min(3, prev + amount)));
    setScore(prev => prev + 2);
  };
  
  const adjustFractalDepth = (amount) => {
    setFractalDepth(prev => Math.max(1, Math.min(7, prev + amount)));
    setScore(prev => prev + 3);
    if (fractalDepth + amount >= 6) {
      showCelebrationEffect("Exploring deep fractal complexity! +5 bonus points");
      setScore(prev => prev + 5);
    }
  };
  
  const toggleGoldenRatio = () => {
    setShowGoldenRatio(!showGoldenRatio);
    if (!showGoldenRatio) {
      setScore(prev => prev + 5);
      showCelebrationEffect("You unlocked the golden ratio! +5 points");
    }
  };
  
  const discoverShape = (shape) => {
    if (!shapesDiscovered.includes(shape.name)) {
      setShapesDiscovered([...shapesDiscovered, shape.name]);
      setScore(prev => prev + 15);
      showCelebrationEffect(`You discovered the ${shape.name}! +15 points`);
      increaseKnowledge();
    }
    setActiveShape(shape);
  };
  
  const startQuiz = () => {
    setQuizActive(true);
    setCurrentQuizQuestion(0);
    setUserAnswer('');
    setQuizResult(null);
  };
  
  const submitQuizAnswer = () => {
    const currentQuestion = quizQuestions[activeSection][currentQuizQuestion];
    const isCorrect = userAnswer === currentQuestion.answer;
    
    setQuizResult(isCorrect);
    
    if (isCorrect) {
      setScore(prev => prev + 10);
      setQuizCorrectAnswers(prev => prev + 1);
      showCelebrationEffect("Correct answer! +10 points");
    }
    
    setTimeout(() => {
      if (currentQuizQuestion < quizQuestions[activeSection].length - 1) {
        setCurrentQuizQuestion(prev => prev + 1);
        setUserAnswer('');
        setQuizResult(null);
      } else {
        setQuizActive(false);
        showCelebrationEffect("Quiz completed! Your cosmic knowledge grows!");
      }
    }, 1500);
  };
  
  const showRandomFact = () => {
    const randomFact = geometryFacts[Math.floor(Math.random() * geometryFacts.length)];
    showTooltipInfo("Cosmic Geometry Fact", randomFact);
    increaseKnowledge();
  };
  
  const showTooltipInfo = (title, content, event) => {
    let position = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    if (event) {
      position = { x: event.clientX, y: event.clientY };
    }

    setTooltipContent({ title, content });
    setTooltipPosition(position);
    setShowTooltip(true);

    setTimeout(() => {
      setShowTooltip(false);
    }, 4000);
  };

  const advanceIntro = () => {
    if (introStep < 3) {
      setIntroStep(prev => prev + 1);
    } else {
      setShowIntro(false);
      startGame();
    }
  };

  const changeSection = (sectionId) => {
    setActiveSection(sectionId);
    setScore(prev => prev + 5);
    showCelebrationEffect(`Exploring ${sections.find(s => s.id === sectionId).name}! +5 points`);
  };

  // Render functions
  const renderIntro = () => {
    const introContent = [
      {
        title: "Welcome to Cosmic Geometry!",
        content: "Embark on a journey through the mathematical wonders of the universe."
      },
      {
        title: "Discover Geometric Secrets",
        content: "Explore platonic solids, fractals, and the golden ratio that shape our cosmos."
      },
      {
        title: "Test Your Knowledge",
        content: "Take quizzes, earn points, and unlock achievements as you learn."
      },
      {
        title: "Ready to Begin?",
        content: "Your cosmic geometry adventure awaits!"
      }
    ];

    return (
      <div className="intro-container" style={{ 
        background: darkMode ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)',
        color: darkMode ? 'white' : 'black'
      }}>
        <h1>{introContent[introStep].title}</h1>
        <p>{introContent[introStep].content}</p>
        <button onClick={advanceIntro}>
          {introStep < 3 ? "Next" : "Start Adventure"}
        </button>
      </div>
    );
  };

  const renderPlatonicSolids = () => {
    return (
      <div className="platonic-container">
        <h2>Platonic Solids</h2>
        <div className="shapes-grid">
          {platonicSolids.map(shape => (
            <div 
              key={shape.name}
              className={`shape-card ${activeShape?.name === shape.name ? 'active' : ''} ${shapesDiscovered.includes(shape.name) ? 'discovered' : ''}`}
              onClick={() => discoverShape(shape)}
            >
              <h3>{shape.name}</h3>
              <div className="shape-visual" style={{ transform: `rotate(${rotationSpeed/10}deg)` }}>
                {/* Visual representation would be implemented with CSS or SVG */}
                {shape.name === "Tetrahedron" && "🔺"}
                {shape.name === "Cube" && "⬜"}
                {shape.name === "Octahedron" && "💎"}
                {shape.name === "Dodecahedron" && "🔮"}
                {shape.name === "Icosahedron" && "⚽"}
              </div>
              <p>Faces: {shape.faces} | Edges: {shape.edges} | Vertices: {shape.vertices}</p>
              {shapesDiscovered.includes(shape.name) && (
                <p className="fun-fact">{shape.funFact}</p>
              )}
            </div>
          ))}
        </div>
        <div className="controls">
          <button onClick={() => adjustRotationSpeed(-10)}>Slow Rotation</button>
          <button onClick={() => adjustRotationSpeed(10)}>Speed Rotation</button>
          <button onClick={() => adjustZoom(-0.1)}>Zoom Out</button>
          <button onClick={() => adjustZoom(0.1)}>Zoom In</button>
        </div>
      </div>
    );
  };

  const renderFractals = () => {
    return (
      <div className="fractals-container">
        <h2>Cosmic Fractals</h2>
        <div className="fractal-display" style={{ transform: `scale(${zoomLevel})` }}>
          {/* Fractal visualization would be implemented with Canvas */}
          <canvas 
            ref={canvasRef} 
            width={500} 
            height={500} 
            style={{ border: '1px solid #ccc' }}
          />
        </div>
        <div className="fractal-list">
          {fractals.map(fractal => (
            <div key={fractal.name} className="fractal-item">
              <h3>{fractal.name}</h3>
              <p>Complexity: {fractal.complexity}</p>
              <p>Discovered by: {fractal.discoveredBy}</p>
              <p>{fractal.description}</p>
            </div>
          ))}
        </div>
        <div className="controls">
          <button onClick={() => adjustFractalDepth(-1)}>Decrease Depth</button>
          <button onClick={() => adjustFractalDepth(1)}>Increase Depth</button>
          <div className="depth-indicator">
            Fractal Depth: {fractalDepth}
          </div>
        </div>
      </div>
    );
  };

  const renderGoldenRatio = () => {
    return (
      <div className="golden-container">
        <h2>The Golden Ratio</h2>
        <div className="golden-visual" style={{ transform: `scale(${zoomLevel})` }}>
          {/* Golden spiral visualization would be implemented with SVG */}
          <svg width="400" height="400" viewBox="0 0 400 400">
            <path 
              d="M0,0 Q200,0 200,200 Q200,400 400,400" 
              fill="none" 
              stroke={darkMode ? "gold" : "darkgoldenrod"} 
              strokeWidth="2"
            />
            {showGoldenRatio && (
              <>
                <rect x="0" y="0" width="200" height="200" fill="none" stroke="rgba(255,215,0,0.5)" strokeWidth="1" />
                <rect x="200" y="0" width="200" height="200" fill="none" stroke="rgba(255,215,0,0.5)" strokeWidth="1" />
                <rect x="0" y="200" width="200" height="200" fill="none" stroke="rgba(255,215,0,0.5)" strokeWidth="1" />
                <text x="100" y="100" fill={darkMode ? "white" : "black"}>1</text>
                <text x="300" y="100" fill={darkMode ? "white" : "black"}>1</text>
                <text x="100" y="300" fill={darkMode ? "white" : "black"}>1</text>
                <text x="300" y="300" fill={darkMode ? "white" : "black"}>φ</text>
              </>
            )}
          </svg>
        </div>
        <div className="fibonacci-sequence">
          <h3>Fibonacci Sequence</h3>
          <div className="sequence">
            1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...
          </div>
          <p>As the sequence progresses, the ratio between consecutive numbers approaches φ ≈ 1.618...</p>
        </div>
        <button onClick={toggleGoldenRatio}>
          {showGoldenRatio ? "Hide Golden Ratio" : "Show Golden Ratio"}
        </button>
      </div>
    );
  };

  const renderHigherDimensions = () => {
    return (
      <div className="dimensions-container">
        <h2>Higher Dimensions</h2>
        <div className="dimension-visual">
          <div className="tesseract" style={{ transform: `rotateX(${rotationSpeed}deg) rotateY(${rotationSpeed/2}deg)` }}>
            {/* Tesseract visualization would be implemented with CSS 3D transforms */}
            <div className="cube outer-cube"></div>
            <div className="cube inner-cube"></div>
            <div className="connector"></div>
          </div>
        </div>
        <div className="dimension-info">
          <h3>Dimensions Beyond Our Perception</h3>
          <p>Our universe has 3 spatial dimensions plus time, but mathematics allows us to explore higher dimensions.</p>
          <ul>
            <li>4D: Tesseract (hypercube)</li>
            <li>5D: Penteract</li>
            <li>6D: Hexeract</li>
            <li>7D: Hepteract</li>
            <li>nD: n-hypercube</li>
          </ul>
          <p>Each higher dimension adds a new direction perpendicular to all previous dimensions.</p>
        </div>
      </div>
    );
  };

  const renderQuiz = () => {
    const currentQuestion = quizQuestions[activeSection][currentQuizQuestion];

    return (
      <div className="quiz-container">
        <h2>Cosmic Geometry Quiz</h2>
        <div className="question-card">
          <h3>Question {currentQuizQuestion + 1}</h3>
          <p>{currentQuestion.question}</p>
          <div className="options">
            {currentQuestion.options.map(option => (
              <button 
                key={option}
                className={userAnswer === option ? 'selected' : ''}
                onClick={() => setUserAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
          {quizResult !== null && (
            <div className={`result ${quizResult ? 'correct' : 'incorrect'}`}>
              {quizResult ? 'Correct!' : `Incorrect. The answer is ${currentQuestion.answer}.`}
            </div>
          )}
          <button 
            onClick={submitQuizAnswer}
            disabled={!userAnswer || quizResult !== null}
          >
            Submit Answer
          </button>
        </div>
      </div>
    );
  };

  const renderCelebration = () => {
    if (!showCelebration) return null;

    return (
      <div className="celebration">
        <div className="celebration-content">
          {showCelebration.message}
          <div className="celebration-particles">
            {Array(20).fill(0).map((_, i) => (
              <div key={i} className="particle" style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`
              }}></div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderTooltip = () => {
    if (!showTooltip) return null;

    return (
      <div className="tooltip" style={{
        left: tooltipPosition.x,
        top: tooltipPosition.y
      }}>
        <h3>{tooltipContent.title}</h3>
        <p>{tooltipContent.content}</p>
      </div>
    );
  };

  const renderAchievements = () => {
    return (
      <div className="achievements-panel">
        <h2>Achievements</h2>
        <div className="achievements-list">
          {achievements.map(achievement => (
            <div 
              key={achievement.id} 
              className={`achievement ${achievement.unlocked ? 'unlocked' : 'locked'}`}
            >
              <h3>{achievement.name}</h3>
              <p>{achievement.description}</p>
              {achievement.unlocked && <div className="achievement-badge">✓</div>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Main render
  return (
    <div className={`cosmic-geometry ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <header>
        <h1>Cosmic Geometry</h1>
        <div className="score-display">
          <div>Score: {score}</div>
          <div>Knowledge: {geometryKnowledge}</div>
          <div>Level: {level}</div>
        </div>
        <button onClick={toggleTheme}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>

      {showIntro && renderIntro()}

      {gameStarted && !showIntro && (
        <main>
          <nav className="section-nav">
            {sections.map(section => (
              <button 
                key={section.id}
                className={activeSection === section.id ? 'active' : ''}
                onClick={() => changeSection(section.id)}
              >
                {section.icon} {section.name}
              </button>
            ))}
          </nav>

          <section className="content-area">
            {quizActive ? renderQuiz() : (
              <>
                {activeSection === 'platonic' && renderPlatonicSolids()}
                {activeSection === 'fractals' && renderFractals()}
                {activeSection === 'golden' && renderGoldenRatio()}
                {activeSection === 'dimensions' && renderHigherDimensions()}
              </>
            )}
          </section>

          <aside className="side-panel">
            {renderAchievements()}
            <div className="actions">
              <button onClick={showRandomFact}>Learn a Fact</button>
              <button onClick={startQuiz} disabled={quizActive}>Take a Quiz</button>
            </div>
          </aside>
        </main>
      )}

      {renderCelebration()}
      {renderTooltip()}

      <style jsx>{`
        .cosmic-geometry {
          font-family: 'Roboto', sans-serif;
          min-height: 100vh;
          padding: 20px;
          transition: background-color 0.3s, color 0.3s;
        }

        .dark-mode {
          background-color: #121212;
          color: #ffffff;
        }

        .light-mode {
          background-color: #f5f5f5;
          color: #333333;
        }

        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 20px;
          border-radius: 10px;
          background: rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
        }

        main {
          display: grid;
          grid-template-columns: 1fr 3fr 1fr;
          gap: 20px;
            height: calc(100vh - 150px);
          }

          .section-nav {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .section-nav button {
            padding: 15px;
            border: none;
            border-radius: 8px;
            background: rgba(0, 0, 0, 0.1);
            cursor: pointer;
            transition: all 0.3s;
            text-align: left;
            font-weight: bold;
          }

          .section-nav button.active {
            background: rgba(0, 0, 0, 0.2);
            box-shadow: 0 0 10px rgba(0, 100, 255, 0.5);
          }

          .content-area {
            background: rgba(0, 0, 0, 0.05);
            border-radius: 10px;
            padding: 20px;
            overflow-y: auto;
          }

          .side-panel {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .actions {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          button {
            padding: 10px 15px;
            border: none;
            border-radius: 5px;
            background: #3f51b5;
            color: white;
            cursor: pointer;
            transition: background 0.3s;
          }

          button:hover {
            background: #303f9f;
          }

          button:disabled {
            background: #9e9e9e;
            cursor: not-allowed;
          }

          .intro-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 100;
            text-align: center;
            padding: 20px;
          }

          .intro-container h1 {
            font-size: 2.5rem;
            margin-bottom: 20px;
            color: #4fc3f7;
          }

          .intro-container p {
            font-size: 1.2rem;
            max-width: 600px;
            margin-bottom: 30px;
          }

          .intro-container button {
            font-size: 1.2rem;
            padding: 15px 30px;
          }

          .shapes-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
          }

          .shape-card {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            padding: 15px;
            cursor: pointer;
            transition: all 0.3s;
            text-align: center;
          }

          .shape-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          }

          .shape-card.active {
            border: 2px solid #4fc3f7;
          }

          .shape-card.discovered {
            background: rgba(76, 175, 80, 0.1);
          }

          .shape-visual {
            font-size: 3rem;
            margin: 20px 0;
            transition: transform 0.5s;
          }

          .fun-fact {
            font-style: italic;
            font-size: 0.9rem;
            margin-top: 10px;
            color: #4fc3f7;
          }

          .controls {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: center;
          }

          .fractal-display {
            margin: 20px 0;
            display: flex;
            justify-content: center;
            transition: transform 0.3s;
          }

          .fractal-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 15px;
            margin: 20px 0;
          }

          .fractal-item {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            padding: 15px;
          }

          .depth-indicator {
            margin-top: 10px;
            text-align: center;
            font-weight: bold;
          }

          .golden-visual {
            margin: 20px 0;
            display: flex;
            justify-content: center;
            transition: transform 0.3s;
          }

          .fibonacci-sequence {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
          }

          .sequence {
            font-family: monospace;
            font-size: 1.2rem;
            margin: 10px 0;
            word-wrap: break-word;
          }

          .dimension-visual {
            height: 300px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 20px 0;
            perspective: 1000px;
          }

          .tesseract {
            position: relative;
            width: 200px;
            height: 200px;
            transform-style: preserve-3d;
            transition: transform 0.5s;
          }

          .cube {
            position: absolute;
            width: 100%;
            height: 100%;
            border: 2px solid;
            transform-style: preserve-3d;
          }

          .outer-cube {
            border-color: #4fc3f7;
          }

          .inner-cube {
            border-color: #ff9800;
            transform: scale(0.5);
          }

          .connector {
            position: absolute;
            width: 100%;
            height: 100%;
            transform-style: preserve-3d;
          }

          .dimension-info {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
          }

          .quiz-container {
            max-width: 600px;
            margin: 0 auto;
          }

          .question-card {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            padding: 20px;
          }

          .options {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin: 20px 0;
          }

          .options button {
            text-align: left;
            background: rgba(0, 0, 0, 0.1);
          }

          .options button.selected {
            background: #3f51b5;
          }

          .result {
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 15px;
            text-align: center;
            font-weight: bold;
          }

          .result.correct {
            background: rgba(76, 175, 80, 0.2);
            color: #4caf50;
          }

          .result.incorrect {
            background: rgba(244, 67, 54, 0.2);
            color: #f44336;
          }

          .achievements-panel {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            padding: 15px;
          }

          .achievements-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 10px;
          }

          .achievement {
            padding: 10px;
            border-radius: 5px;
            position: relative;
          }

          .achievement.unlocked {
            background: rgba(76, 175, 80, 0.1);
          }

          .achievement.locked {
            background: rgba(0, 0, 0, 0.05);
            opacity: 0.7;
          }

          .achievement-badge {
            position: absolute;
            top: 10px;
            right: 10px;
            width: 20px;
            height: 20px;
            background: #4caf50;
            color: white;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.8rem;
          }

          .celebration {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            pointer-events: none;
            z-index: 1000;
          }

          .celebration-content {
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 20px 40px;
            border-radius: 10px;
            font-size: 1.5rem;
            text-align: center;
            position: relative;
            animation: fadeInOut 3s forwards;
          }

          .celebration-particles {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }

          .particle {
            position: absolute;
            width: 10px;
            height: 10px;
            background: gold;
            border-radius: 50%;
            animation: particleAnimation 1s forwards;
          }

          .tooltip {
            position: fixed;
            max-width: 300px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px;
            border-radius: 5px;
            z-index: 100;
            transform: translate(-50%, -100%);
            margin-top: -10px;
            animation: fadeIn 0.3s;
          }

          .tooltip h3 {
            margin-top: 0;
            color: #4fc3f7;
          }

          @keyframes fadeInOut {
            0% { opacity: 0; transform: scale(0.8); }
            10% { opacity: 1; transform: scale(1); }
            80% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(0.8); }
          }

          @keyframes particleAnimation {
            0% { transform: translate(0, 0); opacity: 1; }
            100% { transform: translate(var(--x, 50px), var(--y, -50px)); opacity: 0; }
          }

                    @keyframes fadeIn {
                      from { opacity: 0; }
                      to { opacity: 1; }
                    }

                    .score-display {
                      display: flex;
                      gap: 20px;
                    }

                    .score-display div {
                      background: rgba(0, 0, 0, 0.2);
                      padding: 5px 10px;
                      border-radius: 5px;
                      font-weight: bold;
                    }

                    h1, h2, h3 {
                      color: #4fc3f7;
                    }

                    @media (max-width: 768px) {
                      main {
                        grid-template-columns: 1fr;
                        grid-template-rows: auto 1fr auto;
                      }

                      .section-nav {
                        flex-direction: row;
                        overflow-x: auto;
                        padding-bottom: 10px;
                      }

                      .section-nav button {
                        flex: 0 0 auto;
                      }

                      .side-panel {
                        flex-direction: row;
                        flex-wrap: wrap;
                      }

                      .actions {
                        flex-direction: row;
                        flex: 1;
                      }
                    }
                `}</style>
              </div>
            );
          };

          export default CosmicGeometry;