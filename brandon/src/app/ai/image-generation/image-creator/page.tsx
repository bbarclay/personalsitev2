import { loadToolMeta } from '@/utils/meta-loader';
import ImageCreatorClient from './ImageCreatorClient';

const meta = loadToolMeta(import.meta.url);

export const metadata = {
  title: meta.title,
  description: meta.description,
};

export default function ImageCreatorPage() {
  return <ImageCreatorClient meta={meta} />;
}