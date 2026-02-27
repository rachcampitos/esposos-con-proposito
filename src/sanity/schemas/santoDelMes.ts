import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

export const santoDelMes = defineType({
  name: "santoDelMes",
  title: "Santo del Mes",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre del santo",
      type: "string",
      description: 'Ej: "San José"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "fiesta",
      title: "Fiesta litúrgica",
      type: "string",
      description: 'Ej: "19 de marzo"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "patronoDe",
      title: "Patrón/a de",
      type: "string",
      description: 'Ej: "las familias, los trabajadores y la Iglesia universal"',
    }),
    defineField({
      name: "bio",
      title: "Breve reseña",
      type: "text",
      rows: 4,
      description: "Una breve descripción de su vida y relevancia para las parejas",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "oracion",
      title: "Oración",
      type: "text",
      rows: 4,
      description: "Oración breve al santo para rezar en pareja",
    }),
    defineField({
      name: "active",
      title: "¿Es el santo de este mes?",
      type: "boolean",
      description: "Solo uno debe estar activo a la vez",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "nombre", subtitle: "fiesta", active: "active" },
    prepare({ title, subtitle, active }) {
      return {
        title: `${active ? "● " : ""}${title}`,
        subtitle,
      };
    },
  },
});
