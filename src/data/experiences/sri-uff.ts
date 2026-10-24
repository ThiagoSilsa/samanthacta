import { same, untranslated, untranslatedList } from "@/lib/localized";
import type { Experience } from "../types";

/** Cargo e período pendentes (P-004, P-002). */
export const sriUff: Experience = {
  slug: "sri-uff",
  title: same("SRI UFF"),
  organization: "[SIGLA]",
  role: untranslated("[CARGO]"),
  kind: "principal",
  start: null,
  end: null,
  isCurrent: false,
  summary: untranslated("[RESUMO]"),
  activities: untranslatedList(["[ATIVIDADE 1]", "[ATIVIDADE 2]"]),
  logoFile: "sri",
};
