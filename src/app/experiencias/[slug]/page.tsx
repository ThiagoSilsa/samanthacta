import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { EXPERIENCES, findExperienceBySlug } from "@/data/experiences";

/**
 * As rotas são enumeradas a partir dos dados: experiência nova aparece aqui sozinha.
 * O conteúdo real da página entra na etapa 09.
 */
export function generateStaticParams() {
  return EXPERIENCES.map((experience) => ({ slug: experience.slug }));
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const experience = findExperienceBySlug(slug);

  if (!experience) {
    notFound();
  }

  const t = await getTranslations();

  return (
    <article>
      <h1 className="text-h2">
        {t(`content.experiences.${experience.slug}.title`)}
      </h1>
      <p className="text-muted-foreground">{t("ui.placeholder")}</p>
    </article>
  );
}
