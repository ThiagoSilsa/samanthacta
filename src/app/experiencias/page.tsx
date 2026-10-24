import { getTranslations } from "next-intl/server";

export default async function ExperiencesPage() {
  const t = await getTranslations("ui");

  return <h1 className="text-h2">{t("placeholder")}</h1>;
}
