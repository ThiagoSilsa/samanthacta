// external
import { getTranslations } from "next-intl/server";

// components
import { TextCard } from "@/components/content/text-card";

/**
 * Avaliação psicológica integrada.
 *
 * Os três pilares aparecem **dentro da prosa**, não como três caixas numeradas: são a
 * definição que a cliente dá, não uma lista de etapas. Uma linha de destaque, no máximo, e
 * ela é a conclusão dela — não uma frase de efeito.
 *
 * O `mt` saiu daqui: o espaço entre os dois cards agora é do grid em `page.tsx`.
 */
export async function IntegratedAssessment() {
  const t = await getTranslations("content.assessment");

  return (
    <TextCard id="avaliacao" title={t("title")}>
      <p>{t("body")}</p>

      <p className="mt-6 font-heading text-lead text-foreground">
        {t("closing")}
      </p>
    </TextCard>
  );
}
