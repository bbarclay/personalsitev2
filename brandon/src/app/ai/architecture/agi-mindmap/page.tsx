import { loadToolMeta } from '@/utils/meta-loader';
import AGIMindmapClient from './components/AGIMindmapClient';
import type { AIPageMeta } from '@/app/ai/types';

const toolMeta = loadToolMeta(import.meta.url);

// Create a properly typed AIPageMeta object
const meta: AIPageMeta = {
  ...toolMeta,
  path: `/ai/architecture/agi-mindmap`,
  enabled: true
};

export const metadata = {
  title: meta.title,
  description: meta.description,
};

export default function AGIMindmapPage() {
  return <AGIMindmapClient meta={meta} />;
}