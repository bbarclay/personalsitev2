import React, { useState, useEffect, useCallback } from 'react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
}

interface Character {
  name: string;
  color: string;
  emoji: string;
}

interface World {
  name: string;
  color: string;
  description: string;
  icon: string;
}

interface TooltipContent {
  title: string;
  content: string;
}

interface CelebrationState {
  active: boolean;
  message: string;
}

interface Matrix {
  values: number[][];
  rows: number;
  cols: number;
}

interface Challenge {
  name: string;
  description: string;
  points: number;
}

interface IntroStep {
  text: string;
  character: string;
}

const EulerAdventure: React.FC = () => {
  // State variables
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [activeWorld, setActiveWorld] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [eDigits] = useState<string>('2.71828182845904523536028747135266249775724709369995');
  const [revealedDigits, setRevealedDigits] = useState<number>(3);
  const [growthRate, setGrowthRate] = useState<number>(100);
  const [showFormula, setShowFormula] = useState<boolean>(false);
  const [character, setCharacter] = useState<string>('professor');
  const [showCelebration, setShowCelebration] = useState<CelebrationState>({ active: false, message: '' });
  const [memoryGameActive, setMemoryGameActive] = useState<boolean>(false);
  const [memoryDigits, setMemoryDigits] = useState<string>('');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [memoryResult, setMemoryResult] = useState<boolean | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: 'starter', name: 'e Explorer', description: 'Start your e adventure', unlocked: false },
    { id: 'explorer', name: 'World Explorer', description: 'Visit all e worlds', unlocked: false },
    { id: 'memory', name: 'Memory Master', description: 'Win the memory game', unlocked: false },
    { id: 'digits', name: 'Digit Hunter', description: 'Reveal 10 digits of e', unlocked: false },
    { id: 'matrix', name: 'Matrix Master', description: 'Solve a matrix problem', unlocked: false },
    { id: 'derivative', name: 'Calculus Pro', description: 'Find a derivative', unlocked: false },
    { id: 'compound', name: 'Finance Wizard', description: 'Calculate compound interest', unlocked: false }
  ]);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [tooltipContent, setTooltipContent] = useState<TooltipContent>({ title: '', content: '' });
  const [tooltipPosition, setTooltipPosition] = useState<{x: number; y: number}>({ x: 0, y: 0 });
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [introStep, setIntroStep] = useState<number>(0);
  const [investmentAmount, setInvestmentAmount] = useState<number>(1000);
  const [timePeriod, setTimePeriod] = useState<number>(1);
  const [compoundFrequency, setCompoundFrequency] = useState<number>(1);
  const [matrixA, setMatrixA] = useState<Matrix>({
    values: [[1, 2], [3, 4]],
    rows: 2,
    cols: 2
  });
  const [matrixB, setMatrixB] = useState<Matrix>({
    values: [[5], [6]],
    rows: 2,
    cols: 1
  });
  const [matrixSolution, setMatrixSolution] = useState<number[] | null>(null);
  const [derivativeFunction, setDerivativeFunction] = useState<string>('e^x');
  const [derivativeResult, setDerivativeResult] = useState<string>('');
  const [showMatrixCalculator, setShowMatrixCalculator] = useState<boolean>(false);
  const [showDerivativeCalculator, setShowDerivativeCalculator] = useState<boolean>(false);
  const [showCompoundCalculator, setShowCompoundCalculator] = useState<boolean>(true);
  const [currentChallenge, setCurrentChallenge] = useState<number>(0);
  const [worldsVisited, setWorldsVisited] = useState<number[]>([0]);
  const [currentFact, setCurrentFact] = useState<number>(0);
  
  // Calculate compound interest
  const finalAmount = investmentAmount * Math.pow(1 + (growthRate/100)/compoundFrequency, compoundFrequency * timePeriod);
  
  // Characters
  const characters: Record<string, Character> = {
    professor: { name: "Professor Euler", color: "#9c27b0", emoji: "👨‍🏫" },
    banker: { name: "Banker Ben", color: "#2196F3", emoji: "💰" },
    scientist: { name: "Dr. Exponential", color: "#FF5252", emoji: "👩‍🔬" },
    mathematician: { name: "Matrix Master", color: "#4CAF50", emoji: "🧮" }
  };
  
  // Define worlds
  const worlds: World[] = [
    { name: "e Planet", color: "#FF5252", description: "Discover what e really is!", icon: "🌍" },
    { name: "Growth City", color: "#2196F3", description: "See how e connects to growth!", icon: "📈" },
    { name: "Calculus Canyon", color: "#FFC107", description: "Explore e in calculus!", icon: "∫" },
    { name: "Application Arcade", color: "#9C27B0", description: "Real-world e applications!", icon: "🔄" },
    { name: "Matrix Mountains", color: "#4CAF50", description: "Solve matrix problems with e!", icon: "🧮" }
  ];

  // Challenges for each world
  const challenges: Challenge[][] = [
    // e Planet challenges
    [
      { name: "Digit Discovery", description: "Reveal 5 digits of e", points: 50 },
      { name: "Memory Master", description: "Memorize 5 digits of e", points: 100 },
      { name: "Digit Hunter", description: "Reveal 10 digits of e", points: 200 }
    ],
    // Growth City challenges
    [
      { name: "Growth Explorer", description: "Adjust growth rate", points: 50 },
      { name: "Compound Master", description: "Calculate compound interest", points: 100 },
      { name: "Growth Wizard", description: "Max out growth rate", points: 200 }
    ],
    // Calculus Canyon challenges
    [
      { name: "Derivative Beginner", description: "Find derivative of e^x", points: 50 },
      { name: "Chain Rule Pro", description: "Find derivative of e^(2x)", points: 100 },
      { name: "Calculus Master", description: "Find derivative of complex function", points: 200 }
    ],
    // Application Arcade challenges
    [
      { name: "Finance Basics", description: "Calculate simple interest", points: 50 },
      { name: "Investment Pro", description: "Calculate compound interest", points: 100 },
      { name: "Finance Wizard", description: "Compare different compounding periods", points: 200 }
    ],
    // Matrix Mountains challenges
    [
      { name: "Matrix Basics", description: "Multiply simple matrices", points: 50 },
      { name: "Linear Solver", description: "Solve a system of equations", points: 100 },
      { name: "Matrix Master", description: "Solve complex system", points: 200 }
    ]
  ];

  // e facts for random display
  const eFacts: string[] = [
    "e is approximately 2.71828, but its digits go on forever without repeating!",
    "e is known as Euler's number after the Swiss mathematician Leonhard Euler.",
    "The number e is the base of the natural logarithm.",
    "e appears in the formula for continuous compound interest.",
    "The function e^x is its own derivative in calculus.",
    "e appears in probability theory, particularly in the Poisson distribution.",
    "In complex analysis, Euler's formula relates e to trigonometric functions.",
    "The area under the curve y = 1/x from 1 to e is exactly 1.",
    "e is used in the normal distribution formula in statistics.",
    "The maximum value of the function x^(1/x) occurs at x = e.",
    "e can be defined as the limit of (1 + 1/n)^n as n approaches infinity.",
    "The exponential function e^x has a Taylor series expansion: 1 + x + x²/2! + x³/3! + ...",
    "e is irrational and transcendental - it's not a root of any non-zero polynomial with rational coefficients.",
    "The probability that a randomly selected permutation of a large set is a derangement is about 1/e.",
    "The optimal strategy for the secretary problem involves waiting until about 1/e of the candidates have passed."
  ];

  // Matrix operations
  const multiplyMatrices = useCallback((a: Matrix, b: Matrix): Matrix | null => {
    if (a.cols !== b.rows) return null;
    
    const result: number[][] = [];
    for (let i = 0; i < a.rows; i++) {
      result[i] = [];
      for (let j = 0; j < b.cols; j++) {
        let sum = 0;
        for (let k = 0; k < a.cols; k++) {
          sum += a.values[i][k] * b.values[k][j];
        }
        result[i][j] = sum;
      }
    }
    
    return {
      values: result,
      rows: a.rows,
      cols: b.cols
    };
  }, []);

  const solveLinearSystem = useCallback((a: Matrix, b: Matrix): number[] | null => {
    if (a.rows !== a.cols || a.rows !== b.rows) return null;
    
    // Simple Gaussian elimination for 2x2 system
    if (a.rows === 2) {
      const [[a11, a12], [a21, a22]] = a.values;
      const [b1, b2] = b.values.map(row => row[0]);
      
      const det = a11 * a22 - a12 * a21;
      if (det === 0) return null;
      
      const x = (a22 * b1 - a12 * b2) / det;
      const y = (a11 * b2 - a21 * b1) / det;
      
      return [x, y];
    }
    
    return null;
  }, []);

  // Derivative calculations
  const calculateDerivative = useCallback((func: string): string => {
    switch(func) {
      case 'e^x':
        return 'e^x';
      case 'e^(2x)':
        return '2e^(2x)';
      case 'e^(x^2)':
        return '2xe^(x^2)';
      case 'sin(e^x)':
        return 'e^x * cos(e^x)';
      case 'e^(sin(x))':
        return 'cos(x) * e^(sin(x))';
      default:
        return 'Unknown function';
    }
  }, []);

  // Check for achievements
  useEffect(() => {
    const newAchievements = [...achievements];
    
    // Check starter achievement
    if (gameStarted && !achievements[0].unlocked) {
      newAchievements[0].unlocked = true;
      showCelebrationEffect("Achievement Unlocked: e Explorer!");
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
    
    // Check matrix achievement
    if (matrixSolution && !achievements[4].unlocked) {
      newAchievements[4].unlocked = true;
      showCelebrationEffect("Achievement Unlocked: Matrix Master!");
    }
    
    // Check derivative achievement
    if (derivativeResult && derivativeResult.includes('e') && !achievements[5].unlocked) {
      newAchievements[5].unlocked = true;
      showCelebrationEffect("Achievement Unlocked: Calculus Pro!");
    }
    
    // Check compound interest achievement
    if (compoundFrequency > 12 && !achievements[6].unlocked) {
      newAchievements[6].unlocked = true;
      showCelebrationEffect("Achievement Unlocked: Finance Wizard!");
    }
    
    setAchievements(newAchievements);
  }, [gameStarted, revealedDigits, matrixSolution, derivativeResult, compoundFrequency, achievements, worlds.length, worldsVisited]);

  // Track visited worlds
  useEffect(() => {
    if (!worldsVisited.includes(activeWorld)) {
      setWorldsVisited([...worldsVisited, activeWorld]);
      // Add points for exploring a new world
      setScore(prev => prev + 20);
      showCelebrationEffect(`You discovered ${worlds[activeWorld].name}! +20 points`);
      setCurrentChallenge(0);
    }
  }, [activeWorld, worldsVisited, worlds]);

  // Show a celebration effect
  const showCelebrationEffect = useCallback((message: string) => {
    setShowCelebration({ active: true, message });
    setTimeout(() => {
      setShowCelebration({ active: false, message: '' });
    }, 3000);
  }, []);

  // Game functions
  const startGame = useCallback(() => {
    setGameStarted(true);
    setScore(10);
    showCelebrationEffect("Adventure started! Let's explore e!");
  }, [showCelebrationEffect]);

  const revealMoreDigits = useCallback(() => {
    if (revealedDigits < eDigits.length) {
      setRevealedDigits(prev => prev + 1);
      setScore(prev => prev + 5);
      
      // Celebration on milestone digits
      if (revealedDigits + 1 === 10) {
        showCelebrationEffect("You've revealed 10 digits of e! Amazing!");
      }
    }
  }, [revealedDigits, eDigits.length, showCelebrationEffect]);

  const adjustGrowth = useCallback((amount: number) => {
    setGrowthRate(prev => Math.max(1, Math.min(200, prev + amount)));
    setScore(prev => prev + 2);
  }, []);

  const toggleFormula = useCallback(() => {
    setShowFormula(!showFormula);
    if (!showFormula) {
      setScore(prev => prev + 5);
      showCelebrationEffect("You unlocked e formulas! +5 points");
    }
  }, [showFormula, showCelebrationEffect]);

  const startMemoryGame = useCallback(() => {
    // Generate 3-5 random digits from e to memorize
    const length = Math.floor(Math.random() * 3) + 3; // 3-5 digits
    const start = Math.floor(Math.random() * (eDigits.length - length - 2)) + 2; // Random starting position after 2.
    const digits = eDigits.substring(start, start + length);
    
    setMemoryDigits(digits);
    setMemoryGameActive(true);
    
    // After 3 seconds, hide the digits and show input
    setTimeout(() => {
      setMemoryGameActive(false);
    }, 3000);
  }, [eDigits]);

  const submitMemoryAnswer = useCallback(() => {
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
  }, [userAnswer, memoryDigits, achievements, showCelebrationEffect]);

  const solveMatrix = useCallback(() => {
    const solution = solveLinearSystem(matrixA, matrixB);
    if (solution) {
      setMatrixSolution(solution);
      setScore(prev => prev + 50);
      showCelebrationEffect("Matrix solved! +50 points");
    } else {
      showCelebrationEffect("Couldn't solve this matrix. Try another one!");
    }
  }, [matrixA, matrixB, solveLinearSystem, showCelebrationEffect]);

  const calculateDerivativeResult = useCallback(() => {
    const result = calculateDerivative(derivativeFunction);
    setDerivativeResult(result);
    setScore(prev => prev + 30);
    showCelebrationEffect("Derivative calculated! +30 points");
  }, [derivativeFunction, calculateDerivative, showCelebrationEffect]);

  const completeChallenge = useCallback(() => {
    const challenge = challenges[activeWorld][currentChallenge];
    setScore(prev => prev + challenge.points);
    showCelebrationEffect(`Challenge completed: ${challenge.name}! +${challenge.points} points`);
    
    if (currentChallenge < challenges[activeWorld].length - 1) {
      setCurrentChallenge(prev => prev + 1);
    }
  }, [activeWorld, currentChallenge, challenges, showCelebrationEffect]);

  // Introduction steps
  const introSteps: IntroStep[] = [
    { text: "Welcome to e Adventure! I'm Professor Euler, and I'll be your guide.", character: "professor" },
    { text: "e is a special number that's incredibly important in mathematics and science.", character: "professor" },
    { text: "We're going to explore different worlds to learn all about e!", character: "professor" },
    { text: "You'll earn points and unlock achievements as you learn. Ready to start?", character: "professor" }
  ];

  const nextIntroStep = useCallback(() => {
    if (introStep < introSteps.length - 1) {
      setIntroStep(prev => prev + 1);
    } else {
      setShowIntro(false);
    }
  }, [introStep, introSteps.length]);

  // Random e fact
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact(prev => (prev + 1) % eFacts.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [eFacts.length]);

  const showInfoTooltip = useCallback((title: string, content: string, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + (rect.width / 2),
      y: rect.top - 10
    });
    setTooltipContent({ title, content });
    setShowTooltip(true);
  }, []);

  const hideInfoTooltip = useCallback(() => {
    setShowTooltip(false);
  }, []);

  // Render
  return (
    <div className="euler-adventure" style={{
      fontFamily: 'system-ui, sans-serif',
      minHeight: '100vh',
      backgroundColor: '#121212',
      color: '#ffffff',
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
