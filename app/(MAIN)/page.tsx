import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import CategoryShowcase from "@/components/sections/CategoryShowcase";
import HeroSection from "@/components/pages/home/HeroSection";
import ServiceFeatures from "@/components/pages/home/features";
import FeaturedContent from "@/components/pages/home/styleGuide";
import {getAllCategories} from '@/lib/controllers/processCategories'
import { CreditCardIcon, PhoneIcon, Truck, UndoDotIcon } from "lucide-react";
import LookBookFeats from "@/components/pages/home/LookBookFeats";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kadian - Premium Fashion & Lifestyle",
  description: "Shop the latest fashion trends at Kadian. Discover our curated collection of premium clothing, accessories, and lifestyle products.",
  openGraph: {
    title: "Kadian - Premium Fashion & Lifestyle",
    description: "Shop the latest fashion trends at Kadian. Discover our curated collection of premium clothing, accessories, and lifestyle products.",
  },
};


const Index = async () => {
  const category = await getAllCategories()
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <LookBookFeats />
        <FeaturedContent />
        <CategoryShowcase categories={category}/>
        
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
      
      </main>
      <Footer />
    </div>
  );
};

export default Index;
