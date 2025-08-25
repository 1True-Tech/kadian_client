import PagesLayout from "@/components/layout/PagesLayout";
import { HasSlot } from "@/types/structures";

export default function Layout({ children }: HasSlot) {
  return <PagesLayout>{children}</PagesLayout>;
}
