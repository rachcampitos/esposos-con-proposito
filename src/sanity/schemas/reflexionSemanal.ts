import { defineField, defineType } from "sanity";
import { BookIcon } from "@sanity/icons";

export const reflexionSemanal = defineType({
  name: "reflexionSemanal",
  title: "Reflexión Semanal",
  type: "document",
  icon: BookIcon,
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      description: 'Ej: "La paciencia en el amor"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "cita",
      title: "Cita bíblica",
      type: "string",
      description: 'Ej: "1 Cor 13:4-7"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "textoCita",
      title: "Texto del versículo",
      type: "text",
      rows: 3,
      description: "El texto completo del versículo",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "reflexion",
      title: "Reflexión",
      type: "text",
      rows: 6,
      description: "Reflexión breve (2-3 párrafos máximo)",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "active",
      title: "¿Es la reflexión de esta semana?",
      type: "boolean",
      description: "Solo una reflexión debe estar activa a la vez",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "titulo", subtitle: "cita", active: "active" },
    prepare({ title, subtitle, active }) {
      return {
        title: `${active ? "● " : ""}${title}`,
        subtitle,
      };
    },
  },
});
