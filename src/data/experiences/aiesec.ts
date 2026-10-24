import { same, untranslated, untranslatedList } from "@/lib/localized";
import type { Experience } from "../types";

/**
 * Comitê local e função ainda não informados — a etapa 02 do briefing cita a AIESEC só como
 * "AIESEC" (P-005).
 */
export const aiesec: Experience = {
  slug: "aiesec",
  title: same("AIESEC"),
  organization: "[COMITÊ LOCAL]",
  role: untranslated("[CARGO]"),
  kind: "principal",
  start: null,
  end: null,
  isCurrent: false,
  summary: untranslated("[RESUMO]"),
  activities: untranslatedList(["[ATIVIDADE 1]", "[ATIVIDADE 2]"]),
  logoFile: "aiesec",
};
