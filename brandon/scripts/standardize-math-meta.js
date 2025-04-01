// Standardize meta.json files for math tools

import fs from 'fs/promises';
import path from 'path';

const MATH_TOOLS_DIR = path.join(process.cwd(), 'src', 'app', 'math');

// Map of tool names to their metadata
const toolMappings = {
  'base-visualizer': {
    category: 'Mathematics',
    subcategory: 'Number Systems',
    icon: '🧮',
    color: 'from-blue-500 to-purple-500'
  },
  'basic-erdos': {
    category: 'Mathematics',
    subcategory: 'Graph Theory',
    icon: '🕸️',
    color: 'from-blue-500 to-purple-500'
  },
  'bonus-game': {
    category: 'Mathematics',
    subcategory: 'Game Theory',
    icon: '🎮',
    color: 'from-indigo-500 to-purple-500'
  },
  'collatz': {
    category: 'Mathematics',
    subcategory: 'Number Theory',
    icon: '3n+1',
    color: 'from-purple-500 to-pink-500'
  },
  'collatz-advanced': {
    category: 'Mathematics',
    subcategory: 'Number Theory',
    icon: '🔄',
    color: 'from-purple-500 to-pink-500'
  },
  'collatz-analysis': {
    category: 'Mathematics',
    subcategory: 'Number Theory',
    icon: '📊',
    color: 'from-purple-500 to-pink-500'
  },
  'collatz-calculator': {
    category: 'Mathematics',
    subcategory: 'Number Theory',
    icon: '🧮',
    color: 'from-purple-500 to-pink-500'
  },
  'collatz-network': {
    category: 'Mathematics',
    subcategory: 'Number Theory',
    icon: '🕸️',
    color: 'from-purple-500 to-pink-500'
  },
  'collatz-proof': {
    category: 'Mathematics',
    subcategory: 'Number Theory',
    icon: '✅',
    color: 'from-purple-500 to-pink-500'
  },
  'cryptography-basics': {
    category: 'Mathematics',
    subcategory: 'Cryptography',
    icon: '🔐',
    color: 'from-gray-500 to-slate-500'
  },
  'decoding-linear-programming': {
    category: 'Mathematics',
    subcategory: 'Optimization',
    icon: '📈',
    color: 'from-green-500 to-emerald-500'
  },
  'factorial-calculator': {
    category: 'Mathematics',
    subcategory: 'Number Theory',
    icon: '!',
    color: 'from-violet-500 to-purple-500'
  },
  'fibonacci-display': {
    category: 'Mathematics',
    subcategory: 'Number Theory',
    icon: '🌀',
    color: 'from-yellow-500 to-amber-500'
  },
  'fibonacci-explorer': {
    category: 'Mathematics',
    subcategory: 'Number Theory',
    icon: '🔍',
    color: 'from-yellow-500 to-amber-500'
  },
  'fractal-funhouse': {
    category: 'Mathematics',
    subcategory: 'Fractals',
    icon: '🌿',
    color: 'from-emerald-500 to-green-500'
  },
  'fraction-calculator': {
    category: 'Mathematics',
    subcategory: 'Arithmetic',
    icon: '➗',
    color: 'from-orange-500 to-red-500'
  },
  'fraction-visualizer': {
    category: 'Mathematics',
    subcategory: 'Arithmetic',
    icon: '➗',
    color: 'from-orange-500 to-red-500'
  },
  'genetic-algorithm-biology': {
    category: 'Mathematics',
    subcategory: 'Applied Mathematics',
    icon: '🧬',
    color: 'from-green-500 to-teal-500'
  },
  'genetic-drift-explorer': {
    category: 'Mathematics',
    subcategory: 'Applied Mathematics',
    icon: '🧬',
    color: 'from-green-500 to-teal-500'
  },
  'geometry-playground': {
    category: 'Mathematics',
    subcategory: 'Geometry',
    icon: '📐',
    color: 'from-yellow-500 to-orange-500'
  },
  'geometry-visualizer': {
    category: 'Mathematics',
    subcategory: 'Geometry',
    icon: '📐',
    color: 'from-yellow-500 to-orange-500'
  },
  'graph-theory-explorer': {
    category: 'Mathematics',
    subcategory: 'Graph Theory',
    icon: '🕸️',
    color: 'from-blue-500 to-purple-500'
  },
  'hermites-proof': {
    category: 'Mathematics',
    subcategory: 'Number Theory',
    icon: '📝',
    color: 'from-purple-500 to-pink-500'
  },
  'lemonade-two': {
    category: 'Mathematics',
    subcategory: 'Game Theory',
    icon: '🍋',
    color: 'from-yellow-500 to-amber-500'
  },
  'linear-algebra-visualizer': {
    category: 'Mathematics',
    subcategory: 'Linear Algebra',
    icon: '🔢',
    color: 'from-teal-500 to-green-500'
  },
  'linear-solver': {
    category: 'Mathematics',
    subcategory: 'Linear Algebra',
    icon: '⚡',
    color: 'from-teal-500 to-green-500'
  },
  'linear-systems': {
    category: 'Mathematics',
    subcategory: 'Linear Algebra',
    icon: '📊',
    color: 'from-teal-500 to-green-500'
  },
  'machine-learning': {
    category: 'Mathematics',
    subcategory: 'Applied Mathematics',
    icon: '🤖',
    color: 'from-cyan-500 to-blue-500'
  },
  'matrix-completion': {
    category: 'Mathematics',
    subcategory: 'Linear Algebra',
    icon: '🔲',
    color: 'from-teal-500 to-green-500'
  },
  'matrix-operations': {
    category: 'Mathematics',
    subcategory: 'Linear Algebra',
    icon: '🔢',
    color: 'from-teal-500 to-green-500'
  },
  'multiplication-explorer': {
    category: 'Mathematics',
    subcategory: 'Arithmetic',
    icon: '✖️',
    color: 'from-orange-500 to-red-500'
  },
  'neural-network-viz': {
    category: 'Mathematics',
    subcategory: 'Applied Mathematics',
    icon: '🧠',
    color: 'from-cyan-500 to-blue-500'
  },
  'number-base-converter': {
    category: 'Mathematics',
    subcategory: 'Number Systems',
    icon: '🔄',
    color: 'from-blue-500 to-purple-500'
  },
  'p-adic': {
    category: 'Mathematics',
    subcategory: 'Number Theory',
    icon: '|·|p',
    color: 'from-violet-500 to-purple-500'
  },
  'pattern-explorer': {
    category: 'Mathematics',
    subcategory: 'Number Theory',
    icon: '🔍',
    color: 'from-indigo-500 to-purple-500'
  },
  'polynomial': {
    category: 'Mathematics',
    subcategory: 'Algebra',
    icon: '📈',
    color: 'from-blue-500 to-indigo-500'
  },
  'prime-constellations-v2': {
    category: 'Mathematics',
    subcategory: 'Number Theory',
    icon: '✨',
    color: 'from-purple-500 to-pink-500'
  },
  'prime-numbers-display': {
    category: 'Mathematics',
    subcategory: 'Number Theory',
    icon: '🔢',
    color: 'from-purple-500 to-pink-500'
  },
  'prime-observatory': {
    category: 'Mathematics',
    subcategory: 'Number Theory',
    icon: '🔭',
    color: 'from-purple-500 to-pink-500'
  },
  'prime-spiral': {
    category: 'Mathematics',
    subcategory: 'Number Theory',
    icon: '🌀',
    color: 'from-purple-500 to-pink-500'
  },
  'prime-viz': {
    category: 'Mathematics',
    subcategory: 'Number Theory',
    icon: '📊',
    color: 'from-purple-500 to-pink-500'
  },
  'probability-simulator': {
    category: 'Mathematics',
    subcategory: 'Probability',
    icon: '🎲',
    color: 'from-red-500 to-pink-500'
  },
  'pyramid-builders': {
    category: 'Mathematics',
    subcategory: 'Geometry',
    icon: '🔺',
    color: 'from-yellow-500 to-orange-500'
  },
  'pythagorean-calculator': {
    category: 'Mathematics',
    subcategory: 'Geometry',
    icon: '📐',
    color: 'from-yellow-500 to-orange-500'
  },
  'pythagorean-explorer': {
    category: 'Mathematics',
    subcategory: 'Geometry',
    icon: '🔍',
    color: 'from-yellow-500 to-orange-500'
  },
  'pythagorean-tool': {
    category: 'Mathematics',
    subcategory: 'Geometry',
    icon: '📐',
    color: 'from-yellow-500 to-orange-500'
  },
  'quadratic-solver': {
    category: 'Mathematics',
    subcategory: 'Algebra',
    icon: '⚡',
    color: 'from-blue-500 to-indigo-500'
  },
  'riemann': {
    category: 'Mathematics',
    subcategory: 'Number Theory',
    icon: 'ζ',
    color: 'from-violet-500 to-purple-500'
  },
  'sequence-explorer': {
    category: 'Mathematics',
    subcategory: 'Number Theory',
    icon: '🔢',
    color: 'from-indigo-500 to-purple-500'
  },
  'simple-erdos': {
    category: 'Mathematics',
    subcategory: 'Graph Theory',
    icon: '🕸️',
    color: 'from-blue-500 to-purple-500'
  },
  'sir-epidemic-model-simulator': {
    category: 'Mathematics',
    subcategory: 'Applied Mathematics',
    icon: '🦠',
    color: 'from-green-500 to-teal-500'
  },
  'slot-machine': {
    category: 'Mathematics',
    subcategory: 'Probability',
    icon: '🎰',
    color: 'from-red-500 to-pink-500'
  },
  'statistics-analyzer': {
    category: 'Mathematics',
    subcategory: 'Statistics',
    icon: '📊',
    color: 'from-indigo-500 to-purple-500'
  },
  'ultimate-collatz-explorer': {
    category: 'Mathematics',
    subcategory: 'Number Theory',
    icon: '🚀',
    color: 'from-purple-500 to-pink-500'
  }
};

