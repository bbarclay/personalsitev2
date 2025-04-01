import { loadToolMeta } from "@/utils/meta-loader";
import MathQuestClient from "./components/MathQuestClient";

const meta = loadToolMeta("mathQuest");

export const metadata = {
  title: meta.title,
  description: meta.description,
};

export default function MathQuestPage() {
  return <MathQuestClient meta={meta} />;
} 