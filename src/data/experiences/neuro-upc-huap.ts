import { same, untranslated, untranslatedList } from "@/lib/localized";
import type { Experience } from "../types";

/** Sigla expandida a confirmar (P-003). Cargo e período pendentes (P-004, P-002). */
export const neuroUpcHuap: Experience = {
  slug: "neuro-upc-huap",
  title: same("NeuroUPC — HUAP"),
  organization: "HUAP",
  role: untranslated("[CARGO]"),
  kind: "outra",
  start: null,
  end: null,
  isCurrent: false,
  summary: untranslated("[RESUMO]"),
  activities: untranslatedList(["[ATIVIDADE 1]", "[ATIVIDADE 2]"]),
  logoFile: "huap",
};