// Default sidebar configuration
const defaultSidebar = {
  tabs: [
    {
      id: "solver",
      label: "Solver",
      icon: "🧮",
      color: {
        active: "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300",
        hover: "bg-gray-100 dark:hover:bg-gray-700/50"
      }
    },
    {
      id: "explanation",
      label: "Explanation",
      icon: "📚",
      color: {
        active: "bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300",
        hover: "bg-gray-100 dark:hover:bg-gray-700/50"
      }
    },
    {
      id: "applications",
      label: "Applications",
      icon: "🌐",
      color: {
        active: "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-300",
        hover: "bg-gray-100 dark:hover:bg-gray-700/50"
      }
    },
    {
      id: "resources",
      label: "Resources",
      icon: "📖",
      color: {
        active: "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-300",
        hover: "bg-gray-100 dark:hover:bg-gray-700/50"
      }
    }
  ]
};

async function getDirectories(source) {
  const items = await fs.readdir(source, { withFileTypes: true });
  return items
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

function formatToolTitle(dirName) {
  return dirName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function getToolMapping(dirName) {
  // First try exact match
  if (toolMappings[dirName]) {
    return toolMappings[dirName];
  }

  // Then try to match by prefix
  for (const [key, value] of Object.entries(toolMappings)) {
    if (dirName.startsWith(key)) {
      return value;
    }
  }

  // Default mapping
  return {
    category: 'Mathematics',
    subcategory: 'Interactive Tools',
    icon: '🧮',
    color: 'from-blue-500 to-purple-500'
  };
}

async function createMetaJson(directory) {
  const toolTitle = formatToolTitle(directory);
  const mapping = getToolMapping(directory);
  
  const meta = {
    id: toolTitle.replace(/\s+/g, ''),
    title: toolTitle,
    description: `Interactive ${toolTitle} tool for mathematics exploration`,
    category: mapping.category,
    subcategory: mapping.subcategory,
    type: "math",
    difficulty: "intermediate",
    lastUpdated: new Date().toISOString().split('T')[0],
    icon: mapping.icon,
    color: mapping.color,
    shape: "rectangle",
    enabled: true,
    featured: false,
    tags: ["math", "interactive"],
    keywords: [toolTitle.toLowerCase(), "math", "tool"],
    sidebar: defaultSidebar
  };

  const metaPath = path.join(MATH_TOOLS_DIR, directory, 'meta.json');
  await fs.writeFile(metaPath, JSON.stringify(meta, null, 2));
}

async function standardizeMetaFiles() {
  try {
    const directories = await getDirectories(MATH_TOOLS_DIR);
    
    for (const dir of directories) {
      // Skip non-tool directories
      if (['components', 'config', 'templates', 'types', 'utils'].includes(dir)) {
        continue;
      }

      try {
        // Remove metadata.json if it exists
        const metadataPath = path.join(MATH_TOOLS_DIR, dir, 'metadata.json');
        try {
          await fs.unlink(metadataPath);
        } catch (err) {
          // Ignore if file doesn't exist
        }

        // Create/update meta.json
        await createMetaJson(dir);
        console.log(`✓ Standardized meta.json for ${dir}`);
      } catch (err) {
        console.error(`Error processing ${dir}:`, err);
      }
    }
  } catch (err) {
    console.error('Error standardizing meta files:', err);
  }
}

standardizeMetaFiles();
