import { defineField, defineType } from "sanity";
import { UsersIcon } from "@sanity/icons";

export const testimonio = defineType({
  name: "testimonio",
  title: "Testimonio",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "quote",
      title: "Cita",
      type: "text",
      rows: 4,
      description: "El testimonio de la pareja",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "couple",
      title: "Pareja",
      type: "string",
      description: 'Ej: "Pareja de la comunidad" o sus nombres',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "years",
      title: "Años de casados",
      type: "string",
      description: 'Ej: "8 años de casados"',
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "couple", subtitle: "years" },
  },
});
