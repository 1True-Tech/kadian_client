import React from "react";

export interface HasSlot {
  children: React.ReactNode;
}
export type FalsyValue = false | "" | 0 | 0n | null | undefined;
export type TruthyValue<T> = Exclude<T, FalsyValue>;
export type DotNestedKeys<T> = T extends object
  ? {
      [K in Extract<keyof T, string>]: T[K] extends object
        ? K | `${K}.${DotNestedKeys<T[K]>}`
        : K;
    }[Extract<keyof T, string>]
  : never;
export namespace Booleanish {
  export type Falsy = FalsyValue;
  export type Truthy<T> = TruthyValue<T>;
}

export type TrueObject<T> = {
  [K in keyof T]: Booleanish.Truthy<T[K]>;
};
 export interface Color {
  hex: string;
  name: string;
  rgba: string;
}

export interface NavItemChildrenBase {
  hasLabel?: boolean;
  items: {
    name: string;
    url: string;
  }[];
}
export interface NavItemChildrenWithLabel extends NavItemChildrenBase {
  hasLabel: true;
  label: string;
}
export interface NavItem {
  label: string;
  url?: string;
  children?: NavItemChildrenWithLabel[];
}


export interface sanityImageAsset {
  _ref: string;
    _type: "image";
}
export interface imageAssetWithAsset {
  asset:{
    type: string;
  asset: sanityImageAsset;
  }
}

export interface imageAssetWithAlt extends imageAssetWithAsset{
  alt: string;
}
export interface imageAssetWithCaption extends imageAssetWithAsset {
  caption: string;
}

export type imageAssetWithCaptionAndAlt = imageAssetWithAlt & imageAssetWithCaption;

export interface ContentChild {
  marks: string[];
  text: string;
  type: string | null;
}

// Any custom annotations (e.g. links) on a content line
export interface MarkDef {
  id: string;
  type: string;
  href?: string;
}



