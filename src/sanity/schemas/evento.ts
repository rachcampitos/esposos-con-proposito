import { defineField, defineType } from "sanity";
import { CalendarIcon } from "@sanity/icons";

export const evento = defineType({
  name: "evento",
  title: "Evento",
  type: "document",
  icon: CalendarIcon,
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
      description: 'Escribe la fecha como quieres que aparezca, ej: "15 de Marzo, 2026"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "time",
      title: "Hora",
      type: "string",
      description: 'Ej: "5:00 PM - 8:00 PM"',
    }),
    defineField({
      name: "location",
      title: "Lugar",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "isPast",
      title: "¿Evento pasado?",
      type: "boolean",
      description: "Marca esta casilla si el evento ya pasó",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "date" },
  },
});
