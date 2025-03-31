import { z } from 'zod';

// Custom type for icon that can be either a string or a component name
export type IconType = string | { component: string; props?: Record<string, any> };

export const DifficultyEnum = z.enum(['beginner', 'intermediate', 'advanced']);
export type Difficulty = z.infer<typeof DifficultyEnum>;

// Custom refinement for IconType
const iconSchema = z.union([
  z.string(),
  z.object({
    component: z.string(),
    props: z.record(z.any()).optional()
  })
]);

export const TabSchema = z.object({
  id: z.string(),
  label: z.string(),
  icon: iconSchema,
  color: z.object({
    active: z.string(),
    hover: z.string()
  })
});

export const RelatedToolSchema = z.object({
  id: z.string(),
  title: z.string(),
  icon: iconSchema,
  path: z.string()
});

export const ToolMetaSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  subcategory: z.string().optional(),
  featured: z.boolean().optional(),
  difficulty: DifficultyEnum,
  lastUpdated: z.string(),
  icon: iconSchema,
  color: z.string(),
  shape: z.string().optional(),
  enabled: z.boolean(),
  tags: z.array(z.string()),
  keywords: z.array(z.string()),
  type: z.enum(['math', 'ai']),
  sidebar: z.object({
    tabs: z.array(TabSchema)
  }).optional(),
  navigation: z.object({
    category: z.object({
      title: z.string(),
      path: z.string()
    }),
    nextTools: z.array(RelatedToolSchema).optional(),
    previousTools: z.array(RelatedToolSchema).optional()
  }).optional()
});

export type ToolMeta = z.infer<typeof ToolMetaSchema>;
export type TabConfig = z.infer<typeof TabSchema>;
export type RelatedTool = z.infer<typeof RelatedToolSchema>;

export interface ToolComponentProps {
  activeTab?: string;
}

export const DEFAULT_SIDEBAR_TABS: TabConfig[] = [
  {
    id: 'solver',
    label: 'Solver',
    icon: '🧮',
    color: {
      active: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300',
      hover: 'bg-gray-100 dark:hover:bg-gray-700/50'
    }
  },
  {
    id: 'explanation',
    label: 'Learn',
    icon: '🔍',
    color: {
      active: 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300',
      hover: 'bg-gray-100 dark:hover:bg-gray-700/50'
    }
  },
  {
    id: 'applications',
    label: 'Uses',
    icon: '🌐',
    color: {
      active: 'bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-300',
      hover: 'bg-gray-100 dark:hover:bg-gray-700/50'
    }
  },
  {
    id: 'resources',
    label: 'Resources',
    icon: '📚',
    color: {
      active: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-300',
      hover: 'bg-gray-100 dark:hover:bg-gray-700/50'
    }
  }
];
