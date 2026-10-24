import { getTranslations } from "next-intl/server";

/**
 * Objetivo profissional.
 *
 * Um parágrafo só, sem destaque tipográfico: a seção anterior já usa esse recurso, e repetir
 * o mesmo gesto em duas seções seguidas transforma destaque em padrão.
 */
export async function ProfessionalGoal() {
  const t = await getTranslations("content.goal");

  return (
    <section aria-labelledby="objetivo" className="mt-12 max-w-prose">
      <h2 id="objetivo" className="text-h2">
        {t("title")}
      </h2>

      <p className="mt-5 text-body">{t("body")}</p>
    </section>
  );
}
