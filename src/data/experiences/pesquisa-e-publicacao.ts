import { untranslated, untranslatedList } from "@/lib/localized";
import type { Experience } from "../types";

/**
 * Publicação científica. Título do artigo, periódico e ano não foram informados — e não
 * serão inventados. Se houver publicação, vale considerar uma seção própria na página de
 * detalhe, com o link do DOI.
 */
export const pesquisaEPublicacao: Experience = {
  slug: "pesquisa-e-publicacao",
  title: untranslated("Projeto de pesquisa e publicação de artigos científicos"),
  organization: "[INSTITUIÇÃO]",
  role: untranslated("[CARGO]"),
  kind: "outra",
  start: null,
  end: null,
  isCurrent: false,
  summary: untranslated("[RESUMO]"),
  activities: untranslatedList(["[ATIVIDADE 1]", "[ATIVIDADE 2]"]),
  logoFile: null,
};
