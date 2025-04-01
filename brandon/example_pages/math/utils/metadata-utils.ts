// Client-side metadata utilities
export interface MathComponentMetadata {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  tags: string[];
  url: string;
  metadata: {
    createdAt: string;
    lastUpdated: string;
    author: string;
    version: string;
    interactivityLevel: string;
    computationalIntensity: string;
    prerequisites: string[];
    relatedComponents: string[];
    documentation: {
      status: string;
      lastUpdated: string;
    };
    usage: {
      views: number;
      ratings: number[];
      averageRating: number;
    };
  };
}

export function formatComponentTitle(id: string): string {
  return id
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getComponentUrl(id: string): string {
  return `/math/${id}`;
}

export function calculateAverageRating(ratings: number[]): number {
  if (!ratings.length) return 0;
  return ratings.reduce((a, b) => a + b, 0) / ratings.length;
}

export function createEmptyMetadata(id: string): MathComponentMetadata {
  const now = new Date().toISOString();
  
  return {
    id,
    title: formatComponentTitle(id),
    description: `Description for ${id}`,
    category: "General",
    difficulty: "Intermediate",
    tags: [],
    url: getComponentUrl(id),
    metadata: {
      createdAt: now,
      lastUpdated: now,
      author: "Brandon",
      version: "1.0.0",
      interactivityLevel: "Medium",
      computationalIntensity: "Low",
      prerequisites: [],
      relatedComponents: [],
      documentation: {
        status: "Pending",
        lastUpdated: now
      },
      usage: {
        views: 0,
        ratings: [],
        averageRating: 0
      }
    }
  };
}