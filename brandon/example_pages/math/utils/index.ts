// Browser-safe utility functions
export function formatComponentId(id: string): string {
  return id
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getComponentUrl(id: string): string {
  return `/math/${id}`;
}

export function calculateAverageRating(ratings: number[]): number {
  if (!ratings.length) return 0;
  return ratings.reduce((a, b) => a + b, 0) / ratings.length;
}