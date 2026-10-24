import { getTranslations } from "next-intl/server";

/**
 * Rota provisória. A decisão de manter `/competencias` como página própria ou trazer tudo
 * para a home depende do comprimento real da home (etapa 08).
 */
export default async function SkillsPage() {
  const t = await getTranslations("ui");

  return <h1 className="text-h2">{t("placeholder")}</h1>;
}
