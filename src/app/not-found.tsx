import { getTranslations } from "next-intl/server";
import Link from "next/link";

/** 404 no idioma do visitante — o padrão do Next é em inglês. */
export default async function NotFound() {
  const t = await getTranslations("ui.notFound");

  return (
    <div className="max-w-prose">
      <h1 className="text-h1">{t("title")}</h1>
      <p className="mt-4 text-body text-muted-foreground">{t("body")}</p>
      <Link
        href="/"
        className="mt-6 inline-flex min-h-11 items-center text-primary underline underline-offset-4"
      >
        {t("back")}
      </Link>
    </div>
  );
}
