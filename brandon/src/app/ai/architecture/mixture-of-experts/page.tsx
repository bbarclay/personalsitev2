import { loadToolMeta } from '@/utils/meta-loader';
import MoeClient from './components/MoeClient';
import type { AIPageMeta } from '@/app/ai/types';

const toolMeta = loadToolMeta(import.meta.url);

// Create a properly typed AIPageMeta object
const meta: AIPageMeta = {
  ...toolMeta,
  path: `/ai/architecture/mixture-of-experts`,
  enabled: true
};

export const metadata = {
  title: meta.title,
  description: meta.description,
};

export default function MoePage() {
  return <MoeClient meta={meta} />;
}