
import { ReactNode } from 'react';

export interface Skill {
  name: string;
  category: string; // This should match category.slug
  proficiency: number;
  experience: string;
  description: string;
  relatedTech: string[];
  icon: string; // Icon name from lucide-react
  achievements?: string[]; // Optional list of achievements
}

export interface Category {
  name: string;
  slug: string; // URL-friendly version of the name
  icon: string; // Icon name from lucide-react
  color: string; // Tailwind gradient classes
  description: string;
}
