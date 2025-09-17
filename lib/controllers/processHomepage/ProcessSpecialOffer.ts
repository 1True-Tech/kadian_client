import queries from "@/lib/queries";
import { client } from "@/lib/utils/NSClient";
import { fashionImageBuilder } from "@/lib/utils/fashionImageTransformer";
import { imageAssetWithAlt } from "@/types/structures";
import {
  SpecialOfferRaw,
  SpecialOfferReady,
  SpecialOffers,
} from "@/types/home";
import { processProducts } from "../processShop/processProducts";

export const processSpecialOffersHome = async (): Promise<
  SpecialOfferReady[]
> => {
  const items =
    (await client.fetch<SpecialOfferRaw[]>(queries.HomePageSpecialOffer)) ||
    ([] as SpecialOffers);

  return items.map((item) => {
    const { alt, ...image } = (item.displayImages as imageAssetWithAlt[])[0];
    const imageSrc = fashionImageBuilder([{ ...image.asset }], {
      height: 700,
      width: 1200,
      quality: 100,
      format: "webp",
    })[0];
    const products = item.products.map((p) => {
      return {
      ...p,
      product: processProducts([p.product])[0],
    }
    });

    // return the transformed item
    return {
      ...item,
      displayImages: {
        alt,
        src: imageSrc,
      },
      products,
    };
  });
};
