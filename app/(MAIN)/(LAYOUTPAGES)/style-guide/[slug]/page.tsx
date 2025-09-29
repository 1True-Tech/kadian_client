import { styleGuideBySlugQuery } from "@/lib/queries/styleGuide";
import { client } from "@/lib/utils/NSClient";
import { processStyleGuide } from "@/lib/controllers/processGuides/processStyleGuide";
import StyleGuideDetails from "@/components/pages/styleGuide/StyleGuideDetails";
import { notFound } from "next/navigation";
import { ParamsProps } from "@/types/structures";
import { Suspense } from "react";
import StyleGuideSkeleton from "@/components/pages/styleGuide/StyleGuideSkeleton";
import { Metadata } from "next";
import PagesLayout from "@/components/layout/PagesLayout";

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata({
  params,
}: ParamsProps<{ slug: string }>): Promise<Metadata> {
  try {
    const { slug } = await params;
    const styleGuideRaw = await client.fetch(styleGuideBySlugQuery, { slug });

    if (!styleGuideRaw) {
      return {
        title: "Style Guide Not Found",
        description: "The requested style guide could not be found.",
      };
    }

    const styleGuide = processStyleGuide(styleGuideRaw);

    return {
      title: `${styleGuide.title} | Kadian Style Guide`,
      description: `Explore our ${styleGuide.title} style guide at Kadian.`,
      openGraph: {
        title: `${styleGuide.title} | Kadian Style Guide`,
        description: `Explore our ${styleGuide.title} style guide at Kadian.`,
        images:
          styleGuide.sections &&
          styleGuide.sections.length > 0 &&
          styleGuide.sections[0].styleImages &&
          styleGuide.sections[0].styleImages.length > 0
            ? [
                {
                  url: styleGuide.sections[0].styleImages[0]?.src,
                  width: 800,
                  height: 600,
                  alt: styleGuide.title,
                },
              ]
            : [],
      },
    };
  } catch (error) {
    console.error("Error generating style guide metadata:", error);
    return {
      title: "Style Guide | Kadian",
      description: "Explore our style guides at Kadian.",
    };
  }
}

export default async function StyleGuidePage({
  params,
}: ParamsProps<{ slug: string }>) {
  try {
    const { slug } = await params;

    const styleGuideRaw = await client.fetch(styleGuideBySlugQuery, {
      slug,
    });

    if (!styleGuideRaw) {
      notFound();
    }

    const styleGuide = processStyleGuide(styleGuideRaw);

    return (
      <PagesLayout showBreadcrumbs breadcrumbItems={[
        {
          label: "Style guide",
          href: "/style-guide"
        },
        {
          label: styleGuide.title
        }
      ]}>
        <Suspense fallback={<StyleGuideSkeleton />}>
          <div className="min-h-screen">
            <StyleGuideDetails styleGuide={styleGuide} />
          </div>
        </Suspense>
      </PagesLayout>
    );
  } catch (error) {
    console.error("Error loading style guide page:", error);
    notFound();
  }
}
