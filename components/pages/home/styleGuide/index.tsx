import { Button } from "@/components/ui/button";
import { processHomeStyleGuide } from "@/lib/controllers/processHomepage/processStyleGuideContent";
import { cn } from "@/lib/utils";
import { ArrowRightCircle } from "lucide-react";
import { Fragment } from "react";
import FcItem from "./fcItem";

export default async function StyleGuideContent() {
  const styleGuide = await processHomeStyleGuide();

  if (styleGuide.length <= 0) return null;

  const bgImages = styleGuide.map((item) => item.image.src);
  return (
    <div className="w-full h-fit my-container">
      <div
        className="w-full sticky duration-500 top-0 h-screen brightness-50"
        style={{
          backgroundImage: `url(${
            bgImages[Math.floor(Math.random() * bgImages.length)]
          })`,
          backgroundAttachment: "fixed",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />

      <section className="py-16 w-full relative mt-[-90dvh] min-h-fit h-screen pb-20 isolate max-w-screen-lg mx-auto p-container flex flex-col items-center justify-center gap-5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="heading-section text-4xl font-cinzel mb-4 bg-clip-text bg-conic-30 bg-white via-accent via-50% from-background to-background text-transparent">
              Style Guide
            </h2>
            <p className="text-background max-w-2xl mx-auto">
              From clean lines to bold statements, this guide helps you build a
              look that&apos;s elevated, effortless, and all you.
            </p>
          </div>
          <div className={`w-full h-fit flex flex-wrap gap-4 justify-center`}>
            {styleGuide.slice(0, 4).map((style, idx) => {
              // for 3 items, make the 3rd span both columns
              return (
                <Fragment key={idx}>
                  <article
                    className={`grow max-w-sm basis-md flex items-center w-full justify-center`}
                  >
                    <FcItem item={style} />
                  </article>
                </Fragment>
              );
            })}
          </div>
          <div className="w-full flex items-center justify-center mt-peers">
            <Button
            variant={"default"}
            className={cn(
              "fluid_btn !bg-transparent !overflow-hidden !mx-auto border-2 relative isolate !border-accent !text-white !h-fit !py-2 !px-4 rounded-full",
              "before:w-0 before:h-full before:absolute before:left-0 before:inset-0",
              "before:duration-300 before:bg-accent/70 before:backdrop-blur-3xl before:-z-1"
            )}
          >
            See All Guides{" "}
            <span className="hidden_icon [--w:calc(var(--spacing)_*_5)] overflow-hidden">
              <ArrowRightCircle className="size-5" />
            </span>
          </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
