import { client } from "@/lib/utils/NSClient";
import { processLookbook } from "@/lib/controllers/processGuides/processLookbook";
import LookbookList from "@/components/pages/lookbook/LookbookList";
import { lookbookQuery } from "@/lib/queries/lookbook";

export const revalidate = 3600; // Revalidate every hour

export default async function LookbookPage() {
  const lookbooksRaw = await client.fetch(lookbookQuery);
  const lookbooks = lookbooksRaw.map(processLookbook);

  return (
    <div className="min-h-screen">
      <LookbookList initialLookbooks={lookbooks} />
    </div>
  );
}
