import {
  Carousel,
  CarouselContent
} from "@/components/ui/carousel";
import HeroItem from "./heroItem";

export default function HeroSection() {
  return (
    <section className="w-full px-container overflow-x-hidden relative isolate flex items-center justify-center h-screen max-h-[500px]">
      <Carousel opts={{
        align:"center",
        dragThreshold:0.2,
        inViewThreshold:0.2,
      }} className="w-full h-full *:data-[slot=carousel-content]:size-full">
        <CarouselContent className="size-full" slotProps={{
          main:{
            className:"!overflow-visible"
          }
        }}>
          <HeroItem image="/images/hero-image-1.jpg" />
          <HeroItem image="/images/hero-image-2.jpg" />
        </CarouselContent>
        
        {/* <CarouselIndicators className="py-4"/> */}
      </Carousel>
    </section>
  );
}
