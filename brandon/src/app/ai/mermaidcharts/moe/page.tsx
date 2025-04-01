'use client';

import { loadToolMeta } from '@/utils/meta-loader';
import MoeClient from './components/MoeClient';

const meta = loadToolMeta(import.meta.url);

// Metadata should be exported from a separate file when using 'use client'
// Remove the metadata export from here

export default function MoePage() {
  return <MoeClient meta={meta} />;
} 