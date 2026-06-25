import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Esposos con Propósito";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#2D4A7A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          padding: 60,
        }}
      >
        {/* Ícono corazón */}
        <div
          style={{
            width: 100,
            height: 100,
            background: "rgba(181,137,90,0.2)",
            borderRadius: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 56,
            marginBottom: 8,
          }}
        >
          ♥
        </div>

        {/* Título */}
        <div
          style={{
            fontSize: 58,
            fontWeight: 700,
            color: "white",
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          Esposos con Propósito
        </div>

        {/* Línea dorada */}
        <div
          style={{
            width: 80,
            height: 3,
            background: "#B5895A",
            borderRadius: 2,
            margin: "4px 0",
          }}
        />

        {/* Subtítulo */}
        <div
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.65)",
            textAlign: "center",
          }}
        >
          Directorio de nuestra comunidad
        </div>
      </div>
    ),
    { ...size }
  );
}
