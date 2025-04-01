import React, { useState, useEffect, useCallback, useMemo } from 'react';

// --- Constants & Configuration ---
const TICK_RATE_MS = 100; // How often the game state updates (decay, effects)
const INITIAL_ENERGY = 100;
const MAX_QUBITS_PER_NODE = 8; // Controls visual complexity cap

// --- TypeScript Interfaces ---

// Represents the state of a single Qubit
interface QubitState {
  id: string;
  // Position/Visuals (simplified)
  orbitRadius: number; // Distance from core
  orbitAngle: number; // Current position on orbit
  orbitSpeed: number; // How fast it orbits
  color: string; // Represents base state or phase
  // Quantum Properties
  isInSuperposition: boolean; // Is it in multiple states?
  superpositionStates: { stateId: string; probability: number; color: string }[]; // Possible states if in superposition
  isEntangledWith: string | null; // ID of the Qubit it's entangled with
  energyLevel: number; // Affects tunneling, stability
  isCollapsed: boolean; // Has it been measured/stabilized?
  // Visual Effect State
  isGlowing: boolean; // e.g., when selected or targeted
  tunnelingEffect: number; // 0 to 1, controls tunneling visual alpha
}

// Represents a tool the player can use
interface QuantumTool {
  id: 'superposition' | 'entangle' | 'tunnel' | 'measure';
  name: string;
  description: string; // Explains the quantum concept
  energyCost: number;
  icon: string; // Emoji or SVG path data
  effectDurationTicks?: number; // How long a visual effect might last
}

// Defines a level/challenge
interface QuantumNodeConfig {
  id: number;
  level: number;
  name: string; // e.g., "Echoes of Schrödinger", "Entanglement Nexus"
  description: string; // Flavor text + hints
  qubitCount: number;
  initialQubitStates: Partial<QubitState>[]; // Define starting properties for each Qubit
  targetQubitStates: Partial<QubitState>[]; // Define the winning properties (e.g., specific colors, entanglement pairs)
  stabilityDecayRate: number; // How fast the node 'collapses' if not stabilized (e.g., points per second)
  timeLimitSeconds: number; // Hard time limit
  availableTools: QuantumTool['id'][];
  rewardPoints: number;
  unlocksLevel?: number; // Level unlocked upon completion
}

// Player achievements
interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  condition: (gameState: GameState, stats: GameStats) => boolean;
}

// Core game state
interface GameState {
  gameStatus: 'menu' | 'tutorial' | 'playing' | 'paused' | 'level_complete' | 'game_over';
  weaverName: string;
  currentLevel: number;
  currentNode: QuantumNodeConfig | null;
  qubitStates: QubitState[]; // The dynamic state of qubits in the current node
  nodeStability: number; // 0-100, decreases over time
  timeRemaining: number; // Seconds
  playerEnergy: number;
  selectedTool: QuantumTool['id'] | null;
  selectedQubitIds: string[]; // Qubits targeted by the current tool action
  feedbackMessage: { text: string; type: 'info' | 'success' | 'warning' | 'error' } | null;
  activeToolEffect: { toolId: QuantumTool['id'], targetQubitId: string, ticksRemaining: number } | null; // Visual effect timer
}

// Persistent stats across levels
interface GameStats {
    totalScore: number;
    levelsCompleted: number;
    timesMeasured: number;
    pairsEntangled: number;
    successfulTunnels: number;
}

// --- Static Data ---

const TOOLS: Readonly<Record<QuantumTool['id'], QuantumTool>> = {
  superposition: {
    id: 'superposition',
    name: 'Superposition Tuner',
    description: 'Forces a Qubit into a superposition of multiple states. Increases instability slightly but allows reaching target states that are probabilistic. Tap again to adjust probabilities (risk of collapse!).',
    energyCost: 15,
    icon: '🌀', // or a more complex SVG icon
    effectDurationTicks: 15, // Visual flicker duration
  },
  entangle: {
    id: 'entangle',
    name: 'Entanglement Linker',
    description: 'Select two Qubits to entangle them. Their fates become linked; measuring one instantly determines the state of the other, regardless of distance. Costs energy to maintain.',
    energyCost: 25, // Initial cost
    icon: '🔗',
  },
  tunnel: {
    id: 'tunnel',
    name: 'Tunneling Probe',
    description: 'Allows a Qubit to quantum tunnel through an energy barrier (if implemented visually) or shift its energy level drastically. Consumes significant energy.',
    energyCost: 30,
    icon: '🚀',
    effectDurationTicks: 10, // Visual tunnel effect duration
  },
  measure: {
    id: 'measure',
    name: 'Measurement Stabilizer',
    description: 'Observe / Measure a Qubit. Collapses its superposition into a single definite state based on probabilities. Necessary for stability, but the outcome isn\'t guaranteed!',
    energyCost: 10,
    icon: '👁️',
  },
};

