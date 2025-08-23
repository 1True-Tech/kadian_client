import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import CategoryShowcase from "@/components/sections/CategoryShowcase";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <CategoryShowcase />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
