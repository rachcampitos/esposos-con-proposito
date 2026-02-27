import { defineField, defineType } from "sanity";
import { StarIcon } from "@sanity/icons";

export const temporadaLiturgica = defineType({
  name: "temporadaLiturgica",
  title: "Temporada Litúrgica",
  type: "document",
  icon: StarIcon,
  fields: [
    defineField({
      name: "temporada",
      title: "Temporada",
      type: "string",
      options: {
        list: [
          { title: "Adviento", value: "adviento" },
          { title: "Navidad", value: "navidad" },
          { title: "Cuaresma", value: "cuaresma" },
          { title: "Semana Santa", value: "semana-santa" },
          { title: "Pascua", value: "pascua" },
          { title: "Tiempo Ordinario", value: "ordinario" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "titulo",
      title: "Título del banner",
      type: "string",
      description: 'Ej: "Tiempo de Cuaresma"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "mensaje",
      title: "Mensaje",
      type: "text",
      rows: 3,
      description: "Mensaje breve para la comunidad en esta temporada",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "cita",
      title: "Cita bíblica",
      type: "string",
      description: 'Ej: "Joel 2:12"',
    }),
    defineField({
      name: "textoCita",
      title: "Texto del versículo",
      type: "string",
      description: "El texto del versículo",
    }),
    defineField({
      name: "active",
      title: "¿Mostrar este banner?",
      type: "boolean",
      description: "Solo uno debe estar activo a la vez",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "titulo", subtitle: "temporada", active: "active" },
    prepare({ title, subtitle, active }) {
      return {
        title: `${active ? "● " : ""}${title}`,
        subtitle: subtitle?.charAt(0).toUpperCase() + subtitle?.slice(1),
      };
    },
  },
});
