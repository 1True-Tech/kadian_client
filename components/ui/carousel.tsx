"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  currentIndex: number;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) throw new Error("useCarousel must be used within a <Carousel />");
  return context;
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
    plugins
  );

  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // sync state on every selection
  const onSelect = React.useCallback((embla: CarouselApi) => {
    setCurrentIndex(embla?.selectedScrollSnap()||0);
    setCanScrollPrev(embla?.canScrollPrev()||false);
    setCanScrollNext(embla?.canScrollNext()||false);
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  React.useEffect(() => {
    if (api && setApi) setApi(api);
  }, [api, setApi]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api!,
        opts,
        orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        currentIndex,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({ className, slotProps, ...props }: React.ComponentProps<"div"> & { slotProps?: { main: React.HTMLAttributes<HTMLDivElement> } }) {
  const { carouselRef, orientation } = useCarousel();
  return (
    <div
      ref={carouselRef}
      className={cn("overflow-hidden", slotProps?.main.className)}
      data-slot="carousel-content"
      {...slotProps?.main}
    >
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "ml-0" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  );
}

function CarouselIndicators({ className, slotProps, ...props }: React.ComponentProps<"div"> & { slotProps?: { item: React.HTMLAttributes<HTMLButtonElement> } }) {
  const { api, currentIndex } = useCarousel();

  return (
    <div className={cn("flex items-center justify-center gap-2 py-4 pointer-events-none", className)} {...props}>
      {api?.scrollSnapList().map((_, idx) => (
        <button
          key={idx}
          {...slotProps?.item}
          className={cn(
            "h-2 rounded-full pointer-events-auto duration-300",
            idx === currentIndex ? "bg-primary w-4" : "bg-secondary/40 w-2",
            slotProps?.item.className
          )}
          onClick={(e) => {
            api?.scrollTo(idx);
            slotProps?.item.onClick?.(e as any);
          }}
          aria-label={`Go to slide ${idx + 1}`}
        />
      ))}
    </div>
  );
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel();
  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  );
}

function CarouselPrevious({ className, variant = "outline", size = "icon", icon, slotProps, ...props }: React.ComponentProps<typeof Button> & { icon?: React.ReactNode; slotProps?: { textProps: React.HTMLAttributes<HTMLSpanElement> } }) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 left-[calc(var(--spacing)_*_6)] -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      {icon || <ArrowLeft />}
      <span {...slotProps?.textProps} className={cn("sr-only", slotProps?.textProps.className)}>
        Previous slide
      </span>
    </Button>
  );
}

function CarouselNext({ className, variant = "outline", size = "icon",icon, slotProps, ...props }: React.ComponentProps<typeof Button> & { icon?: React.ReactNode; slotProps?: { textProps: React.HTMLAttributes<HTMLSpanElement> } }) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 left-[calc(100%-(var(--spacing)_*_12))] -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      {icon || <ArrowRight />}
      <span {...slotProps?.textProps} className={cn("sr-only", slotProps?.textProps.className)}>Next slide</span>
    </Button>
  );
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselIndicators,
};