import { ToolMeta, DEFAULT_SIDEBAR_TABS } from '../types/tool-types';

// Global defaults that apply to all tools regardless of type
const GLOBAL_DEFAULTS: Partial<ToolMeta> = {
  enabled: true,
  difficulty: 'intermediate',
  lastUpdated: new Date().toISOString().split('T')[0]
};

// Type-specific defaults
const TYPE_DEFAULTS: Record<string, Partial<ToolMeta>> = {
  math: {
    category: 'Math',
    type: 'math' as const,
    navigation: {
      category: {
        title: 'Mathematics',
        path: '/math'
      }
    }
  },
  ai: {
    category: 'AI',
    type: 'ai' as const,
    navigation: {
      category: {
        title: 'AI Tools',
        path: '/ai'
      }
    }
  }
};

/**
 * Loads a tool meta configuration and applies defaults
 */
export function loadToolMeta(metaJson: any): ToolMeta {
  // Apply defaults in correct order (global -> type -> specific)
  const typeDefaults = TYPE_DEFAULTS[metaJson.type as string] || {};
  
  // Format color to ensure it's a string
  const colorString = typeof metaJson.color === 'string' 
    ? metaJson.color 
    : (typeof metaJson.color === 'object' && metaJson.color !== null && 'gradient' in metaJson.color
      ? (metaJson.color as any).gradient 
      : undefined);
  
  // Process sidebar tabs with proper defaults
  let sidebarConfig = {};
  if (metaJson.sidebar) {
    // If sidebar is provided in meta.json but tabs aren't, use DEFAULT_SIDEBAR_TABS
    if (!metaJson.sidebar.tabs || !Array.isArray(metaJson.sidebar.tabs) || metaJson.sidebar.tabs.length === 0) {
      sidebarConfig = { 
        sidebar: { 
          ...metaJson.sidebar, 
          tabs: DEFAULT_SIDEBAR_TABS 
        } 
      };
    }
    // Otherwise, use the provided tabs (they'll be merged with metaJson.sidebar later)
  } else {
    // If no sidebar config at all, use default tabs
    sidebarConfig = { 
      sidebar: { 
        tabs: DEFAULT_SIDEBAR_TABS 
      } 
    };
  }
  
  // Construct path if not provided
  const path = metaJson.path || `/${metaJson.type || 'ai'}/${metaJson.id}`;
  
  // Apply all defaults in order of precedence
  const meta = {
    ...GLOBAL_DEFAULTS,
    ...typeDefaults,
    ...sidebarConfig,
    ...metaJson,
    // Add path to ensure it's always present
    path,
    // Make sure sidebar structure is maintained if metaJson has sidebar but not tabs
    sidebar: {
      ...(sidebarConfig.sidebar || {}),
      ...(metaJson.sidebar || {}),
      tabs: metaJson.sidebar?.tabs || sidebarConfig.sidebar?.tabs || DEFAULT_SIDEBAR_TABS
    },
    // Override with properly formatted values
    color: colorString || typeDefaults.color || '#3b82f6', // default to blue if not provided
    difficulty: (metaJson.difficulty?.toLowerCase?.() || 'intermediate') as 'beginner' | 'intermediate' | 'advanced',
    // Ensure tags and keywords are arrays
    tags: metaJson.tags || [],
    keywords: metaJson.keywords || []
  } as ToolMeta;
  
  return meta;
} 