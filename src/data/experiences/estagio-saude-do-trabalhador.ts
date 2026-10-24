import { untranslated, untranslatedList } from "@/lib/localized";
import type { Experience } from "../types";

/**
 * O briefing cita "estágio em saúde do trabalhador com Mary Yale". Publicar o nome de uma
 * pessoa real exige autorização — P-008. Até lá, o nome não aparece no conteúdo.
 */
export const estagioSaudeDoTrabalhador: Experience = {
  slug: "estagio-saude-do-trabalhador",
  title: untranslated("Estágio em saúde do trabalhador"),
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
