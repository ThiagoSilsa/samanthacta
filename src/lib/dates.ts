// data
import type { Experience } from "@/data/types";

// i18n
import type { Locale } from "@/i18n/config";

/**
 * Marcador de período desconhecido (P-002).
 *
 * Fica no código, não no JSON: não é texto de conteúdo, é sinalização de lacuna — traduzir
 * `[PERÍODO]` para `[EN] [PERÍODO]` não ajudaria ninguém.
 */
export const PERIOD_PENDING = "[PERÍODO]";

const INTL_LOCALE: Record<Locale, string> = { pt: "pt-BR", en: "en", es: "es" };

function toLocale(value: string): Locale {
  return value === "en" || value === "es" ? value : "pt";
}

/** `2024-03` → `mar. de 2024` em pt, `Mar 2024` em en. */
function formatMonth(iso: string, locale: Locale): string {
  const [year, month] = iso.split("-");
  if (!year || !month) return PERIOD_PENDING;

  const date = new Date(Date.UTC(Number(year), Number(month) - 1, 1));

  return new Intl.DateTimeFormat(INTL_LOCALE[locale], {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/**
 * Período legível. Data ausente vira marcador visível — nunca um palpite.
 *
 * O rótulo de "atual" vem de fora porque é texto de interface e muda com o idioma.
 */
export function formatPeriod(
  experience: Pick<Experience, "start" | "end" | "isCurrent">,
  locale: string,
  currentLabel: string,
): string {
  if (!experience.start) return PERIOD_PENDING;

  const intlLocale = toLocale(locale);
  const start = formatMonth(experience.start, intlLocale);

  if (experience.isCurrent) return `${start} — ${currentLabel}`;
  if (!experience.end) return `${start} — ${PERIOD_PENDING}`;

  return `${start} — ${formatMonth(experience.end, intlLocale)}`;
}
