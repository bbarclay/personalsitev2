import React, { useState, useEffect, useCallback, useMemo } from 'react';

// --- TypeScript Interfaces ---

interface TriangleChallenge {
  id: number;
  level: number;
  description: string; // Context for the triangle (e.g., "Support beam angle", "Casing stone shape")
  givenAngles: (number | null)[]; // Array like [30, 60, null] or [null, 45, null]
  givenSides?: (number | null)[]; // Optional: Add side lengths later for more complexity
  correctType: 'Equilateral' | 'Isosceles' | 'Scalene' | 'Right';
  // Note: A triangle can be Right AND Isosceles or Right AND Scalene. We'll simplify for now or handle dual types.
  missingAngle: number; // The single angle player needs to find
  reward: number; // Knowledge Points awarded
  visual?: string; // Optional: Identifier for a simple visual representation
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  condition: (gameState: GameState) => boolean;
}

interface TriangleTypeInfo {
    name: 'Equilateral' | 'Isosceles' | 'Scalene' | 'Right';
    description: string;
    icon: string;
    properties: string[];
}

interface GameState {
  gameStarted: boolean;
  pharaohName: string;
  pyramidProgress: number; // 0-100, % completion
  knowledgePoints: number; // Currency/score
  currentLevel: number; // Index for challenges array
  currentChallenge: TriangleChallenge | null;
  feedbackMessage: string;
  feedbackType: 'success' | 'error' | 'info';
  selectedType: TriangleTypeInfo['name'] | null;
  inputAngle: string; // User input for missing angle
}

// --- Game Data ---

const TRIANGLE_TYPES: TriangleTypeInfo[] = [
    { name: 'Equilateral', description: 'All three sides are equal in length.', icon: '🔺', properties: ['All angles are 60°', 'All sides are equal'] },
    { name: 'Isosceles', description: 'Two sides are equal in length.', icon: '📐', properties: ['Two angles are equal', 'Two sides are equal'] },
    { name: 'Scalene', description: 'All three sides have different lengths.', icon: '📐', properties: ['All angles are different', 'All sides are different'] },
    { name: 'Right', description: 'One angle is exactly 90° (a right angle).', icon: '∟', properties: ['Contains one 90° angle', 'Sides relate via Pythagorean theorem (a²+b²=c²)'] },
];

// More challenges can be added, increasing complexity
const CHALLENGES: TriangleChallenge[] = [
  { id: 1, level: 1, description: "Foundation Stone Base", givenAngles: [60, 60, null], missingAngle: 60, correctType: 'Equilateral', reward: 10, visual: 'base' },
  { id: 2, level: 2, description: "Worker's Measuring Tool", givenAngles: [45, 90, null], missingAngle: 45, correctType: 'Right', reward: 15, visual: 'tool' }, // Could also be Isosceles
  { id: 3, level: 3, description: "Support Beam Angle", givenAngles: [70, null, 40], missingAngle: 70, correctType: 'Isosceles', reward: 20, visual: 'beam' },
  { id: 4, level: 4, description: "Ramp Construction Slope", givenAngles: [30, null, 50], missingAngle: 100, correctType: 'Scalene', reward: 25, visual: 'ramp' },
  { id: 5, level: 5, description: "Casing Stone Shape", givenAngles: [null, 50, 80], missingAngle: 50, correctType: 'Isosceles', reward: 25, visual: 'casing' },
  { id: 6, level: 6, description: "Chamber Entrance Arch (Top Triangle)", givenAngles: [60, null, 60], missingAngle: 60, correctType: 'Equilateral', reward: 30, visual: 'arch' }, // Also Isosceles
  { id: 7, level: 7, description: "Precise Alignment Cut", givenAngles: [90, 37, null], missingAngle: 53, correctType: 'Right', reward: 35, visual: 'cut' }, // Also Scalene
  { id: 8, level: 8, description: "Obelisk Tip Design", givenAngles: [80, null, 20], missingAngle: 80, correctType: 'Isosceles', reward: 40, visual: 'obelisk' },
  // Add more levels...
];

