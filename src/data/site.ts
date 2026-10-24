import { DEFAULT_LOCALE, LOCALES, type Locale } from "./types";

export interface SiteConfig {
  /** Nome curto usado em título de página e Open Graph. */
  name: string;
  /** URL de produção. Ainda não há domínio próprio (D-008). */
  url: string;
  locales: readonly Locale[];
  defaultLocale: Locale;
}

export const site: SiteConfig = {
  name: "Samantha Albuquerque",
  url: "[URL DE PRODUÇÃO]",
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
};
