import type { CanvaPiece, Certification } from "./types";

/** Resoluções citadas no briefing. Mesmo texto nos três idiomas. */
export const CFP_RESOLUTIONS: string[] = [
  "Resolução CFP nº 06/2019",
  "Resolução CFP nº 001/2009",
  "Resolução CFP nº 005/2010",
];

export const CERTIFICATIONS: Certification[] = [
  { id: "toefl-itp", name: "TOEFL ITP", imageSrc: null },
  { id: "excel-intermediario", name: "Microsoft Excel — nível intermediário", imageSrc: null },
  { id: "power-bi", name: "Power BI", imageSrc: null },
];

/**
 * Peças produzidas no Canva. Vazio de propósito: nenhuma imagem foi enviada ainda (P-013).
 * Não inventar contexto nem descrição.
 */
export const CANVA_PIECES: CanvaPiece[] = [];
