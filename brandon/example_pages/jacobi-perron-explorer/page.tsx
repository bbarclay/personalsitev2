import { loadToolMeta } from '@/utils/meta-loader';
import JacobiPerronExplorerClient from './components/JacobiPerronExplorerClient';

const meta = loadToolMeta(import.meta.url);

export const metadata = {
  title: meta.title,
  description: meta.description,
};

export default function JacobiPerronExplorerPage() {
  return <JacobiPerronExplorerClient meta={meta} />;
} 