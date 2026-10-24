import { untranslated, untranslatedList } from "@/lib/localized";
import type { Experience } from "../types";

/**
 * P-007: o briefing diz "Curso de Férias de Neuropsicologia na UFF 2026" sem indicar se já
 * ocorreu. Enquanto não confirmado, `isCurrent` fica `false` — afirmar que é atual seria
 * inventar.
 */
export const cursoDeFerias: Experience = {
  slug: "curso-de-ferias-neuropsicologia",
  title: untranslated("Facilitação no Curso de Férias de Neuropsicologia"),
  organization: "UFF",
  role: untranslated("Facilitadora"),
  kind: "outra",
  start: null,
  end: null,
  isCurrent: false,
  summary: untranslated("[RESUMO]"),
  activities: untranslatedList(["[ATIVIDADE 1]", "[ATIVIDADE 2]"]),
  logoFile: "uff",
};
