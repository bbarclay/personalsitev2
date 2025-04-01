import { createToolLayout } from '@/utils/tool-page';
import metaJson from './meta.json';

// Create a standardized layout with metadata
const { metadata } = createToolLayout(metaJson);

// Export the metadata for Next.js
export { metadata };

// Simple layout component that renders children
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
