import { lookbookBySlugQuery } from "@/lib/queries/lookbook";
import { client } from "@/lib/utils/NSClient";
import { processLookbook } from "@/lib/controllers/processGuides/processLookbook";
import { notFound } from "next/navigation";
import LookbookDetails from "@/components/pages/lookbook/LookbookDetails";
import { ParamsProps } from "@/types/structures";
import { Suspense } from "react";
import LookbookSkeleton from "@/components/pages/lookbook/LookbookSkeleton";
import { Metadata } from "next";

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata({ params }: ParamsProps<{ slug: string }>): Promise<Metadata> {
  try {
    const { slug } = await params;
    const lookbookRaw = await client.fetch(lookbookBySlugQuery, { slug });

    if (!lookbookRaw) {
      return {
        title: "Lookbook Not Found",
        description: "The requested lookbook could not be found.",
      };
    }

    const lookbook = processLookbook(lookbookRaw);

    return {
      title: `${lookbook.title} | Kadian Lookbook`,
      description: lookbook.description || `Explore our ${lookbook.title} lookbook at Kadian.`,
      openGraph: {
        title: `${lookbook.title} | Kadian Lookbook`,
        description: lookbook.description || `Explore our ${lookbook.title} lookbook at Kadian.`,
        images: lookbook.looks && lookbook.looks.length > 0 ? [{ url: lookbook.looks[0]?.image?.src, width: 800, height: 600, alt: lookbook.title }] : [],
      },
    };
  } catch (error) {
    console.error("Error generating lookbook metadata:", error);
    return {
      title: "Lookbook | Kadian",
      description: "Explore our lookbooks at Kadian.",
    };
  }
}

export default async function LookbookPage({ params }: ParamsProps<{ slug: string }>) {
  try {
    const {slug} = await params;
    const lookbookRaw = await client.fetch(lookbookBySlugQuery, {
      slug,
    });

    if (!lookbookRaw) {
      notFound();
    }

    const lookbook = processLookbook(lookbookRaw);

    return (
      <Suspense fallback={<LookbookSkeleton />}>
        <div className="min-h-screen">
          <LookbookDetails lookbook={lookbook} />
        </div>
      </Suspense>
    );
  } catch (error) {
    console.error("Error loading lookbook page:", error);
    notFound();
  }
}
