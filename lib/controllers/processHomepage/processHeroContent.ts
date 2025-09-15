import queries from "@/lib/queries";
import { client } from "@/lib/utils/NSClient";
import { fashionImageBuilder } from "@/lib/utils/fashionImageTransformer";
import { imageAssetWithAsset } from "@/types/structures";
import { HomePageHero } from "@/types/home";

export const processHomepageHeroContent = async (): Promise<HomePageHero[]> => {
  const items = await client.fetch<(Omit<HomePageHero, "image">&{image:{
    main:imageAssetWithAsset|null;
    mobile:imageAssetWithAsset|null;
    alt:string;
  }})[]>(queries.homepageHero);
  return items.map((item) => {
    const image = item.image ?? {};

    const mainObj = image.main;
    const mobileObj = image.mobile;

    let mainUrl: string | null = null;
    if (mainObj&& mainObj.asset) {
      mainUrl = fashionImageBuilder([mainObj], {
        height: 700,
        width: 1200,
        quality: 100,
        format: "webp",
      })[0];
    }

    let mobileUrl: string | null = null;
    if (mobileObj&& mobileObj.asset) {
      mobileUrl = fashionImageBuilder([mobileObj], {
        height: 700,
        width: 1200,
        quality: 100,
        format: "webp",
      })[0];
    }

    // return the transformed item
    return {
      ...item,
      image: {
        ...image,
        main: mainUrl,
        mobile: mobileUrl,
      },
    };
  });
};
