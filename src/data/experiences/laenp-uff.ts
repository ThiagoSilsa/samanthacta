import { same, untranslated, untranslatedList } from "@/lib/localized";
import type { Experience } from "../types";

/** Marcada como atual pela cliente. Nome completo da sigla pendente (P-003). */
export const laenpUff: Experience = {
  slug: "laenp-uff",
  title: same("LAENP UFF"),
  organization: "[SIGLA]",
  role: untranslated("Vice-presidência"),
  kind: "outra",
  start: null,
  end: null,
  isCurrent: true,
  summary: untranslated("[RESUMO]"),
  activities: untranslatedList(["[ATIVIDADE 1]", "[ATIVIDADE 2]"]),
  logoFile: "laenp",
};
