import {
  fashionImageBuilder,
  FashionImageOptions,
} from "@/cms-studio/lib/utils/fashionImageTransformer";
import { defineField, defineArrayMember } from "sanity";

export const imageGallery = ({
  description,
  name,
  title,
  fieldset,
  important = true,
  previewImgOptions
}: {
  name?: string;
  title?: string;
  description?: string;
  fieldset?: string;
  important?: boolean;
  previewImgOptions?: FashionImageOptions;
}) =>
  defineField({
    name: name || "images",
    title: title || "Images",
    type: "array",
    description:
      description ||
      "image gallery; each image must have alt text for accessibility.",
    of: [
      defineArrayMember({
        type: "object",
        fields: [
          {
            name: "asset",
            title: "Image",
            type: "image",
            options: { hotspot: true },
          },
          {
            name: "alt",
            title: "Alternative Text",
            type: "string",
            description: "A short, descriptive text for screen readers.",
            validation: (Rule) =>
              Rule.required()
                .error("Alt text is required for every image.")
                .min(5)
                .max(100),
          },
        ],
        preview: {
          select: {
            title: "alt",
            media: "asset",
          },
          prepare({ title, media }) {
            const url = media
              ? fashionImageBuilder([media], {
                  quality: 80,
                  treatment: "thumbnail",
                  format: "webp",
                  ...previewImgOptions
                })[0]
              : undefined;
            return {
              title: title || "— no alt text —",
              imageUrl: url,
            };
          },
        },
      }),
    ],
    validation: important
      ? (Rule) => Rule.required().min(1).error("Please add at least one image.")
      : undefined,
    fieldset,
  });
