import { Carousel, CarouselContent } from "@/components/ui/carousel";
import HeroItem from "./heroItem";
import { processSpecialOffers } from "@/lib/controllers/processHomepage/processHeroContent";
import { SpecialOfferReady } from "@/types/specialoffer";

export default async function HeroSection() {
  try {
    const heroData = (await processSpecialOffers({type:"all"})) as SpecialOfferReady[];

    if (!heroData || heroData.length <= 0) {
      return (
        <section className="w-full overflow-x-hidden relative isolate flex items-center justify-center h-screen max-h-[500px] bg-secondary/10">
          <div className="text-center">
            <p className="text-muted-foreground">
              No featured content available at the moment.
            </p>
          </div>
        </section>
      );
    }

    return (
      <section className="w-full overflow-x-hidden relative isolate flex items-center justify-center h-screen max-h-[500px]">
        <Carousel
          opts={{
            align: "center",
            dragThreshold: 0.2,
            inViewThreshold: 0.2,
          }}
          className="w-full h-full *:data-[slot=carousel-content]:size-full"
        >
          <CarouselContent
            className="size-full"
            slotProps={{
              main: {
                className: "!overflow-visible",
              },
            }}
          >
            {heroData.map((item, index) => (
              <HeroItem key={index} id={index} data={item} />
            ))}
          </CarouselContent>
        </Carousel>
      </section>
    );
  } catch (err){
    console.log(err)
    return (
      <section className="w-full overflow-x-hidden relative isolate flex items-center justify-center h-screen max-h-[500px] bg-secondary/10">
        <div className="text-center">
          <p className="text-muted-foreground">
            Unable to load featured content. Please try again later.
          </p>
        </div>
      </section>
    );
  }
}
