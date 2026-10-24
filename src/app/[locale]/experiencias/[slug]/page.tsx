import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { EXPERIENCES, findExperienceBySlug } from "@/data/experiences";
import type { Locale } from "@/data/types";

type SlugParams = { params: Promise<{ locale: string; slug: string }> };

/** O layout garante o locale válido; aqui só resta estreitar o tipo. */
function toLocale(value: string): Locale {
  return value === "en" || value === "es" ? value : "pt";
}

/**
 * As rotas são enumeradas a partir dos dados: experiência nova aparece aqui sozinha.
 * O conteúdo real da página entra na etapa 09.
 */
export function generateStaticParams() {
  return EXPERIENCES.map((experience) => ({ slug: experience.slug }));
}

export default async function ExperiencePage({ params }: SlugParams) {
  const { locale, slug } = await params;
  const experience = findExperienceBySlug(slug);

  if (!experience) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <article>
      <h1 className="text-h2">{experience.title[toLocale(locale)]}</h1>
      <p className="text-muted-foreground">{t("placeholder")}</p>
    </article>
  );
}
