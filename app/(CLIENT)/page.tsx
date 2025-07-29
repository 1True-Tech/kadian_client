"use client";
import ServiceFeatures from "@/components/pages/home/feautures";
import HeroSection from "@/components/pages/home/HeroSection";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/lib/hooks/theme";
import { CreditCardIcon, PhoneIcon, Truck, UndoDotIcon } from "lucide-react";

export default function Home() {
  const { setTheme,theme } = useTheme();
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
      <Switch
        onCheckedChange={(isChecked) => {
          setTheme(isChecked ? "dark" : "light");
        }}
        checked={theme==="dark"}
      >
        Dark
      </Switch>
    </main>
  );
}
