import { styleGuideBySlugQuery } from "@/lib/queries/styleGuide";
import { client } from "@/lib/utils/NSClient";
import { processStyleGuide } from "@/lib/controllers/processGuides/processStyleGuide";
import StyleGuideDetails from "@/components/pages/styleGuide/StyleGuideDetails";
import { notFound } from "next/navigation";
import { ParamsProps } from "@/types/structures";


export const revalidate = 3600; // Revalidate every hour

interface StyleGuidePageProps {
  params: {
    slug: string;
  };
}

export default async function StyleGuidePage({ params }: ParamsProps<{slug:string}>) {
    const {slug} = await params

  const styleGuideRaw = await client.fetch(styleGuideBySlugQuery, {
    slug
  });

  if (!styleGuideRaw) {
    notFound();
  }

  const styleGuide = processStyleGuide(styleGuideRaw);

  return (
    <div className="min-h-screen">
      <StyleGuideDetails styleGuide={styleGuide} />
    </div>
  );
}
