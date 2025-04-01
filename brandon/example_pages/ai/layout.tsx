import { createToolLayout } from "@/utils/tool-page";
import metaJson from "./meta.json";

const metadata = createToolLayout(metaJson);

export { metadata };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
} 