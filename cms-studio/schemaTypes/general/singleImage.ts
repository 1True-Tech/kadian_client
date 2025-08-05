import {
  fashionImageBuilder,
  FashionImageOptions,
} from "@/lib/utils/fashionImageTransformer";
import {
  defineArrayMember,
  defineField,
  ImageDefinition,
  ObjectDefinition,
  PreviewValue,
  StringDefinition,
} from "sanity";

export interface SingleImageConfig {
  main?: Partial<Omit<ObjectDefinition, "type">>;
  asset?: Partial<Omit<ImageDefinition, "type">>;
  alt?: Partial<Omit<StringDefinition, "type">> | false;
  caption?: Partial<Omit<StringDefinition, "type">> | false;
  previewImgOptions?: FashionImageOptions;
  previewDefaultValue?: (data: Record<string, any>) => PreviewValue;
}

export function singleImage({
  config,
  type = "imageSeparate",
}: {
  config?: Partial<SingleImageConfig>;
  type?: "imageSeparate" | "arrayItem";
}) {
  const definer = type === "imageSeparate" ? defineField : defineArrayMember;
  const caption =
    config?.caption !== false || config?.caption !== undefined
      ? [
          defineField({
            name: "caption",
            type: "string",
            title: "Caption",
            ...config?.caption,
          }),
        ]
      : [];
  const alt = defineField({
    name: "alt",
    type: "string",
    title: "Alt Text",
    validation: (Rule) => Rule.required(),
    ...config?.alt,
  });
  const asset = defineField({
    name: "asset",
    title: "Image item",
    type: "image",
    options: { hotspot: true },
    ...config?.asset,
  });

  return definer({
    name: "imageObject",
    title: "Look Image",
    type: "object",
    ...config?.main,
    fields: [asset, alt, ...caption, ...(config?.main?.fields || [])],
    preview: {
      select: {
        media: asset.name,
        sub: caption[0] ? caption[0].name : "caption",
        title: alt.name,
      },
      prepare({ media, title, sub }) {
        const url = media
          ? fashionImageBuilder([media], {
              quality: 50,
              treatment: "thumbnail",
              format: "webp",
              ...config?.previewImgOptions,
            })[0]
          : undefined;
        const configValues = config?.previewDefaultValue
          ? config?.previewDefaultValue({ media, title, sub })
          : {};
        return {
          title: title || "Image",
          subtitle: sub || "",
          imageUrl: url,
          ...configValues,
        };
      },
      ...config?.main?.preview,
    },
  });
}
