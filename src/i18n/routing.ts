import { defineRouting } from "next-intl/routing";

import { DEFAULT_LOCALE, LOCALES } from "@/data/types";

/**
 * `as-needed`: o português é servido na raiz (`/experiencias`) e os demais idiomas recebem
 * prefixo (`/en/experiencias`).
 *
 * Segmentos de rota ficam **fixos em português** nos três idiomas — decisão da etapa 04.
 * Localizar os segmentos (`/en/experiences`) exigiria um mapa de `pathnames` que precisa ser
 * mantido a cada nova rota; com quatro rotas, o custo não se paga.
 */
export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "as-needed",
  /**
   * Sem detecção automática de idioma. Com ela, quem tem o navegador em inglês era
   * redirecionado de `/` para `/en` — inclusive um recrutador brasileiro. Português é o
   * padrão; a troca de idioma é explícita, pelo seletor.
   */
  localeDetection: false,
});
