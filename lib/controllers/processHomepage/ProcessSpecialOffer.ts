import queries from "@/lib/queries";
import { client } from "@/lib/utils/NSClient";
import { fashionImageBuilder } from "@/lib/utils/fashionImageTransformer";
import { imageAssetWithAlt } from "@/types";
import { SpecialOffers } from "@/types/home";

export const processSpecialOffersHome = async (): Promise<SpecialOffers> => {
  const items = await client.fetch<SpecialOffers>(queries.HomePageSpecialOffer);

  return items.map((item) => {
    const { alt, ...image } = (item.displayImages as imageAssetWithAlt[])[0];
    const imageSrc = fashionImageBuilder([{ ...image.asset }], {
      height: 700,
      width: 1200,
      quality: 100,
      format: "webp",
    })[0];
    const products = item.products.map((p) => {
      const productImage = p.product.image as imageAssetWithAlt;
      const productImageSrc = fashionImageBuilder([{ ...productImage.asset }], {
        height: 700,
        width: 1200,
        quality: 100,
        format: "webp",
      })[0];
      return {
        ...p,
        product: {
          ...p.product,
          image: {
            alt: p.product.image.alt,
            src: productImageSrc,
          },
        },
      };
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
