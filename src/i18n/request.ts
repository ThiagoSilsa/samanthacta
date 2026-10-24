import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

import { DEFAULT_LOCALE, isLocale, LOCALE_COOKIE } from "./config";

/**
 * O idioma vem do cookie, não da URL. Sem cookie válido, português.
 *
 * Ler `cookies()` aqui é o que troca idioma no servidor e evita o pisca-pisca de renderizar
 * em português e corrigir no cliente — ao custo de a página deixar de ser estática.
 */
export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(cookieLocale) ? cookieLocale : DEFAULT_LOCALE;

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
