const MONTH_MAP: Record<string, string> = {
  enero: "ENE",
  febrero: "FEB",
  marzo: "MAR",
  abril: "ABR",
  mayo: "MAY",
  junio: "JUN",
  julio: "JUL",
  agosto: "AGO",
  septiembre: "SEP",
  octubre: "OCT",
  noviembre: "NOV",
  diciembre: "DIC",
};

/**
 * Try to parse a Spanish date string like "15 de Marzo, 2026" into
 * { day: "15", month: "MAR" }. Returns null if it can't parse.
 */
function parseDateStr(dateStr: string) {
  const match = dateStr.match(/^(\d+(?:-\d+)?)\s+de\s+(\w+)/i);
  if (!match) return null;
  const day = match[1];
  const monthKey = match[2].toLowerCase();
  const month = MONTH_MAP[monthKey] ?? monthKey.slice(0, 3).toUpperCase();
  return { day, month };
}

export function DateBlock({
  dateStr,
  muted = false,
}: {
  dateStr: string;
  muted?: boolean;
}) {
  const parsed = parseDateStr(dateStr);

  if (!parsed) return null;

  return (
    <div
      className={`flex w-16 shrink-0 flex-col items-center rounded-xl py-2 ${
        muted
          ? "bg-primary/5 text-primary/50"
          : "bg-gradient-to-b from-secondary to-secondary-light text-white"
      }`}
    >
      <span
        className={`font-bold leading-tight ${
          parsed.day.includes("-") ? "text-lg" : "text-2xl"
        }`}
      >
        {parsed.day}
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-wider">
        {parsed.month}
      </span>
    </div>
  );
}
