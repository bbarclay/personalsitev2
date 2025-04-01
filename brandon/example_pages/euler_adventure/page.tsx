import { loadToolMeta } from "@/utils/meta-loader";
import EulerAdventureClient from "./components/EulerAdventureClient";

const meta = loadToolMeta("euler_adventure");

export const metadata = {
  title: meta.title,
  description: meta.description,
};

export default function EulerAdventurePage() {
  return <EulerAdventureClient meta={meta} />;
} 