import { loadToolMeta } from '@/utils/meta-loader';
import SentimentAnalyzerClient from './components/SentimentAnalyzerClient';

const meta = loadToolMeta(import.meta.url);

export const metadata = {
  title: meta.title,
  description: meta.description,
};

export default function SentimentAnalyzerPage() {
  return <SentimentAnalyzerClient meta={meta} />;
}