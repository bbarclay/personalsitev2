import { ToolMeta, TabConfig } from '../types/tool-types';

export const DEFAULT_TOOL_META: Partial<ToolMeta> = {
  enabled: true,
  difficulty: 'intermediate',
  lastUpdated: new Date().toISOString().split('T')[0],
  sidebar: {
    tabs: DEFAULT_SIDEBAR_TABS
  }
};

export const DEFAULT_MATH_TOOL_META: Partial<ToolMeta> = {
  ...DEFAULT_TOOL_META,
  type: 'math',
  category: 'Math',
  navigation: {
    category: {
      title: 'Mathematics',
      path: '/math'
    }
  }
};

export const DEFAULT_AI_TOOL_META: Partial<ToolMeta> = {
  ...DEFAULT_TOOL_META,
  type: 'ai',
  category: 'AI',
  navigation: {
    category: {
      title: 'AI Tools',
      path: '/ai'
    }
  }
};

export function createToolMeta(
  baseMeta: Partial<ToolMeta>,
  overrides: Partial<ToolMeta>
): ToolMeta {
  return {
    ...baseMeta,
    ...overrides,
    // Ensure required fields are present
    id: overrides.id || baseMeta.id || '',
    title: overrides.title || baseMeta.title || '',
    description: overrides.description || baseMeta.description || '',
    icon: overrides.icon || baseMeta.icon || '📊',
    color: overrides.color || baseMeta.color || '#000000',
    tags: overrides.tags || baseMeta.tags || [],
    keywords: overrides.keywords || baseMeta.keywords || [],
  } as ToolMeta;
} 