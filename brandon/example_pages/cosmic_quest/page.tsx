import { loadToolMeta } from '@/utils/meta-loader';
import CosmicQuestClient from './components/CosmicQuestClient';

const meta = loadToolMeta(import.meta.url);

export const metadata = {
  title: meta.title,
  description: meta.description,
};

export default function CosmicQuestPage() {
  return <CosmicQuestClient meta={meta} />;
} 