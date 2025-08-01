// lib/utils/fashionImageTransformer.ts
import {
  ImageUrlBuilderOptions,
  SanityImageObject,
} from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "./imageUrlBuilder";

type FashionTreatment = "lookbook" | "catalog" | "thumbnail" | "zoom";
type FashionColorScheme =
  | "original"
| 'blackAndWhite'
  | 'dim'
  | 'sharp'
  | 'soft'
  | 'invert'
  | 'lowSaturation'
  | 'blurred';

export interface FashionImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: "jpg" | "webp" | "png"; // Assuming ImageFormat matches these
  colorScheme?: FashionColorScheme;
  treatment?: FashionTreatment;
}

const getColorAdjustment = (scheme: FashionColorScheme): ImageUrlBuilderOptions => {
  switch (scheme) {
    case 'blackAndWhite':
    case 'lowSaturation':
      return { saturation: -100 }; // Only supported value

    case 'dim':
      return { blur: 10 };

    case 'sharp':
      return { sharpen: 100 };

    case 'soft':
      return { sharpen: 10 };

    case 'invert':
      return { invert: true };

    case 'blurred':
      return { blur: 50 };

    default:
      return {};
  }
};
const getTreatmentSettings = (
  treatment: FashionTreatment
): Partial<ImageUrlBuilderOptions> => {
  switch (treatment) {
    case "lookbook":
      return {
        width: 1200,
        height: 1600,
        quality: 90,
        format: "webp",
      };
    case "catalog":
      return {
        width: 800,
        height: 1200,
        quality: 85,
        format: "webp",
      };
    case "thumbnail":
      return {
        width: 300,
        height: 450,
        quality: 70,
        format: "webp",
      };
    case "zoom":
      return {
        width: 2000,
        height: 3000,
        quality: 100,
        format: "webp",
      };
    default:
      return {};
  }
};

export const fashionImageBuilder = (
  assets: SanityImageObject[],
  options: FashionImageOptions = {}
) => {
  const treatmentSettings: Partial<ImageUrlBuilderOptions> = options.treatment
    ? getTreatmentSettings(options.treatment)
    : {};

  const colorSettings: Partial<ImageUrlBuilderOptions> = options.colorScheme
    ? getColorAdjustment(options.colorScheme)
    : {};

  // Cleaned options (only allowed props)
  const normalizedOptions: Partial<ImageUrlBuilderOptions> = {
    width: options.width,
    height: options.height,
    quality: options.quality,
    format: options.format,
  };

  const combinedOptions: ImageUrlBuilderOptions = {
    ...treatmentSettings,
    ...normalizedOptions,
    ...colorSettings,
  };

  return imageUrlBuilder(assets, combinedOptions);
};
