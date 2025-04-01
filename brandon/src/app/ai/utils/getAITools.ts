import { AIPageMeta } from '../types';

// Check if we're running on the server
const isServer = typeof window === 'undefined';

// Fallback AI tools for client-side rendering
const fallbackAITools: AIPageMeta[] = [
  {
    id: "story-generator",
    title: "AI Story Generator",
    description: "Generate creative stories based on prompts with customizable genre, length, and style",
    category: "Text Generation",
    subcategory: "Creative Writing",
    featured: true,
    lastUpdated: "2023-03-29",
    icon: "📝",
    tags: ["creative writing", "storytelling", "fiction", "writing assistant"],
    keywords: ["story", "generator", "AI writing", "prompt", "creative"],
    relatedTools: ["text-summarizer", "essay-writer"],
    enabled: true,
    path: "/ai/text-generation/story-generator",
    color: "blue",
    level: "Beginner",
    shape: "square"
  },
  {
    id: "image-generator",
    title: "AI Image Generator",
    description: "Create custom images from text descriptions using advanced AI image generation",
    category: "Image Generation",
    subcategory: "Creative",
    featured: true,
    lastUpdated: "2023-03-29",
    icon: "🖼️",
    tags: ["image generation", "AI art", "creative", "design"],
    keywords: ["image", "generator", "AI art", "design", "creative"],
    relatedTools: ["image-editor", "style-transfer"],
    enabled: true,
    path: "/ai/image-generation/image-generator",
    color: "green",
    level: "Intermediate",
    shape: "circle"
  },
  {
    id: "code-assistant",
    title: "AI Code Assistant",
    description: "Generate, debug, and optimize code with AI-powered programming assistance",
    category: "Code Generation",
    subcategory: "Programming",
    featured: true,
    lastUpdated: "2023-03-29",
    icon: "💻",
    tags: ["programming", "code generation", "debugging", "software development"],
    keywords: ["code", "programming", "development", "assistant", "AI coding"],
    relatedTools: ["code-explainer", "code-translator"],
    enabled: true,
    path: "/ai/code-generation/code-assistant",
    color: "purple",
    level: "Advanced",
    shape: "triangle"
  },
  {
    id: "chatbot",
    title: "AI Chatbot",
    description: "Interact with an AI assistant that can answer questions and provide information",
    category: "Chatbots",
    subcategory: "Conversational AI",
    featured: true,
    lastUpdated: "2023-03-29",
    icon: "💬",
    tags: ["chatbot", "conversational AI", "assistant", "Q&A"],
    keywords: ["chat", "assistant", "AI conversation", "Q&A", "help"],
    relatedTools: ["story-generator", "code-assistant"],
    enabled: true,
    path: "/ai/chatbots/chatbot",
    color: "orange",
    level: "Beginner",
    shape: "hexagon"
  },
  {
    id: "data-analyzer",
    title: "AI Data Analyzer",
    description: "Analyze and visualize data with AI-powered insights and pattern recognition",
    category: "Data Analysis",
    subcategory: "Analytics",
    featured: true,
    lastUpdated: "2023-03-29",
    icon: "📊",
    tags: ["data analysis", "visualization", "analytics", "insights"],
    keywords: ["data", "analysis", "visualization", "analytics", "insights"],
    relatedTools: ["chatbot", "code-assistant"],
    enabled: true,
    path: "/ai/data-analysis/data-analyzer",
    color: "red",
    level: "Intermediate",
    shape: "parallelogram"
  }
];

/**
 * Get all AI tools metadata at build time
 */
