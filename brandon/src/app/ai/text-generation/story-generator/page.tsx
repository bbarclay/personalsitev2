import { loadToolMeta } from '@/utils/meta-loader';
import { StoryGeneratorClient } from './components/StoryGeneratorClient';

const meta = loadToolMeta(import.meta.url);

export const metadata = {
  title: meta.title,
  description: meta.description,
};

export default function StoryGeneratorPage() {
  return <StoryGeneratorClient meta={meta} />;
}
