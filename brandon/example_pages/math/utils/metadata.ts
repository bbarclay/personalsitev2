'use server';

import path from 'path';
import { CATEGORY_REGISTRY } from '@components/math/registry';
import { promises as fs } from 'fs';
import { cache } from 'react';

export interface MathComponentMetadata {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  tags: string[];
  url: string;
  metadata: {
    createdAt: string;
    lastUpdated: string;
    author: string;
    version: string;
    interactivityLevel: string;
    computationalIntensity: string;
    prerequisites: string[];
    relatedComponents: string[];
    documentation: {
      status: string;
      lastUpdated: string;
    };
    usage: {
      views: number;
      ratings: number[];
      averageRating: number;
    };
  };
}

const METADATA_DIR = path.join(process.cwd(), 'src/app/components/math/metadata');

// Cache the metadata loading to prevent multiple filesystem reads
export const getAllMetadata = cache(async (): Promise<MathComponentMetadata[]> => {
  try {
    const files = await fs.readdir(METADATA_DIR);
    const metadataFiles = files.filter(file => file.endsWith('.metadata.json'));

    const metadata = await Promise.all(metadataFiles.map(async (file) => {
      const filePath = path.join(METADATA_DIR, file);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const data = JSON.parse(fileContent) as MathComponentMetadata;

      if (!data.category || !CATEGORY_REGISTRY[data.category]) {
        data.category = "General";
      }

      return data;
    }));

    return metadata.sort((a, b) => {
      if (a.category === b.category) {
        return a.title.localeCompare(b.title);
      }
      return a.category.localeCompare(b.category);
    });
  } catch (error) {
    console.error('Error loading metadata:', error);
    return [];
  }
});

export async function getCategories(): Promise<string[]> {
  const metadata = await getAllMetadata();
  const categories = new Set(metadata.map(item => item.category));
  return ['All', ...Array.from(categories)];
}

export async function getDifficulties(): Promise<string[]> {
  const metadata = await getAllMetadata();
  const difficulties = new Set(metadata.map(item => item.difficulty));
  return ['All', ...Array.from(difficulties)];
}

export async function getInteractivityLevels(): Promise<string[]> {
  const metadata = await getAllMetadata();
  const levels = new Set(metadata.map(item => item.metadata.interactivityLevel));
  return ['All', ...Array.from(levels)];
}

export async function getComputationalIntensities(): Promise<string[]> {
  const metadata = await getAllMetadata();
  const intensities = new Set(metadata.map(item => item.metadata.computationalIntensity));
  return ['All', ...Array.from(intensities)];
}

export async function getAllTags(): Promise<string[]> {
  const metadata = await getAllMetadata();
  const tags = new Set(metadata.flatMap(item => item.tags));
  return Array.from(tags);
}

// Move mutation operations to API routes
export async function updateMetadata(id: string, updates: Partial<MathComponentMetadata>): Promise<void> {
  try {
    const response = await fetch(`/api/math/metadata/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error(`Failed to update metadata: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error updating metadata:', error);
    throw error;
  }
}

export async function incrementViews(id: string): Promise<void> {
  const response = await fetch(`/api/math/metadata/${id}/views`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Failed to increment views');
  }
}

export async function addRating(id: string, rating: number): Promise<void> {
  if (rating < 1 || rating > 5) {
    throw new Error('Rating must be between 1 and 5');
  }

  const response = await fetch(`/api/math/metadata/${id}/ratings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rating }),
  });

  if (!response.ok) {
    throw new Error('Failed to add rating');
  }
}
