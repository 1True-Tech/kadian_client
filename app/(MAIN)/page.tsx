import ServiceFeatures from "@/components/pages/home/features";
import HeroSection from "@/components/pages/home/HeroSection";
import LookBookFeats from "@/components/pages/home/LookBookFeats";
import SpecialOffersSection from "@/components/pages/home/specialOffers";
import FeaturedContent from "@/components/pages/home/styleGuide";
import { processHomeStyleGuide } from "@/lib/controllers/processHomepage/processStyleGuideContent";
import { CreditCardIcon, PhoneIcon, Truck, UndoDotIcon } from "lucide-react";

export default async function Home() {
  const styleGuide = await processHomeStyleGuide();
  return (
    <main className="w-full">
      <HeroSection />
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
      <SpecialOffersSection/>
      <FeaturedContent items={styleGuide} />
      <LookBookFeats />
    </main>
  );
}
