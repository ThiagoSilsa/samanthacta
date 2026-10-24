import { getTranslations } from "next-intl/server";

/**
 * Avaliação psicológica integrada.
 *
 * Os três pilares aparecem **dentro da prosa**, não como três caixas numeradas: são a
 * definição que a cliente dá, não uma lista de etapas. Uma linha de destaque, no máximo, e
 * ela é a conclusão dela — não uma frase de efeito.
 */
export async function IntegratedAssessment() {
  const t = await getTranslations("content.assessment");

  return (
    <section aria-labelledby="avaliacao" className="mt-16 max-w-prose">
      <h2 id="avaliacao" className="text-h2">
        {t("title")}
      </h2>

      <p className="mt-5 text-body">{t("body")}</p>

      <p className="mt-6 font-heading text-lead text-foreground">{t("closing")}</p>
    </section>
  );
}
