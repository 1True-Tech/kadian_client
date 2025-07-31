import { NextStudio } from "next-sanity/studio"



export default function RenderStudio({config}:{config:any}) {
  return <NextStudio basePath="/admin/cms-studio" config={config} />
}