const ACHIEVEMENTS_LIST: Achievement[] = [
  { id: 'first_block', name: 'First Block Laid', description: 'Successfully identify your first triangle.', unlocked: false, condition: (gs) => gs.pyramidProgress > 0 },
  { id: 'geometry_apprentice', name: 'Geometry Apprentice', description: 'Reach Level 3.', unlocked: false, condition: (gs) => gs.currentLevel >= 3 },
  { id: 'right_angle_master', name: 'Right Angle Master', description: 'Correctly identify 3 Right triangles.', unlocked: false, condition: (gs) => gs.knowledgePoints >= 50 }, // Placeholder logic, ideally track specific types solved
  { id: 'pyramid_raiser', name: 'Pyramid Raiser', description: 'Reach 50% pyramid completion.', unlocked: false, condition: (gs) => gs.pyramidProgress >= 50 },
  { id: 'master_architect', name: 'Master Architect', description: 'Complete all challenges.', unlocked: false, condition: (gs) => gs.currentLevel >= CHALLENGES.length },
];

const TUTORIAL_STEPS = [
  "Greetings, Architect! Pharaoh [PharaohName] tasks you with building a magnificent pyramid.",
  "Success requires precise knowledge of triangles, the sacred shapes of construction!",
  "Each level presents a triangle needed for the pyramid. Examine the known angles.",
  "Calculate the missing angle. Remember, all angles in a triangle sum to 180 degrees!",
  "Identify the type of triangle: Equilateral, Isosceles, Scalene, or Right.",
  "Submit your answers. Correct solutions add to the pyramid and earn Knowledge Points!",
  "Let the sands of geometry shift in your favor! Begin construction!",
];

// --- React Component ---

