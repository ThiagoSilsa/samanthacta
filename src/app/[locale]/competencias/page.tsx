import { getTranslations, setRequestLocale } from "next-intl/server";

type LocaleParams = { params: Promise<{ locale: string }> };

/**
 * Rota provisória. A decisão de manter `/competencias` como página própria ou trazer tudo
 * para a home depende do comprimento real da home (etapa 08).
 */
export default async function SkillsPage({ params }: LocaleParams) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();

  return <h1 className="text-h2">{t("placeholder")}</h1>;
}
