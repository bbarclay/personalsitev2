import { loadToolMeta } from '@/utils/meta-loader';
import DataVisualizerClient from './components/DataVisualizerClient';
import metaJson from './meta.json';

// Load metadata with proper defaults
const meta = loadToolMeta(metaJson);

export const metadata = {
  title: meta.title,
  description: meta.description,
};

export default function DataVisualizerPage() {
  return <DataVisualizerClient meta={meta} />;
}