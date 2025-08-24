import { processLookBook } from "@/lib/controllers/processHomepage/processLookBook";
import FtLookBookItem from "./ftLookBookItem";

export default async function LookBookFeats() {
  const lookBookData = await processLookBook();
  if (lookBookData.length <= 0) return null;

  return (
    <section className="py-16">
      <div className="px-container">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="heading-section text-4xl font-cinzel mb-4 bg-clip-text bg-conic-30 bg-foreground via-accent via-50% from-foreground to-foreground text-transparent">
            See Lookbook
          </h2>
          <p className="text-elegant max-w-2xl mx-auto">
            Discover Your Next Favorite Outfit.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {lookBookData.map((item, idx) => (
            <FtLookBookItem data={item} key={idx} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
