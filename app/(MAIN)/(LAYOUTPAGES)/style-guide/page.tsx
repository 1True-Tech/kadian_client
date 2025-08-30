import { styleGuideQuery } from "@/lib/queries/styleGuide";
import { client } from "@/lib/utils/NSClient";
import { processStyleGuide } from "@/lib/controllers/processGuides/processStyleGuide";
import StyleGuideList from "@/components/pages/styleGuide/StyleGuideList";

export const revalidate = 3600; // Revalidate every hour

export default async function StyleGuidePage() {
  const styleGuidesRaw = await client.fetch(styleGuideQuery);
  const styleGuides = styleGuidesRaw.map(processStyleGuide);

  return (
    <div className="min-h-screen">
      <StyleGuideList initialGuides={styleGuides} />
    </div>
  );
}
