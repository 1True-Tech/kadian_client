import creators from "@/cms-studio/structure/creators";
import { isEmpty } from "@/lib/utils/preventEmpty";
import { ListItemBuilder, StructureBuilder } from "sanity/structure";

export const deskItemBuilder = (
  S: StructureBuilder,
  {
    docTitle,
    filterField,
    filterId,
    schemaType,
  }: {
    docTitle: string;
    schemaType: string;
    filterField: string;
    filterId: string;
  }
) => {
  return {
    builder: S.listItem()
      .id(
        `filtered-${schemaType}-${filterId}`
          .split("-")
          .filter((i) => !isEmpty({ value: i }).invalid)
          .join("-")
      )
      .title(docTitle)
      .schemaType(schemaType)
      .child(
        S.documentList()

          .title(docTitle)
          .filter(
            `_type == "${schemaType}"${
              filterId.trim() !== "" ? `&& ${filterField} == "${filterId}"` : ""
            }`
          )
      ),
    usedSchema: schemaType,
  };
};
export type GroupDefinition = {
  title: string;
  schemaTypes: string[];
  builders: (
    S: StructureBuilder
  ) => { builder: ListItemBuilder; usedSchema: string }[];
  skipUsedSchemas?: boolean;
};

export const deskStructure =
  (groups: GroupDefinition[]) => (S: StructureBuilder) => {
    // Flatten all schema types used in groups
    const allUsedSchemaTypes = groups.flatMap((group) => group.schemaTypes);

    return S.list()
      .title("Content")
      .items([
        // Grouped lists
        ...groups.map(({ title, builders, schemaTypes, skipUsedSchemas }) => {
          const buildersList = builders(S)
            .map((bd) => {
              const hasSchema = schemaTypes.includes(bd.usedSchema);

              if (!hasSchema) return;
              return bd;
            })
            .filter((bs) => bs !== undefined);
          const usedSchemas = new Set(buildersList.map((b) => b.usedSchema));
          const unusedTypes = skipUsedSchemas
            ? schemaTypes
            : schemaTypes.filter((st) => !usedSchemas.has(st));

          return S.listItem()
            .title(title)
            .child(
              S.list()
                .title(title)
                .items([
                  ...buildersList.map((b) => b.builder),
                  ...S.documentTypeListItems().filter((item) =>
                    unusedTypes.includes(item.getId() || "")
                  ),
                ])
            );
        }),

        S.divider(),
        ...creators(
          [
            {
              id: "new-product",
              title: "New Product",
              type: "product",
            },
            {
              id: "new-category",
              title: "New Category",
              type: "category",
            },
            {
              id: "new-collection",
              title: "New Product",
              type: "collection",
            },
          ],
          S
        ),
        S.divider(),
        // "Others" — all unused schema types
        S.listItem()
          .title("Others")
          .child(
            S.list()
              .title("Others")
              .items(
                S.documentTypeListItems().filter(
                  (item) => !allUsedSchemaTypes.includes(item.getId() || "")
                )
              )
          ),
      ]);
  };
