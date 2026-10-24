import { untranslated } from "@/lib/localized";
import type { Instrument, InstrumentDomain, Localized } from "./types";

/**
 * Instrumentos psicométricos aplicados em contexto de formação.
 *
 * Duas decisões registradas:
 *
 * 1. **BIS-11 aparece uma vez.** A lista da cliente trazia o instrumento duas vezes; a
 *    segunda ocorrência é duplicata (P-009).
 * 2. **Agrupamento por domínio é proposta, não fato** (P-010). Os instrumentos que não
 *    tenho segurança de classificar estão em `unclassified` — e é melhor que fiquem lá do
 *    que num grupo errado, sugerindo domínio que a cliente não tem.
 *
 * Todo o conteúdo sobre instrumentos deve ser enquadrado na interface como *aplicação e
 * correção sob supervisão, em contexto de formação* (Resolução CFP nº 09/2018).
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
    note: untranslated("versões longa e curta"),
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
    note: untranslated("bateria breve, cobre mais de um domínio"),
  },
  {
    name: "IPHEXA",
    domain: "unclassified",
    level: "applied-and-scored",
    note: untranslated("domínio a confirmar"),
  },
  {
    name: "TISD",
    domain: "unclassified",
    level: "applied-and-scored",
    note: untranslated("domínio a confirmar"),
  },
  {
    name: "IHS-2",
    domain: "unclassified",
    level: "applied-and-scored",
    note: untranslated("domínio a confirmar"),
  },
];

/** Rótulos dos grupos. O texto vive aqui para a interface só ordenar. */
export const INSTRUMENT_DOMAIN_LABELS: Record<InstrumentDomain, Localized> = {
  inteligencia: untranslated("Inteligência"),
  memoria: untranslated("Memória"),
  "atencao-e-funcoes-executivas": untranslated("Atenção e funções executivas"),
  "linguagem-e-fala": untranslated("Linguagem e fala"),
  "personalidade-e-emocional": untranslated(
    "Personalidade e aspectos emocionais",
  ),
  "rastreio-e-demencia": untranslated("Rastreio e demência"),
  "social-e-desenvolvimento": untranslated("Cognição social e desenvolvimento"),
  "funcionalidade-e-sensorial": untranslated("Funcionalidade e sensorial"),
  unclassified: untranslated("Outros instrumentos"),
};

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
