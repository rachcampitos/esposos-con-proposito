import { defineField, defineType } from "sanity";
import { ImagesIcon } from "@sanity/icons";

export const album = defineType({
  name: "album",
  title: "Álbum",
  type: "document",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      title: "Fecha",
      type: "string",
      description: 'Ej: "Junio 2025"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "date" },
  },
});
