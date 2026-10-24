import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/i18n/config";

export interface SiteConfig {
  /** Nome curto usado em título de página e Open Graph. */
  name: string;
  /** Instituição usada nos metadados estruturados. */
  affiliation: string;
  locales: readonly Locale[];
  defaultLocale: Locale;
}

export const site: SiteConfig = {
  name: "Samantha Albuquerque",
  affiliation: "Universidade Federal Fluminense — Niterói",
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
};

/**
 * URL pública do site, vinda de `NEXT_PUBLIC_SITE_URL` (sem barra no fim).
 *
 * Sem a variável, o build usa `localhost` — e `robots.ts` bloqueia a indexação nesse caso.
 * Melhor não ser indexado do que ser indexado com endereço errado no canonical e no sitemap.
 * Definir a variável na Vercel é pré-requisito de publicação (ver `.env.example`).
 */
const rawUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const hasPublicUrl = Boolean(rawUrl && rawUrl.length > 0);

export const siteUrl = new URL(
  rawUrl && rawUrl.length > 0 ? rawUrl : "http://localhost:3000",
);

/** URL absoluta a partir de um caminho interno (`/experiencias`). */
export function absoluteUrl(pathname: string): string {
  return new URL(pathname, siteUrl).toString();
}
