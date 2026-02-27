import { defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons";

export const foto = defineType({
  name: "foto",
  title: "Foto",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "image",
      title: "Imagen",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      description: "Descripción breve de la foto",
    }),
    defineField({
      name: "album",
      title: "Álbum",
      type: "reference",
      to: [{ type: "album" }],
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "title", media: "image" },
  },
});
