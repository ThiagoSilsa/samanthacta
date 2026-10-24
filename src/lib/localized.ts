import type { Localized } from "@/data/types";

/**
 * Valor idêntico nos três idiomas: sigla, nome próprio, nome de teste psicológico,
 * número de resolução. Não é tradução pendente — é conteúdo que não se traduz.
 */
export function same<T>(value: T): Localized<T> {
  return { pt: value, en: value, es: value };
}

/**
 * Texto que existe apenas em português e ainda não foi traduzido.
 *
 * As versões `en` e `es` recebem um marcador visível com o prefixo do idioma. Isso é
 * intencional: quem trocar o site para inglês antes da etapa 13 vê `[EN] …`, e não um
 * parágrafo em português que parece tradução malfeita. `scripts/check-placeholders.mjs`
 * conta esses marcadores separadamente dos placeholders de conteúdo.
 */
export function untranslated(pt: string): Localized {
  return { pt, en: `[EN] ${pt}`, es: `[ES] ${pt}` };
}

export function untranslatedList(pt: readonly string[]): Localized<string[]> {
  return {
    pt: [...pt],
    en: pt.map((item) => `[EN] ${item}`),
    es: pt.map((item) => `[ES] ${item}`),
  };
}
