import { untranslated, untranslatedList } from "@/lib/localized";
import type { Experience } from "../types";

/**
 * A graduação não está na lista da cliente, mas é a entrada que ancora a linha do tempo e
 * justifica o logo da UFF (ver P-001: falta o ano de ingresso).
 */
export const graduacaoUff: Experience = {
  slug: "graduacao-uff",
  title: untranslated("Graduação em Psicologia"),
  organization: "Universidade Federal Fluminense",
  role: untranslated("Estudante de Psicologia (10º período)"),
  kind: "graduacao",
  start: null,
  end: null,
  isCurrent: true,
  summary: untranslated("[RESUMO]"),
  activities: untranslatedList(["[ATIVIDADE 1]", "[ATIVIDADE 2]"]),
  logoFile: "uff",
};
