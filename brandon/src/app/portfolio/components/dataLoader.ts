import React from 'react';
import {
  Brain,
  Cloud,
  Code,
  Database,
  Shield,
  Users,
  LucideIcon,
} from 'lucide-react';
import { Skill, Category } from './types/types';
import categories from './categories/categories.json';
import LargeLanguageModels from './skills-data/LargeLanguageModels.json';
import DatabaseEngineering from './skills-data/DatabaseEngineering.json';
import CloudDevOps from './skills-data/CloudDevOps.json';
import Programming from './skills-data/Programming.json';
import Security from './skills-data/Security.json';
import Leadership from './skills-data/Leadership.json';

// Import all skills data statically
const skillsData = [
  LargeLanguageModels,
  DatabaseEngineering,
  CloudDevOps,
  Programming,
  Security,
  Leadership,
];

export async function loadSkills(): Promise<Skill[]> {
  try {
    // Validate required fields
    const validSkills = skillsData.reduce<Skill[]>((acc, skill) => {
      if (!skill.name || !skill.category || !skill.icon) {
        console.warn('Invalid skill data:', skill);
        return acc;
      }
      return [...acc, skill as Skill];
    }, []);

    return validSkills;
  } catch (err) {
    console.error('Error loading skills:', err);
    throw new Error('Failed to load skills data');
  }
}

export async function loadCategories(): Promise<Category[]> {
  try {
    // Validate required fields
    const validCategories = categories.filter(category => {
      const isValid = category.name && category.slug && category.icon && category.color;
      if (!isValid) {
        console.warn('Invalid category:', category);
      }
      return isValid;
    });
    return validCategories;
  } catch (err) {
    console.error('Error loading categories:', err);
    throw new Error('Failed to load categories data');
  }
}

const iconMapping: Record<string, LucideIcon> = {
  Brain,
  Cloud,
  Code,
  Database,
  Shield,
  Users,
};

export function getIconComponent(iconName: string): React.ReactElement | null {
  const Icon = iconMapping[iconName];
  if (!Icon) return null;
  return React.createElement(Icon, { className: "w-6 h-6" });
}