const NODE_CONFIGS: QuantumNodeConfig[] = [
  // Level 1: Introduction to Superposition & Measurement
  {
    id: 1, level: 1, name: "Genesis Flux", description: "A nascent node. Stabilize the core Qubit by observing its state.",
    qubitCount: 1, stabilityDecayRate: 0.5, timeLimitSeconds: 45, rewardPoints: 100, unlocksLevel: 2,
    availableTools: ['superposition', 'measure'],
    initialQubitStates: [
        { id: 'q1', orbitRadius: 50, orbitSpeed: 1, color: '#cccccc', energyLevel: 1, isInSuperposition: true, superpositionStates: [{stateId: 's1', probability: 0.5, color: '#3498db'}, {stateId: 's2', probability: 0.5, color: '#e74c3c'}]}
    ],
    targetQubitStates: [ // Target: Collapse q1 to *either* blue or red (simple win)
        { id: 'q1', isCollapsed: true }
    ],
  },
  // Level 2: Introduction to Entanglement
  {
    id: 2, level: 2, name: "Binary Bonds", description: "Two Qubits show correlated behavior. Entangle them and measure one to stabilize both.",
    qubitCount: 2, stabilityDecayRate: 0.8, timeLimitSeconds: 60, rewardPoints: 150, unlocksLevel: 3,
    availableTools: ['superposition', 'measure', 'entangle'],
    initialQubitStates: [
        { id: 'qA', orbitRadius: 60, orbitSpeed: 1.2, color: '#cccccc', energyLevel: 1, isInSuperposition: true, superpositionStates: [{stateId: 'sA1', probability: 0.5, color: '#2ecc71'}, {stateId: 'sA2', probability: 0.5, color: '#f1c40f'}]},
        { id: 'qB', orbitRadius: 90, orbitSpeed: 0.8, color: '#cccccc', energyLevel: 1, isInSuperposition: true, superpositionStates: [{stateId: 'sB1', probability: 0.5, color: '#2ecc71'}, {stateId: 'sB2', probability: 0.5, color: '#f1c40f'}]} // Mirrored possibilities for entanglement
    ],
    targetQubitStates: [ // Target: Entangle A & B, then collapse both
        { id: 'qA', isEntangledWith: 'qB', isCollapsed: true },
        { id: 'qB', isEntangledWith: 'qA', isCollapsed: true }
    ],
  },
   // Level 3: Combining Superposition and Entanglement
  {
    id: 3, level: 3, name: "Entangled Probabilities", description: "Entangle two qubits while one is in superposition. Measuring the stable one forces the other's state.",
    qubitCount: 2, stabilityDecayRate: 1.0, timeLimitSeconds: 75, rewardPoints: 200, unlocksLevel: 4,
    availableTools: ['superposition', 'measure', 'entangle'],
    initialQubitStates: [
        { id: 'qX', orbitRadius: 50, orbitSpeed: 1, color: '#9b59b6', energyLevel: 1, isCollapsed: true }, // Start one collapsed
        { id: 'qY', orbitRadius: 100, orbitSpeed: 1.5, color: '#cccccc', energyLevel: 1, isInSuperposition: true, superpositionStates: [{ stateId: 'sY1', probability: 0.7, color: '#e67e22' }, { stateId: 'sY2', probability: 0.3, color: '#3498db' }] }
    ],
    targetQubitStates: [ // Target: Entangle X & Y, then collapse Y (it should ideally take orange state)
        { id: 'qX', isEntangledWith: 'qY'},
        { id: 'qY', isEntangledWith: 'qX', isCollapsed: true, color: '#e67e22' } // Target a specific outcome post-measurement
    ],
  },
    // Level 4: Introduction to Tunneling (Simplified Energy Levels)
  {
    id: 4, level: 4, name: "Potential Barrier Breach", description: "A qubit needs to reach a higher energy state to stabilize. Use the Tunneling Probe.",
    qubitCount: 1, stabilityDecayRate: 1.2, timeLimitSeconds: 60, rewardPoints: 250, unlocksLevel: 5,
    availableTools: ['superposition', 'measure', 'tunnel'],
    initialQubitStates: [
        { id: 'qTunnel', orbitRadius: 70, orbitSpeed: 1, color: '#bdc3c7', energyLevel: 1 } // Start at low energy
    ],
    targetQubitStates: [ // Target: Increase energy level significantly and collapse
        { id: 'qTunnel', energyLevel: 5, isCollapsed: true, color: '#1abc9c' } // Target high energy state (teal color)
    ],
  },
  // Level 5: Putting it all together
  {
    id: 5, level: 5, name: "Quantum Harmony", description: "Stabilize a complex system using all available tools. Entangle pairs, manage superposition, and tunnel when necessary.",
    qubitCount: 4, stabilityDecayRate: 1.5, timeLimitSeconds: 120, rewardPoints: 400, unlocksLevel: 6, // Or more levels
    availableTools: ['superposition', 'measure', 'entangle', 'tunnel'],
    initialQubitStates: [
        // Define complex initial state for 4 qubits, some entangled, some in superposition etc.
         { id: 'qAlpha', orbitRadius: 50, orbitSpeed: 1, color: '#cccccc', energyLevel: 1, isInSuperposition: true, superpositionStates: [{stateId: 'sA1', probability: 0.5, color: '#2ecc71'}, {stateId: 'sA2', probability: 0.5, color: '#f1c40f'}]},
         { id: 'qBeta', orbitRadius: 80, orbitSpeed: 0.8, color: '#cccccc', energyLevel: 1, isInSuperposition: true, superpositionStates: [{stateId: 'sB1', probability: 0.5, color: '#2ecc71'}, {stateId: 'sB2', probability: 0.5, color: '#f1c40f'}]}, // Pair for entanglement
         { id: 'qGamma', orbitRadius: 110, orbitSpeed: 1.2, color: '#bdc3c7', energyLevel: 1 }, // Needs tunneling?
         { id: 'qDelta', orbitRadius: 140, orbitSpeed: 1.5, color: '#9b59b6', energyLevel: 3, isCollapsed: true}, // Already stable?
    ],
    targetQubitStates: [
        // Define complex target state requiring multiple steps
        { id: 'qAlpha', isEntangledWith: 'qBeta', isCollapsed: true, color: '#2ecc71' }, // Entangled, measured outcome
        { id: 'qBeta', isEntangledWith: 'qAlpha', isCollapsed: true, color: '#2ecc71' }, // Entangled, measured outcome
        { id: 'qGamma', energyLevel: 4, isCollapsed: true, color: '#e67e22' }, // Tunneled and measured
        { id: 'qDelta', energyLevel: 3, isCollapsed: true, color: '#9b59b6' } // Remains stable
    ],
  },
  // Add more challenging levels...
];

const ACHIEVEMENTS_LIST: Achievement[] = [
  { id: 'first_collapse', name: 'Wave Function Collapser', description: 'Successfully measure your first Qubit.', unlocked: false, condition: (gs, stats) => stats.timesMeasured >= 1 },
  { id: 'spooky_action', name: 'Spooky Action User', description: 'Successfully entangle a pair of Qubits.', unlocked: false, condition: (gs, stats) => stats.pairsEntangled >= 1 },
  { id: 'reality_warper', name: 'Reality Warper', description: 'Successfully tunnel a Qubit.', unlocked: false, condition: (gs, stats) => stats.successfulTunnels >= 1 },
  { id: 'stable_foundation', name: 'Stable Foundation', description: 'Complete Level 3.', unlocked: false, condition: (gs, stats) => stats.levelsCompleted >= 3 },
  { id: 'node_master', name: 'Node Master', description: 'Achieve 90% stability on any node.', unlocked: false, condition: (gs, stats) => gs.nodeStability >= 90 },
  { id: 'energy_efficient', name: 'Energy Efficient', description: 'Complete a level using less than 50 energy.', unlocked: false, condition: (gs, stats) => false /* Needs state tracking per level */ },
  { id: 'grand_architect', name: 'Grand Architect', description: 'Complete all available nodes.', unlocked: false, condition: (gs, stats) => stats.levelsCompleted >= NODE_CONFIGS.length },
];

