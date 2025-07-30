import RenderStudio from "@/cms-studio/lib/renderStudio";
import config from "@/sanity.config";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";
export default function StudioPage() {
  return <RenderStudio config={config}/>;
}
