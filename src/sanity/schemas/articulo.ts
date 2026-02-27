import { defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export const articulo = defineType({
  name: "articulo",
  title: "Artículo",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "URL",
      type: "slug",
      description: "Se genera automáticamente del título",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Extracto",
      type: "text",
      rows: 3,
      description: "Resumen corto que aparece en el listado",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "string",
      options: {
        list: [
          { title: "Fe", value: "Fe" },
          { title: "Matrimonio", value: "Matrimonio" },
          { title: "Familia", value: "Familia" },
          { title: "Crecimiento", value: "Crecimiento" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "readTime",
      title: "Tiempo de lectura",
      type: "string",
      description: 'Ej: "5 min"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      title: "Fecha",
      type: "string",
      description: 'Ej: "Febrero 2026"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "content",
      title: "Contenido",
      type: "array",
      of: [{ type: "block" }],
      description: "El contenido completo del artículo",
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category" },
  },
});
