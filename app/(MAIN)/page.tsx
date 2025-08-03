import FeaturedContent from "@/components/pages/home/styleGuide";
import ServiceFeatures from "@/components/pages/home/features";
import LookBookFeats from "@/components/pages/home/LookBookFeats";
import HeroSection from "@/components/pages/home/HeroSection";
import { processHomepageHeroContent } from "@/lib/controllers/processHomepage/processHeroContent";
import { processLookBook } from "@/lib/controllers/processHomepage/processLookBook";
import { CreditCardIcon, PhoneIcon, Truck, UndoDotIcon } from "lucide-react";
import { processHomeStyleGuide } from "@/lib/controllers/processHomepage/processStyleGuideContent";
import { client } from "@/lib/utils/NSClient";
import queries from "@/lib/queries";



export default async function Home() {
  const heroData = await processHomepageHeroContent()
  const lookBookData = await processLookBook()
  const styleGuide = await processHomeStyleGuide();

  return (
    <main className="w-full">
      <HeroSection data={heroData}/>
      <ServiceFeatures
        items={[
          {
            icon: <Truck />,
            title: "Shipping & Return",
            description: "Nationwide shipping",
          },
          {
            icon: <CreditCardIcon />,
            title: "Secure Payment",
            description: "Credit card payment or e-pay support.",
          },
          {
            icon: <UndoDotIcon />,
            title: "15 Days Exchange",
            description:
              "Errors from manufacturers within 15 days of purchase.",
          },
          {
            icon: <PhoneIcon />,
            title: "Customer Support 24/7",
            description:
              "Sales and return support daily and for holiday shoppings.",
          },
        ]}
      />
      <FeaturedContent items={styleGuide}/>
      <LookBookFeats items={lookBookData}/>
    </main>
  );
}
