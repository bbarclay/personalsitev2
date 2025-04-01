import { loadToolMeta } from '@/utils/meta-loader';
import StarVoyageClient from './components/StarVoyageClient';

const meta = loadToolMeta(import.meta.url);

export const metadata = {
  title: meta.title,
  description: meta.description,
};

export default function StarVoyagePage() {
  return <StarVoyageClient meta={meta} />;
} 