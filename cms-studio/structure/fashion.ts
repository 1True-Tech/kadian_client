// structure/fashion.ts
import { GroupDefinition } from "../lib/plugins/desk";

export const fashionStructure: GroupDefinition = {
  title: "Fashion Content",
  schemaTypes: [
    "lookbook",
    "styleGuide",
    "sizeGuide",
    // "blogPost",
    // "homepageHero",
  ],
  builders() {
    return [];
  },
};
