import { lookbookBySlugQuery } from "@/lib/queries/lookbook";
import { client } from "@/lib/utils/NSClient";
import { processLookbook } from "@/lib/controllers/processGuides/processLookbook";
import { notFound } from "next/navigation";
import LookbookDetails from "@/components/pages/lookbook/LookbookDetails";

export const revalidate = 3600; // Revalidate every hour

interface LookbookPageProps {
  params: {
    slug: string;
  };
}

export default async function LookbookPage({ params }: LookbookPageProps) {
  const lookbookRaw = await client.fetch(lookbookBySlugQuery, {
    slug: params.slug,
  });

  if (!lookbookRaw) {
    notFound();
  }

  const lookbook = processLookbook(lookbookRaw);

  return (
    <div className="min-h-screen">
      <LookbookDetails lookbook={lookbook} />
    </div>
  );
}
