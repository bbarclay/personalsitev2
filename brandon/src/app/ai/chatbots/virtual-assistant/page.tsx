import { loadToolMeta } from '@/utils/meta-loader';
import VirtualAssistantClient from './VirtualAssistantClient';
import type { AIPageMeta } from '@/app/ai/types';

const toolMeta = loadToolMeta(import.meta.url);

// Create a properly typed AIPageMeta object
const meta: AIPageMeta = {
  ...toolMeta,
  path: `/ai/chatbots/virtual-assistant`,
  enabled: true
};

export const metadata = {
  title: meta.title,
  description: meta.description,
};

export default function VirtualAssistantPage() {
  return <VirtualAssistantClient meta={meta} />;
}