import { getTranslations, setRequestLocale } from "next-intl/server";

type LocaleParams = { params: Promise<{ locale: string }> };

export default async function ExperiencesPage({ params }: LocaleParams) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();

  return <h1 className="text-h2">{t("placeholder")}</h1>;
}
