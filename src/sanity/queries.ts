import { safeFetch } from "./client";
import type { SanityImageSource } from "./image";

// ---------- Anuncios ----------

export async function getAnunciosActivos() {
  return safeFetch<
    {
      _id: string;
      message: string;
      date: string;
      important: boolean;
    }[]
  >(
    `*[_type == "anuncio" && active == true] | order(date desc) {
      _id, message, date, important
    }`,
    undefined,
    [],
  );
}

export async function getAllAnuncios() {
  return safeFetch<
    {
      _id: string;
      message: string;
      date: string;
      important: boolean;
    }[]
  >(
    `*[_type == "anuncio"] | order(date desc) {
      _id, message, date,
      "important": coalesce(important, false)
    }`,
    undefined,
    [],
  );
}

// ---------- Reflexión Semanal ----------

export async function getReflexionSemanal() {
  return safeFetch<{
    _id: string;
    titulo: string;
    cita: string;
    textoCita: string;
    reflexion: string;
  } | null>(
    `*[_type == "reflexionSemanal" && active == true] | order(_updatedAt desc) [0] {
      _id, titulo, cita, textoCita, reflexion
    }`,
    undefined,
    null,
  );
}

// ---------- Temporada Litúrgica ----------

export async function getTemporadaLiturgica() {
  return safeFetch<{
    _id: string;
    temporada: string;
    titulo: string;
    mensaje: string;
    cita: string | null;
    textoCita: string | null;
  } | null>(
    `*[_type == "temporadaLiturgica" && active == true] | order(_updatedAt desc) [0] {
      _id, temporada, titulo, mensaje, cita, textoCita
    }`,
    undefined,
    null,
  );
}

// ---------- Santo del Mes ----------

export async function getSantoDelMes() {
  return safeFetch<{
    _id: string;
    nombre: string;
    fiesta: string;
    patronoDe: string | null;
    bio: string;
    oracion: string | null;
  } | null>(
    `*[_type == "santoDelMes" && active == true] | order(_updatedAt desc) [0] {
      _id, nombre, fiesta, patronoDe, bio, oracion
    }`,
    undefined,
    null,
  );
}

// ---------- Eventos ----------

export async function getEventos() {
  return safeFetch<
    {
      _id: string;
      title: string;
      date: string;
      time: string | null;
      location: string;
      description: string;
      isPast: boolean;
    }[]
  >(
    `*[_type == "evento"] | order(isPast asc, _createdAt desc) {
      _id, title, date, time, location, description,
      "isPast": coalesce(isPast, false)
    }`,
    undefined,
    [],
  );
}

// ---------- Testimonios ----------

export async function getTestimonios() {
  return safeFetch<
    {
      _id: string;
      quote: string;
      couple: string;
      years: string;
    }[]
  >(
    `*[_type == "testimonio"] | order(_createdAt asc) {
      _id, quote, couple, years
    }`,
    undefined,
    [],
  );
}

// ---------- Artículos ----------

export async function getArticulos() {
  return safeFetch<
    {
      _id: string;
      title: string;
      slug: string;
      excerpt: string;
      category: string;
      readTime: string;
      date: string;
    }[]
  >(
    `*[_type == "articulo"] | order(_createdAt desc) {
      _id, title, "slug": slug.current, excerpt, category, readTime, date
    }`,
    undefined,
    [],
  );
}

export async function getArticulo(slug: string) {
  return safeFetch<{
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    readTime: string;
    date: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content: any[];
  } | null>(
    `*[_type == "articulo" && slug.current == $slug][0] {
      _id, title, "slug": slug.current, excerpt, category, readTime, date, content
    }`,
    { slug },
    null,
  );
}

// ---------- Galería ----------

export async function getAlbums() {
  return safeFetch<
    {
      _id: string;
      title: string;
      date: string;
      description: string | null;
      fotos: {
        _id: string;
        title: string | null;
        image: SanityImageSource;
      }[];
    }[]
  >(
    `*[_type == "album"] | order(_createdAt desc) {
      _id, title, date, description,
      "fotos": *[_type == "foto" && album._ref == ^._id] | order(_createdAt asc) {
        _id, title, image
      }
    }`,
    undefined,
    [],
  );
}

export async function getFotosPreview() {
  return safeFetch<
    {
      _id: string;
      title: string | null;
      image: SanityImageSource;
    }[]
  >(
    `*[_type == "foto"] | order(_createdAt desc) [0...6] {
      _id, title, image
    }`,
    undefined,
    [],
  );
}
