"use client";
import { HasSlot } from "@/types/structures";
import { useParams } from "next/navigation";
import { createContext, useContext } from "react";

type shopParams = {
  collection?: string;
  category?: string;
};

const ShopParamsContext = createContext<shopParams>({});

const useShopParams = () => {
  const theme = useContext(ShopParamsContext);
  if (!theme)
    throw Error("must be within a ShopParamsProvider", {
      cause: "using use ShopParams outside a ShopParamsProvider",
    });

  return theme;
};

const ShopParamsProvider = ({ children }: HasSlot) => {
  const { shop_items } = useParams<{ shop_items: [string, string] }>();

  return (
    <ShopParamsContext.Provider
      value={{
        category: shop_items[0],
        collection: shop_items[1],
      }}
    >
      {children}
    </ShopParamsContext.Provider>
  );
};

export { ShopParamsProvider, useShopParams };
