import { TriangleTypeInfo, TriangleChallenge, Achievement, GameState } from '../types';

export const TRIANGLE_TYPES: TriangleTypeInfo[] = [
  { 
    name: 'Equilateral', 
    description: 'All three sides are equal in length.', 
    icon: '🔺', 
    properties: ['All angles are 60°', 'All sides are equal'] 
  },
  { 
    name: 'Isosceles', 
    description: 'Two sides are equal in length.', 
    icon: '📐', 
    properties: ['Two angles are equal', 'Two sides are equal'] 
  },
  { 
    name: 'Scalene', 
    description: 'All three sides have different lengths.', 
    icon: '📏', 
    properties: ['All angles are different', 'All sides are different'] 
  },
  { 
    name: 'Right', 
    description: 'One angle is exactly 90° (a right angle).', 
    icon: '∟', 
    properties: ['Contains one 90° angle', 'Sides relate via Pythagorean theorem (a²+b²=c²)'] 
  },
];

export const CHALLENGES: TriangleChallenge[] = [
  { 
    id: 1, 
    level: 1, 
    description: "Foundation Stone Base", 
    givenAngles: [60, 60, null], 
    missingAngle: 60, 
    correctType: 'Equilateral', 
    reward: 10, 
    visual: 'base' 
  },
  { 
    id: 2, 
    level: 2, 
    description: "Worker's Measuring Tool", 
    givenAngles: [45, 90, null], 
    missingAngle: 45, 
    correctType: 'Right', 
    reward: 15, 
    visual: 'tool' 
  },
  { 
    id: 3, 
    level: 3, 
    description: "Support Beam Angle", 
    givenAngles: [70, null, 40], 
    missingAngle: 70, 
    correctType: 'Isosceles', 
    reward: 20, 
    visual: 'beam' 
  },
  { 
    id: 4, 
    level: 4, 
    description: "Ramp Construction Slope", 
    givenAngles: [30, null, 50], 
    missingAngle: 100, 
    correctType: 'Scalene', 
    reward: 25, 
    visual: 'ramp' 
  },
  { 
    id: 5, 
    level: 5, 
    description: "Casing Stone Shape", 
    givenAngles: [null, 50, 80], 
    missingAngle: 50, 
    correctType: 'Isosceles', 
    reward: 25, 
    visual: 'casing' 
  },
  { 
    id: 6, 
    level: 6, 
    description: "Chamber Entrance Arch (Top Triangle)", 
    givenAngles: [60, null, 60], 
    missingAngle: 60, 
    correctType: 'Equilateral', 
    reward: 30, 
    visual: 'arch' 
  },
  { 
    id: 7, 
    level: 7, 
    description: "Precise Alignment Cut", 
    givenAngles: [90, 37, null], 
    missingAngle: 53, 
    correctType: 'Right', 
    reward: 35, 
    visual: 'cut' 
  },
  { 
    id: 8, 
    level: 8, 
    description: "Obelisk Tip Design", 
    givenAngles: [80, null, 20], 
    missingAngle: 80, 
    correctType: 'Isosceles', 
    reward: 40, 
    visual: 'obelisk' 
  },
  { 
    id: 9, 
    level: 9, 
    description: "Sacred Temple Corner", 
    givenAngles: [null, 35, 55], 
    missingAngle: 90, 
    correctType: 'Right', 
    reward: 45, 
    visual: 'temple' 
  },
  { 
    id: 10, 
    level: 10, 
    description: "Pyramid Capstone", 
    givenAngles: [51.5, null, 51.5], 
    missingAngle: 77, 
    correctType: 'Isosceles', 
    reward: 50, 
    visual: 'capstone' 
  },
];

export const ACHIEVEMENTS_LIST: Achievement[] = [
  { 
    id: 'first_block', 
    name: 'First Block Laid', 
    description: 'Successfully identify your first triangle.', 
    unlocked: false, 
    condition: (gs: GameState) => gs.pyramidProgress > 0 
  },
  { 
    id: 'geometry_apprentice', 
    name: 'Geometry Apprentice', 
    description: 'Reach Level 3.', 
    unlocked: false, 
    condition: (gs: GameState) => gs.currentLevel >= 3 
  },
  { 
    id: 'right_angle_master', 
    name: 'Right Angle Master', 
    description: 'Correctly identify 3 Right triangles.', 
    unlocked: false, 
    condition: (gs: GameState) => gs.knowledgePoints >= 50 
  },
  { 
    id: 'pyramid_raiser', 
    name: 'Pyramid Raiser', 
    description: 'Reach 50% pyramid completion.', 
    unlocked: false, 
    condition: (gs: GameState) => gs.pyramidProgress >= 50 
  },
  { 
    id: 'master_architect', 
    name: 'Master Architect', 
    description: 'Complete all challenges.', 
    unlocked: false, 
    condition: (gs: GameState) => gs.currentLevel >= CHALLENGES.length 
  },
  { 
    id: 'quick_thinker', 
    name: 'Quick Thinker', 
    description: 'Solve a challenge in under 10 seconds.',
    unlocked: false, 
    condition: (gs: GameState) => false // Will be handled by timer logic
  },
  { 
    id: 'perfectionist', 
    name: 'Perfectionist', 
    description: 'Complete 5 challenges without any errors.',
    unlocked: false, 
    condition: (gs: GameState) => false // Will be handled by streak logic
  },
];

export const TUTORIAL_STEPS = [
  "Greetings, Architect! Pharaoh [PharaohName] tasks you with building a magnificent pyramid.",
  "Success requires precise knowledge of triangles, the sacred shapes of construction!",
  "Each level presents a triangle needed for the pyramid. Examine the known angles.",
  "Calculate the missing angle. Remember, all angles in a triangle sum to 180 degrees!",
  "Identify the type of triangle: Equilateral, Isosceles, Scalene, or Right.",
  "Submit your answers. Correct solutions add to the pyramid and earn Knowledge Points!",
  "Let the sands of geometry shift in your favor! Begin construction!"
]; 