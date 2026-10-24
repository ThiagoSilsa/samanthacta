import type { Experience } from "../types";
import { aiesec } from "./aiesec";
import { cursoDeFerias } from "./curso-de-ferias-neuropsicologia";
import { estagioSaudeDoTrabalhador } from "./estagio-saude-do-trabalhador";
import { graduacaoUff } from "./graduacao-uff";
import { ieee } from "./ieee";
import { laenpUff } from "./laenp-uff";
import { neuroUpcHuap } from "./neuro-upc-huap";
import { pesquisaEPublicacao } from "./pesquisa-e-publicacao";
import { saremIi } from "./sarem-ii";
import { seapPoliciaPenal } from "./seap-policia-penal";
import { seanpUff } from "./seanp-uff";
import { sriUff } from "./sri-uff";

/**
 * Lista completa, na ordem em que os arquivos foram escritos — ordem sem significado.
 * A ordem de exibição é derivada em `orderExperiences`.
 */
export const EXPERIENCES: Experience[] = [
  graduacaoUff,
  seanpUff,
  laenpUff,
  saremIi,
  sriUff,
  ieee,
  aiesec,
  cursoDeFerias,
  neuroUpcHuap,
  pesquisaEPublicacao,
  estagioSaudeDoTrabalhador,
  seapPoliciaPenal,
];

/**
 * Ordem de exibição: o que está em andamento primeiro, depois período conhecido do mais
 * recente para o mais antigo, e por último o que ainda não tem data.
 *
 * Nada disso é digitado à mão. Quando P-001 e P-002 forem respondidas, a linha do tempo se
 * reordena sozinha — nenhum componente muda.
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
