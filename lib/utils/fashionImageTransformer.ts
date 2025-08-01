// lib/utils/fashionImageTransformer.ts
import { SanityImageObject } from '@sanity/image-url/lib/types/types'
import imageUrlBuilder from './imageUrlBuilder';

export interface FashionImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'jpg' | 'webp' | 'png';
  colorScheme?: 'original' | 'blackAndWhite' | 'warmTone' | 'coolTone';
  treatment?: 'lookbook' | 'catalog' | 'thumbnail' | 'zoom';
}

const getColorAdjustment = (scheme: string) => {
  switch (scheme) {
    case 'blackAndWhite':
      return { saturation: -100 };
    case 'warmTone':
      return { saturation: 10, warmth: 10 };
    case 'coolTone':
      return { saturation: 10, warmth: -10 };
    default:
      return {};
  }
};

const getTreatmentSettings = (treatment: string): Partial<FashionImageOptions> => {
  switch (treatment) {
    case 'lookbook':
      return {
        width: 1200,
        height: 1600,
        quality: 90,
        format: 'webp'
      };
    case 'catalog':
      return {
        width: 800,
        height: 1200,
        quality: 85,
        format: 'webp'
      };
    case 'thumbnail':
      return {
        width: 300,
        height: 450,
        quality: 70,
        format: 'webp'
      };
    case 'zoom':
      return {
        width: 2000,
        height: 3000,
        quality: 100,
        format: 'webp'
      };
    default:
      return {};
  }
};

export const fashionImageBuilder = (
  assets: SanityImageObject[],
  options: FashionImageOptions
) => {
  const treatmentSettings = options.treatment ? getTreatmentSettings(options.treatment) : {};
  const colorSettings = options.colorScheme ? getColorAdjustment(options.colorScheme) : {};
  
  const combinedOptions = {
    ...treatmentSettings,
    ...options,
    ...colorSettings
  };

  return imageUrlBuilder(assets, combinedOptions);
};


