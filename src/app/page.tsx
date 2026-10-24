import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const t = await getTranslations("ui");

  return <h1 className="text-h1">{t("placeholder")}</h1>;
}