export async function getAITools(): Promise<AIPageMeta[]> {
  // When running in the browser, return fallback tools
  if (!isServer) {
    console.log('Running getAITools on client side - returning fallback tools');
    return fallbackAITools;
  }

  try {
    // Only import fs and path on the server
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require('fs');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require('path');

    // Root directory for AI tools
    const AI_TOOLS_ROOT = path.join(process.cwd(), 'src', 'app', 'ai');

    /**
     * Recursively find all meta.json files in the AI directory
     */
    function findMetaFiles(dir: string): string[] {
      const files: string[] = [];

      try {
        // Read directory contents synchronously
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);

          if (entry.isDirectory()) {
            // Recursively search directories
            files.push(...findMetaFiles(fullPath));
          } else if (entry.name === 'meta.json') {
            // Found a meta.json file
            files.push(fullPath);
          }
        }
      } catch (error) {
        console.error(`Error reading directory ${dir}:`, error);
      }

      return files;
    }

    /**
     * Utility function to capitalize the first letter of a string
     */
    function capitalizeFirstLetter(str: string): string {
      if (!str || str.length === 0) return str;
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * Load and parse a meta.json file
     */
    function loadMetaFile(filePath: string): AIPageMeta {
      try {
        // Read file synchronously
        const content = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(content);

        // Skip disabled tools
        if (data.enabled === false) {
          return {
            id: 'disabled',
            title: 'Disabled Tool',
            description: 'This tool is disabled',
            category: 'Disabled',
            lastUpdated: new Date().toISOString().split('T')[0],
            enabled: false,
            color: 'gray',
            icon: 'disabled',
            path: ''
          };
        }

        // Extract the tool ID and category from the directory path
        const toolDirectory = path.dirname(filePath);
        const toolId = path.basename(toolDirectory);

        // Get the directory structure
        const relPath = path.relative(AI_TOOLS_ROOT, toolDirectory);
        const pathParts = relPath.split(path.sep);

        // Ensure consistent capitalization for categories
        const category = capitalizeFirstLetter(data.category || pathParts[0] || '');
        const subcategory = data.subcategory ? capitalizeFirstLetter(data.subcategory) : undefined;

        // Construct the URL path
        let urlPath = '';
        if (pathParts.length > 1) {
          // The tool is inside a category directory
          urlPath = `/ai/${relPath}`;
        } else {
          // The tool is directly in the AI directory
          urlPath = `/ai/${toolId}`;
        }

        // Ensure the ID is set correctly
        return {
          ...data,
          id: data.id || toolId,
          title: data.title,
          description: data.description,
          category: category,
          subcategory: subcategory,
          featured: data.featured,
          difficulty: data.difficulty,
          tags: data.tags,
          keywords: data.keywords,
          relatedTools: data.relatedTools,
          path: data.path || urlPath,
          color: data.color,
          icon: data.icon,
          enabled: data.enabled !== false, // Default to enabled if not specified
          lastUpdated: data.lastUpdated
        };
      } catch (error) {
        console.error(`Error loading meta file ${filePath}:`, error);
        // Return a minimal object to avoid breaking the UI
        return {
          id: 'error',
          title: 'Error Loading Tool',
          description: 'Failed to load tool metadata',
          category: 'Error',
          lastUpdated: new Date().toISOString().split('T')[0],
            enabled: false,
            color: 'red',
            icon: 'error',
            path: ''
          };
      }
    }

    // Create a map to track tools by ID to prevent duplicates
    const toolsMap = new Map<string, AIPageMeta>();

    // Add fallback tools to the map first (will be overridden by discovered tools)
    for (const tool of fallbackAITools) {
      if (tool.enabled !== false) {
        toolsMap.set(tool.id, tool);
      }
    }

    // Find all meta.json files
    const metaFilePaths = findMetaFiles(AI_TOOLS_ROOT);
    console.log(`Found ${metaFilePaths.length} meta.json files in AI directory`);

    // Load and parse each file
    const discoveredTools = metaFilePaths.map(loadMetaFile)
      .filter(tool => tool.id !== 'error' && tool.id !== 'disabled' && tool.enabled !== false);

    // Add discovered tools to the map, overriding fallback tools with the same ID
    for (const tool of discoveredTools) {
      toolsMap.set(tool.id, tool);
    }

    // Convert map back to array
    return Array.from(toolsMap.values());
  } catch (error) {
    console.error('Error getting AI tools:', error);
    return fallbackAITools;
  }
}
