import { loadToolMeta } from '@/utils/meta-loader';
import QuantumDriftGameClient from './components/QuantumDriftGameClient';

const meta = loadToolMeta(import.meta.url);

export const metadata = {
  title: meta.title,
  description: meta.description,
};

export default function QuantumDriftGamePage() {
  return <QuantumDriftGameClient meta={meta} />;
} 