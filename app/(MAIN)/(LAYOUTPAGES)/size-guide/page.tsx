import { client } from "@/lib/utils/NSClient";
import { processSizeGuide } from "@/lib/controllers/processGuides/processSizeGuide";
import SizeGuideList from "@/components/pages/sizeGuide/SizeGuideList";
import { sizeGuideQuery } from "@/lib/queries/sizeGuide";
import { Suspense } from "react";
import SizeGuideSkeleton from "@/components/pages/sizeGuide/SizeGuideSkeleton";
import { Metadata } from "next";

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata(): Promise<Metadata> {
  try {
    return {
      title: "Size Guide | Kadian",
      description: "Find your perfect fit with our detailed size charts and measurement guides.",
      openGraph: {
        title: "Size Guide | Kadian",
        description: "Find your perfect fit with our detailed size charts and measurement guides.",
      },
    };
  } catch (error) {
    console.error("Error generating size guide metadata:", error);
    return {
      title: "Size Guide | Kadian",
      description: "Find your perfect fit with our detailed size charts and measurement guides.",
    };
  }
}

export default async function SizeGuidePage() {
  try {
    const sizeGuidesRaw = await client.fetch(sizeGuideQuery);
    const sizeGuides = sizeGuidesRaw.map(processSizeGuide);

    return (
      <div className="min-h-screen">
        <Suspense fallback={<SizeGuideSkeleton />}>
          <SizeGuideList initialGuides={sizeGuides} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error("Error loading size guides:", error);
    return (
      <div className="min-h-screen px-container py-16 text-center">
        <h1 className="heading-section text-4xl font-cinzel mb-4">Size Guide</h1>
        <p className="text-elegant">Unable to load size guides. Please try again later.</p>
      </div>
    );
  }
}
