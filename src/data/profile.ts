/**
 * Dados de identificação que **não** se traduzem.
 *
 * A frase de apresentação (headline) e a localização estão em `content.profile`, no JSON de
 * mensagens — é texto, e texto por idioma.
 */
export interface Profile {
  name: string;
  affiliation: string;
  email: string;
  linkedinUrl: string;
}

export const profile: Profile = {
  name: "Samantha Albuquerque",
  affiliation: "Universidade Federal Fluminense — Niterói",
  email: "samanthacta311@gmail.com",
  // ATENÇÃO: a URL do briefing parece truncada ("/in/samanthaalb"). Confirmar (P-015).
  linkedinUrl: "https://www.linkedin.com/in/samanthaalb",
};
