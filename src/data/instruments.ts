import type { Instrument, InstrumentDomain } from "./types";

/**
 * Instrumentos psicométricos aplicados em contexto de formação.
 *
 * - **BIS-11 aparece uma vez.** A lista da cliente trazia o instrumento duas vezes (P-009).
 * - **Agrupamento por domínio é proposta, não fato** (P-010). O que não tenho segurança de
 *   classificar está em `unclassified`.
 * - Todo o conteúdo sobre instrumentos precisa ser enquadrado na interface como *aplicação
 *   e correção sob supervisão, em contexto de formação* (Resolução CFP nº 09/2018) — o texto
 *   está em `content.instruments.disclaimer`.
 */
export const INSTRUMENTS: Instrument[] = [
  // inteligência
  { name: "WAIS-III", domain: "inteligencia", level: "applied-and-scored" },
  { name: "WISC-IV", domain: "inteligencia", level: "applied-and-scored" },
  { name: "SON-R 6-40", domain: "inteligencia", level: "applied-and-scored" },
  {
    name: "R-1 — Teste Não Verbal de Inteligência",
    domain: "inteligencia",
    level: "applied-only",
  },

  // memória
  { name: "RAVLT", domain: "memoria", level: "applied-and-scored" },
  { name: "Cubos de Corsi", domain: "memoria", level: "applied-and-scored" },
  {
    name: "Questionário de memória prospectiva e retrospectiva",
    domain: "memoria",
    level: "applied-and-scored",
  },

  // atenção e funções executivas
  {
    name: "FDT — Five Digit Test",
    domain: "atencao-e-funcoes-executivas",
    level: "applied-and-scored",
  },
  {
    name: "CPT",
    domain: "atencao-e-funcoes-executivas",
    level: "applied-and-scored",
  },
  {
    name: "Stroop cor-palavra",
    domain: "atencao-e-funcoes-executivas",
    level: "applied-and-scored",
  },
  {
    name: "Hayling",
    domain: "atencao-e-funcoes-executivas",
    level: "applied-and-scored",
  },
  {
    name: "DEX — Questionário Disexecutivo",
    domain: "atencao-e-funcoes-executivas",
    level: "applied-and-scored",
  },
  {
    name: "BDEFS",
    domain: "atencao-e-funcoes-executivas",
    level: "applied-and-scored",
    noteKey: "bdefs",
  },
  {
    name: "DIVA-5",
    domain: "atencao-e-funcoes-executivas",
    level: "applied-and-scored",
  },

  // linguagem e fala
  {
    name: "PCFO — Prova de Consciência Fonológica por Produção Oral",
    domain: "linguagem-e-fala",
    level: "applied-and-scored",
  },
  {
    name: "Teste de discriminação fonológica",
    domain: "linguagem-e-fala",
    level: "applied-and-scored",
  },

  // personalidade e aspectos emocionais
  {
    name: "SCID",
    domain: "personalidade-e-emocional",
    level: "applied-and-scored",
  },
  { name: "BFP", domain: "personalidade-e-emocional", level: "applied-only" },
  { name: "QUATI", domain: "personalidade-e-emocional", level: "applied-only" },
  {
    name: "BIS-11",
    domain: "personalidade-e-emocional",
    level: "applied-and-scored",
  },

  // rastreio e demência
  {
    name: "CDR — Clinical Dementia Rating",
    domain: "rastreio-e-demencia",
    level: "applied-and-scored",
  },
  {
    name: "Escala Mattis de Demência",
    domain: "rastreio-e-demencia",
    level: "applied-and-scored",
  },
  { name: "BPA", domain: "rastreio-e-demencia", level: "applied-and-scored" },

  // social e desenvolvimento
  {
    name: "SRS-2",
    domain: "social-e-desenvolvimento",
    level: "applied-and-scored",
  },
  {
    name: "PROTEA",
    domain: "social-e-desenvolvimento",
    level: "applied-and-scored",
  },
  {
    name: "FAUX PAS",
    domain: "social-e-desenvolvimento",
    level: "applied-and-scored",
  },

  // funcionalidade e sensorial
  {
    name: "AVD — Atividades da Vida Diária",
    domain: "funcionalidade-e-sensorial",
    level: "applied-and-scored",
  },
  {
    name: "Teste de acuidade visual",
    domain: "funcionalidade-e-sensorial",
    level: "applied-and-scored",
  },

  // não classificados — aguardando P-010
  {
    name: "NEUPSILIN",
    domain: "unclassified",
    level: "applied-and-scored",
    noteKey: "neuupsilin",
  },
  {
    name: "IPHEXA",
    domain: "unclassified",
    level: "applied-and-scored",
    noteKey: "dominio-a-confirmar",
  },
  {
    name: "TISD",
    domain: "unclassified",
    level: "applied-and-scored",
    noteKey: "dominio-a-confirmar",
  },
  {
    name: "IHS-2",
    domain: "unclassified",
    level: "applied-and-scored",
    noteKey: "dominio-a-confirmar",
  },
];

/** Ordem de exibição dos grupos. `unclassified` sempre por último. */
export const INSTRUMENT_DOMAIN_ORDER: InstrumentDomain[] = [
  "inteligencia",
  "memoria",
  "atencao-e-funcoes-executivas",
  "linguagem-e-fala",
  "personalidade-e-emocional",
  "rastreio-e-demencia",
  "social-e-desenvolvimento",
  "funcionalidade-e-sensorial",
  "unclassified",
];
