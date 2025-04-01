import { loadToolMeta } from "@/utils/meta-loader";
import AIGameClient from "./components/AIGameClient";

const meta = loadToolMeta("aigame");

export const metadata = {
  title: meta.title,
  description: meta.description,
};

export default function AIGamePage() {
  return <AIGameClient meta={meta} />;
} 