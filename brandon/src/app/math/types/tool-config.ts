import { z } from 'zod';

export const DifficultyEnum = z.enum(['beginner', 'intermediate', 'advanced']);
export type Difficulty = z.infer<typeof DifficultyEnum>;

export const TabSchema = z.object({
  id: z.string(),
  label: z.string(),
  icon: z.string(),
  color: z.object({
    active: z.string(),
    hover: z.string()
  })
});

export const MathToolMetaSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  subcategory: z.string().optional(),
  featured: z.boolean().optional(),
  difficulty: DifficultyEnum,
  lastUpdated: z.string(),
  icon: z.string(),
  color: z.string(),
  shape: z.string().optional(),
  enabled: z.boolean(),
  tags: z.array(z.string()),
  keywords: z.array(z.string()),
  relatedTools: z.array(z.string()).optional(),
  sidebar: z.object({
    tabs: z.array(TabSchema)
  }).optional()
});

export type MathToolMeta = z.infer<typeof MathToolMetaSchema>;
export type TabConfig = z.infer<typeof TabSchema>;

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
