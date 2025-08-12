import { Button } from "@/components/ui/button";
import { processHomeStyleGuide } from "@/lib/controllers/processHomepage/processStyleGuideContent";
import { cn } from "@/lib/utils";
import { ArrowRightCircle } from "lucide-react";
import { Fragment } from "react";
import FcItem from "./fcItem";

export default async function StyleGuideContent() {
  const styleGuide = await processHomeStyleGuide();

  if(styleGuide.length <= 0) return null

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
      <div className="w-full relative mt-[-90dvh] min-h-fit h-screen pb-20 isolate max-w-screen-lg mx-auto p-container flex flex-col items-center justify-center gap-5">
        {/* LEFT / TOP on mobile */}
        <div className="space-y-4 text-white">
          <h2 className="text-center w-fit mx-auto text-2xl sm:text-3xl font-bold underline decoration-accent underline-offset-4">
            Style Guide
          </h2>
          <p className="text-center text-base leading-relaxed max-w-prose">
            From clean lines to bold statements, this guide helps you build a look that&apos;s elevated, effortless, and all you.
          </p>
        </div>

        {/* RIGHT */}
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
        <Button
          variant={"default"}
          className={cn(
            "fluid_btn !bg-transparent !overflow-hidden border-2 relative isolate !border-accent !text-white !h-fit !py-2 !px-4 rounded-full",
            "before:w-0 before:h-full before:absolute before:left-0 before:inset-0",
            "before:duration-300 before:bg-accent/70 before:backdrop-blur-3xl before:-z-1"
          )}
        >
          See All Guides{" "}
          <span className="hidden_icon [--w:calc(var(--spacing)_*_5)] overflow-hidden"><ArrowRightCircle className="size-5" /></span>
        </Button>
      </div>
    </div>
  );
}
