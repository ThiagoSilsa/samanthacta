/**
 * Modelo de **fatos** do site.
 *
 * Texto não mora aqui: título, resumo, atividade e descrição vivem em
 * `src/messages/<idioma>.json`, sob `content.*`. O que existe neste arquivo é o que não se
 * traduz — slug, data, sigla, caminho de arquivo. Datas ficam em ISO `YYYY-MM`.
 */

/**
 * - `graduacao`: a formação que ancora a linha do tempo, não é "atividade";
 * - `principal`: experiência de formação profissional em destaque;
 * - `outra`: experiência secundária, com peso visual menor.
 */
export type ExperienceKind = "graduacao" | "principal" | "outra";

export interface Experience {
  /** kebab-case, sem acento. Estável: muda de título, não de slug. */
  slug: string;
  /** Sigla ou nome da instituição. Igual nos três idiomas. */
  organization: string;
  kind: ExperienceKind;
  /** ISO `YYYY-MM`. `null` = período ainda não informado (P-002). */
  start: string | null;
  end: string | null;
  isCurrent: boolean;
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
  /** Chave em `content.instruments.notes`, quando o instrumento precisa de ressalva. */
  noteKey?: string;
}

export interface Certification {
  id: string;
  name: string;
  imageSrc: string | null;
}

export interface CanvaPiece {
  id: string;
  imageSrc: string;
}
