import { loadToolMeta } from '@/utils/meta-loader';
import CodeAssistantClient from './components/CodeAssistantClient';

const meta = loadToolMeta(import.meta.url);

export const metadata = {
  title: meta.title,
  description: meta.description,
};

export default function CodeAssistantPage() {
  return <CodeAssistantClient meta={meta} />;
}