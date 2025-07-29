import HeaderNavSection from "./headerNavSection";
import HeaderTopSection from "./headerTopSection";

export default function Header() {
  return (
    <header className="px-4 sm:px-8 w-full z-50 sticky divide-y-1 -top-10 bg-background">
      {/* top section */}
      <HeaderTopSection />
      {/* nav */}
      <HeaderNavSection/>
    </header>
  );
}
