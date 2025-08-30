import { ReadyImage } from "./home";
import { ProductCardDataRaw, ProductCardDataReady } from "./product";
import { imageAssetWithAlt } from "./structures";


interface Slug {
  current: string;
  _type: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: Slug;
  description?: string;
  category_images: ReadyImage[];
  collections: Collection[];
}

export interface CategoryRaw {
  _id: string;
  name: string;
  slug: Slug;
  description?: string;
  category_images: imageAssetWithAlt[];
  collections: CollectionRaw[];
}

export interface Collection {
  _id: string;
  title: string;
  slug: Slug;
  description?: string;
  active: boolean;
  priority?: number;
  dateRange?: {
    startDate: string;
    endDate: string;
  };
  collection_images: ReadyImage[];
  products: {
    _id: string;
    name: string;
    slug: Slug;
    image: Image;
  }[];
}

export interface CollectionRaw {
  _id: string;
  title: string;
  slug: Slug;
  description?: string;
  active: boolean;
  priority?: number;
  dateRange?: {
    startDate: string;
    endDate: string;
  };
  collection_images: imageAssetWithAlt[];
  products: {
    _id: string;
    name: string;
    slug: Slug;
    image: imageAssetWithAlt;
  }[];
}

interface ShopCategoryBase {
  description: string;
  name: string;
  slug: string;
}

interface ShopCategoryRaw extends ShopCategoryBase {
  category_images: imageAssetWithAlt[];
  collections: ShopCollectionRaw[]
}

interface ShopCategoryReady extends ShopCategoryBase {
  category_images: ReadyImage[];
  collections: ShopCollectionReady[]
}

interface ShopCollectionBase {
  title: string;
  slug: string;
  description: string;
}

interface ShopCollectionRaw extends ShopCollectionBase {
  collection_images: imageAssetWithAlt[];
  products: ProductCardDataRaw[];
}

interface ShopCollectionReady extends ShopCollectionBase {
  collection_images: ReadyImage[];
  products: ProductCardDataReady[];
}
