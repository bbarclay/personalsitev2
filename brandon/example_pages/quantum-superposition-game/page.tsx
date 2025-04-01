import { loadToolMeta } from '@/utils/meta-loader';
import QuantumSuperpositionGameClient from './components/QuantumSuperpositionGameClient';

const meta = loadToolMeta(import.meta.url);

export const metadata = {
  title: meta.title,
  description: meta.description,
};

export default function QuantumSuperpositionGamePage() {
  return <QuantumSuperpositionGameClient meta={meta} />;
} 