"use client";

import { useDomLoaded } from "@/lib/hooks/useDomLoad";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import FlipTextLoader from "./flip-text-loader";
import HrLineLoader from "./hr-line-loader";
import RoundVtrLoader from "./round-vtr-loader";
import VtrLinesSpinner from "./vtr-lines-spinner";
import { HasSlot } from "@/types/structures";

type ClientGuardPropsBase = {
  loaderSize: "fullscreen" | "parent";
  unLoad?: boolean;
  type?: "dom-loader" | "content-loader";
};

type ClientGuardProps =
  | (ClientGuardPropsBase & {
      loader: "flip-text-loader";
      text: string;
    })
  | (ClientGuardPropsBase & {
      loader: "hr-line-loader" | "round-vtr-loader" | "vtr-lines-spinner";
    });

export function Loader({
  children,
  loaderSize,
  loader,
  unLoad,
  type = "dom-loader",
  ...props
}: ClientGuardProps & Partial<HasSlot>) {
  const isDomLoaded = useDomLoaded();
  const [hideLoader, setHideLoader] = useState(false);
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  // Example: for content loader, you can set isContentLoaded manually
  // e.g., after a fetch completes, call setIsContentLoaded(true).
  // Or pass unLoad=true externally to force hide.

  let loaderElement: React.ReactNode;
  switch (loader) {
    case "flip-text-loader":
      loaderElement = <FlipTextLoader text={(props as any).text} />;
      break;
    case "hr-line-loader":
      loaderElement = <HrLineLoader />;
      break;
    case "round-vtr-loader":
      loaderElement = <RoundVtrLoader />;
      break;
    case "vtr-lines-spinner":
      loaderElement = <VtrLinesSpinner />;
      break;
    default:
      loaderElement = null;
  }

  useEffect(() => {
    const ready =
      type === "dom-loader" ? isDomLoaded : isContentLoaded || unLoad;

    if (ready) {
      const timeout = setTimeout(() => {
        setHideLoader(true);
      }, 400); // fade-out duration
      return () => clearTimeout(timeout);
    }
  }, [isDomLoaded, isContentLoaded, unLoad, type]);

  return (
    !hideLoader && (
      <>
        <div
          className={cn(
            "flex items-center justify-center transition-opacity duration-300 ease-in-out",
            type === "dom-loader" && isDomLoaded
              ? "opacity-0 pointer-events-none"
              : type === "content-loader" && (isContentLoaded || unLoad)
              ? "opacity-0 pointer-events-none"
              : "opacity-100",
            loaderSize === "fullscreen"
              ? "fixed inset-0 w-screen h-[100dvh] bg-background z-100"
              : "w-full h-full"
          )}
        >
          {loaderElement}
        </div>
        {children}
      </>
    )
  );
}
