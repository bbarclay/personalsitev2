import { loadToolMeta } from '@/utils/meta-loader';
import FibonacciAdventureClient from './components/FibonacciAdventureClient';

const meta = loadToolMeta(import.meta.url);

export const metadata = {
  title: meta.title,
  description: meta.description,
};

export default function FibonacciAdventurePage() {
  return <FibonacciAdventureClient meta={meta} />;
} 