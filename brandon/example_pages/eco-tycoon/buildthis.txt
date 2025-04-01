import React, { useState, useEffect, useCallback, useMemo } from 'react';

// Define TypeScript Interfaces for game objects
interface Structure {
  id: string;
  name: string;
  type: 'habitat' | 'utility' | 'research' | 'tourism';
  cost: number;
  upkeep: number;
  level: number;
  maxLevel: number;
  effects: {
    envHealth?: number; // Points per year
    biodiversity?: number; // Points per year
    ecoCredits?: number; // Points per year
    researchPoints?: number; // Points per year
  };
  description: string;
  unlocked: boolean;
  icon: string;
}

interface Species {
  id: string;
  name: string;
  type: 'plant' | 'animal';
  cost: number; // Cost to introduce
  envImpact: number; // Effect on environmental health
  biodiversityImpact: number; // Effect on biodiversity score
  habitatRequirement: string; // e.g., 'Forest Habitat', 'Wetland'
  introduced: boolean;
  icon: string;
  description: string;
}

interface Research {
  id: string;
  name: string;
  cost: number; // Research points
  duration: number; // Years to research
  effect: string; // Description of what it unlocks or improves
  prerequisites: string[]; // IDs of required research
  completed: boolean;
  icon: string;
}

interface GameEvent {
  id: string;
  name: string;
  description: string;
  type: 'positive' | 'negative' | 'choice';
  effects: {
    ecoCredits?: number;
    envHealth?: number;
    biodiversity?: number;
  };
  choices?: { text: string; effects: GameEvent['effects'] }[];
  duration?: number; // How many years the effect lasts, if applicable
  triggered: boolean; // Ensure it only triggers once per instance unless designed otherwise
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  condition: (gameState: GameState) => boolean; // Function to check if unlocked
}

// Define a GameState type for easier management (optional but good practice)
interface GameState {
  ecoCredits: number;
  envHealth: number;
  biodiversity: number;
  researchPoints: number;
  currentYear: number;
  placedStructures: { structureId: string; instanceId: number; level: number }[];
  introducedSpecies: string[]; // IDs of species
  completedResearch: string[]; // IDs of research
  activeEvent: GameEvent | null;
  gameSpeed: number; // e.g., 1, 2, 5 seconds per year
}

