/**
 * Configuração de idioma.
 *
 * Não há rota por idioma: a mesma URL serve os três. O idioma vem de um cookie e o que muda
 * é o JSON de mensagens. Consequência aceita e registrada em `docs/04`: a página deixa de
 * ser estática (todo render lê cookie) e o buscador indexa só o idioma padrão.
 */

export const LOCALES = ["pt", "en", "es"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "pt";

/** Nome do cookie. Lido no servidor por `getRequestConfig` e escrito pelo seletor. */
export const LOCALE_COOKIE = "locale";

/** Nome de cada idioma **no próprio idioma** — não se traduz "English". */
export const LOCALE_NATIVE_NAME: Record<Locale, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
};

/** Código de idioma para o atributo `lang`. Português é `pt-BR`. */
export const HTML_LANG: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
};

export function isLocale(value: unknown): value is Locale {
  return (
    typeof value === "string" && (LOCALES as readonly string[]).includes(value)
  );
}
