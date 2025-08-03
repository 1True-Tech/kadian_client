import { TypedObject } from "sanity";
import { ContentChild, imageAssetWithAlt, MarkDef, sanityImageAsset } from ".";

export interface HomePageHero{
    title: string;
  subtitle: string;
  cta:{
    link:string;
style:string;
text:string;
  },
  "image":{
    "alt": string;
    "main": string|null,
    "mobile": string|null
  }
}


// A span of text inside a content line


export interface ContentLine {
  type: string | null;
  style: string | null;
  children: ContentChild[];
  markDefs: MarkDef[] | null;
}

export interface LookBookItem {
  title:string;
  slug: string;
  previewImage: {
    src: string;
    alt: string;
  };
  contentLines: TypedObject[];
}
