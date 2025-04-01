export type EraId = 'triassic' | 'jurassic' | 'cretaceous';

interface EraInfo {
  name: string;
  period: string;
  description: string;
  facts: string[];
  dinosaurs: string[];
  climate: string;
  vegetation: string;
  difficulty: number;
  color: string;
  unlockRequirement: number;
}

export const ERAS: Record<EraId, EraInfo> = {
  triassic: {
    name: 'Triassic',
    period: '251-199 million years ago',
    description: 'The beginning of the age of dinosaurs, when the first dinosaurs evolved.',
    facts: [
      'The supercontinent Pangaea existed during this time',
      'Many reptiles lived on land during this period',
      'The climate was hot and dry',
      'The first dinosaurs were small and bipedal',
      'Primitive conifers were the dominant plants'
    ],
    dinosaurs: [
      'Coelophysis',
      'Plateosaurus',
      'Eoraptor'
    ],
    climate: 'Hot and dry with seasonal monsoons',
    vegetation: 'Ferns, cycads, and conifers',
    difficulty: 1,
    color: '#ff9966',
    unlockRequirement: 0 // Starting era
  },
  jurassic: {
    name: 'Jurassic',
    period: '199-145 million years ago',
    description: 'The golden age of dinosaurs, when the largest dinosaurs roamed the Earth.',
    facts: [
      'Pangaea began breaking apart',
      'The first birds evolved',
      'Giant long-necked dinosaurs were common',
      'The climate was warm and humid',
      'Lush forests covered much of the land'
    ],
    dinosaurs: [
      'Diplodocus',
      'Allosaurus',
      'Stegosaurus',
      'Archaeopteryx'
    ],
    climate: 'Warm and humid with mild seasons',
    vegetation: 'Dense forests of conifers, cycads, and ferns',
    difficulty: 2,
    color: '#99ccff',
    unlockRequirement: 100 // Points needed to unlock
  },
  cretaceous: {
    name: 'Cretaceous',
    period: '145-66 million years ago',
    description: 'The last period of the dinosaurs, ending with their extinction.',
    facts: [
      'T-Rex and Triceratops lived during this time',
      'The first flowering plants appeared',
      'Ended with a massive asteroid impact',
      'The climate was generally warm',
      'Sea levels were much higher than today'
    ],
    dinosaurs: [
      'Tyrannosaurus Rex',
      'Triceratops',
      'Velociraptor',
      'Spinosaurus'
    ],
    climate: 'Warm with seasonal variations',
    vegetation: 'First flowering plants, diverse forests',
    difficulty: 3,
    color: '#ffcc66',
    unlockRequirement: 300 // Points needed to unlock
  }
};

export function getEraInfo(era: EraId): EraInfo {
  return ERAS[era];
}

export function getRandomDinosaur(era: EraId): string {
  const dinos = ERAS[era].dinosaurs;
  return dinos[Math.floor(Math.random() * dinos.length)];
}

export function getRandomFact(era: EraId): string {
  const facts = ERAS[era].facts;
  return facts[Math.floor(Math.random() * facts.length)];
}

export function getNextEra(currentEra: EraId): EraId | null {
  const eraOrder: EraId[] = ['triassic', 'jurassic', 'cretaceous'];
  const currentIndex = eraOrder.indexOf(currentEra);
  
  if (currentIndex === -1 || currentIndex === eraOrder.length - 1) {
    return null;
  }
  
  return eraOrder[currentIndex + 1];
}

export function getPreviousEra(currentEra: EraId): EraId | null {
  const eraOrder: EraId[] = ['triassic', 'jurassic', 'cretaceous'];
  const currentIndex = eraOrder.indexOf(currentEra);
  
  if (currentIndex <= 0) {
    return null;
  }
  
  return eraOrder[currentIndex - 1];
}

export function isEraUnlocked(era: EraId, score: number): boolean {
  return score >= ERAS[era].unlockRequirement;
}

export function getRequiredScore(era: EraId): number {
  return ERAS[era].unlockRequirement;
}

export function getEraColor(era: EraId, darkMode: boolean = false): string {
  if (darkMode) {
    // Darken the colors for dark mode
    switch (era) {
      case 'triassic': return '#cc5533';
      case 'jurassic': return '#336699';
      case 'cretaceous': return '#cc9933';
      default: return '#666666';
    }
  }
  return ERAS[era].color;
}

export function getProgressInEra(score: number): {
  currentEra: EraId;
  progress: number;
  nextUnlock: number | null;
} {
  const eraOrder: EraId[] = ['triassic', 'jurassic', 'cretaceous'];
  
  for (let i = eraOrder.length - 1; i >= 0; i--) {
    const era = eraOrder[i];
    const requirement = ERAS[era].unlockRequirement;
    
    if (score >= requirement) {
      const nextEra = eraOrder[i + 1];
      const nextRequirement = nextEra ? ERAS[nextEra].unlockRequirement : null;
      
      let progress = 1;
      if (nextRequirement) {
        progress = (score - requirement) / (nextRequirement - requirement);
        progress = Math.min(1, Math.max(0, progress));
      }
      
      return {
        currentEra: era,
        progress,
        nextUnlock: nextRequirement
      };
    }
  }
  
  // Default to starting era
  return {
    currentEra: 'triassic',
    progress: 0,
    nextUnlock: ERAS.jurassic.unlockRequirement
  };
}
