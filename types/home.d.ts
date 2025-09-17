import { TypedObject } from "sanity";
import {
  Color,
  ContentChild,
  imageAssetWithAlt,
  MarkDef,
  sanityImageAsset,
} from "./structures";
import { ProductRaw, ProductReady } from "./product";

export interface HomePageHero {
  title: string;
  subtitle: string;
  cta: {
    link: string;
    style: string;
    text: string;
  };
  image: {
    alt: string;
    main: string | null;
    mobile: string | null;
  };
}

// A span of text inside a content line

export interface ContentLine {
  type: string | null;
  style: string | null;
  children: ContentChild[];
  markDefs: MarkDef[] | null;
}

export interface ReadyImage {
  src: string;
  alt: string;
}
export interface LookBookItem {
  title: string;
  slug: string;
  previewImage: ReadyImage;
  contentLines: TypedObject[];
}

export type SpecialOffers = SpecialOffer[];

export interface SpecialOfferBase {
  slug: string;
  displayImages: imageAssetWithAlt[] | ReadyImage;
  highlightColor: Color;
  title: string;
  terms: TypedObject[] | null;
  category:
    | "flash_sale"
    | "seasonal_sale"
    | "clearance"
    | "bundle"
    | "new_customer"
    | "featured";
}
export interface SpecialOfferReady extends SpecialOfferBase {
  products: OfferProductReady[];
}
export interface SpecialOfferRaw extends SpecialOfferBase {
  products: OfferProductRaw[];
}



export interface OfferProductBase {
  discountType: "percentage" | "fixed" | "special";
  discountValue: number;
  featured: boolean;
}
export interface OfferProductReady extends OfferProductBase {
  product: ProductReady;
}
export interface OfferProductRaw extends OfferProductBase {
  product: ProductRaw;
}

export interface OfferProductInfo {
  hasStock: boolean;
  name: string;
  slug: string;
  price: number;
  image: imageAssetWithAlt| ReadyImage;
}
