import { loadToolMeta } from '@/utils/meta-loader';
import CosmicGeometryClient from './components/CosmicGeometryClient';

const meta = loadToolMeta(import.meta.url);

export const metadata = {
  title: meta.title,
  description: meta.description,
};

export default function CosmicGeometryPage() {
  return <CosmicGeometryClient meta={meta} />;
} 