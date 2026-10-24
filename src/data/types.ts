/**
 * Modelo de conteúdo do site.
 *
 * Regra: aqui só entra **fato** — nome, sigla, data, slug, caminho de arquivo. Texto de
 * interface é i18n; formatação ("março de 2024") é responsabilidade de quem exibe. Datas
 * ficam em ISO `YYYY-MM` e nunca em texto livre.
 */

export const LOCALES = ["pt", "en", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "pt";

/**
 * Texto que muda por idioma. O `Record` completo obriga o compilador a exigir as três
 * versões: tradução faltando vira erro de build, não texto em português no site em inglês.
 */
export type Localized<T = string> = Record<Locale, T>;

/**
 * - `graduacao`: a formação que ancora a linha do tempo, não é "atividade";
 * - `principal`: experiência de formação profissional em destaque;
 * - `outra`: experiência secundária, com peso visual menor.
 */
export type ExperienceKind = "graduacao" | "principal" | "outra";

export interface Experience {
  /** kebab-case, sem acento. Estável: muda de título, não de slug. */
  slug: string;
  title: Localized;
  /** Sigla ou nome da instituição. Igual nos três idiomas. */
  organization: string;
  role: Localized;
  kind: ExperienceKind;
  /** ISO `YYYY-MM`. `null` = período ainda não informado (P-002). */
  start: string | null;
  end: string | null;
  isCurrent: boolean;
  summary: Localized;
  activities: Localized<string[]>;
  /** Nome do arquivo em `public/images/logos`, sem extensão. `null` = sem logo. */
  logoFile: string | null;
}

/**
 * Agrupamento por domínio de avaliação. `unclassified` existe de propósito: melhor admitir
 * que um instrumento não foi classificado do que colocá-lo no grupo errado (P-010).
 */
export type InstrumentDomain =
  | "inteligencia"
  | "memoria"
  | "atencao-e-funcoes-executivas"
  | "linguagem-e-fala"
  | "personalidade-e-emocional"
  | "rastreio-e-demencia"
  | "social-e-desenvolvimento"
  | "funcionalidade-e-sensorial"
  | "unclassified";

/**
 * - `applied-and-scored`: aplicado **e** corrigido sob supervisão;
 * - `applied-only`: apenas aplicado. Precisa de marcação visível distinta (P-009).
 */
export type InstrumentLevel = "applied-and-scored" | "applied-only";

export interface Instrument {
  name: string;
  domain: InstrumentDomain;
  level: InstrumentLevel;
  note?: Localized;
}

export interface Certification {
  id: string;
  name: string;
  /** Nota, ano ou instituição — a confirmar (P-006). */
  detail: Localized;
  imageSrc: string | null;
}

export interface CanvaPiece {
  id: string;
  /** Contexto em que a peça foi feita: "AIESEC", "apresentação acadêmica". */
  context: Localized;
  imageSrc: string;
  alt: Localized;
}
