import { same, untranslated } from "@/lib/localized";
import type { Localized } from "./types";

/**
 * Dados de identificação. Nada aqui deve ser inventado: o que não foi informado fica como
 * placeholder visível.
 */
export interface Profile {
  name: string;
  headline: Localized;
  affiliation: string;
  location: Localized<string[]>;
  email: string;
  linkedinUrl: string;
}

export const profile: Profile = {
  name: "Samantha Albuquerque",
  headline: untranslated(
    "Estudante de Psicologia (10º período) na UFF Niterói, com experiência em neuropsicologia clínica, avaliação psicológica, gestão de pessoas e análise do comportamento.",
  ),
  affiliation: "Universidade Federal Fluminense — Niterói",
  // Conforme o briefing: "Maricá | Niterói". Separador é decisão de interface.
  location: same(["Maricá", "Niterói"]),
  email: "samanthacta311@gmail.com",
  // ATENÇÃO: a URL do briefing parece truncada ("/in/samanthaalb"). Confirmar antes de
  // publicar (P-015).
  linkedinUrl: "https://www.linkedin.com/in/samanthaalb",
};
