import { client } from "@/lib/utils/NSClient";
import { processSizeGuide } from "@/lib/controllers/processGuides/processSizeGuide";
import SizeGuideList from "@/components/pages/sizeGuide/SizeGuideList";
import { sizeGuideQuery } from "@/lib/queries/sizeGuide";

export const revalidate = 3600; // Revalidate every hour

export default async function SizeGuidePage() {
  const sizeGuidesRaw = await client.fetch(sizeGuideQuery);
  const sizeGuides = sizeGuidesRaw.map(processSizeGuide);

  return (
    <div className="min-h-screen">
      <SizeGuideList initialGuides={sizeGuides} />
    </div>
  );
}
