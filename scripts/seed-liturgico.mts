import { createClient } from "next-sanity";

const client = createClient({
  projectId: "2y2erjec",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

// ---------- Reflexión Semanal ----------

const reflexion = {
  _type: "reflexionSemanal",
  titulo: "El amor que transforma",
  cita: "1 Corintios 13:4-7",
  textoCita:
    "El amor es paciente, es bondadoso. El amor no es envidioso ni jactancioso ni orgulloso. No se comporta con rudeza, no es egoísta, no se enoja fácilmente, no guarda rencor.",
  reflexion:
    "En el camino del matrimonio, San Pablo nos recuerda que el amor verdadero no es un sentimiento pasajero, sino una decisión diaria. Cada mañana elegimos amar — con paciencia cuando el otro nos frustra, con bondad cuando estamos cansados, con humildad cuando querríamos tener razón.\n\nEsta semana, les invitamos a reflexionar juntos como pareja: ¿en qué momento de nuestra semana podemos practicar más la paciencia? ¿Cómo podemos ser más bondadosos en los pequeños detalles del día a día? A veces el amor más grande se manifiesta en las cosas más sencillas — un café preparado sin que lo pidan, una palabra de ánimo en un día difícil, un abrazo silencioso cuando sobran las palabras.",
  active: true,
};

// ---------- Temporada Litúrgica ----------

const temporada = {
  _type: "temporadaLiturgica",
  temporada: "cuaresma",
  titulo: "Tiempo de Cuaresma 2026",
  mensaje:
    "La Cuaresma es una invitación para cada pareja a renovar su amor desde adentro. Les proponemos vivir este tiempo juntos en oración compartida, ayuno conyugal y limosna en familia — tres prácticas que fortalecen el vínculo matrimonial y nos acercan a la Pascua.",
  cita: "Joel 2:12",
  textoCita: "Conviértanse a mí de todo corazón",
  active: true,
};

// ---------- Santo del Mes ----------

const santo = {
  _type: "santoDelMes",
  nombre: "San José",
  fiesta: "19 de marzo",
  patronoDe: "las familias, los trabajadores y la Iglesia universal",
  bio: "San José es el modelo por excelencia del esposo y padre cristiano. Fue un hombre justo que supo escuchar la voz de Dios en el silencio, proteger a su familia en medio de la adversidad y trabajar con sus manos para sostener su hogar.\n\nPara nosotros como esposos, San José nos enseña que la fortaleza del hombre no está en la fuerza ni en las palabras, sino en la fidelidad silenciosa, en el amor que protege y en la fe que confía cuando no entiende. El Papa Francisco nos invita en Patris Corde a descubrir en José un padre con corazón tierno, obediente y valiente.",
  oracion: "San José, esposo fiel y padre amoroso, enséñanos a cuidar nuestro hogar como tú cuidaste el tuyo. Danos tu fortaleza silenciosa para sostener a nuestra familia, tu fe para confiar en los planes de Dios, y tu ternura para amar sin condiciones. Amén.",
  active: true,
};

// ---------- Seed ----------

async function seed() {
  console.log("Creando reflexión semanal...");
  const r = await client.create(reflexion);
  console.log(`  ✓ ${reflexion.titulo} (${r._id})`);

  console.log("\nCreando temporada litúrgica...");
  const t = await client.create(temporada);
  console.log(`  ✓ ${temporada.titulo} (${t._id})`);

  console.log("\nCreando santo del mes...");
  const s = await client.create(santo);
  console.log(`  ✓ ${santo.nombre} (${s._id})`);

  console.log("\n✅ Seed litúrgico completado — reflexión, temporada, santo");
}

seed().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
