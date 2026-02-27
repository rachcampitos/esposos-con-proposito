import { defineField, defineType } from "sanity";
import { BellIcon } from "@sanity/icons";

export const anuncio = defineType({
  name: "anuncio",
  title: "Anuncio",
  type: "document",
  icon: BellIcon,
  fields: [
    defineField({
      name: "message",
      title: "Mensaje",
      type: "text",
      rows: 6,
      description: "Pega el mensaje tal cual (puede incluir emojis)",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      title: "Fecha",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: "important",
      title: "¿Es urgente/importante?",
      type: "boolean",
      description: "Los anuncios importantes se destacan visualmente",
      initialValue: false,
    }),
    defineField({
      name: "active",
      title: "¿Mostrar en el sitio?",
      type: "boolean",
      description: "Desmarca cuando el anuncio ya no sea relevante",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "message", date: "date" },
    prepare({ title, date }) {
      return {
        title: title?.slice(0, 60) + (title?.length > 60 ? "..." : ""),
        subtitle: date
          ? new Date(date).toLocaleDateString("es-PE", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : "",
      };
    },
  },
});
