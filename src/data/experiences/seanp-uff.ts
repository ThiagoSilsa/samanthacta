import { same, untranslated, untranslatedList } from "@/lib/localized";
import type { Experience } from "../types";

/** Marcada como atual pela cliente. Nome completo da sigla e cargo pendentes (P-003, P-004). */
export const seanpUff: Experience = {
  slug: "seanp-uff",
  title: same("SEANP UFF"),
  organization: "[SIGLA]",
  role: untranslated("[CARGO]"),
  kind: "principal",
  start: null,
  end: null,
  isCurrent: true,
  summary: untranslated("[RESUMO]"),
  activities: untranslatedList(["[ATIVIDADE 1]", "[ATIVIDADE 2]"]),
  logoFile: "seanp",
};