// --- Utility Functions ---

// Simple deep copy for state updates
const deepCopy = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

// Generate a unique ID (simple version)
const generateId = (): string => Math.random().toString(36).substring(2, 9);

// --- Quantum Weaver Component ---

const QuantumWeaver = () => {
  // --- State ---
  const [gameState, setGameState] = useState<GameState>({
    gameStatus: 'menu',
    weaverName: '',
    currentLevel: 1,
    currentNode: null,
    qubitStates: [],
    nodeStability: 100,
    timeRemaining: 0,
    playerEnergy: INITIAL_ENERGY,
    selectedTool: null,
    selectedQubitIds: [],
    feedbackMessage: null,
    activeToolEffect: null,
  });

  const [gameStats, setGameStats] = useState<GameStats>({
    totalScore: 0,
    levelsCompleted: 0,
    timesMeasured: 0,
    pairsEntangled: 0,
    successfulTunnels: 0,
  });

  const [achievements, setAchievements] = useState<Achievement[]>(deepCopy(ACHIEVEMENTS_LIST));

  // Memoized values for performance
  const currentTool = useMemo(() => gameState.selectedTool ? TOOLS[gameState.selectedTool] : null, [gameState.selectedTool]);
  const toolRequiresTwoTargets = useMemo(() => gameState.selectedTool === 'entangle', [gameState.selectedTool]);

  // --- Game Loop Effect (Decay, Timers, Orbit Updates) ---
  useEffect(() => {
    if (gameState.gameStatus !== 'playing') return;

    const intervalId = setInterval(() => {
      setGameState(prev => {
        if (!prev.currentNode) return prev;

        const stabilityLoss = (prev.currentNode.stabilityDecayRate * (TICK_RATE_MS / 1000));
        const newStability = Math.max(0, prev.nodeStability - stabilityLoss);
        const newTimeRemaining = Math.max(0, prev.timeRemaining - (TICK_RATE_MS / 1000));

        // Update Qubit orbits
        const updatedQubits = prev.qubitStates.map(q => ({
            ...q,
            orbitAngle: (q.orbitAngle + q.orbitSpeed * (TICK_RATE_MS / 100)) % 360,
            // Handle decay of superposition? Reduce energy level slightly?
            // energyLevel: Math.max(1, q.energyLevel - 0.01),
        }));

         // Update active tool effect timer
        let nextActiveEffect = prev.activeToolEffect;
        if (nextActiveEffect) {
            const ticksLeft = nextActiveEffect.ticksRemaining - 1;
            if (ticksLeft <= 0) {
                nextActiveEffect = null; // Effect ends
            } else {
                nextActiveEffect = { ...nextActiveEffect, ticksRemaining: ticksLeft };
            }
        }


        // Check for game over conditions
        if (newStability <= 0 || newTimeRemaining <= 0) {
            return {
                ...prev,
                gameStatus: 'game_over',
                nodeStability: 0,
                timeRemaining: 0,
                feedbackMessage: { text: "Node collapsed! Reality unravels...", type: 'error' },
                qubitStates: updatedQubits, // Show final state
                activeToolEffect: nextActiveEffect,
            };
        }

        return {
          ...prev,
          nodeStability: newStability,
          timeRemaining: newTimeRemaining,
          qubitStates: updatedQubits,
           activeToolEffect: nextActiveEffect,
        };
      });
    }, TICK_RATE_MS);

    return () => clearInterval(intervalId); // Cleanup interval
  }, [gameState.gameStatus, gameState.currentNode]); // Rerun if status or node changes


  // --- Core Logic Functions ---

  const showFeedback = useCallback((text: string, type: GameState['feedbackMessage']['type'] = 'info', durationMs = 3000) => {
      setGameState(prev => ({ ...prev, feedbackMessage: { text, type } }));
      setTimeout(() => {
          setGameState(prev => ({ ...prev, feedbackMessage: null }));
      }, durationMs);
  }, []);

  const checkAchievements = useCallback(() => {
      setAchievements(prevAchievements => {
          let changed = false;
          const updated = prevAchievements.map(ach => {
              if (!ach.unlocked && ach.condition(gameState, gameStats)) {
                  if (!prevAchievements.find(pa => pa.id === ach.id)?.unlocked) {
                      showFeedback(`Achievement Unlocked: ${ach.name}!`, 'success', 4000);
                      changed = true; // Mark change only if newly unlocked
                  }
                  return { ...ach, unlocked: true };
              }
              return ach;
          });
          return changed ? updated : prevAchievements;
      });
  }, [gameState, gameStats, showFeedback]); // Dependencies needed

  const loadNode = useCallback((level: number) => {
    const nodeConfig = NODE_CONFIGS.find(n => n.level === level);
    if (!nodeConfig) {
      console.error(`Node config for level ${level} not found!`);
      // Handle game completion or error state
      setGameState(prev => ({ ...prev, gameStatus: 'menu', feedbackMessage: { text: "All nodes stabilized! You are the Grand Architect!", type: 'success' } }));
      return;
    }

    // Initialize Qubit states based on config
    const initialQubits: QubitState[] = [];
    for (let i = 0; i < nodeConfig.qubitCount; i++) {
      const configState = nodeConfig.initialQubitStates[i] || {};
      initialQubits.push({
        // Provide defaults for all properties
        id: configState.id || `q${i + 1}-${generateId()}`,
        orbitRadius: configState.orbitRadius ?? 50 + i * 30,
        orbitAngle: configState.orbitAngle ?? Math.random() * 360,
        orbitSpeed: configState.orbitSpeed ?? 0.5 + Math.random() * 1,
        color: configState.color ?? '#ffffff',
        isInSuperposition: configState.isInSuperposition ?? false,
        superpositionStates: configState.superpositionStates ?? [],
        isEntangledWith: configState.isEntangledWith ?? null,
        energyLevel: configState.energyLevel ?? 1,
        isCollapsed: configState.isCollapsed ?? false,
        isGlowing: false,
        tunnelingEffect: 0,
      });
    }

    setGameState(prev => ({
      ...prev,
      gameStatus: 'playing',
      currentNode: nodeConfig,
      qubitStates: initialQubits,
      nodeStability: 100,
      timeRemaining: nodeConfig.timeLimitSeconds,
      playerEnergy: INITIAL_ENERGY, // Reset energy per level? Or carry over? Let's reset.
      selectedTool: null,
      selectedQubitIds: [],
      feedbackMessage: { text: `Loading Node: ${nodeConfig.name}`, type: 'info' },
      activeToolEffect: null,
    }));
    showFeedback(`Stabilize Node ${level}: ${nodeConfig.name}`, 'info');
  }, [showFeedback]); // Include showFeedback dependency

  const startGame = useCallback(() => {
    if (!gameState.weaverName.trim()) {
      showFeedback("Enter a name for the Quantum Weaver!", "warning");
      return;
    }
    setGameState(prev => ({
        ...prev,
        gameStatus: 'playing', // Start playing directly
        currentLevel: 1,
    }));
     // Reset stats for a new game
     setGameStats({
         totalScore: 0, levelsCompleted: 0, timesMeasured: 0, pairsEntangled: 0, successfulTunnels: 0
     });
     setAchievements(deepCopy(ACHIEVEMENTS_LIST)); // Reset achievements
    loadNode(1); // Load the first level
  }, [gameState.weaverName, loadNode, showFeedback]);

    const returnToMenu = () => {
        setGameState(prev => ({
            ...prev,
            gameStatus: 'menu',
            currentNode: null,
            qubitStates: [],
        }));
    };

  const selectTool = (toolId: QuantumTool['id']) => {
    setGameState(prev => ({
      ...prev,
      selectedTool: toolId,
      selectedQubitIds: [], // Clear selected qubits when changing tools
    }));
    showFeedback(`${TOOLS[toolId].name} selected. Cost: ${TOOLS[toolId].energyCost} Energy.`, 'info', 2000);
  };

  const selectQubit = (qubitId: string) => {
    if (!gameState.selectedTool) {
      showFeedback("Select a tool first!", "warning");
      return;
    }

    setGameState(prev => {
        let newSelection = [...prev.selectedQubitIds];
        const toolRequiresTwo = toolRequiresTwoTargets; // Use memoized value

        if (newSelection.includes(qubitId)) {
            // Deselect
            newSelection = newSelection.filter(id => id !== qubitId);
        } else {
            // Select
            if (toolRequiresTwo) {
                if (newSelection.length < 2) {
                    newSelection.push(qubitId);
                } else {
                    // Replace the first selection if already have 2
                    newSelection = [newSelection[1], qubitId];
                    showFeedback("Replaced first target for entanglement.", "info", 1500);
                }
            } else {
                // Single target tools: replace selection
                newSelection = [qubitId];
            }
        }

        // Add glow effect to selected qubits
        const updatedQubits = prev.qubitStates.map(q => ({
            ...q,
            isGlowing: newSelection.includes(q.id)
        }));

        return { ...prev, selectedQubitIds: newSelection, qubitStates: updatedQubits };
    });
  };

  const applyTool = useCallback(() => {
      if (!currentTool || !gameState.currentNode) return;

      const requiredTargets = toolRequiresTwoTargets ? 2 : 1;
      if (gameState.selectedQubitIds.length !== requiredTargets) {
          showFeedback(`Select exactly ${requiredTargets} Qubit(s) for ${currentTool.name}.`, "warning");
          return;
      }

      if (gameState.playerEnergy < currentTool.energyCost) {
          showFeedback("Not enough energy!", "error");
          return;
      }

      let nextQubitStates = deepCopy(gameState.qubitStates);
      let energySpent = currentTool.energyCost;
      let feedback = "";
      let feedbackType: GameState['feedbackMessage']['type'] = 'info';
      let statUpdate: Partial<GameStats> = {};
      let toolEffectTargetId : string | null = null;


      // --- Tool Logic ---
      switch (currentTool.id) {
          case 'superposition': {
              const targetId = gameState.selectedQubitIds[0];
              const targetIndex = nextQubitStates.findIndex(q => q.id === targetId);
              if (targetIndex === -1) break;

              const qubit = nextQubitStates[targetIndex];
              if (qubit.isCollapsed) {
                  feedback = "Cannot put a collapsed Qubit into superposition.";
                  feedbackType = "warning";
                  energySpent = 0; // No cost if action fails
                  break;
              }

              // Toggle superposition or adjust probabilities (simplified toggle for now)
              qubit.isInSuperposition = !qubit.isInSuperposition;
              if (qubit.isInSuperposition && qubit.superpositionStates.length === 0) {
                 // If entering superposition newly, create some default states
                 qubit.superpositionStates = [
                     { stateId: 's1', probability: 0.5, color: '#3498db' }, // Blue
                     { stateId: 's2', probability: 0.5, color: '#e74c3c' }  // Red
                 ];
              }
              // Add slight instability? Maybe increase decay rate temporarily?

              feedback = `Toggled superposition for Qubit ${targetId}.`;
              toolEffectTargetId = targetId;
              break;
          }
          case 'entangle': {
              const [id1, id2] = gameState.selectedQubitIds;
              const index1 = nextQubitStates.findIndex(q => q.id === id1);
              const index2 = nextQubitStates.findIndex(q => q.id === id2);
              if (index1 === -1 || index2 === -1) break;

                // Check if already entangled (to something else or each other)
                 if (nextQubitStates[index1].isEntangledWith || nextQubitStates[index2].isEntangledWith) {
                    feedback = "One or both Qubits are already entangled. Disentangle first (future feature!).";
                    feedbackType = "warning";
                    energySpent = 0;
                    break;
                 }

              nextQubitStates[index1].isEntangledWith = id2;
              nextQubitStates[index2].isEntangledWith = id1;
              // Entanglement might slightly increase stability or have other effects?

              feedback = `Entangled Qubit ${id1} and Qubit ${id2}. Spooky!`;
              statUpdate = { pairsEntangled: (gameStats.pairsEntangled || 0) + 1 };
              break;
          }
          case 'tunnel': {
                const targetId = gameState.selectedQubitIds[0];
                const targetIndex = nextQubitStates.findIndex(q => q.id === targetId);
                if (targetIndex === -1) break;

                // Simple effect: significantly increase energy level
                const currentEnergy = nextQubitStates[targetIndex].energyLevel;
                nextQubitStates[targetIndex].energyLevel = Math.min(10, currentEnergy + 4); // Cap energy level
                nextQubitStates[targetIndex].color = '#1abc9c'; // Change color to indicate high energy (example)
                nextQubitStates[targetIndex].tunnelingEffect = 1; // Trigger visual effect

                feedback = `Qubit ${targetId} tunneled to energy level ${nextQubitStates[targetIndex].energyLevel}!`;
                statUpdate = { successfulTunnels: (gameStats.successfulTunnels || 0) + 1 };
                toolEffectTargetId = targetId;
              break;
          }
          case 'measure': {
                const targetId = gameState.selectedQubitIds[0];
                const targetIndex = nextQubitStates.findIndex(q => q.id === targetId);
                if (targetIndex === -1) break;

                const qubit = nextQubitStates[targetIndex];
                if (qubit.isCollapsed) {
                    feedback = `Qubit ${targetId} is already collapsed.`;
                    feedbackType = "warning";
                    energySpent = 0;
                    break;
                }

                let collapsedStateColor = qubit.color; // Default if not in superposition

                // Collapse superposition based on probability
                if (qubit.isInSuperposition && qubit.superpositionStates.length > 0) {
                    const rand = Math.random();
                    let cumulativeProb = 0;
                    let chosenState = qubit.superpositionStates[qubit.superpositionStates.length - 1]; // Default to last

                    for (const state of qubit.superpositionStates) {
                        cumulativeProb += state.probability;
                        if (rand <= cumulativeProb) {
                            chosenState = state;
                            break;
                        }
                    }
                    collapsedStateColor = chosenState.color;
                }

                // Apply collapse to the measured qubit
                qubit.isCollapsed = true;
                qubit.isInSuperposition = false;
                qubit.superpositionStates = [];
                qubit.color = collapsedStateColor; // Set color to the collapsed state
                qubit.isGlowing = false; // Stop glow on collapse

                 // Handle Entanglement Collapse
                 if (qubit.isEntangledWith) {
                    const entangledId = qubit.isEntangledWith;
                    const entangledIndex = nextQubitStates.findIndex(q => q.id === entangledId);
                    if (entangledIndex !== -1) {
                        const entangledQubit = nextQubitStates[entangledIndex];
                         if (!entangledQubit.isCollapsed) { // Only collapse if not already collapsed
                            // Basic entanglement: assume opposite state (needs better state definition)
                            // For now, just collapse it with a contrasting color or its 'mirrored' superposition outcome
                            entangledQubit.isCollapsed = true;
                            entangledQubit.isInSuperposition = false;
                            entangledQubit.superpositionStates = [];
                            // Simple color flip or rule needed here based on how states are defined
                             entangledQubit.color = collapsedStateColor === '#2ecc71' ? '#f1c40f' : '#2ecc71'; // Example opposite
                            entangledQubit.isGlowing = false;

                            feedback = `Measured Qubit ${targetId} collapsing to ${collapsedStateColor}. Entangled Qubit ${entangledId} collapsed simultaneously!`;
                         }
                    }
                 } else {
                    feedback = `Measured Qubit ${targetId}. Collapsed to state with color ${collapsedStateColor}.`;
                 }


                statUpdate = { timesMeasured: (gameStats.timesMeasured || 0) + 1 };
              break;
          }
          default:
              console.error("Unknown tool selected:", currentTool.id);
              energySpent = 0;
      }

      // Apply state changes
      setGameState(prev => ({
          ...prev,
          playerEnergy: prev.playerEnergy - energySpent,
          qubitStates: nextQubitStates,
          selectedQubitIds: [], // Clear selection after applying tool
          activeToolEffect: toolEffectTargetId && currentTool.effectDurationTicks
             ? { toolId: currentTool.id, targetQubitId: toolEffectTargetId, ticksRemaining: currentTool.effectDurationTicks }
             : prev.activeToolEffect // Keep existing effect if new one not triggered
      }));

      // Update stats
       if (Object.keys(statUpdate).length > 0) {
            setGameStats(prev => ({ ...prev, ...statUpdate }));
       }

      showFeedback(feedback, feedbackType);
      checkWinCondition(nextQubitStates); // Check if the action resulted in a win
      checkAchievements();

  }, [currentTool, gameState, gameStats, toolRequiresTwoTargets, showFeedback, checkWinCondition, checkAchievements]); // Dependencies


   const checkWinCondition = useCallback((currentQubits: QubitState[]) => {
        if (!gameState.currentNode) return false;

        const targets = gameState.currentNode.targetQubitStates;

        let allTargetsMet = true;
        for (const target of targets) {
            const currentQubit = currentQubits.find(q => q.id === target.id);
            if (!currentQubit) {
                allTargetsMet = false;
                console.error(`Target defined for non-existent qubit ID: ${target.id}`);
                break;
            }

            // Check each specified property in the target
            let targetMet = true;
            if (target.isCollapsed !== undefined && currentQubit.isCollapsed !== target.isCollapsed) targetMet = false;
            if (target.color !== undefined && currentQubit.color !== target.color) targetMet = false;
            if (target.energyLevel !== undefined && currentQubit.energyLevel !== target.energyLevel) targetMet = false;
            // Slightly tolerant check for entanglement (check both ways)
             if (target.isEntangledWith !== undefined &&
                 !(currentQubit.isEntangledWith === target.isEntangledWith ||
                   currentQubits.find(q => q.id === target.isEntangledWith)?.isEntangledWith === currentQubit.id)) {
                 targetMet = false;
             }
            // Add more property checks as needed (superposition state, etc.)

            if (!targetMet) {
                allTargetsMet = false;
                break;
            }
        }

        if (allTargetsMet) {
            // Level Complete!
             const scoreBonus = Math.round(gameState.nodeStability + gameState.timeRemaining + gameState.playerEnergy);
             const totalLevelScore = gameState.currentNode.rewardPoints + scoreBonus;

            setGameState(prev => ({
                ...prev,
                gameStatus: 'level_complete',
                feedbackMessage: { text: `Node ${prev.currentLevel} Stabilized! +${totalLevelScore} Points!`, type: 'success' },
            }));
            setGameStats(prev => ({
                ...prev,
                totalScore: prev.totalScore + totalLevelScore,
                levelsCompleted: prev.levelsCompleted + 1,
            }));
             checkAchievements(); // Check achievements after level complete stats are updated
            return true;
        }
        return false;
   }, [gameState.currentNode, gameState.nodeStability, gameState.timeRemaining, gameState.playerEnergy, checkAchievements]); // Dependencies

   const goToNextLevel = () => {
        const nextLevelNum = gameState.currentLevel + 1;
        setGameState(prev => ({ ...prev, currentLevel: nextLevelNum }));
        loadNode(nextLevelNum); // loadNode handles setting status back to 'playing'
   }

  // --- Render Functions ---

  const renderQubit = (qubit: QubitState) => {
    const angleRad = (qubit.orbitAngle * Math.PI) / 180;
    const x = Math.cos(angleRad) * qubit.orbitRadius;
    const y = Math.sin(angleRad) * qubit.orbitRadius;
    const isSelected = gameState.selectedQubitIds.includes(qubit.id);
     const isActiveEffectTarget = gameState.activeToolEffect?.targetQubitId === qubit.id;

    // Base style
    const style: React.CSSProperties = {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: qubit.isCollapsed ? qubit.color : '#cccccc', // Grey if not collapsed
        border: `2px solid ${isSelected ? '#f1c40f' : qubit.isEntangledWith ? '#9b59b6' : 'rgba(255,255,255,0.3)'}`, // Yellow border if selected, purple if entangled
        transition: 'transform 0.1s linear, background-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: qubit.isGlowing || isSelected ? `0 0 15px 5px ${qubit.color}` : '0 1px 3px rgba(0,0,0,0.5)',
        opacity: 1,
        zIndex: isSelected ? 10 : 5,
    };

     // Superposition visual: flicker effect using animation
     let superpositionElement = null;
     if (qubit.isInSuperposition && qubit.superpositionStates.length > 0) {
         style.animation = `superposition-flicker-${qubit.id} 0.5s infinite alternate`;
         // Dynamic keyframes needed for specific colors
         const keyframes = `
             @keyframes superposition-flicker-${qubit.id} {
                 0% { background-color: ${qubit.superpositionStates[0]?.color ?? '#ffffff'}; }
                 100% { background-color: ${qubit.superpositionStates[1]?.color ?? '#aaaaaa'}; }
             }
         `;
          superpositionElement = <style>{keyframes}</style>;
     }

     // Entanglement visual: line connecting entangled pairs (simplified)
     // A proper implementation would use SVG lines based on positions
     let entanglementLine = null;
     if (qubit.isEntangledWith) {
        // Placeholder: Indicate entanglement via border or aura
        style.borderWidth = '3px';
        style.borderColor = '#8e44ad'; // Stronger purple
     }

      // Tunneling visual: Use opacity/glow based on tunnelingEffect state
      if (qubit.tunnelingEffect > 0) {
         style.opacity = 1 - qubit.tunnelingEffect * 0.5; // Fade out slightly
         style.boxShadow = `0 0 ${10 + qubit.tunnelingEffect * 15}px 5px #1abc9c`; // Teal glow
         // Reset tunneling effect in state update if needed
      }

       // Apply active tool effect visuals (e.g., pulsing for superposition tuning)
     if (isActiveEffectTarget && gameState.activeToolEffect?.toolId === 'superposition') {
         style.animation = `pulse-${qubit.id} 0.8s infinite ease-in-out`;
         const pulseKeyframes = `
             @keyframes pulse-${qubit.id} {
                 0%, 100% { transform: translate(-50%, -50%) translate(${x}px, ${y}px) scale(1); }
                 50% { transform: translate(-50%, -50%) translate(${x}px, ${y}px) scale(1.2); }
             }
         `;
          superpositionElement = <style>{pulseKeyframes}</style>; // Override flicker
     }


    return (
        <React.Fragment key={qubit.id}>
            {superpositionElement}
            <div
                className="qubit"
                style={style}
                onClick={() => selectQubit(qubit.id)}
                title={`Qubit ${qubit.id} | E: ${qubit.energyLevel} | ${qubit.isCollapsed ? `Collapsed (${qubit.color})` : qubit.isInSuperposition ? 'Superposition' : 'Stable'} ${qubit.isEntangledWith ? `| Entangled: ${qubit.isEntangledWith}` : ''}`}
            >
                {/* Can add inner elements for spin or state symbols */}
            </div>
         </React.Fragment>
    );
  };

  // --- Main Render ---
  return (
    <div className="qw-container">
      {/* Dynamic Styles */}
      <style>{`
        /* Basic CSS Styling & Utility Hints */
        .qw-container {
          font-family: sans-serif;
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0c29, #302b63, #24243e); /* Deep space gradient */
          color: #e0e0e0;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem; /* p-4 */
          overflow: hidden; /* Needed for absolute positioning inside */
        }

        /* Header */
        .qw-header {
          width: 100%; /* w-full */
          max-width: 1200px; /* max-w-7xl */
          display: flex; /* flex */
          justify-content: space-between; /* justify-between */
          align-items: center; /* items-center */
          padding: 0.75rem 1.5rem; /* px-6 py-3 */
          background: rgba(0, 0, 0, 0.3); /* bg-black/30 */
          backdrop-filter: blur(5px); /* backdrop-blur-sm */
          border-radius: 0.5rem; /* rounded-lg */
          margin-bottom: 1rem; /* mb-4 */
          border: 1px solid rgba(255, 255, 255, 0.1); /* border border-white/10 */
        }
        .qw-header-title { font-size: 1.8rem; font-weight: bold; color: #00ffff; text-shadow: 0 0 8px #00ffff; } /* text-3xl font-bold text-cyan-300 shadow-cyan */
        .qw-hud { display: flex; gap: 1.5rem; font-size: 0.9rem; } /* flex gap-6 text-sm */
        .qw-hud-item { display: flex; align-items: center; gap: 0.3rem; } /* flex items-center gap-1 */
        .qw-hud-item strong { color: #f0f0f0; font-weight: bold; } /* text-gray-50 font-bold */
        .qw-hud-bar { width: 100px; height: 10px; background: rgba(255, 255, 255, 0.1); border-radius: 5px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.2); }
        .qw-hud-bar-fill { height: 100%; transition: width 0.3s ease; border-radius: 5px; }

        /* Main Content Area */
        .qw-main {
          flex-grow: 1; /* flex-grow */
          width: 100%; /* w-full */
          display: flex; /* flex */
          justify-content: center; /* justify-center */
          align-items: center; /* items-center */
          position: relative; /* Allows absolute positioning of node */
        }

        /* Menu/Game Over Screens */
        .qw-screen {
          background: rgba(0, 0, 0, 0.5);
          padding: 2rem 3rem; /* p-8 md:p-12 */
          border-radius: 1rem; /* rounded-2xl */
          text-align: center; /* text-center */
          border: 1px solid rgba(255, 255, 255, 0.1);
          max-width: 600px; /* max-w-xl */
        }
        .qw-screen h1 { font-size: 2.5rem; color: #00ffff; margin-bottom: 1rem; } /* text-4xl text-cyan-300 mb-4 */
        .qw-screen p { color: #bdbdbd; margin-bottom: 1.5rem; line-height: 1.6; } /* text-gray-300 mb-6 leading-relaxed */
        .qw-input {
          background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 0.75rem 1rem; /* px-4 py-3 */ border-radius: 0.375rem; /* rounded-md */
          color: #e0e0e0; margin-bottom: 1rem; /* mb-4 */ width: 80%; /* w-4/5 */
        }
        .qw-button {
          background: linear-gradient(to right, #00c6ff, #0072ff); /* bg-gradient-to-r from-cyan-400 to-blue-500 */
          color: white; /* text-white */ padding: 0.75rem 1.5rem; /* px-6 py-3 */
          border: none; border-radius: 0.375rem; /* rounded-md */ font-weight: bold; /* font-bold */
          cursor: pointer; /* cursor-pointer */ transition: all 0.2s ease; /* transition */
          box-shadow: 0 4px 6px rgba(0, 114, 255, 0.3); /* shadow-md shadow-blue-500/30 */
          margin: 0.5rem; /* m-2 */
        }
        .qw-button:hover { transform: translateY(-2px); box-shadow: 0 6px 12px rgba(0, 114, 255, 0.4); } /* hover:translate-y-[-2px] hover:shadow-lg */
        .qw-button-secondary { background: rgba(255, 255, 255, 0.1); box-shadow: none; }
         .qw-button-secondary:hover { background: rgba(255, 255, 255, 0.2); transform: none; box-shadow: none;}


        /* Game Playing Area */
        .qw-node-container {
            width: 80vmin; /* Use viewport units for scaling */
            height: 80vmin;
            max-width: 600px;
            max-height: 600px;
            position: relative; /* For absolute positioning of qubits */
            border: 1px solid rgba(0, 255, 255, 0.2); /* Subtle border */
            border-radius: 50%; /* Circular area */
            background: radial-gradient(circle, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.5) 70%);
            box-shadow: inset 0 0 40px rgba(0, 255, 255, 0.1), 0 0 20px rgba(0, 0, 0, 0.5);
        }
        .qw-node-core {
            position: absolute;
            left: 50%; top: 50%;
            transform: translate(-50%, -50%);
            width: 40px; height: 40px;
            background: radial-gradient(circle, #ffffff 0%, #00ffff 50%, #0072ff 100%);
            border-radius: 50%;
            box-shadow: 0 0 25px 10px rgba(0, 255, 255, 0.5);
            animation: pulse-core 3s infinite ease-in-out;
        }
        @keyframes pulse-core {
            0%, 100% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 25px 10px rgba(0, 255, 255, 0.5); }
            50% { transform: translate(-50%, -50%) scale(1.1); box-shadow: 0 0 35px 15px rgba(0, 255, 255, 0.7); }
        }
        /* Qubit styling is done via inline styles in renderQubit */

        /* Tools Panel */
        .qw-tools-panel {
          position: absolute; /* Position relative to container */
          bottom: 2rem; /* bottom-8 */
          left: 50%;
          transform: translateX(-50%);
          display: flex; /* flex */
          gap: 0.75rem; /* gap-3 */
          background: rgba(0, 0, 0, 0.4); /* bg-black/40 */
          padding: 0.75rem; /* p-3 */
          border-radius: 0.75rem; /* rounded-xl */
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .qw-tool-button {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #bdbdbd; /* text-gray-300 */
          width: 60px; height: 60px; /* w-16 h-16 */
          border-radius: 50%; /* rounded-full */
          display: flex; /* flex */
          flex-direction: column; /* flex-col */
          align-items: center; /* items-center */
          justify-content: center; /* justify-center */
          cursor: pointer; /* cursor-pointer */
          transition: all 0.2s ease;
          font-size: 1.5rem; /* text-2xl for icon */
        }
        .qw-tool-button:hover { background: rgba(255, 255, 255, 0.1); border-color: #00ffff; color: #00ffff; } /* hover: effects */
        .qw-tool-button.selected {
          background: rgba(0, 255, 255, 0.2); border-color: #00ffff; color: #00ffff;
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
        }
        .qw-tool-button .qw-tool-cost { font-size: 0.6rem; margin-top: 2px; color: #bdbdbd; } /* text-xs mt-0.5 text-gray-300 */
        .qw-tool-button.selected .qw-tool-cost { color: #00ffff; }


        /* Feedback Message Area */
        .qw-feedback {
          position: absolute;
          top: 1rem; /* top-4 */
          left: 50%;
          transform: translateX(-50%);
          padding: 0.5rem 1rem; /* px-4 py-2 */
          border-radius: 0.375rem; /* rounded-md */
          font-size: 0.9rem; /* text-sm */
          font-weight: bold; /* font-bold */
          z-index: 20; /* z-20 */
          opacity: 0; /* Start hidden */
          transition: opacity 0.3s ease;
          pointer-events: none; /* Don't block clicks */
        }
         .qw-feedback.visible { opacity: 1; }
         .qw-feedback.type-info { background-color: rgba(52, 152, 219, 0.8); color: white; } /* bg-blue-500/80 */
         .qw-feedback.type-success { background-color: rgba(46, 204, 113, 0.8); color: white; } /* bg-green-500/80 */
         .qw-feedback.type-warning { background-color: rgba(241, 196, 15, 0.8); color: #333; } /* bg-yellow-400/80 text-gray-800 */
         .qw-feedback.type-error { background-color: rgba(231, 76, 60, 0.8); color: white; } /* bg-red-500/80 */

         /* Achievement Notification (Example Style) */
         .qw-achievement-toast {
             position: fixed;
             bottom: 2rem; right: 2rem;
             background: linear-gradient(to right, #f1c40f, #e67e22); /* Gold gradient */
             color: #333;
             padding: 1rem 1.5rem;
             border-radius: 0.5rem;
             box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
             z-index: 100;
             animation: slide-in-fade-out 4s ease-in-out;
         }
          @keyframes slide-in-fade-out {
              0% { transform: translateX(100%); opacity: 0; }
              15%, 85% { transform: translateX(0); opacity: 1; }
              100% { transform: translateX(100%); opacity: 0; }
          }
          .qw-achievement-toast strong { display: block; font-size: 1.1em; margin-bottom: 0.2rem; }

      `}</style>

      {/* Header */}
      <header className="qw-header">
        <div className="qw-header-title">Quantum Weaver</div>
        {gameState.gameStatus === 'playing' && gameState.currentNode && (
          <div className="qw-hud">
            <div className="qw-hud-item" title="Node Stability">
                <span>🧬</span>
                <div className="qw-hud-bar">
                    <div className="qw-hud-bar-fill" style={{ width: `${gameState.nodeStability}%`, background: `linear-gradient(to right, #e74c3c, #f1c40f, #2ecc71)` }}></div>
                </div>
                {/* <span>{Math.round(gameState.nodeStability)}%</span> */}
            </div>
            <div className="qw-hud-item" title="Time Remaining">
                <span>⏳</span><strong>{Math.ceil(gameState.timeRemaining)}s</strong>
            </div>
            <div className="qw-hud-item" title="Player Energy">
                <span>⚡</span>
                <div className="qw-hud-bar">
                    <div className="qw-hud-bar-fill" style={{ width: `${(gameState.playerEnergy / INITIAL_ENERGY) * 100}%`, background: `#00c6ff` }}></div>
                </div>
                {/* <span>{gameState.playerEnergy}</span> */}
            </div>
            <div className="qw-hud-item" title="Score">
                <span>⭐</span><strong>{gameStats.totalScore}</strong>
            </div>
             <div className="qw-hud-item" title="Level">
                <span> Lvl {gameState.currentLevel}</span>
            </div>
          </div>
        )}
        {(gameState.gameStatus === 'playing' || gameState.gameStatus === 'level_complete' || gameState.gameStatus === 'game_over') && (
            <button onClick={returnToMenu} className="qw-button qw-button-secondary" style={{padding: '0.5rem 1rem'}}>Menu</button>
        )}
      </header>

       {/* Feedback Area */}
      <div className={`qw-feedback ${gameState.feedbackMessage ? 'visible' : ''} type-${gameState.feedbackMessage?.type || 'info'}`}>
          {gameState.feedbackMessage?.text}
      </div>

      {/* Main Content Area */}
      <main className="qw-main">
        {gameState.gameStatus === 'menu' && (
          <div className="qw-screen">
            <h1>Architect of Reality</h1>
            <p>The quantum foam churns. Unstable nodes threaten existence. Wield the fundamental forces - superposition, entanglement, tunneling - to weave reality back together.</p>
            <input
              type="text"
              className="qw-input"
              placeholder="Enter Weaver Name"
              value={gameState.weaverName}
              onChange={(e) => setGameState(prev => ({ ...prev, weaverName: e.target.value }))}
            />
            <button onClick={startGame} className="qw-button">Stabilize Reality</button>
          </div>
        )}

        {(gameState.gameStatus === 'playing' || gameState.gameStatus === 'paused') && gameState.currentNode && (
          <>
            <div className="qw-node-container">
              <div className="qw-node-core"></div>
              {gameState.qubitStates.map(renderQubit)}
            </div>
            <div className="qw-tools-panel">
              {gameState.currentNode.availableTools.map(toolId => {
                const tool = TOOLS[toolId];
                return (
                  <button
                    key={tool.id}
                    className={`qw-tool-button ${gameState.selectedTool === tool.id ? 'selected' : ''}`}
                    onClick={() => selectTool(tool.id)}
                    title={`${tool.name} - ${tool.description}`}
                    disabled={gameState.playerEnergy < tool.energyCost} // Disable visually if not enough energy
                    style={{ opacity: gameState.playerEnergy < tool.energyCost ? 0.5 : 1 }}
                  >
                    <span className="qw-tool-icon">{tool.icon}</span>
                    <span className="qw-tool-cost">{tool.energyCost}⚡</span>
                  </button>
                );
              })}
               {/* Apply Button - only show if a tool and valid target(s) are selected */}
               {currentTool && gameState.selectedQubitIds.length === (toolRequiresTwoTargets ? 2 : 1) && (
                   <button onClick={applyTool} className="qw-button" style={{ marginLeft: '1rem' }}>
                       Apply {currentTool.name}
                   </button>
               )}
            </div>
          </>
        )}

          {gameState.gameStatus === 'level_complete' && (
               <div className="qw-screen">
                    <h1>Node Stabilized!</h1>
                    <p>{gameState.feedbackMessage?.text || 'Excellent weaving!'}</p>
                    <p>Final Stability: {Math.round(gameState.nodeStability)}% | Time Left: {Math.ceil(gameState.timeRemaining)}s | Energy Left: {gameState.playerEnergy}</p>
                    <button onClick={goToNextLevel} className="qw-button">Proceed to Next Node</button>
                    <button onClick={returnToMenu} className="qw-button qw-button-secondary">Return to Menu</button>
               </div>
          )}

         {gameState.gameStatus === 'game_over' && (
               <div className="qw-screen">
                    <h1>Reality Unraveled!</h1>
                    <p>{gameState.feedbackMessage?.text || 'The node could not be stabilized.'}</p>
                    <p>Final Score: {gameStats.totalScore}</p>
                    <button onClick={startGame} className="qw-button">Retry Weaving</button>
                     <button onClick={returnToMenu} className="qw-button qw-button-secondary">Return to Menu</button>
               </div>
         )}

      </main>

        {/* Achievement Toasts - Render unlocked achievements temporarily */}
        {/* A better system would queue these */}
         {achievements.filter(a => a.unlocked).map(ach => {
             // Very basic way to show recent unlocks - needs improvement
             // Ideally, trigger this only ONCE when unlocked state changes
             const recentlyUnlocked = Date.now() - (ach as any).unlockedTime < 5000; // Needs timestamping unlock state
             // Placeholder logic: Just show all unlocked for now
             // return (
             //    <div key={ach.id} className="qw-achievement-toast">
             //        <strong>🏆 {ach.name}</strong>
             //        {ach.description}
             //    </div>
             // );
             return null; // Needs better state management to show toasts correctly
         })}

    </div>
  );
};

export default QuantumWeaver;