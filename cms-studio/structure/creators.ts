import { StructureBuilder } from "sanity/structure";

const creators = (
  types: { type: string; title: string; id: string }[],
  S: StructureBuilder
) => {
  return types.map((type) =>
    S.listItem()
      .title(type.title)
      .id(type.id)
      .child(S.document().schemaType(type.type).initialValueTemplate(type.type))
  );
};

export default creators
