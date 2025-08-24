import {
  Carousel,
  CarouselContent
} from "@/components/ui/carousel";
import { processHomepageHeroContent } from "@/lib/controllers/processHomepage/processHeroContent";
import HeroItem from "./heroItem";

export default async function HeroSection() {
    const heroData = await processHomepageHeroContent()
  if(heroData.length <= 0) return null

  return (
    <section className="w-full overflow-x-hidden relative isolate flex items-center justify-center h-screen max-h-[500px]">
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
            heroData.map((item, index) => (
              <HeroItem key={index} id={index} data={item} />
            ))
          }
        </CarouselContent>
        
        {/* <CarouselIndicators className="py-4"/> */}
      </Carousel>
    </section>
  );
}
