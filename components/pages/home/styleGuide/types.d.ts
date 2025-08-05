export interface HomeStyleGuideItem {
  slug: string;
  image: {
    src: string;
    alt: string;
  };
  sectionsLength: number;
  category: string;
  description: ContentLine;
  title: string;
}
