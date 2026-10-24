import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ui.skills");
  const meta = await getTranslations("ui.meta");

  return {
    title: t("title"),
    description: meta("skillsDescription"),
    alternates: { canonical: "/competencias" },
    openGraph: { url: "/competencias" },
  };
}

/**
 * Rota provisória. A decisão de manter `/competencias` como página própria ou trazer tudo
 * para a home depende do comprimento real da home (etapa 08).
 */
export default async function SkillsPage() {
  const t = await getTranslations("ui");

  return <h1 className="text-h2">{t("placeholder")}</h1>;
}
