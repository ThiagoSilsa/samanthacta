import { same, untranslated, untranslatedList } from "@/lib/localized";
import type { Experience } from "../types";

/** P-003 pede confirmação: é o ramo estudantil da UFF? Cargo e período pendentes. */
export const ieee: Experience = {
  slug: "ieee",
  title: same("IEEE"),
  organization: "[SIGLA]",
  role: untranslated("[CARGO]"),
  kind: "principal",
  start: null,
  end: null,
  isCurrent: false,
  summary: untranslated("[RESUMO]"),
  activities: untranslatedList(["[ATIVIDADE 1]", "[ATIVIDADE 2]"]),
  logoFile: "ieee",
};
