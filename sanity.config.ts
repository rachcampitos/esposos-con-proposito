import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemas";
import { projectId, dataset } from "./src/sanity/env";

export default defineConfig({
  name: "esposos-con-proposito",
  title: "Esposos con Propósito",

  projectId,
  dataset,
  basePath: "/studio",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Contenido")
          .items([
            S.listItem()
              .title("Anuncios")
              .child(S.documentTypeList("anuncio").title("Anuncios")),
            S.divider(),
            S.listItem()
              .title("Eventos")
              .child(S.documentTypeList("evento").title("Eventos")),
            S.listItem()
              .title("Testimonios")
              .child(S.documentTypeList("testimonio").title("Testimonios")),
            S.listItem()
              .title("Artículos")
              .child(S.documentTypeList("articulo").title("Artículos")),
            S.divider(),
            S.listItem()
              .title("Álbumes")
              .child(S.documentTypeList("album").title("Álbumes")),
            S.listItem()
              .title("Fotos")
              .child(S.documentTypeList("foto").title("Fotos")),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
