import { loadToolMeta } from '@/utils/meta-loader';
import PiExplorerClient from './components/PiExplorerClient';

const meta = loadToolMeta(import.meta.url);

export const metadata = {
  title: meta.title,
  description: meta.description,
};

export default function PiExplorerPage() {
  return <PiExplorerClient meta={meta} />;
} 