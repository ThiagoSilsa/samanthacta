import { same, untranslated, untranslatedList } from "@/lib/localized";
import type { Experience } from "../types";

/**
 * ATENÇÃO — P-011: isto foi um exame psicológico de processo seletivo, não uma experiência
 * profissional. Está na linha do tempo porque a cliente pediu, mas expõe uma situação
 * pessoal. Antes de publicar, confirmar se permanece e com qual enquadramento.
 */
export const seapPoliciaPenal: Experience = {
  slug: "seap-policia-penal",
  title: same("SEAP — Polícia Penal do Rio de Janeiro"),
  organization: "SEAP",
  role: untranslated("[CARGO]"),
  kind: "outra",
  start: null,
  end: null,
  isCurrent: false,
  summary: untranslated("[RESUMO]"),
  activities: untranslatedList(["[ATIVIDADE 1]"]),
  logoFile: null,
};
