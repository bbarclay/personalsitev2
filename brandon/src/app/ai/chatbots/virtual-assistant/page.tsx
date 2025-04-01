import { loadToolMeta } from '@/utils/meta-loader';
import VirtualAssistantClient from './components/VirtualAssistantClient';

const meta = loadToolMeta(import.meta.url);

export const metadata = {
  title: meta.title,
  description: meta.description,
};

export default function VirtualAssistantPage() {
  return <VirtualAssistantClient meta={meta} />;
}