import { loadToolMeta } from '@/utils/meta-loader';
import AGIMindmapClient from './components/AGIMindmapClient';

const meta = loadToolMeta(import.meta.url);

export const metadata = {
  title: meta.title,
  description: meta.description,
};

export default function AGIMindmapPage() {
  return <AGIMindmapClient meta={meta} />;
} 