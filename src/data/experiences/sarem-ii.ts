import { same, untranslated, untranslatedList } from "@/lib/localized";
import type { Experience } from "../types";

/** Nome completo da sigla pendente (P-003); cargo e atividades pendentes (P-004). */
export const saremIi: Experience = {
  slug: "sarem-ii",
  title: same("SAREM II"),
  organization: "[SIGLA]",
  role: untranslated("[CARGO]"),
  kind: "principal",
  start: null,
  end: null,
  isCurrent: false,
  summary: untranslated("[RESUMO]"),
  activities: untranslatedList(["[ATIVIDADE 1]", "[ATIVIDADE 2]"]),
  logoFile: "sarem-ii",
};
