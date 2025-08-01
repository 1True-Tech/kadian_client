import RenderStudio from "@/cms-studio/lib/renderStudio";
import config from "@/sanity.config";
import { Metadata, Viewport } from "next";
import { metadata as studioMetaData, viewport as StudioViewport } from "next-sanity/studio";


export const dynamic = "force-static";
export const metadata:Metadata = {
  ...studioMetaData,
  title: "Loading Kadian Studio...",
  
};
export const viewport:Viewport = {
  ...StudioViewport,
  interactiveWidget: 'resizes-content'
};

export default function StudioPage() {
  return <RenderStudio config={config}/>;
}
