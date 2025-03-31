export interface MathPageMeta {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  icon: string;
  color: string;
  shape: 'square' | 'circle' | 'triangle' | 'hexagon' | 'parallelogram' | 'rectangle';
  path: string;
  enabled: boolean;
  featured?: boolean;
  tags?: string[];
  keywords?: string[];
  relatedTools?: string[];
}
