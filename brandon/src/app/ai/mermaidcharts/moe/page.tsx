'use client';

import { loadToolMeta } from '@/utils/meta-loader';
import MoeClient from './components/MoeClient';
import type { AIPageMeta } from '@/app/ai/types';

const toolMeta = loadToolMeta(import.meta.url);

// Create a properly typed AIPageMeta object
const meta: AIPageMeta = {
  ...toolMeta,
  path: `/ai/mermaidcharts/moe`,
  enabled: true
};

// Metadata should be exported from a separate file when using 'use client'
// Remove the metadata export from here

export default function MoePage() {
  return <MoeClient meta={meta} />;
}