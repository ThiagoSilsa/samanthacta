import { untranslated } from "@/lib/localized";
import type { CanvaPiece, Certification } from "./types";

/**
 * Competências técnicas. Só entra o que a cliente informou; o resto fica como placeholder.
 */

/** Resoluções citadas no briefing. Mesmo texto nos três idiomas. */
export const CFP_RESOLUTIONS: string[] = [
  "Resolução CFP nº 06/2019",
  "Resolução CFP nº 001/2009",
  "Resolução CFP nº 005/2010",
];

/**
 * Funções de planilha que a cliente domina.
 *
 * São nomes de função **localizados pela interface do Excel**: PROCV é VLOOKUP em inglês e
 * BUSCARV em espanhol. Manter o nome em português no site em inglês seria erro factual, não
 * detalhe de tradução.
 */
export const SPREADSHEET_FUNCTIONS = {
  pt: ["FILTER", "PROCV", "PROCH", "CONT.SE", "CONT.VALORES", "CONCATENAR", "ÍNDICE", "MÁXIMO", "MÍNIMO"],
  en: ["FILTER", "VLOOKUP", "HLOOKUP", "COUNTIF", "COUNTA", "CONCATENATE", "INDEX", "MAX", "MIN"],
  es: ["FILTER", "BUSCARV", "BUSCARH", "CONTAR.SI", "CONTAR", "CONCATENAR", "INDICE", "MAX", "MIN"],
} as const;

export const CERTIFICATIONS: Certification[] = [
  {
    id: "toefl-itp",
    name: "TOEFL ITP",
    detail: untranslated("[NOTA E ANO]"),
    imageSrc: null,
  },
  {
    id: "excel-intermediario",
    name: "Microsoft Excel — nível intermediário",
    detail: untranslated("[INSTITUIÇÃO E ANO]"),
    imageSrc: null,
  },
  {
    id: "power-bi",
    name: "Power BI",
    detail: untranslated("[INSTITUIÇÃO E ANO]"),
    imageSrc: null,
  },
];

/**
 * Peças produzidas no Canva. Vazio de propósito: nenhuma imagem foi enviada ainda (P-013).
 * Não inventar contexto nem descrição.
 */
export const CANVA_PIECES: CanvaPiece[] = [];

/** Vazio por ora: o nome da supervisora depende de autorização (P-008). */
export const WORK_HEALTH_NOTE = untranslated("[RESUMO DO ESTÁGIO]");

export const LANGUAGE_NOTE = untranslated(
  "A proficiência em inglês foi útil na atuação na SRI, sobretudo na comunicação com estudantes de mobilidade internacional.",
);

export const SKILLS_INTRO = {
  documents: untranslated(
    "Documentos psicológicos e registro documental conforme as resoluções do CFP, incluindo o laudo resultante das avaliações neuropsicológicas.",
  ),
  spreadsheets: untranslated(
    "Criação de planilhas e dashboards automatizados, com tabelas dinâmicas e gráficos para uso recorrente.",
  ),
  canva: untranslated(
    "Ferramenta usada na AIESEC e em apresentações acadêmicas.",
  ),
  // O enquadramento é requisito ético (I-3), não texto de marketing.
  instrumentsDisclaimer: untranslated(
    "Aplicação e correção sob supervisão, em contexto de formação.",
  ),
};
