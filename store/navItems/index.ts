import { processShopListNavigations } from "@/lib/controllers/processShopListNavigations";
import { NavItem } from "@/types";
import { produce } from "immer";
import { create } from "zustand";

export const useNavItems = create<{
  items: NavItem[];
  load: () => void;
}>((set) => ({
  items: [
    {
        label: "Home",
        url: "/",
      },
      {
        label: "Sale",
        url: "/sale",
      },
      {
        label: "About",
        url: "/about",
      },
      {
        label: "Consultation",
        url: "/consultation",
      },
  ],
  async load() {
    const navitems = await processShopListNavigations();

    set(
      produce((draft) => {
        draft.items = navitems;
      })
    );
  },
}));
