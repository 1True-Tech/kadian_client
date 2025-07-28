"use client"
import HeroSection from "@/components/pages/home/HeroSection";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";

export default function Home() {
  const {setTheme} = useTheme()
  return (
    <main className="w-full">
      <HeroSection />
      <Switch onCheckedChange={(isChecked)=>{
        setTheme(isChecked? "dark" : "light")
      }} >Dark</Switch>
    </main>
  );
}