const EcoTycoon = () => {
  // Core Game State
  const [gameStarted, setGameStarted] = useState(false);
  const [parkName, setParkName] = useState('');
  const [gameState, setGameState] = useState<GameState>({
    ecoCredits: 5000,
    envHealth: 70, // Starts reasonably healthy (0-100)
    biodiversity: 30, // Starts low (0-100)
    researchPoints: 0,
    currentYear: 2025,
    placedStructures: [],
    introducedSpecies: [],
    completedResearch: [],
    activeEvent: null,
    gameSpeed: 3000, // milliseconds per year (3 seconds)
  });
  const [isPaused, setIsPaused] = useState(true);

  // UI State
  const [activeTab, setActiveTab] = useState<'build' | 'species' | 'research' | 'status'>('status');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark'); // Default to dark theme
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showTutorial, setShowTutorial] = useState(true);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [showEventModal, setShowEventModal] = useState(false);
  const [structureInstanceCounter, setStructureInstanceCounter] = useState(0);

  // Game Data Definitions (using useState to hold them, could be constants if static)
  const [availableStructures, setAvailableStructures] = useState<Structure[]>([
    { id: 'ranger_station', name: 'Ranger Station', type: 'utility', cost: 500, upkeep: 50, level: 1, maxLevel: 3, effects: { envHealth: 1, biodiversity: 0.5 }, description: 'Basic monitoring and upkeep.', unlocked: true, icon: '🛖' },
    { id: 'basic_habitat', name: 'Basic Habitat Patch', type: 'habitat', cost: 1000, upkeep: 80, level: 1, maxLevel: 5, effects: { envHealth: 2, biodiversity: 1 }, description: 'Provides a small area for wildlife.', unlocked: true, icon: '🌳' },
    { id: 'visitor_path', name: 'Visitor Path', type: 'tourism', cost: 300, upkeep: 20, level: 1, maxLevel: 1, effects: { ecoCredits: 15, envHealth: -0.5 }, description: 'Allows visitors access, generates income.', unlocked: true, icon: '🚶' },
    { id: 'research_tent', name: 'Research Tent', type: 'research', cost: 800, upkeep: 100, level: 1, maxLevel: 2, effects: { researchPoints: 2 }, description: 'Generates basic research points.', unlocked: true, icon: '⛺' },
    { id: 'renewable_power', name: 'Small Wind Turbine', type: 'utility', cost: 1500, upkeep: 50, level: 1, maxLevel: 3, effects: { envHealth: 1, ecoCredits: 10 }, description: 'Provides clean energy, reducing reliance on external power.', unlocked: false, icon: '🌬️' },
    { id: 'wetland_restoration', name: 'Wetland Restoration Area', type: 'habitat', cost: 2000, upkeep: 150, level: 1, maxLevel: 4, effects: { envHealth: 4, biodiversity: 2 }, description: 'Restores vital wetland ecosystem.', unlocked: false, icon: '🏞️' },
    { id: 'eco_lodge', name: 'Eco Lodge', type: 'tourism', cost: 5000, upkeep: 200, level: 1, maxLevel: 3, effects: { ecoCredits: 100, envHealth: -1 }, description: 'High-income tourism, moderate environmental impact.', unlocked: false, icon: '🏨' },
    { id: 'advanced_lab', name: 'Advanced Research Lab', type: 'research', cost: 3000, upkeep: 250, level: 1, maxLevel: 3, effects: { researchPoints: 5 }, description: 'Generates more research points for advanced projects.', unlocked: false, icon: '🔬' },
  ]);

  const [availableSpecies, setAvailableSpecies] = useState<Species[]>([
    { id: 'native_grasses', name: 'Native Grasses', type: 'plant', cost: 100, envImpact: 0.5, biodiversityImpact: 1, habitatRequirement: 'Basic Habitat Patch', introduced: false, icon: '🌾', description: 'Foundation plant species.' },
    { id: 'oak_tree', name: 'Oak Tree Sapling', type: 'plant', cost: 250, envImpact: 1, biodiversityImpact: 1.5, habitatRequirement: 'Basic Habitat Patch', introduced: false, icon: '🌳', description: 'Slow growing, supports many insects.' },
    { id: 'field_mice', name: 'Field Mice', type: 'animal', cost: 300, envImpact: 0.1, biodiversityImpact: 0.5, habitatRequirement: 'Basic Habitat Patch', introduced: false, icon: '🐁', description: 'Common prey species.' },
    { id: 'marsh_frog', name: 'Marsh Frog', type: 'animal', cost: 500, envImpact: 0.8, biodiversityImpact: 1.2, habitatRequirement: 'Wetland Restoration Area', introduced: false, icon: '🐸', description: 'Indicator species for wetland health.' },
    { id: 'red_deer', name: 'Red Deer', type: 'animal', cost: 1500, envImpact: -0.5, biodiversityImpact: 2, habitatRequirement: 'Basic Habitat Patch', introduced: false, icon: '🦌', description: 'Large herbivore, requires careful management.' },
  ]);

  const [availableResearch, setAvailableResearch] = useState<Research[]>([
    { id: 'basic_ecology', name: 'Basic Ecology Studies', cost: 10, duration: 2, effect: 'Unlocks Wetland Restoration and Native Grasses.', prerequisites: [], completed: false, icon: '📜' },
    { id: 'renewable_tech', name: 'Renewable Energy Tech', cost: 25, duration: 3, effect: 'Unlocks Small Wind Turbine.', prerequisites: ['basic_ecology'], completed: false, icon: '💡' },
    { id: 'habitat_enrichment', name: 'Habitat Enrichment', cost: 30, duration: 4, effect: 'Improves effectiveness of existing habitats slightly.', prerequisites: ['basic_ecology'], completed: false, icon: '✨' },
    { id: 'visitor_management', name: 'Visitor Management', cost: 20, duration: 2, effect: 'Reduces negative impact of Visitor Paths and unlocks Eco Lodge.', prerequisites: [], completed: false, icon: '🗺️' },
    { id: 'water_purification', name: 'Water Purification', cost: 50, duration: 5, effect: 'Significantly boosts Env. Health from Wetland areas.', prerequisites: ['basic_ecology', 'renewable_tech'], completed: false, icon: '💧' },
  ]);

  const [possibleEvents, setPossibleEvents] = useState<GameEvent[]>([
    { id: 'mild_winter', name: 'Mild Winter', description: 'A mild winter leads to higher survival rates for wildlife.', type: 'positive', effects: { biodiversity: 5 }, duration: 1, triggered: false },
    { id: 'pollution_spill', name: 'Nearby Pollution Spill', description: 'Pollution from a nearby factory has seeped into the reserve!', type: 'negative', effects: { envHealth: -15, biodiversity: -5 }, duration: 3, triggered: false },
    { id: 'research_grant', name: 'Research Grant Offered', description: 'A university offers a grant for specific research.', type: 'positive', effects: { ecoCredits: 1000, researchPoints: 10 }, triggered: false },
    { id: 'invasive_species', name: 'Invasive Plant Spotted', description: 'An invasive plant species is threatening native flora.', type: 'choice', effects: {},
      choices: [
        { text: 'Manual Removal (Cost: 500 EcoCredits)', effects: { ecoCredits: -500, biodiversity: 2 } },
        { text: 'Biological Control (Cost: 20 RP, Risky)', effects: { researchPoints: -20, biodiversity: 5, envHealth: -2 } },
        { text: 'Ignore (Risk further spread)', effects: { biodiversity: -8 } },
      ], triggered: false },
    { id: 'tourism_boom', name: 'Tourism Boom', description: 'Your park is featured in a popular travel blog!', type: 'positive', effects: { ecoCredits: 2000 }, duration: 2, triggered: false },
    { id: 'wildfire', name: 'Wildfire Risk', description: 'Dry conditions increase wildfire risk. Improve preparedness?', type: 'choice', effects: {},
        choices: [
            { text: 'Invest in Firebreaks (Cost: 1000 EC)', effects: { ecoCredits: -1000, envHealth: 1 } }, // Prevents worse outcome
            { text: 'Do Nothing (Save money, risk fire)', effects: {} }, // Chance of large negative effect later
        ], triggered: false }
  ]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: 'first_steps', name: 'First Steps', description: 'Build your first structure.', unlocked: false, condition: (gs) => gs.placedStructures.length > 0 },
    { id: 'nature_lover', name: 'Nature Lover', description: 'Introduce your first species.', unlocked: false, condition: (gs) => gs.introducedSpecies.length > 0 },
    { id: 'budding_scientist', name: 'Budding Scientist', description: 'Complete your first research project.', unlocked: false, condition: (gs) => gs.completedResearch.length > 0 },
    { id: 'healthy_habitat', name: 'Healthy Habitat', description: 'Reach 85 Environmental Health.', unlocked: false, condition: (gs) => gs.envHealth >= 85 },
    { id: 'biodiversity_hotspot', name: 'Biodiversity Hotspot', description: 'Reach 75 Biodiversity.', unlocked: false, condition: (gs) => gs.biodiversity >= 75 },
    { id: 'master_planner', name: 'Master Planner', description: 'Have 10 structures built simultaneously.', unlocked: false, condition: (gs) => gs.placedStructures.length >= 10 },
    { id: 'sustainable_success', name: 'Sustainable Success', description: 'Reach Year 2040 with positive scores.', unlocked: false, condition: (gs) => gs.currentYear >= 2040 && gs.ecoCredits > 0 && gs.envHealth > 50 && gs.biodiversity > 50 },
  ]);

  // Tutorial Steps
  const tutorialSteps = [
    { text: "Welcome to EcoTycoon! Ready to build your own nature reserve?", character: "guide" },
    { text: "Your goal is to balance EcoCredits (money), Environmental Health, and Biodiversity.", character: "guide" },
    { text: "Use the tabs below to Build structures, introduce Species, and conduct Research.", character: "guide" },
    { text: "Everything costs EcoCredits or Research Points, and structures have upkeep. Watch your balance!", character: "guide" },
    { text: "Keep an eye on your scores at the top. Let's start by building a Ranger Station from the 'Build' tab.", character: "guide" },
    { text: "Good luck, Park Manager! Nature is counting on you.", character: "guide" }
  ];

  // Utility Functions
  const showNotificationMessage = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3500);
  };

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const togglePause = () => setIsPaused(!isPaused);

  const changeGameSpeed = (speed: number) => {
    setGameState(prev => ({ ...prev, gameSpeed: speed }));
  }

  // Memoized Calculations for Performance
  const yearlyChanges = useMemo(() => {
    let deltaCredits = 0;
    let deltaEnvHealth = 0;
    let deltaBiodiversity = 0;
    let deltaResearch = 0;

    // Effects from Structures
    gameState.placedStructures.forEach(ps => {
      const structureDef = availableStructures.find(s => s.id === ps.structureId);
      if (structureDef) {
        const levelMultiplier = 1 + (ps.level - 1) * 0.2; // Example: 20% boost per level past 1
        deltaCredits -= structureDef.upkeep * levelMultiplier;
        if (structureDef.effects.ecoCredits) deltaCredits += structureDef.effects.ecoCredits * levelMultiplier;
        if (structureDef.effects.envHealth) deltaEnvHealth += structureDef.effects.envHealth * levelMultiplier;
        if (structureDef.effects.biodiversity) deltaBiodiversity += structureDef.effects.biodiversity * levelMultiplier;
        if (structureDef.effects.researchPoints) deltaResearch += structureDef.effects.researchPoints * levelMultiplier;

        // Apply research effects modifying structures (example)
         if (gameState.completedResearch.includes('habitat_enrichment') && structureDef.type === 'habitat') {
            deltaEnvHealth += 0.2 * levelMultiplier;
            deltaBiodiversity += 0.2 * levelMultiplier;
         }
         if (gameState.completedResearch.includes('visitor_management') && structureDef.type === 'tourism') {
            // Reduce negative impact
            if (structureDef.effects.envHealth && structureDef.effects.envHealth < 0) {
                deltaEnvHealth -= (structureDef.effects.envHealth * 0.5 * levelMultiplier); // Halve negative impact
            }
         }
      }
    });

    // Effects from Species
    gameState.introducedSpecies.forEach(speciesId => {
      const speciesDef = availableSpecies.find(s => s.id === speciesId);
      if (speciesDef) {
        deltaEnvHealth += speciesDef.envImpact;
        deltaBiodiversity += speciesDef.biodiversityImpact;
         // Add species synergy/dependency logic here later if desired
      }
    });

     // Natural regeneration/degradation factors
     deltaEnvHealth += (gameState.envHealth / 20) - 2; // Health tends towards a balance point, but degrades slightly naturally
     deltaBiodiversity += (gameState.biodiversity / 30) - 1; // Biodiversity also degrades without active management

     // Event Effects
     if (gameState.activeEvent && gameState.activeEvent.duration && gameState.activeEvent.duration > 0) {
        if(gameState.activeEvent.effects.ecoCredits) deltaCredits += gameState.activeEvent.effects.ecoCredits;
        if(gameState.activeEvent.effects.envHealth) deltaEnvHealth += gameState.activeEvent.effects.envHealth;
        if(gameState.activeEvent.effects.biodiversity) deltaBiodiversity += gameState.activeEvent.effects.biodiversity;
        // Decrement duration handled in game loop directly
     }


    return { deltaCredits, deltaEnvHealth, deltaBiodiversity, deltaResearch };
  }, [gameState.placedStructures, gameState.introducedSpecies, gameState.completedResearch, availableStructures, availableSpecies, gameState.activeEvent, gameState.envHealth, gameState.biodiversity]);


  // Game Loop Effect
  useEffect(() => {
    if (!gameStarted || isPaused) {
      return; // Don't run the loop if game hasn't started or is paused
    }

    const gameTick = setInterval(() => {
      setGameState(prev => {
        const { deltaCredits, deltaEnvHealth, deltaBiodiversity, deltaResearch } = yearlyChanges;

        // Calculate new state values
        const nextCredits = prev.ecoCredits + deltaCredits;
        // Clamp scores between 0 and 100 (or higher max if desired)
        const nextEnvHealth = Math.max(0, Math.min(100, prev.envHealth + deltaEnvHealth));
        const nextBiodiversity = Math.max(0, Math.min(100, prev.biodiversity + deltaBiodiversity));
        const nextResearch = prev.researchPoints + deltaResearch;
        const nextYear = prev.currentYear + 1;

        let nextActiveEvent = prev.activeEvent;
        // Handle event duration
        if (nextActiveEvent && nextActiveEvent.duration) {
            const remainingDuration = nextActiveEvent.duration - 1;
            if (remainingDuration <= 0) {
                showNotificationMessage(`${nextActiveEvent.name} event effects have ended.`);
                nextActiveEvent = null; // Event ends
            } else {
                nextActiveEvent = { ...nextActiveEvent, duration: remainingDuration };
            }
        }

        // Basic losing condition
        if (nextCredits < -1000 || nextEnvHealth <= 5) { // Allow some debt, but not too much
            setIsPaused(true); // Pause game on lose
            showNotificationMessage("Catastrophe! Your reserve has failed. Game Over.");
            // Could reset game or show a game over screen here
            return { ...prev, ecoCredits: nextCredits, envHealth: nextEnvHealth, biodiversity: nextBiodiversity, currentYear: nextYear, activeEvent: nextActiveEvent }; // Return updated state before full stop
        }


        // Check for Random Event Trigger (e.g., 10% chance per year)
        if (!nextActiveEvent && Math.random() < 0.15) {
            const availableEvents = possibleEvents.filter(e => !e.triggered || !e.duration); // Allow repeatable events if they dont have duration
            if (availableEvents.length > 0) {
                const eventIndex = Math.floor(Math.random() * availableEvents.length);
                nextActiveEvent = { ...availableEvents[eventIndex], triggered: true }; // Mark as triggered for this instance
                showNotificationMessage(`Event: ${nextActiveEvent.name}!`);
                if (nextActiveEvent.type === 'choice' || nextActiveEvent.type === 'negative') {
                    setShowEventModal(true); // Show modal for choices or negative events
                } else {
                    // Apply immediate positive effects
                     const positiveEffects = nextActiveEvent.effects;
                     const updatedState = {
                        ecoCredits: prev.ecoCredits + (positiveEffects.ecoCredits || 0) + deltaCredits,
                        envHealth: Math.max(0, Math.min(100, prev.envHealth + (positiveEffects.envHealth || 0) + deltaEnvHealth)),
                        biodiversity: Math.max(0, Math.min(100, prev.biodiversity + (positiveEffects.biodiversity || 0) + deltaBiodiversity)),
                        researchPoints: prev.researchPoints + (positiveEffects.researchPoints || 0) + deltaResearch,
                        currentYear: nextYear,
                        placedStructures: prev.placedStructures,
                        introducedSpecies: prev.introducedSpecies,
                        completedResearch: prev.completedResearch,
                        activeEvent: nextActiveEvent.duration ? nextActiveEvent : null, // Keep if duration > 0, else clear
                        gameSpeed: prev.gameSpeed
                     };
                    return updatedState;
                }
            }
        }


        return {
          ...prev,
          ecoCredits: nextCredits,
          envHealth: nextEnvHealth,
          biodiversity: nextBiodiversity,
          researchPoints: nextResearch,
          currentYear: nextYear,
          activeEvent: nextActiveEvent,
        };
      });

      // Check Achievements after state update
       checkAchievements();
       checkUnlocks(); // Check if new things should be unlocked based on state

    }, gameState.gameSpeed); // Interval based on game speed

    // Cleanup function to clear interval when component unmounts or dependencies change
    return () => clearInterval(gameTick);

  }, [gameStarted, isPaused, gameState.gameSpeed, yearlyChanges, possibleEvents]); // Rerun effect if pause state or speed changes


   // Function to check and unlock achievements
   const checkAchievements = useCallback(() => {
    setAchievements(prevAchievements => {
        let changed = false;
        const updatedAchievements = prevAchievements.map(ach => {
            if (!ach.unlocked && ach.condition(gameState)) {
                showNotificationMessage(`Achievement Unlocked: ${ach.name}!`);
                changed = true;
                return { ...ach, unlocked: true };
            }
            return ach;
        });
        return changed ? updatedAchievements : prevAchievements;
    });
   }, [gameState]); // Dependency on gameState

   // Function to check and unlock structures/species/research based on game progress
   const checkUnlocks = useCallback(() => {
        // Example unlock logic (could be based on year, research, scores, etc.)
        setAvailableStructures(prev => {
            let changed = false;
            const updated = prev.map(s => {
                let shouldUnlock = s.unlocked;
                if (!s.unlocked) {
                    // Example: Unlock Wetland at 50 Env Health and Basic Ecology research
                    if (s.id === 'wetland_restoration' && gameState.envHealth >= 50 && gameState.completedResearch.includes('basic_ecology')) {
                        shouldUnlock = true;
                    }
                    // Example: Unlock Turbine via research
                    if (s.id === 'renewable_power' && gameState.completedResearch.includes('renewable_tech')) {
                        shouldUnlock = true;
                    }
                     // Example: Unlock Eco Lodge via research
                    if (s.id === 'eco_lodge' && gameState.completedResearch.includes('visitor_management')) {
                        shouldUnlock = true;
                    }
                     // Example: Unlock Adv Lab at year 2030 and 2 completed researches
                    if (s.id === 'advanced_lab' && gameState.currentYear >= 2030 && gameState.completedResearch.length >= 2) {
                         shouldUnlock = true;
                    }
                }
                if (shouldUnlock && !s.unlocked) {
                     showNotificationMessage(`New build option available: ${s.name}`);
                     changed = true;
                     return { ...s, unlocked: true };
                }
                return s;
            });
            return changed ? updated : prev;
        });

         // Add similar logic for setAvailableSpecies and setAvailableResearch if needed
         setAvailableSpecies(prev => {
             let changed = false;
             const updated = prev.map(sp => {
                let shouldUnlock = sp.introduced; // We use 'introduced' here, but conceptually check if available
                 if(!sp.introduced) {
                    // Example: Unlock frog when wetland is built and ecology researched
                    if(sp.id === 'marsh_frog' && gameState.placedStructures.some(ps => ps.structureId === 'wetland_restoration') && gameState.completedResearch.includes('basic_ecology')) {
                        // This doesn't auto-introduce, just makes it available - maybe rename state needed
                        // For now, let's just message and rely on user action
                         // showNotificationMessage(`Species available: ${sp.name}`);
                         // changed = true; // Need better state handling for 'availability' vs 'introduced'
                    }
                 }
                 return sp; // Keep simple for now
             });
             return prev; // Return previous state until availability state is added
         });

   }, [gameState.envHealth, gameState.biodiversity, gameState.currentYear, gameState.completedResearch, gameState.placedStructures]);


  // Game Actions
  const startGame = () => {
    if (parkName.trim() === '') {
      showNotificationMessage("Please name your park!");
      return;
    }
    setGameStarted(true);
    setIsPaused(false); // Start the game running
    setShowTutorial(true); // Show tutorial on start
    setTutorialStep(0);
    showNotificationMessage(`Welcome to ${parkName}! Let's build something amazing.`);
  };

  const buildStructure = (structureId: string) => {
    const structure = availableStructures.find(s => s.id === structureId);
    if (!structure) return;
    if (!structure.unlocked) {
        showNotificationMessage("This structure is not yet unlocked!");
        return;
    }

    if (gameState.ecoCredits >= structure.cost) {
      const newInstanceId = structureInstanceCounter;
      setStructureInstanceCounter(prev => prev + 1);
      setGameState(prev => ({
        ...prev,
        ecoCredits: prev.ecoCredits - structure.cost,
        placedStructures: [...prev.placedStructures, { structureId: structure.id, instanceId: newInstanceId, level: 1 }],
      }));
      showNotificationMessage(`${structure.name} built!`);
      checkAchievements(); // Check achievements immediately after building
    } else {
      showNotificationMessage("Not enough EcoCredits!");
    }
  };

  const upgradeStructure = (instanceId: number) => {
      const structureInstance = gameState.placedStructures.find(ps => ps.instanceId === instanceId);
      if(!structureInstance) return;

      const structureDef = availableStructures.find(s => s.id === structureInstance.structureId);
      if(!structureDef || structureInstance.level >= structureDef.maxLevel) {
           showNotificationMessage("Cannot upgrade further.");
           return;
      }

      const upgradeCost = structureDef.cost * (structureInstance.level * 0.8); // Example upgrade cost scaling

      if (gameState.ecoCredits >= upgradeCost) {
          setGameState(prev => ({
              ...prev,
              ecoCredits: prev.ecoCredits - upgradeCost,
              placedStructures: prev.placedStructures.map(ps =>
                  ps.instanceId === instanceId ? { ...ps, level: ps.level + 1 } : ps
              ),
          }));
          showNotificationMessage(`${structureDef.name} upgraded to Level ${structureInstance.level + 1}!`);
      } else {
          showNotificationMessage(`Not enough EcoCredits (Need ${Math.round(upgradeCost)})`);
      }
  };

  const introduceSpecies = (speciesId: string) => {
    const species = availableSpecies.find(s => s.id === speciesId);
    if (!species) return;

     // Check habitat requirement
     const requiredHabitat = availableStructures.find(str => str.name === species.habitatRequirement);
     const hasRequiredHabitat = requiredHabitat && gameState.placedStructures.some(ps => ps.structureId === requiredHabitat.id);

     if (!hasRequiredHabitat) {
        showNotificationMessage(`Requires ${species.habitatRequirement} to introduce ${species.name}.`);
        return;
     }

     if(gameState.introducedSpecies.includes(speciesId)) {
         showNotificationMessage(`${species.name} already introduced.`);
         return;
     }


    if (gameState.ecoCredits >= species.cost) {
      setGameState(prev => ({
        ...prev,
        ecoCredits: prev.ecoCredits - species.cost,
        introducedSpecies: [...prev.introducedSpecies, species.id],
      }));
      // Update species state to reflect introduction (if managing availability separately)
      setAvailableSpecies(prev => prev.map(sp => sp.id === speciesId ? {...sp, introduced: true} : sp));
      showNotificationMessage(`${species.name} introduced to the reserve!`);
       checkAchievements();
    } else {
      showNotificationMessage("Not enough EcoCredits!");
    }
  };

  const startResearch = (researchId: string) => {
    const research = availableResearch.find(r => r.id === researchId);
    if (!research || research.completed) return;

     // Check prerequisites
    const prereqsMet = research.prerequisites.every(prereqId => gameState.completedResearch.includes(prereqId));
    if (!prereqsMet) {
        showNotificationMessage("Research prerequisites not met.");
        return;
    }


    if (gameState.researchPoints >= research.cost) {
      setGameState(prev => ({
        ...prev,
        researchPoints: prev.researchPoints - research.cost,
        // For simplicity, instantly complete research. Could add a queue/timer later.
        completedResearch: [...prev.completedResearch, research.id],
      }));
      setAvailableResearch(prev => prev.map(r => r.id === researchId ? {...r, completed: true} : r));
      showNotificationMessage(`Research completed: ${research.name}! ${research.effect}`);
      checkAchievements();
      checkUnlocks(); // New research might unlock things
    } else {
      showNotificationMessage("Not enough Research Points!");
    }
  };

  const handleEventChoice = (choiceEffects: GameEvent['effects']) => {
     setGameState(prev => {
        let updatedCredits = prev.ecoCredits + (choiceEffects?.ecoCredits || 0);
        let updatedEnvHealth = prev.envHealth + (choiceEffects?.envHealth || 0);
        let updatedBiodiversity = prev.biodiversity + (choiceEffects?.biodiversity || 0);
        let updatedResearchPoints = prev.researchPoints + (choiceEffects?.researchPoints || 0);

        // Clamp values
        updatedEnvHealth = Math.max(0, Math.min(100, updatedEnvHealth));
        updatedBiodiversity = Math.max(0, Math.min(100, updatedBiodiversity));

        return {
            ...prev,
            ecoCredits: updatedCredits,
            envHealth: updatedEnvHealth,
            biodiversity: updatedBiodiversity,
            researchPoints: updatedResearchPoints,
            activeEvent: null, // Event is resolved
        };
     });
     setShowEventModal(false);
     showNotificationMessage("Event consequences applied.");
  };

  const closeEventModal = () => {
      // If closing without choosing (e.g., negative event ack), just clear it
      if (gameState.activeEvent && gameState.activeEvent.type !== 'choice') {
          setGameState(prev => ({ ...prev, activeEvent: null }));
      } else if (gameState.activeEvent && gameState.activeEvent.type === 'choice' && !gameState.activeEvent.choices?.some(c => c.text.toLowerCase().includes("ignore"))) {
          // If it's a choice event without an explicit "ignore", maybe penalise slightly? Or just close.
          // For now, just close it. Add penalty later if desired.
      }
       setShowEventModal(false);
       // If closing a choice event without making a choice, the event remains active until handled or times out (if implemented)
       // Let's assume closing the modal resolves non-choice events, but choice events require a click.
       // If the modal is for a negative event, closing it implies acknowledging.
        if (gameState.activeEvent && gameState.activeEvent.type === 'negative') {
             setGameState(prev => ({ ...prev, activeEvent: null }));
        }

  }


  // Tutorial Navigation
  const nextTutorialStep = () => {
    if (tutorialStep < tutorialSteps.length - 1) {
      setTutorialStep(tutorialStep + 1);
    } else {
      setShowTutorial(false);
    }
  };

  // Render Functions
  const renderStat = (label: string, value: number | string, icon: string, color?: string) => (
    <div className="stat-item" style={{ color: color || 'inherit' }}>
      <span className="stat-icon">{icon}</span>
      <span className="stat-label">{label}:</span>
      <span className="stat-value">{typeof value === 'number' ? Math.round(value) : value}</span>
    </div>
  );

  const renderProgressBar = (label: string, value: number, color: string) => (
      <div className="progress-bar-container">
          <span className="progress-label">{label} ({Math.round(value)}%)</span>
          <div className="progress-bar-bg">
              <div className="progress-bar-fg" style={{ width: `${value}%`, backgroundColor: color }}></div>
          </div>
      </div>
  );


  return (
    <div className={`eco-tycoon-container theme-${theme}`}>
      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600&family=Roboto+Mono&display=swap');

        :root {
          --font-primary: 'Quicksand', sans-serif;
          --font-mono: 'Roboto Mono', monospace;
          --speed-normal: 3000ms;
          --speed-fast: 1500ms;
          --speed-fastest: 750ms;
        }

        .eco-tycoon-container {
          font-family: var(--font-primary);
          min-height: 100vh;
          transition: background-color 0.3s, color 0.3s;
          display: flex;
          flex-direction: column;
        }

        .theme-light {
          --bg-primary: #f0f4f8;
          --bg-secondary: #ffffff;
          --text-primary: #1a202c;
          --text-secondary: #4a5568;
          --accent-color: #48bb78; /* Green */
          --accent-secondary: #4299e1; /* Blue */
          --border-color: #e2e8f0;
          --shadow-color: rgba(0, 0, 0, 0.1);
          --negative-color: #e53e3e; /* Red */
        }

        .theme-dark {
          --bg-primary: #1a202c;
          --bg-secondary: #2d3748;
          --text-primary: #e2e8f0;
          --text-secondary: #a0aec0;
          --accent-color: #68d391; /* Lighter Green */
          --accent-secondary: #63b3ed; /* Lighter Blue */
          --border-color: #4a5568;
          --shadow-color: rgba(0, 0, 0, 0.4);
           --negative-color: #fc8181; /* Lighter Red */
        }

        /* General Styling */
        .eco-tycoon-container {
            background-color: var(--bg-primary);
            color: var(--text-primary);
        }

        header.game-header {
            background-color: var(--bg-secondary);
            padding: 1rem 1.5rem;
            border-bottom: 1px solid var(--border-color);
            box-shadow: 0 2px 4px var(--shadow-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap; /* Allow wrapping on smaller screens */
        }

        .header-title {
            font-size: 1.8rem;
            font-weight: 600;
            color: var(--accent-color);
            margin: 0;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
         .header-title .park-name {
            color: var(--text-primary);
            font-size: 1.2rem;
            opacity: 0.8;
         }


        .stats-bar {
            display: flex;
            gap: 1.5rem;
            align-items: center;
            flex-wrap: wrap; /* Allow wrapping */
            margin: 0.5rem 0; /* Add some margin for wrapped items */
        }

        .stat-item {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            font-size: 0.95rem;
        }
        .stat-icon { font-size: 1.1rem; }
        .stat-label { font-weight: 600; color: var(--text-secondary); }
        .stat-value { font-family: var(--font-mono); font-weight: 600; }

         .progress-bar-container {
             width: 120px;
             margin-left: 0.5rem;
         }
         .progress-label {
             font-size: 0.75rem;
             color: var(--text-secondary);
             display: block;
             margin-bottom: 2px;
             white-space: nowrap;
         }
         .progress-bar-bg {
             height: 8px;
             background-color: rgba(128, 128, 128, 0.2);
             border-radius: 4px;
             overflow: hidden;
         }
         .progress-bar-fg {
             height: 100%;
             border-radius: 4px;
             transition: width 0.5s ease-in-out;
         }


        .controls {
            display: flex;
            align-items: center;
            gap: 0.8rem;
        }

        .control-button, .theme-toggle-button, .speed-button {
            background-color: var(--bg-primary);
            color: var(--text-secondary);
            border: 1px solid var(--border-color);
            padding: 0.4rem 0.8rem;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 0.3rem;
        }
        .control-button:hover, .theme-toggle-button:hover, .speed-button:hover {
            border-color: var(--accent-color);
            color: var(--accent-color);
        }
        .speed-button.active {
            background-color: var(--accent-color);
            color: white;
             border-color: var(--accent-color);
        }

        main.game-content {
            flex-grow: 1;
            max-width: 1400px;
            width: 100%;
            margin: 1.5rem auto;
            padding: 0 1.5rem;
            display: flex; /* Use flexbox for main layout */
            gap: 1.5rem;
        }

        .sidebar {
             flex: 0 0 280px; /* Fixed width sidebar */
             background-color: var(--bg-secondary);
             border-radius: 8px;
             padding: 1rem;
             box-shadow: 0 1px 3px var(--shadow-color);
             height: fit-content; /* Adjust height */
        }

        .main-panel {
            flex: 1; /* Take remaining space */
            background-color: var(--bg-secondary);
            border-radius: 8px;
            padding: 1.5rem;
            box-shadow: 0 1px 3px var(--shadow-color);
            overflow-y: auto; /* Allow scrolling if content overflows */
            max-height: calc(100vh - 150px); /* Example max height */
        }


        .tabs button {
            display: block;
            width: 100%;
            padding: 0.8rem 1rem;
            margin-bottom: 0.5rem;
            background: none;
            border: none;
            border-left: 3px solid transparent;
            color: var(--text-secondary);
            font-size: 1rem;
            font-weight: 600;
            text-align: left;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .tabs button:hover {
            background-color: rgba(128, 128, 128, 0.1);
            border-left-color: var(--text-secondary);
             color: var(--text-primary);
        }
        .tabs button.active {
            border-left-color: var(--accent-color);
            color: var(--accent-color);
            background-color: rgba(var(--accent-color-rgb), 0.1); /* Use RGB for opacity */
        }
        /* Helper for accent color RGB */
        .theme-light .tabs button.active { --accent-color-rgb: 72, 187, 120; }
        .theme-dark .tabs button.active { --accent-color-rgb: 104, 211, 145; }

        .tab-content h2 {
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--accent-color);
            margin-bottom: 1.5rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid var(--border-color);
        }

        .item-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1rem;
        }

        .item-card {
            background-color: var(--bg-primary);
            border: 1px solid var(--border-color);
            border-radius: 6px;
            padding: 1rem;
            transition: box-shadow 0.2s ease;
            opacity: 1;
        }
        .item-card.locked { opacity: 0.6; }

        .item-card:hover {
            box-shadow: 0 4px 8px var(--shadow-color);
        }

         .item-card h3 {
             font-size: 1.1rem;
             font-weight: 600;
             margin: 0 0 0.5rem 0;
             display: flex;
             align-items: center;
             gap: 0.5rem;
         }
         .item-card p {
             font-size: 0.9rem;
             color: var(--text-secondary);
             margin-bottom: 0.75rem;
             line-height: 1.5;
         }
         .item-info {
             font-size: 0.8rem;
             color: var(--text-secondary);
             margin-bottom: 0.5rem;
             font-family: var(--font-mono);
         }
          .item-info strong { color: var(--text-primary); }
          .item-info .positive { color: var(--accent-color); }
          .item-info .negative { color: var(--negative-color); }


         .item-actions { display: flex; justify-content: flex-end; align-items: center; gap: 0.5rem; margin-top: 0.5rem;}

         .action-button {
             background-color: var(--accent-color);
             color: white;
             border: none;
             padding: 0.4rem 0.8rem;
             border-radius: 4px;
             cursor: pointer;
             font-size: 0.85rem;
             font-weight: 600;
             transition: background-color 0.2s ease;
             opacity: 1;
         }
         .action-button:hover { background-color: #38a169; } /* Darken green */
         .theme-dark .action-button:hover { background-color: #9ae6b4; color: var(--bg-primary); } /* Lighten green */
         .action-button:disabled {
             background-color: var(--text-secondary);
             cursor: not-allowed;
             opacity: 0.7;
         }


        /* Start Screen */
        .start-screen {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 3rem 1rem;
            flex-grow: 1;
             background-color: var(--bg-secondary);
             border-radius: 8px;
             margin: 1.5rem;
        }
        .start-screen h1 {
            font-size: 3rem;
            color: var(--accent-color);
            margin-bottom: 1rem;
        }
        .start-screen p {
            font-size: 1.1rem;
            color: var(--text-secondary);
            max-width: 500px;
            margin-bottom: 2rem;
        }
        .start-screen input {
            padding: 0.8rem 1rem;
            font-size: 1rem;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            margin-bottom: 1rem;
            width: 100%;
            max-width: 300px;
             background-color: var(--bg-primary);
             color: var(--text-primary);
        }
         .start-button {
             padding: 0.8rem 2rem;
             font-size: 1.1rem;
             font-weight: 600;
         }

        /* Notification */
        .notification {
            position: fixed;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--bg-secondary);
            color: var(--text-primary);
            padding: 1rem 1.5rem;
            border-radius: 6px;
            box-shadow: 0 4px 12px var(--shadow-color);
            z-index: 1000;
            font-size: 1rem;
            border-top: 4px solid var(--accent-color);
            animation: slide-up 0.5s ease-out;
        }
        @keyframes slide-up {
            from { transform: translate(-50%, 100%); opacity: 0; }
            to { transform: translate(-50%, 0); opacity: 1; }
        }


         /* Modal */
         .modal-overlay {
             position: fixed;
             inset: 0;
             background-color: rgba(0, 0, 0, 0.6);
             display: flex;
             align-items: center;
             justify-content: center;
             z-index: 1100;
         }
         .modal-content {
             background-color: var(--bg-secondary);
             padding: 2rem;
             border-radius: 8px;
             max-width: 500px;
             width: 90%;
             box-shadow: 0 5px 15px var(--shadow-color);
             color: var(--text-primary);
         }
         .modal-content h2 {
             color: var(--accent-color);
             margin-top: 0;
             margin-bottom: 1rem;
             font-size: 1.6rem;
         }
          .modal-content p {
              color: var(--text-secondary);
              margin-bottom: 1.5rem;
              line-height: 1.6;
          }
         .modal-actions {
             display: flex;
             flex-direction: column; /* Stack choices vertically */
             gap: 0.75rem;
             margin-top: 1.5rem;
         }
         .modal-actions button {
             padding: 0.7rem 1rem;
             font-size: 0.95rem;
         }


         /* Tutorial */
        .tutorial-overlay {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 90%;
            max-width: 400px;
            background-color: var(--bg-secondary);
            border-radius: 8px;
            padding: 1.5rem;
            border: 1px solid var(--border-color);
            box-shadow: 0 4px 15px var(--shadow-color);
            z-index: 1000;
            animation: slide-up 0.5s ease-out;
        }
         .tutorial-content { display: flex; gap: 1rem; align-items: flex-start; }
         .tutorial-avatar { font-size: 2rem; min-width: 40px; text-align: center; margin-top: 5px; }
         .tutorial-text { font-size: 0.95rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 1rem; }
         .tutorial-text strong { color: var(--text-primary); }
         .tutorial-button { float: right; }


         /* Status Tab Specifics */
         .status-grid {
             display: grid;
             grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
             gap: 1.5rem;
             margin-bottom: 1.5rem;
         }
         .status-card {
             background-color: var(--bg-primary);
             padding: 1rem;
             border-radius: 6px;
             border: 1px solid var(--border-color);
         }
         .status-card h3 {
             font-size: 1.2rem;
             margin-bottom: 0.8rem;
             display: flex;
             align-items: center;
             gap: 0.5rem;
             color: var(--accent-secondary);
         }
         .status-list { list-style: none; padding: 0; margin: 0; }
         .status-list li {
             font-size: 0.9rem;
             color: var(--text-secondary);
             padding: 0.4rem 0;
             border-bottom: 1px dashed var(--border-color);
             display: flex;
             justify-content: space-between;
             align-items: center;
         }
         .status-list li:last-child { border-bottom: none; }
         .status-list .level { font-size: 0.8rem; background-color: var(--bg-secondary); padding: 2px 6px; border-radius: 3px; }
         .status-list .upgrade-btn { margin-left: 0.5rem; padding: 0.2rem 0.4rem; font-size: 0.75rem; }


         /* Achievements */
         .achievement-list { list-style: none; padding: 0; margin: 0; }
         .achievement-item {
             display: flex;
             align-items: center;
             gap: 1rem;
             padding: 0.8rem;
             border-radius: 4px;
             margin-bottom: 0.5rem;
             background-color: var(--bg-primary);
             border: 1px solid var(--border-color);
             opacity: 0.6;
             transition: opacity 0.3s;
         }
         .achievement-item.unlocked {
             opacity: 1;
             border-left: 4px solid var(--accent-color);
         }
         .achievement-icon { font-size: 1.5rem; }
         .achievement-details h4 { margin: 0 0 0.2rem 0; font-size: 1rem; }
         .achievement-details p { margin: 0; font-size: 0.85rem; color: var(--text-secondary); }


      `}</style>

      {/* Header */}
      <header className="game-header">
        <h1 className="header-title">
            <span>🌿</span> EcoTycoon
            {gameStarted && <span className='park-name'>| {parkName}</span>}
        </h1>
        {gameStarted && (
          <div className="stats-bar">
            {renderStat('Year', gameState.currentYear, '🗓️')}
            {renderStat('EcoCredits', gameState.ecoCredits, '💰', gameState.ecoCredits < 0 ? 'var(--negative-color)' : 'var(--accent-color)')}
            {renderProgressBar('Health', gameState.envHealth, 'var(--accent-color)')}
            {renderProgressBar('Biodiversity', gameState.biodiversity, 'var(--accent-secondary)')}
            {renderStat('Research', gameState.researchPoints, '🔬', 'var(--accent-secondary)')}
          </div>
        )}
        <div className="controls">
          {gameStarted && (
            <>
              <button onClick={togglePause} className="control-button">
                {isPaused ? '▶️ Play' : '⏸️ Pause'}
              </button>
              <div className='speed-controls'>
                  <button onClick={() => changeGameSpeed(3000)} className={`speed-button ${gameState.gameSpeed === 3000 ? 'active' : ''}`}>1x</button>
                  <button onClick={() => changeGameSpeed(1500)} className={`speed-button ${gameState.gameSpeed === 1500 ? 'active' : ''}`}>2x</button>
                  <button onClick={() => changeGameSpeed(750)} className={`speed-button ${gameState.gameSpeed === 750 ? 'active' : ''}`}>4x</button>
              </div>
            </>
          )}
          <button onClick={toggleTheme} className="theme-toggle-button">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>

      {/* Notification Area */}
      {showNotification && (
        <div className="notification">
          {notificationMessage}
        </div>
      )}

       {/* Event Modal */}
       {showEventModal && gameState.activeEvent && (
         <div className="modal-overlay" onClick={closeEventModal}>
             <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                 <h2>{gameState.activeEvent.icon || '⚠️'} {gameState.activeEvent.name}</h2>
                 <p>{gameState.activeEvent.description}</p>
                 {gameState.activeEvent.type === 'choice' && gameState.activeEvent.choices ? (
                     <div className="modal-actions">
                         {gameState.activeEvent.choices.map((choice, index) => (
                             <button key={index} onClick={() => handleEventChoice(choice.effects)} className="action-button">
                                 {choice.text}
                             </button>
                         ))}
                     </div>
                 ) : (
                     <div className="modal-actions">
                         <button onClick={closeEventModal} className="action-button">Acknowledge</button>
                     </div>
                 )}
             </div>
         </div>
       )}

       {/* Tutorial Modal */}
        {showTutorial && gameStarted && (
          <div className="tutorial-overlay">
            <div className="tutorial-content">
              <div className="tutorial-avatar">
                {tutorialSteps[tutorialStep].character === 'guide' ? '🧑‍🏫' : '👤'}
              </div>
              <div>
                <div className="tutorial-text">
                  {tutorialSteps[tutorialStep].text}
                </div>
                <button onClick={nextTutorialStep} className="action-button tutorial-button">
                    {tutorialStep < tutorialSteps.length - 1 ? 'Next →' : 'Got it!'}
                </button>
              </div>
            </div>
          </div>
        )}


      {/* Main Content Area */}
      {!gameStarted ? (
        // Start Screen
        <main className="game-content">
            <div className="start-screen">
                <h1>🌿 Welcome to EcoTycoon! 🌿</h1>
                <p>Design, build, and manage your own nature reserve. Balance the budget, protect the environment, and foster biodiversity to create a thriving ecosystem.</p>
                <input
                type="text"
                value={parkName}
                onChange={(e) => setParkName(e.target.value)}
                placeholder="Enter Your Park's Name"
                maxLength={20}
                />
                <button onClick={startGame} className="action-button start-button">Start Managing</button>
            </div>
        </main>

      ) : (
        // Game Interface
        <main className="game-content">
            {/* Sidebar for Tabs */}
             <aside className="sidebar">
                 <nav className="tabs">
                    <button onClick={() => setActiveTab('status')} className={activeTab === 'status' ? 'active' : ''}>📊 Status</button>
                    <button onClick={() => setActiveTab('build')} className={activeTab === 'build' ? 'active' : ''}>🏗️ Build</button>
                    <button onClick={() => setActiveTab('species')} className={activeTab === 'species' ? 'active' : ''}>🐾 Species</button>
                    <button onClick={() => setActiveTab('research')} className={activeTab === 'research' ? 'active' : ''}>🔬 Research</button>
                </nav>
             </aside>

          {/* Main Panel for Content */}
            <section className="main-panel">
                {/* Render content based on activeTab */}
                <div className='tab-content'>
                    {activeTab === 'build' && (
                        <>
                            <h2>Build Structures</h2>
                            <div className="item-list">
                                {availableStructures.map((structure) => (
                                <div key={structure.id} className={`item-card ${!structure.unlocked ? 'locked' : ''}`}>
                                    <h3>{structure.icon} {structure.name}</h3>
                                    <p>{structure.description}</p>
                                    <div className="item-info">
                                    Cost: <strong className="negative">{structure.cost} EC</strong> | Upkeep: <strong className="negative">{structure.upkeep} EC/yr</strong> <br/>
                                    Effects:
                                        {structure.effects.envHealth ? <span className={structure.effects.envHealth > 0 ? 'positive' : 'negative'}> {structure.effects.envHealth > 0 ? '+' : ''}{structure.effects.envHealth} H/yr</span> : ''}
                                        {structure.effects.biodiversity ? <span className={structure.effects.biodiversity > 0 ? 'positive' : 'negative'}> {structure.effects.biodiversity > 0 ? '+' : ''}{structure.effects.biodiversity} B/yr</span> : ''}
                                        {structure.effects.ecoCredits ? <span className={structure.effects.ecoCredits > 0 ? 'positive' : 'negative'}> {structure.effects.ecoCredits > 0 ? '+' : ''}{structure.effects.ecoCredits} EC/yr</span> : ''}
                                        {structure.effects.researchPoints ? <span className="positive"> +{structure.effects.researchPoints} RP/yr</span> : ''}
                                    </div>
                                    <div className="item-actions">
                                        <button
                                            onClick={() => buildStructure(structure.id)}
                                            className="action-button"
                                            disabled={gameState.ecoCredits < structure.cost || !structure.unlocked}
                                            title={!structure.unlocked ? 'Unlock through research or progress' : ''}
                                        >
                                            {structure.unlocked ? 'Build' : 'Locked'}
                                        </button>
                                    </div>
                                </div>
                                ))}
                            </div>
                         </>
                    )}

                    {activeTab === 'species' && (
                         <>
                            <h2>Introduce Species</h2>
                            <div className="item-list">
                                {availableSpecies.map((species) => (
                                <div key={species.id} className={`item-card ${species.introduced ? 'locked' : ''}`}>
                                    <h3>{species.icon} {species.name}</h3>
                                     <p>{species.description}</p>
                                    <div className="item-info">
                                        Cost: <strong className="negative">{species.cost} EC</strong> | Type: <strong>{species.type}</strong> <br/>
                                        Habitat: <strong>{species.habitatRequirement}</strong><br/>
                                        Impact:
                                            <span className={species.envImpact > 0 ? 'positive' : 'negative'}> {species.envImpact > 0 ? '+' : ''}{species.envImpact} H</span> |
                                            <span className={species.biodiversityImpact > 0 ? 'positive' : 'negative'}> {species.biodiversityImpact > 0 ? '+' : ''}{species.biodiversityImpact} B</span>
                                    </div>
                                     <div className="item-actions">
                                        <button
                                            onClick={() => introduceSpecies(species.id)}
                                            className="action-button"
                                            disabled={gameState.ecoCredits < species.cost || species.introduced || !availableStructures.find(str => str.name === species.habitatRequirement)}
                                            title={species.introduced ? 'Already introduced' : `Requires ${species.habitatRequirement}`}
                                        >
                                            {species.introduced ? 'Introduced' : 'Introduce'}
                                        </button>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </>
                    )}

                    {activeTab === 'research' && (
                        <>
                            <h2>Research Projects</h2>
                            <div className="item-list">
                                {availableResearch.map((research) => {
                                    const prereqsMet = research.prerequisites.every(prereqId => gameState.completedResearch.includes(prereqId));
                                    return (
                                        <div key={research.id} className={`item-card ${research.completed ? 'locked' : ''} ${!prereqsMet ? 'locked' : ''}`}>
                                            <h3>{research.icon} {research.name}</h3>
                                            <p>{research.effect}</p>
                                            <div className="item-info">
                                                Cost: <strong className="negative">{research.cost} RP</strong> | Duration: <strong>{research.duration} yrs</strong> <br/>
                                                Requires: {research.prerequisites.length > 0 ? research.prerequisites.map(p => availableResearch.find(r=>r.id===p)?.name || p).join(', ') : 'None'}
                                            </div>
                                            <div className="item-actions">
                                                <button
                                                    onClick={() => startResearch(research.id)}
                                                    className="action-button"
                                                    disabled={gameState.researchPoints < research.cost || research.completed || !prereqsMet}
                                                    title={research.completed ? 'Already researched' : !prereqsMet ? 'Prerequisites not met' : ''}
                                                >
                                                    {research.completed ? 'Completed' : 'Research'}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                         </>
                    )}

                    {activeTab === 'status' && (
                        <>
                            <h2>Park Status Overview</h2>
                             {/* Yearly Change Summary */}
                              <div className="status-card" style={{marginBottom: '1.5rem'}}>
                                <h3>📈 Yearly Changes</h3>
                                <ul className="status-list">
                                    <li><span>EcoCredits Income/Expense:</span> <span className={yearlyChanges.deltaCredits >= 0 ? 'positive' : 'negative'}>{yearlyChanges.deltaCredits >= 0 ? '+' : ''}{yearlyChanges.deltaCredits.toFixed(1)} EC</span></li>
                                    <li><span>Environmental Health Trend:</span> <span className={yearlyChanges.deltaEnvHealth >= 0 ? 'positive' : 'negative'}>{yearlyChanges.deltaEnvHealth >= 0 ? '+' : ''}{yearlyChanges.deltaEnvHealth.toFixed(1)} /yr</span></li>
                                    <li><span>Biodiversity Trend:</span> <span className={yearlyChanges.deltaBiodiversity >= 0 ? 'positive' : 'negative'}>{yearlyChanges.deltaBiodiversity >= 0 ? '+' : ''}{yearlyChanges.deltaBiodiversity.toFixed(1)} /yr</span></li>
                                    <li><span>Research Points Generation:</span> <span className="positive">+{yearlyChanges.deltaResearch.toFixed(1)} RP/yr</span></li>
                                </ul>
                            </div>

                            <div className="status-grid">
                                {/* Placed Structures */}
                                <div className="status-card">
                                    <h3>🏗️ Built Structures ({gameState.placedStructures.length})</h3>
                                    <ul className="status-list">
                                        {gameState.placedStructures.length === 0 && <li>No structures built yet.</li>}
                                        {gameState.placedStructures.map((ps) => {
                                            const def = availableStructures.find(s => s.id === ps.structureId);
                                            const canUpgrade = def && ps.level < def.maxLevel && gameState.ecoCredits >= (def.cost * (ps.level * 0.8));
                                            return (
                                                <li key={ps.instanceId}>
                                                    <span>{def?.icon} {def?.name || ps.structureId}</span>
                                                    <div>
                                                         <span className="level">Lv {ps.level}</span>
                                                         {def && ps.level < def.maxLevel &&
                                                            <button
                                                                onClick={() => upgradeStructure(ps.instanceId)}
                                                                className="action-button upgrade-btn"
                                                                disabled={!canUpgrade}
                                                                title={`Upgrade Cost: ${Math.round(def.cost * (ps.level * 0.8))} EC`}
                                                                >
                                                                Upgrd
                                                                </button>
                                                         }
                                                    </div>

                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>

                                {/* Introduced Species */}
                                <div className="status-card">
                                    <h3>🐾 Introduced Species ({gameState.introducedSpecies.length})</h3>
                                    <ul className="status-list">
                                        {gameState.introducedSpecies.length === 0 && <li>No species introduced yet.</li>}
                                        {gameState.introducedSpecies.map((spId) => {
                                            const def = availableSpecies.find(s => s.id === spId);
                                            return <li key={spId}><span>{def?.icon} {def?.name || spId}</span> <span>({def?.type})</span></li>;
                                        })}
                                    </ul>
                                </div>

                                {/* Completed Research */}
                                <div className="status-card">
                                    <h3>🔬 Completed Research ({gameState.completedResearch.length})</h3>
                                    <ul className="status-list">
                                        {gameState.completedResearch.length === 0 && <li>No research completed yet.</li>}
                                        {gameState.completedResearch.map((resId) => {
                                             const def = availableResearch.find(r => r.id === resId);
                                             return <li key={resId}><span>{def?.icon} {def?.name || resId}</span></li>;
                                        })}
                                    </ul>
                                </div>

                                 {/* Achievements */}
                                <div className="status-card">
                                     <h3>🏆 Achievements ({achievements.filter(a=>a.unlocked).length} / {achievements.length})</h3>
                                     <ul className='achievement-list'>
                                         {achievements.map(ach => (
                                             <li key={ach.id} className={`achievement-item ${ach.unlocked ? 'unlocked' : ''}`}>
                                                 <span className='achievement-icon'>{ach.unlocked ? '✅' : '❔'}</span>
                                                 <div className='achievement-details'>
                                                     <h4>{ach.name}</h4>
                                                     <p>{ach.description}</p>
                                                 </div>
                                             </li>
                                         ))}
                                     </ul>
                                 </div>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </main>
      )}
    </div>
  );
};

export default EcoTycoon;