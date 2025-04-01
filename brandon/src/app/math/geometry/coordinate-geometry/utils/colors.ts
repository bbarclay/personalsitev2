export const randomColor = (): string => {
  const colors = [
    '#4F46E5', // Indigo
    '#3B82F6', // Blue
    '#0EA5E9', // Light Blue
    '#10B981', // Emerald
    '#F59E0B', // Amber
    '#EF4444', // Red
    '#EC4899', // Pink
    '#8B5CF6'  // Purple
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}; 