import { ArrayRule, BooleanDefinition, defineField } from "sanity";
import { singleImage, SingleImageConfig } from "./singleImage";

export const imageGallery = ({
  description,
  name,
  title,
  fieldset,
  important = true,
  singleImageConfig,
  activeConfig
}: {
  name?: string;
  title?: string;
  description?: string;
  fieldset?: string;
  important?: boolean;
  singleImageConfig?: SingleImageConfig;
  activeConfig?:Partial<Omit<BooleanDefinition, "type">>
}) => {
  const primaryName = activeConfig?.name||"primary"
  const primaryNameTitle = activeConfig?.title||"Main image"
  type ValidationObj = {
    [primaryName]:boolean
  }
  
  const hasOnly1Primary = (Rule:ArrayRule<ValidationObj[]>) => Rule.custom((images) => {
          if (!images && !important) {
            return true
          };
          if(important && (!images || images.length <= 0)){
            return "Please add at least one image.";
          }

          const total = images?.filter(i => i[primaryName]);
          return (total?.length||0)>1?`You need only 1 ${primaryNameTitle} item remove the other ${(total?.length||2)-1}`:true;
        })
  return defineField({
    name: name || "images",
    title: title || "Images",
    type: "array",
    description:
      description ||
      "image gallery; each image must have alt text for accessibility.",
    of: [
      singleImage({
        type: "arrayItem",
        config: {
          main: {
            name: "single_image",
            title: "Image",
            fields: [
              defineField({
                name: primaryName,
                title: primaryNameTitle,
                type: "boolean",
                description: "Show this image as the main image",
                initialValue: false,
                ...activeConfig,
              }),
            ],
          },
          previewDefaultValue(data) {
            return {
              title: data.title || "— no alt text —",
              ...(singleImageConfig?.previewDefaultValue
                ? singleImageConfig?.previewDefaultValue(data)
                : {}),
            };
          },
          ...singleImageConfig,
        },
      }),
    ],
    validation: hasOnly1Primary,
    fieldset,
  });
};
