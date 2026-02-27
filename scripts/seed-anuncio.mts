import { createClient } from "next-sanity";

const client = createClient({
  projectId: "2y2erjec",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

const result = await client.create({
  _type: "anuncio",
  message:
    "Buenos días a todos😎☀️\n\nTal como se coordinó el pasado miércoles, nuestras reuniones de formación serán los días lunes de 08.00 a 09.30 pm. en modalidad remota - virtual\n(a excepción de las fechas del mes de junio que serán presenciales).\n\nPor favor confirmar la recepción de este mensaje 📝\n\n¡Lindo fds en familia!🌈",
  date: new Date().toISOString(),
  important: false,
  active: true,
});

console.log("✓ Anuncio creado:", result._id);