const PyramidBuilders = () => {
  // --- State ---
  const [gameState, setGameState] = useState<GameState>({
    gameStarted: false,
    pharaohName: 'Tutankhamun', // Default
    pyramidProgress: 0,
    knowledgePoints: 0,
    currentLevel: 0,
    currentChallenge: null,
    feedbackMessage: '',
    feedbackType: 'info',
    selectedType: null,
    inputAngle: '',
  });
  const [theme, setTheme] = useState<'day' | 'night'>('day');
  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS_LIST);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
   const [tempPharaohName, setTempPharaohName] = useState('');


  // --- Effects ---

  // Load first challenge when game starts
  useEffect(() => {
    if (gameState.gameStarted && gameState.currentLevel === 0) {
      loadChallenge(0);
      setShowTutorial(true); // Show tutorial on game start
    }
  }, [gameState.gameStarted, gameState.currentLevel]);

  // --- Helper Functions ---

  const toggleTheme = () => setTheme(theme === 'day' ? 'night' : 'day');

  const showTempNotification = (message: string, type: GameState['feedbackType'] = 'info') => {
    setGameState(prev => ({ ...prev, feedbackMessage: message, feedbackType: type }));
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
      // Maybe clear feedback message after fade out
      // setTimeout(() => setGameState(prev => ({ ...prev, feedbackMessage: '' })), 500);
    }, 3000); // Notification visible for 3 seconds
  };

  const loadChallenge = (level: number) => {
    if (level < CHALLENGES.length) {
      setGameState(prev => ({
        ...prev,
        currentChallenge: CHALLENGES[level],
        currentLevel: level,
        feedbackMessage: `Level ${level + 1}: ${CHALLENGES[level].description}`,
        feedbackType: 'info',
        selectedType: null,
        inputAngle: '',
      }));
    } else {
      // Game Complete!
      setGameState(prev => ({
          ...prev,
          currentChallenge: null,
          feedbackMessage: 'Magnificent! The pyramid is complete! You are a Master Architect!',
          feedbackType: 'success'
      }));
      checkAchievements(); // Final check
    }
  };

  // --- Game Logic Functions ---

  const startGame = () => {
     if (tempPharaohName.trim() === '') {
        showTempNotification("Please enter your Pharaoh's name!", 'error');
        return;
     }
    setGameState(prev => ({
        ...prev,
        pharaohName: tempPharaohName,
        gameStarted: true,
        currentLevel: 0, // Ensure starting at level 0
        pyramidProgress: 0,
        knowledgePoints: 0,
    }));
    setAchievements(ACHIEVEMENTS_LIST.map(a => ({...a, unlocked: false}))); // Reset achievements
    // Loading challenge is handled by useEffect
  };

  const handleAngleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers (and empty string)
    if (/^\d*$/.test(value)) {
       setGameState(prev => ({ ...prev, inputAngle: value }));
    }
  };

  const handleTypeSelect = (type: TriangleTypeInfo['name']) => {
      setGameState(prev => ({ ...prev, selectedType: type }));
  };

  const checkAchievements = useCallback(() => {
    // Use a functional update to ensure we're working with the latest achievement state
    setAchievements(prevAchievements => {
      let changed = false;
      // Need the *next* gameState to check conditions correctly, so pass it if possible
      // Or, ensure conditions only rely on state that's already updated.
      // For simplicity here, we use the current gameState, which might be slightly delayed
      // if called *before* the state update that triggers the achievement.
      const updatedAchievements = prevAchievements.map(ach => {
        if (!ach.unlocked && ach.condition(gameState)) {
          // Only show notification if it's newly unlocked
           if (!prevAchievements.find(pa => pa.id === ach.id)?.unlocked) {
              showTempNotification(`Achievement Unlocked: ${ach.name}!`, 'success');
              changed = true;
           }
           return { ...ach, unlocked: true };
        }
        return ach;
      });
      return changed ? updatedAchievements : prevAchievements; // Avoid unnecessary re-render if no changes
    });
  }, [gameState]); // Dependency: check whenever gameState changes


   const handleSubmitAnswer = () => {
    if (!gameState.currentChallenge) return;

    const submittedAngle = parseInt(gameState.inputAngle, 10);
    const submittedType = gameState.selectedType;

    // Basic Validation
    if (isNaN(submittedAngle) || submittedType === null) {
      setGameState(prev => ({ ...prev, feedbackMessage: 'Please enter a valid angle and select a triangle type.', feedbackType: 'error' }));
      return;
    }

    const { missingAngle, correctType, reward, level } = gameState.currentChallenge;
    const isAngleCorrect = submittedAngle === missingAngle;
    // Simple type check - could be more nuanced (e.g., Right Isosceles)
    const isTypeCorrect = submittedType === correctType;

    if (isAngleCorrect && isTypeCorrect) {
      // Correct Answer
      const newKnowledgePoints = gameState.knowledgePoints + reward;
      const progressIncrement = 100 / CHALLENGES.length;
      const newProgress = Math.min(100, gameState.pyramidProgress + progressIncrement);

      // Update state *before* loading next challenge and checking achievements
      setGameState(prev => ({
        ...prev,
        knowledgePoints: newKnowledgePoints,
        pyramidProgress: newProgress,
        feedbackMessage: `Correct! +${reward} Knowledge. Block placed!`,
        feedbackType: 'success',
      }));

      // Check achievements *after* state update seems more reliable here
      // Use useEffect to react to gameState changes for achievements? Or call manually after state update.
       // Let's try calling it manually after the state update.
       // Note: Direct calls after setState might use stale state due to async nature.
       // Using a temporary variable holding the *next* state is safer if needed.
       // Example: const nextGameState = {...gameState, knowledgePoints: newKnowledgePoints, ...}; checkAchievements(nextGameState);
       // For simplicity now, we'll call it and accept potential 1-render delay if state isn't fully updated yet.
       checkAchievements();


      // Load next level
      setTimeout(() => {
          loadChallenge(level + 1);
      }, 1500); // Delay to show success message

    } else {
      // Incorrect Answer
      let errorMessage = 'Incorrect. ';
      if (!isAngleCorrect && isTypeCorrect) {
        errorMessage += `The type is right, but check your angle calculation! Remember the sum is 180°.`;
      } else if (isAngleCorrect && !isTypeCorrect) {
        errorMessage += `The angle is correct, but that's not the right type of triangle. Examine the angles/sides.`;
      } else {
        errorMessage += `Check both the angle calculation (sum = 180°) and the triangle type definition.`;
      }
       // Maybe deduct points?
       // const newKnowledgePoints = Math.max(0, gameState.knowledgePoints - 5);
      setGameState(prev => ({
        ...prev,
        feedbackMessage: errorMessage,
        feedbackType: 'error',
         // knowledgePoints: newKnowledgePoints // Optional penalty
      }));
    }
  };


   const nextTutorialStep = () => {
    if (tutorialStep < TUTORIAL_STEPS.length - 1) {
      setTutorialStep(tutorialStep + 1);
    } else {
      setShowTutorial(false);
    }
  };

  // --- Render Functions ---

  const renderTriangleVisual = (challenge: TriangleChallenge | null) => {
    if (!challenge) return <div className="visual-placeholder"></div>;
    // Simple placeholder visuals based on description or a 'visual' tag
    // Could be replaced with SVG later
    return (
        <div className="triangle-visual-area">
            <div className={`triangle-shape visual-${challenge.visual || 'default'}`}>
                 {/* Basic CSS triangle or SVG could go here */}
                 <span className='angle a'>{challenge.givenAngles[0] ?? '?'}°</span>
                 <span className='angle b'>{challenge.givenAngles[1] ?? '?'}°</span>
                 <span className='angle c'>{challenge.givenAngles[2] ?? '?'}°</span>
            </div>
        </div>
    );
  };

  const renderProgressBar = (value: number) => (
    <div className="progress-bar-container">
      <div className="progress-bar-bg">
        <div className="progress-bar-fg" style={{ width: `${value}%` }}></div>
      </div>
      <span>{Math.round(value)}%</span>
    </div>
  );

  const renderPyramid = (progress: number) => {
     const layers = Math.max(1, Math.ceil((progress / 100) * 10)); // Max 10 layers
     return (
         <div className="pyramid-visual">
             {[...Array(layers)].map((_, i) => (
                 <div key={i} className="pyramid-layer" style={{ width: `${100 - i * 10}%`, opacity: (progress / 100) * 0.5 + 0.5 }}></div>
             ))}
         </div>
     );
  }


  // --- Main Return ---
  return (
    <div className={`pyramid-builders-container theme-${theme}`}>
      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Exo+2:wght@700&display=swap');

        :root {
          --font-main: 'Roboto', sans-serif;
          --font-title: 'Exo 2', sans-serif;
          --font-mono: 'Courier New', monospace; /* For angles */
        }

        .pyramid-builders-container {
          font-family: var(--font-main);
          min-height: 100vh;
          transition: background-color 0.5s, color 0.5s;
          display: flex;
          flex-direction: column;
        }

        /* Theme Variables */
        .theme-day {
          --bg-primary: #fdf2e0; /* Sandy */
          --bg-secondary: #ffffff;
          --text-primary: #4d3b2a; /* Dark brown */
          --text-secondary: #8c7a6b;
          --accent-color: #e67e22; /* Orange */
          --accent-secondary: #2980b9; /* Nile Blue */
          --border-color: #d3c1ae;
          --shadow-color: rgba(77, 59, 42, 0.15);
          --pyramid-color: #f39c12; /* Gold */
          --success-color: #27ae60;
          --error-color: #c0392b;
          --info-color: var(--accent-secondary);
          --sky-color: linear-gradient(to bottom, #87CEEB, #fdf2e0);
        }

        .theme-night {
          --bg-primary: #1a1f25; /* Dark blue-grey */
          --bg-secondary: #2c3e50;
          --text-primary: #ecf0f1; /* Light grey */
          --text-secondary: #bdc3c7;
          --accent-color: #f1c40f; /* Gold/Yellow */
          --accent-secondary: #8e44ad; /* Purple */
          --border-color: #34495e;
          --shadow-color: rgba(0, 0, 0, 0.3);
          --pyramid-color: #f39c12;
          --success-color: #2ecc71;
          --error-color: #e74c3c;
          --info-color: var(--accent-secondary);
           --sky-color: linear-gradient(to bottom, #0c1445, #1a1f25);
        }

        /* General Layout */
        .pyramid-builders-container {
            background: var(--sky-color);
            color: var(--text-primary);
        }

        .game-header {
          background-color: rgba(var(--bg-secondary-rgb, 255, 255, 255), 0.8); /* Use RGB for opacity */
          backdrop-filter: blur(5px);
          padding: 0.8rem 1.5rem;
          border-bottom: 1px solid var(--border-color);
          box-shadow: 0 2px 5px var(--shadow-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 10;
        }
         .theme-day { --bg-secondary-rgb: 255, 255, 255; }
         .theme-night { --bg-secondary-rgb: 44, 62, 80; }

        .header-title {
            font-family: var(--font-title);
            font-size: 1.7rem;
            color: var(--accent-color);
            margin: 0;
            display: flex;
            align-items: center;
            gap: 0.6rem;
        }
         .header-title span:last-child {
             font-size: 1rem;
             color: var(--text-secondary);
             font-weight: normal;
         }

        .player-info {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            font-size: 0.9rem;
        }
         .player-info span { display: flex; align-items: center; gap: 0.3rem; }
         .player-info strong { color: var(--accent-color); font-family: var(--font-mono);}


         .progress-bar-container { display: flex; align-items: center; gap: 0.5rem; width: 150px; }
         .progress-bar-bg { height: 10px; flex-grow: 1; background-color: rgba(128, 128, 128, 0.2); border-radius: 5px; overflow: hidden; border: 1px solid var(--border-color); }
         .progress-bar-fg { height: 100%; background-color: var(--pyramid-color); border-radius: 5px; transition: width 0.5s ease-in-out; }
         .progress-bar-container span { font-size: 0.8rem; font-family: var(--font-mono); }


        .theme-toggle-button {
            background: none;
            border: 1px solid var(--border-color);
            color: var(--text-secondary);
            width: 35px; height: 35px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2rem;
            display: flex;
            align-items: center; justify-content: center;
            transition: all 0.3s ease;
        }
         .theme-toggle-button:hover { border-color: var(--accent-color); color: var(--accent-color); }


        /* Main Content */
        .main-content {
            max-width: 1000px;
            margin: 2rem auto;
            padding: 1.5rem;
            background-color: var(--bg-secondary);
            border-radius: 8px;
            box-shadow: 0 4px 15px var(--shadow-color);
        }

        /* Start Screen */
         .start-screen { text-align: center; padding: 2rem; }
         .start-screen h1 { font-family: var(--font-title); color: var(--accent-color); font-size: 2.5rem; margin-bottom: 1rem;}
         .start-screen p { color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 1.1rem; line-height: 1.6;}
         .start-screen input {
             padding: 0.8rem;
             font-size: 1rem;
             border: 1px solid var(--border-color);
             border-radius: 4px;
             margin-right: 0.5rem;
             background-color: var(--bg-primary);
             color: var(--text-primary);
             width: 250px;
         }
         .start-button {
             padding: 0.8rem 1.5rem;
             font-size: 1rem;
             font-weight: bold;
             background-color: var(--accent-color);
             color: white;
             border: none; border-radius: 4px;
             cursor: pointer; transition: background-color 0.2s;
         }
         .start-button:hover { background-color: #d35400; } /* Darker orange */
         .theme-night .start-button:hover { background-color: #f39c12; } /* Brighter yellow */

        /* Game Interface */
        .game-interface { display: grid; grid-template-columns: 1fr 300px; gap: 1.5rem; }
        .challenge-area { /* background-color: var(--bg-primary); padding: 1rem; border-radius: 6px; */ }

        .challenge-description {
            font-size: 1.1rem;
            font-weight: bold;
            color: var(--accent-secondary);
            margin-bottom: 1.5rem;
            text-align: center;
            border-bottom: 1px dashed var(--border-color);
            padding-bottom: 1rem;
        }
        .challenge-description .level-tag { font-size: 0.8rem; background: var(--accent-secondary); color: white; padding: 2px 6px; border-radius: 3px; margin-right: 0.5rem;}

        .triangle-display { display: flex; align-items: center; justify-content: space-around; margin-bottom: 1.5rem; gap: 1rem;}

        /* Basic Triangle Visual */
        .triangle-visual-area { width: 150px; height: 130px; position: relative; }
        .triangle-shape {
             width: 0; height: 0;
             border-left: 75px solid transparent;
             border-right: 75px solid transparent;
             border-bottom: 130px solid var(--pyramid-color); /* Adjust height */
             position: relative;
             margin: auto;
             filter: drop-shadow(2px 2px 3px var(--shadow-color));
        }
         /* Example variations - use CSS transforms or ::before/::after for better shapes */
        .visual-right { border-left: 130px solid var(--pyramid-color); border-bottom: 130px solid transparent; border-right: 0;}
        .visual-isosceles-tall { border-left: 50px solid transparent; border-right: 50px solid transparent; border-bottom: 130px solid var(--pyramid-color); }

        .triangle-shape .angle {
             position: absolute;
             font-family: var(--font-mono);
             font-size: 0.9rem;
             color: var(--text-primary);
             background: rgba(var(--bg-primary-rgb), 0.7);
             padding: 1px 3px; border-radius: 2px;
        }
         .theme-day { --bg-primary-rgb: 253, 242, 224; }
         .theme-night { --bg-primary-rgb: 26, 31, 37; }

         .angle.a { top: -20px; left: 50%; transform: translateX(-50%); }
         .angle.b { bottom: 5px; left: -35px; }
         .angle.c { bottom: 5px; right: -35px; }


        .known-info { font-size: 0.9rem; color: var(--text-secondary); text-align: center; margin-bottom: 1.5rem; }
        .known-info strong { font-family: var(--font-mono); color: var(--text-primary); }

        .answer-section { display: flex; flex-direction: column; align-items: center; gap: 1rem; }
         .input-group { display: flex; align-items: center; gap: 0.5rem; }
         .input-group label { font-weight: bold; }
         .input-group input[type="number"] {
             width: 70px;
             padding: 0.5rem;
             font-size: 1rem;
             font-family: var(--font-mono);
             border: 1px solid var(--border-color);
             border-radius: 4px;
             text-align: center;
             background-color: var(--bg-primary);
             color: var(--text-primary);
         }
         /* Remove number input arrows */
         .input-group input[type=number]::-webkit-inner-spin-button,
         .input-group input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
         .input-group input[type=number] { -moz-appearance: textfield; }


         .type-selection { display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: center; margin-bottom: 1rem;}
         .type-button {
             padding: 0.5rem 0.8rem;
             border: 1px solid var(--border-color);
             border-radius: 4px;
             background-color: var(--bg-primary);
             color: var(--text-secondary);
             cursor: pointer;
             font-size: 0.9rem;
             transition: all 0.2s;
             display: flex; align-items: center; gap: 0.3rem;
         }
         .type-button:hover { border-color: var(--accent-secondary); color: var(--accent-secondary); }
         .type-button.selected {
             border-color: var(--accent-color);
             background-color: rgba(var(--accent-color-rgb), 0.1);
             color: var(--accent-color);
             font-weight: bold;
         }
         .theme-day { --accent-color-rgb: 230, 126, 34; }
         .theme-night { --accent-color-rgb: 241, 196, 15; }


        .submit-button {
             padding: 0.7rem 2rem;
             font-size: 1rem; font-weight: bold;
             background-color: var(--accent-color);
             color: white;
             border: none; border-radius: 4px;
             cursor: pointer; transition: background-color 0.2s; margin-top: 0.5rem;
        }
         .submit-button:hover { background-color: #d35400; }
         .theme-night .submit-button:hover { background-color: #f39c12; }
         .submit-button:disabled { background-color: #bdc3c7; cursor: not-allowed; }

        .feedback-area {
          margin-top: 1.5rem;
          padding: 0.8rem;
          border-radius: 4px;
          text-align: center;
          font-weight: bold;
          min-height: 40px; /* Prevent layout shift */
          transition: all 0.3s;
        }
        .feedback-success { background-color: rgba(var(--success-color-rgb), 0.1); color: var(--success-color); border: 1px solid var(--success-color); }
         .theme-day { --success-color-rgb: 39, 174, 96; }
         .theme-night { --success-color-rgb: 46, 204, 113; }
        .feedback-error { background-color: rgba(var(--error-color-rgb), 0.1); color: var(--error-color); border: 1px solid var(--error-color);}
         .theme-day { --error-color-rgb: 192, 57, 43; }
         .theme-night { --error-color-rgb: 231, 76, 60; }
        .feedback-info { background-color: rgba(var(--info-color-rgb), 0.1); color: var(--info-color); border: 1px solid var(--info-color); }
          .theme-day { --info-color-rgb: 41, 128, 185; }
         .theme-night { --info-color-rgb: 142, 68, 173; }


        /* Sidebar */
        .sidebar {
            background-color: var(--bg-primary);
            padding: 1rem;
            border-radius: 6px;
            border: 1px solid var(--border-color);
            height: fit-content; /* Make sidebar height adjust */
        }
        .sidebar h3 {
             font-family: var(--font-title);
             color: var(--accent-secondary);
             margin: 0 0 1rem 0;
             font-size: 1.3rem;
             text-align: center;
             border-bottom: 1px solid var(--border-color);
             padding-bottom: 0.5rem;
        }

        /* Pyramid Visual */
         .pyramid-visual {
             display: flex; flex-direction: column; align-items: center;
             margin-bottom: 1.5rem;
             min-height: 100px; /* Placeholder space */
         }
         .pyramid-layer {
             height: 15px; /* Adjust layer height */
             background-color: var(--pyramid-color);
             border: 1px solid #c08000; /* Darker gold border */
             margin-bottom: 1px;
             transition: width 0.5s ease-in-out, opacity 0.5s ease-in-out;
             box-shadow: inset 0 -2px 3px rgba(0,0,0,0.2);
         }


        .triangle-info-card {
            background-color: var(--bg-secondary);
            padding: 0.8rem;
            border-radius: 4px;
            margin-bottom: 0.8rem;
            border: 1px solid var(--border-color);
        }
         .triangle-info-card h4 { margin: 0 0 0.5rem 0; display: flex; align-items: center; gap: 0.3rem; color: var(--text-primary); }
         .triangle-info-card p { font-size: 0.85rem; color: var(--text-secondary); margin: 0.3rem 0; line-height: 1.4; }
         .triangle-info-card ul { list-style: '📐 '; padding-left: 1.2em; margin: 0.3rem 0; font-size: 0.8rem; color: var(--text-secondary);}

        /* Notification */
        .notification-toast {
             position: fixed;
             bottom: 2rem;
             left: 50%;
             transform: translateX(-50%);
             padding: 0.8rem 1.5rem;
             border-radius: 6px;
             box-shadow: 0 3px 10px var(--shadow-color);
             z-index: 1000;
             font-size: 0.95rem;
             font-weight: bold;
             animation: fade-in-out 3s ease-in-out;
        }
         /* Use feedback styles for notification background/color */
        .notification-toast.type-success { background-color: var(--success-color); color: white; }
        .notification-toast.type-error { background-color: var(--error-color); color: white; }
        .notification-toast.type-info { background-color: var(--info-color); color: white; }

         @keyframes fade-in-out {
             0%, 100% { opacity: 0; transform: translate(-50%, 20px); }
             10%, 90% { opacity: 1; transform: translate(-50%, 0); }
         }

         /* Tutorial Overlay */
          .tutorial-overlay {
             position: fixed;
             bottom: 1.5rem;
             right: 1.5rem;
             max-width: 380px;
             background-color: var(--bg-secondary);
             border-radius: 8px;
             padding: 1.5rem;
             border: 1px solid var(--border-color);
             box-shadow: 0 4px 15px var(--shadow-color);
             z-index: 999;
             animation: slide-up 0.5s ease-out;
         }
          .tutorial-content { display: flex; gap: 1rem; align-items: flex-start; }
          .tutorial-avatar { font-size: 2rem; min-width: 40px; text-align: center; margin-top: 5px; }
          .tutorial-text { font-size: 0.95rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 1rem; }
          .tutorial-text strong { color: var(--text-primary); }
          .tutorial-button { float: right; }
          @keyframes slide-up { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

      `}</style>

      {/* Header */}
      <header className="game-header">
        <h1 className="header-title">
          <span>🏺</span> Pyramid Builders <span>🔺 Architects</span>
        </h1>
        {gameState.gameStarted && (
          <div className="player-info">
            <span>👑 Pharaoh: <strong>{gameState.pharaohName}</strong></span>
            <span>📜 Knowledge: <strong>{gameState.knowledgePoints}</strong></span>
            <span>🏗️ Progress: {renderProgressBar(gameState.pyramidProgress)}</span>
          </div>
        )}
        <button onClick={toggleTheme} className="theme-toggle-button" title="Toggle Day/Night">
          {theme === 'day' ? '🌙' : '☀️'}
        </button>
      </header>

      {/* Notification Toast */}
      {showNotification && (
          <div className={`notification-toast type-${gameState.feedbackType}`}>
              {gameState.feedbackMessage}
          </div>
      )}

       {/* Tutorial */}
       {showTutorial && gameState.gameStarted && (
         <div className="tutorial-overlay">
           <div className="tutorial-content">
             <div className="tutorial-avatar">🧑‍🏫</div>
             <div>
               <div className="tutorial-text">
                  {TUTORIAL_STEPS[tutorialStep].replace('[PharaohName]', gameState.pharaohName)}
               </div>
               <button onClick={nextTutorialStep} className="submit-button tutorial-button">
                   {tutorialStep < TUTORIAL_STEPS.length - 1 ? 'Next →' : 'Begin!'}
               </button>
             </div>
           </div>
         </div>
       )}

      {/* Main Content */}
      <main className="main-content">
        {!gameState.gameStarted ? (
          // Start Screen
           <div className="start-screen">
             <h1>Enter the Architect's Chamber</h1>
             <p>Pharaoh awaits! Prove your knowledge of triangles to construct a monument for the ages. Enter your Pharaoh's name to begin:</p>
             <div>
                 <input
                     type="text"
                     value={tempPharaohName}
                     onChange={(e) => setTempPharaohName(e.target.value)}
                     placeholder="Pharaoh's Name"
                     maxLength={20}
                 />
                 <button onClick={startGame} className="start-button">Begin Construction</button>
             </div>
           </div>
        ) : gameState.currentChallenge ? (
          // Game Interface
          <div className="game-interface">
            {/* Left Side: Challenge and Input */}
            <div className="challenge-area">
              <div className="challenge-description">
                 <span className="level-tag">Level {gameState.currentLevel + 1}</span>
                 {gameState.currentChallenge.description}
              </div>

              <div className="triangle-display">
                 {renderTriangleVisual(gameState.currentChallenge)}
                 <div className="known-info">
                    <strong>Known Angles:</strong><br/>
                    {gameState.currentChallenge.givenAngles.map((angle, i) => (
                        <span key={i}>{angle !== null ? `${angle}°` : ' ? '}</span>
                    )).reduce((prev, curr) => <>{prev}, {curr}</>)}
                    <br/><br/>
                    <i>(Remember: Angles sum to 180°)</i>
                 </div>
              </div>


              <div className="answer-section">
                 <div className="input-group">
                    <label htmlFor="angleInput">Missing Angle:</label>
                    <input
                        type="number" // Changed back to number, validation handles non-digits
                        id="angleInput"
                        value={gameState.inputAngle}
                        onChange={handleAngleInput}
                        placeholder="?"
                        min="1" max="179" // Basic range constraints
                    />
                     <span>°</span>
                 </div>

                 <div className="type-selection">
                    <label>Triangle Type:</label>
                    {TRIANGLE_TYPES.map(typeInfo => (
                        <button
                            key={typeInfo.name}
                            className={`type-button ${gameState.selectedType === typeInfo.name ? 'selected' : ''}`}
                            onClick={() => handleTypeSelect(typeInfo.name)}
                        >
                           <span>{typeInfo.icon}</span> {typeInfo.name}
                        </button>
                    ))}
                 </div>

                 <button
                    onClick={handleSubmitAnswer}
                    className="submit-button"
                    disabled={!gameState.inputAngle || !gameState.selectedType}
                  >
                    Submit Answer 
                  </button>
              </div>

              <div className={`feedback-area feedback-${gameState.feedbackType}`}>
                  {gameState.feedbackMessage}
              </div>

            </div>

            {/* Right Side: Sidebar */}
            <aside className="sidebar">
                 <h3>Construction Status</h3>
                 {renderPyramid(gameState.pyramidProgress)}

                 <h3>Triangle Codex 📜</h3>
                 {TRIANGLE_TYPES.map(typeInfo => (
                    <div key={typeInfo.name} className="triangle-info-card">
                        <h4>{typeInfo.icon} {typeInfo.name}</h4>
                        <p>{typeInfo.description}</p>
                        {/* <ul>
                           {typeInfo.properties.map(prop => <li key={prop}>{prop}</li>)}
                        </ul> */}
                    </div>
                 ))}

                 {/* Achievements can be added here or in a separate modal */}
                 {/* <h3>Achievements 🏆</h3> */}

            </aside>
          </div>
        ) : (
            // Game Complete State
            <div className="start-screen"> {/* Re-use start screen styling */}
                 <h1>Pyramid Complete!</h1>
                 <p>{gameState.feedbackMessage}</p>
                 {renderPyramid(100)}
                 <p>Your final score: {gameState.knowledgePoints} Knowledge Points!</p>
                 {/* Add a button to restart? */}
             </div>
        )}
      </main>
    </div>
  );
};

export default PyramidBuilders;