import {
  Carousel,
  CarouselContent
} from "@/components/ui/carousel";
import HeroItem from "./heroItem";
import { HomePageHero } from "@/types/home";

export default function HeroSection({data}:{data:HomePageHero[]}) {
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
          {
            data.map((item, index) => (
              <HeroItem key={index} data={item} />
            ))
          }
        </CarouselContent>
        
        {/* <CarouselIndicators className="py-4"/> */}
      </Carousel>
    </section>
  );
}
