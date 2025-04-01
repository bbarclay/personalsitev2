export interface CategoryMetadata {
  icon: string;  // Lucide icon name or emoji
  color: string; // Tailwind color class
  description: string;
}

export const CATEGORY_REGISTRY: Record<string, CategoryMetadata> = {
  "Algebra": {
    icon: "🧮",
    color: "text-blue-600",
    description: "Explore algebraic structures and operations"
  },
  "Calculus": {
    icon: "∫",
    color: "text-green-600", 
    description: "Study rates of change and accumulation"
  },
  "Game Theory": {
    icon: "🎮",
    color: "text-purple-600",
    description: "Analyze strategic decision making"
  },
  "Geometry": {
    icon: "📐",
    color: "text-red-600",
    description: "Investigate shapes and spatial relationships"
  },
  "Graph Theory": {
    icon: "🕸️",
    color: "text-yellow-600",
    description: "Study networks and connections"
  },
  "Number Theory": {
    icon: "🔢",
    color: "text-indigo-600",
    description: "Explore properties of numbers"
  },
  "Probability": {
    icon: "🎲",
    color: "text-pink-600",
    description: "Analyze chance and uncertainty"
  },
  "Set Theory": {
    icon: "⊆",
    color: "text-cyan-600",
    description: "Study collections and their relationships"
  },
  "Statistics": {
    icon: "📊",
    color: "text-orange-600",
    description: "Analyze data and make inferences"
  },
  "Topology": {
    icon: "🔄",
    color: "text-teal-600",
    description: "Study geometric properties preserved under deformation"
  },
  "Category Theory": {
    icon: "🏹",
    color: "text-violet-600",
    description: "Study mathematical structures and their mappings"
  },
  "Combinatorics": {
    icon: "🔀",
    color: "text-emerald-600",
    description: "Study counting, arrangement, and combination"
  }
};

export function getCategoryMetadata(category: string): CategoryMetadata {
  return CATEGORY_REGISTRY[category] || {
    icon: "📚",
    color: "text-gray-600",
    description: "General mathematical concepts"
  };
}