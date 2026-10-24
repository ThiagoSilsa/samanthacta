import type { Experience } from "./types";

/**
 * Experiências de formação, só com fatos.
 *
 * Antes cada experiência tinha arquivo próprio porque carregava o texto. Com o texto no
 * JSON, cada item virou seis campos — fragmentar em doze arquivos deixou de se pagar.
 *
 * O que ainda falta é factual, não editorial: período (P-002), cargo e nome completo das
 * siglas (P-003, P-004).
 */
export const EXPERIENCES: Experience[] = [
  {
    slug: "graduacao-uff",
    organization: "Universidade Federal Fluminense",
    kind: "graduacao",
    start: null,
    end: null,
    isCurrent: true,
    logoFile: "uff",
  },
  {
    slug: "seanp-uff",
    organization: "[SIGLA]",
    kind: "principal",
    start: null,
    end: null,
    isCurrent: true,
    logoFile: "seanp",
  },
  {
    slug: "laenp-uff",
    organization: "[SIGLA]",
    kind: "outra",
    start: null,
    end: null,
    isCurrent: true,
    logoFile: "laenp",
  },
  {
    slug: "sarem-ii",
    organization: "[SIGLA]",
    kind: "principal",
    start: null,
    end: null,
    isCurrent: false,
    logoFile: "sarem-ii",
  },
  {
    slug: "sri-uff",
    organization: "[SIGLA]",
    kind: "principal",
    start: null,
    end: null,
    isCurrent: false,
    logoFile: "sri",
  },
  {
    slug: "ieee",
    organization: "[SIGLA]",
    kind: "principal",
    start: null,
    end: null,
    isCurrent: false,
    logoFile: "ieee",
  },
  {
    slug: "aiesec",
    organization: "[COMITÊ LOCAL]",
    kind: "principal",
    start: null,
    end: null,
    isCurrent: false,
    logoFile: "aiesec",
  },
  {
    slug: "curso-de-ferias-neuropsicologia",
    organization: "UFF",
    kind: "outra",
    start: null,
    end: null,
    // P-007: o briefing não diz se já ocorreu.
    isCurrent: false,
    logoFile: "uff",
  },
  {
    slug: "neuro-upc-huap",
    organization: "HUAP",
    kind: "outra",
    start: null,
    end: null,
    isCurrent: false,
    logoFile: "huap",
  },
  {
    slug: "pesquisa-e-publicacao",
    organization: "[INSTITUIÇÃO]",
    kind: "outra",
    start: null,
    end: null,
    isCurrent: false,
    logoFile: null,
  },
  {
    slug: "estagio-saude-do-trabalhador",
    organization: "[INSTITUIÇÃO]",
    kind: "outra",
    start: null,
    end: null,
    isCurrent: false,
    logoFile: null,
  },
  {
    // P-011: foi exame de processo seletivo, não experiência profissional. Confirmar antes
    // de publicar — expõe situação pessoal.
    slug: "seap-policia-penal",
    organization: "SEAP",
    kind: "outra",
    start: null,
    end: null,
    isCurrent: false,
    logoFile: null,
  },
];

/**
 * Ordem de exibição: em andamento primeiro, depois período conhecido do mais recente para o
 * mais antigo, e por último o que ainda não tem data.
 *
 * Nada disso é digitado à mão: quando P-001 e P-002 forem respondidas, a linha do tempo se
 * reordena sozinha.
 */
export function orderExperiences(list: readonly Experience[]): Experience[] {
  return [...list].sort((a, b) => {
    if (a.isCurrent !== b.isCurrent) return a.isCurrent ? -1 : 1;

    const aHasDate = a.start !== null;
    const bHasDate = b.start !== null;
    if (aHasDate !== bHasDate) return aHasDate ? -1 : 1;

    if (a.start !== null && b.start !== null && a.start !== b.start) {
      return a.start < b.start ? 1 : -1;
    }

    return a.slug.localeCompare(b.slug);
  });
}

export const ORDERED_EXPERIENCES: Experience[] = orderExperiences(EXPERIENCES);

export function findExperienceBySlug(slug: string): Experience | undefined {
  return EXPERIENCES.find((experience) => experience.slug === slug);
}
