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
        title: "Style Guide Not Found | Kadian",
        description: "The requested style guide could not be found.",
        robots: { index: false, follow: false },
      };
    }

    const styleGuide = processStyleGuide(styleGuideRaw);

    const firstImage =
      styleGuide.sections?.[0]?.styleImages?.[0]?.src ||
      "/images/default-style.jpg";

    const keywords = [
      styleGuide.title,
      styleGuide.category,
      ...(styleGuide.targetAudience || []),
      ...(styleGuide.seasonality || []),
      "fashion guide",
      "style inspiration",
      "outfit ideas",
      "trend report",
      "Kadian style",
    ]
      .filter(Boolean)
      .join(", ");

    return {
      title: `${styleGuide.title} | Kadian Style Guide`,
      description: `Explore ${styleGuide.title} — a curated ${styleGuide.category.toLowerCase()} fashion guide by Kadian. Get tips, outfit inspiration, and recommended products for your next look.`,
      keywords,
      authors: [{ name: "Kadian Editorial Team", url: "https://kadian.co" }],
      alternates: { canonical: `https://kadian.co/style-guide/${slug}` },
      openGraph: {
        title: `${styleGuide.title} | Kadian Style Guide`,
        description: `Discover ${styleGuide.title} on Kadian. Your guide to modern ${styleGuide.category.toLowerCase()} styling, fashion tips, and curated looks.`,
        url: `https://kadian.co/style-guide/${slug}`,
        siteName: "Kadian",
        locale: "en_US",
        type: "article",
        images: [
          {
            url: firstImage,
            width: 1200,
            height: 800,
            alt: styleGuide.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${styleGuide.title} | Kadian Style Guide`,
        description: `Discover fashion styling tips and outfit ideas from ${styleGuide.title}.`,
        images: [firstImage],
        creator: "@KadianOfficial",
      },
      robots: { index: true, follow: true },
      metadataBase: new URL("https://kadian.co"),
    };
  } catch (error) {
    console.error("Error generating style guide metadata:", error);
    return {
      title: "Style Guide | Kadian",
      description: "Explore our latest fashion style guides at Kadian.",
      robots: { index: true, follow: true },
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
      <PagesLayout
        showBreadcrumbs
        breadcrumbItems={[
          {
            label: "Style guide",
            href: "/style-guide",
          },
          {
            label: styleGuide.title,
          },
        ]}
      >
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
