import { loadToolMeta } from '@/utils/meta-loader';
import GroupMasterClient from './components/GroupMasterClient';

const meta = loadToolMeta(import.meta.url);

export const metadata = {
  title: meta.title,
  description: meta.description,
};

export default function GroupMasterPage() {
  return <GroupMasterClient meta={meta} />;
} 