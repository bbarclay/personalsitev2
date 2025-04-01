export interface AIPageMeta {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  featured?: boolean;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
  keywords?: string[];
  relatedTools?: string[];
  path: string;
  icon?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  color?: string;
  shape?: string;
  enabled: boolean;
  lastUpdated: string;
}
