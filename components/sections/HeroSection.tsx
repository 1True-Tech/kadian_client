import { Button } from "@/components/ui/button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] h-fit flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute size-full inset-0 z-0">
        <Image
          width={1024}
          height={720}
          src={"/images/hero-image-1.jpg"}
          loading="lazy"
          alt="Kadian Fashion - Premium women's clothing"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl  mx-auto">
        <div className="animate-fade-up">
          <h1 className="heading-hero text-white mb-6">
            Discover Your
            <span className="block text-rose-gold">Perfect Style</span>
          </h1>
          <p className="text-elegant text-white/90 mb-8 max-w-2xl mx-auto">
            Premium fashion for the modern woman and child. Curated collections
            that blend comfort, style, and sophistication.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="btn-hero">Shop New Arrivals</Button>
            <Button
              variant="outline"
              className="btn-ghost-elegant bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              Explore Collections
            </Button>
          </div>
        </div>
      </div>
      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
