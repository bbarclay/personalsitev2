import { loadToolMeta } from "@/utils/meta-loader";
import AIClient from "./components/AIClient";

const meta = loadToolMeta("ai");

export const metadata = {
  title: meta.title,
  description: meta.description,
};

export default function AIPage() {
  return <AIClient meta={meta} />;
} 