// lib/processors/specialOfferProcessor.ts
import queries from "@/lib/queries";
import { client } from "@/lib/utils/NSClient";
import { fashionImageBuilder } from "@/lib/utils/fashionImageTransformer";
import { SpecialOfferRaw, SpecialOfferReady } from "@/types/specialoffer";
import { imageAssetWithAsset } from "@/types/structures";
import { processProducts } from "../processShop/processProducts";

interface PropsAll {
  type?: "all";
}

interface PropsSingle {
  type: "single";
  id: string;
}

type SpecialOfferParams = PropsAll | PropsSingle;

export const processSpecialOffers = async ({
  type = "all",
  ...props
}: SpecialOfferParams): Promise<SpecialOfferReady[] | SpecialOfferReady | null> => {
  const query = type==="all"?"specialOfferQuery":"specialOfferSingleQuery"
  const id = type=="single"?(props as PropsSingle).id:""
  const raw = await client.fetch<SpecialOfferRaw[] | null>(
    queries[query],
    {id}
  );
  if (!raw) return null;

  const normalizeAsset = (img: any): imageAssetWithAsset | null => {
    if (!img?.asset) return null;
    if (img.asset._ref) return img as imageAssetWithAsset;
    if (img.asset.asset?._ref) {
      return {
        ...img,
        asset: { _ref: img.asset.asset._ref, _type: "reference" },
      } as imageAssetWithAsset;
    }
    return null;
  };

  const mapImages = (
    imgs: (imageAssetWithAsset & { alt?: string; primary?: boolean })[] = []
  ) =>
    imgs.map((img) => {
      const normalized = normalizeAsset(img);
      return {
        alt: img.alt ?? "",
        primary: img.primary ?? false,
        src: normalized
          ? fashionImageBuilder([normalized], {
              width: 800,
              height: 800,
              quality: 90,
              format: "webp",
            })[0]
          : null,
      };
    });

  const processed = raw.map((offer) => ({
    ...offer,
    displayImages: mapImages(offer.displayImages),
    metadata: offer.metadata
      ? {
          ...offer.metadata,
        }
      : undefined,
    products: offer.products.map((p) => ({
      ...p,
      product: processProducts([p.product])[0],
    })),
  }));

  if (type === "single") {
    const found = processed[0]
    return found ?? null;
  }

  return processed;
};
