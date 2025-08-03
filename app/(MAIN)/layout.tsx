import Footer from "@/components/feautures/footer";
import Header from "@/components/feautures/header";
import { processShopListNavigations } from "@/lib/controllers/processShopListNavigations";
import { HasSlot } from "@/types";




export default async function MainLayout({ children}: HasSlot) {
  const navItems = await processShopListNavigations()
  
  return (
    <main className="w-full">
      <Header navItems={navItems}/>
      {children}
      <Footer/>
    </main>
  );
}
