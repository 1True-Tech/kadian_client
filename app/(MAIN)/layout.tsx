import Footer from "@/components/feautures/footer";
import Header from "@/components/feautures/header";
import { HasSlot } from "@/types";

export default function MainLayout({ children }: HasSlot) {
  return (
    <main className="w-full">
      <Header />
      {children}
      <Footer/>
    </main>
  );
}
