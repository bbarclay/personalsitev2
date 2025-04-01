import { loadToolMeta } from '@/utils/meta-loader';
import MoeClient from './components/MoeClient';

const meta = loadToolMeta(import.meta.url);

export const metadata = {
  title: meta.title,
  description: meta.description,
};

export default function MoePage() {
  return <MoeClient meta={meta} />;
} 