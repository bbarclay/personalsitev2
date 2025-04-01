import { loadToolMeta } from '@/utils/meta-loader';

const meta = loadToolMeta(import.meta.url);

export const metadata = {
  title: meta.title,
  description: meta.description,
}; 