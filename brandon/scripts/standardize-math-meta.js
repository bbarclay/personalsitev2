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
  'geometry': {
    category: 'Mathematics',
    subcategory: 'Geometry',
    icon: '📐',
    color: 'from-yellow-500 to-orange-500'
  },
  'linear-algebra': {
    category: 'Mathematics',
    subcategory: 'Linear Algebra',
    icon: '🔢',
    color: 'from-teal-500 to-green-500'
  },
  'probability': {
    category: 'Mathematics',
    subcategory: 'Probability',
    icon: '🎲',
    color: 'from-red-500 to-pink-500'
  },
  'statistics': {
    category: 'Mathematics',
    subcategory: 'Statistics',
    icon: '📊',
    color: 'from-indigo-500 to-purple-500'
  }
  // Add mappings for other tools...
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
