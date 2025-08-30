export interface sanityImageAsset {
  _ref: string;
  _type: "image";
}

export interface imageAssetWithAsset {
  asset: {
    type: string;
    asset: sanityImageAsset;
  };
}
export interface ReadyImage {
  src: string;
  alt: string;
}
export interface imageAssetWithAlt extends imageAssetWithAsset {
  alt: string;
}

export interface imageAssetWithCaption extends imageAssetWithAsset {
  caption: string;
}

export type imageAssetWithCaptionAndAlt = imageAssetWithAlt & imageAssetWithCaption;
