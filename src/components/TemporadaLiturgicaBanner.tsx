import { Cross, Star, Sun, Leaf } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

interface Temporada {
  _id: string;
  temporada: string;
  titulo: string;
  mensaje: string;
  cita: string | null;
  textoCita: string | null;
}

// Liturgical colors — dark backgrounds for white text contrast
export const TEMPORADA_COLORS: Record<string, { bg: string; accent: string }> = {
  adviento: { bg: "#3B1F6E", accent: "#C4A44A" },
  navidad: { bg: "#1A3A2A", accent: "#E8D5B5" },
  cuaresma: { bg: "#4A1942", accent: "#D4A574" },
  "semana-santa": { bg: "#6B1A1A", accent: "#D4A574" },
  pascua: { bg: "#1A3A5C", accent: "#E8D5B5" },
  ordinario: { bg: "#2D5F4E", accent: "#B5895A" },
};

const FALLBACK = { bg: "#2D5F4E", accent: "#B5895A" };

function SeasonIcon({
  season,
  accent,
}: {
  season: string;
  accent: string;
}) {
  const cls = "h-6 w-6 animate-glow-pulse";

  switch (season) {
    case "cuaresma":
    case "semana-santa":
      return <Cross className={cls} color={accent} />;
    case "adviento":
    case "navidad":
      return <Star className={cls} color={accent} />;
    case "pascua":
      return <Sun className={cls} color={accent} />;
    default:
      return <Leaf className={cls} color={accent} />;
  }
}

export function TemporadaLiturgicaBanner({
  temporada,
}: {
  temporada: Temporada;
}) {
  const colors = TEMPORADA_COLORS[temporada.temporada] ?? FALLBACK;

  return (
    <section className="py-14" style={{ backgroundColor: colors.bg }}>
      <div className="mx-auto max-w-4xl px-4">
        <AnimatedSection>
          <div className="text-center">
            {/* Icon */}
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
              <SeasonIcon season={temporada.temporada} accent={colors.accent} />
            </div>

            {/* Season label */}
            <p
              className="mb-2 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: colors.accent }}
            >
              {temporada.titulo}
            </p>

            {/* Scripture quote */}
            {temporada.textoCita && (
              <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
                &ldquo;{temporada.textoCita}&rdquo;
              </h2>
            )}
            {temporada.cita && (
              <p className="mt-1 text-sm italic text-white/60">
                {temporada.cita}
              </p>
            )}

            {/* Message */}
            <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-white/80">
              {temporada.mensaje}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
