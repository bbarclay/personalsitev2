import { MathPageMeta } from '../types';
import { mathTools } from '../config/tools';

// Check if we're running on the server
const isServer = typeof window === 'undefined';

/**
 * Get all Math tools metadata
 */
export function getMathTools(): MathPageMeta[] {
  // When running in the browser, always return the hardcoded tools
  if (!isServer) {
    return mathTools.filter(tool => tool.enabled !== false);
  }

  // Server-side code to dynamically discover tools from meta.json files
  try {
    // Only import fs and path on the server
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require('fs');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require('path');
    
    // Root directory for Math tools
    const MATH_TOOLS_ROOT = path.join(process.cwd(), 'src', 'app', 'math');
    
    // Helper function to capitalize first letter
    function capitalizeFirstLetter(string: string): string {
      return string.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }
    
    // Function to recursively find meta.json files
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
    
    // Function to load and parse meta.json file
    function loadMetaFile(filePath: string): MathPageMeta {
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
            level: 'Beginner',
            icon: '❌',
            color: 'from-gray-400 to-gray-500',
            shape: 'rectangle',
            path: '',
            enabled: false
          };
        }
        
        // Extract the tool ID and category from the directory path
        const toolDirectory = path.dirname(filePath);
        const toolId = path.basename(toolDirectory);
        
        // Get the directory structure
        const relPath = path.relative(MATH_TOOLS_ROOT, toolDirectory);
        const pathParts = relPath.split(path.sep);
        
        // Ensure consistent capitalization for categories
        const category = capitalizeFirstLetter(data.category || pathParts[0] || '');
        
        // Construct the URL path
        let urlPath = '';
        if (pathParts.length > 0) {
          // The tool is inside a category directory
          urlPath = `/math/${relPath}`;
        } else {
          // The tool is directly in the Math directory
          urlPath = `/math/${toolId}`;
        }
        
        // Map difficulty to level if needed
        let level = data.level;
        if (!level && data.difficulty) {
          level = capitalizeFirstLetter(data.difficulty) as 'Beginner' | 'Intermediate' | 'Advanced';
        }
        
        // Ensure the ID is set correctly
        return {
          ...data,
          id: data.id || toolId,
          category,
          level: level || 'Beginner',
          icon: data.icon || '📊',
          color: data.color || 'from-blue-600 to-indigo-600',
          shape: data.shape || 'rectangle',
          path: data.path || urlPath,
          enabled: data.enabled !== false // Default to enabled if not specified
        };
      } catch (error) {
        console.error(`Error loading meta file ${filePath}:`, error);
        // Return a minimal object to avoid breaking the UI
        return {
          id: 'error',
          title: 'Error Loading Tool',
          description: 'Failed to load tool metadata',
          category: 'Error',
          level: 'Beginner',
          icon: '⚠️',
          color: 'from-red-500 to-red-600',
          shape: 'rectangle',
          path: '',
          enabled: false
        };
      }
    }
    
    // Create a map to track tools by ID to prevent duplicates
    const toolsMap = new Map<string, MathPageMeta>();
    
    // First add all hardcoded tools to the map
    for (const tool of mathTools) {
      if (tool.enabled !== false) {
        toolsMap.set(tool.id, tool);
      }
    }
    
    // Find all meta.json files
    const metaFilePaths = findMetaFiles(MATH_TOOLS_ROOT);
    console.log(`Found ${metaFilePaths.length} meta.json files in Math directory`);
    
    // Load and parse each file
    const dynamicTools = metaFilePaths.map(loadMetaFile)
      .filter(tool => tool.id !== 'error' && tool.id !== 'disabled' && tool.enabled !== false);
    
    // Add dynamic tools to the map, overriding hardcoded tools with the same ID
    for (const tool of dynamicTools) {
      // Only add the tool if we haven't seen it before
      if (!toolsMap.has(tool.id)) {
        toolsMap.set(tool.id, tool);
      }
    }
    
    // Convert map back to array
    return Array.from(toolsMap.values());
  } catch (error) {
    console.error('Error getting Math tools dynamically:', error);
    // Fall back to hardcoded tools
    console.log('Falling back to hardcoded Math tools');
    return mathTools.filter(tool => tool.enabled !== false);
  }
} 