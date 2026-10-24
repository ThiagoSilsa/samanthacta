// external
import { getTranslations } from "next-intl/server";

// components
import { TextCard } from "@/components/content/text-card";

/**
 * Objetivo profissional.
 *
 * Um parágrafo só, sem destaque tipográfico: o card anterior já usa esse recurso, e repetir
 * o mesmo gesto em dois cards lado a lado transforma destaque em padrão.
 */
export async function ProfessionalGoal() {
  const t = await getTranslations("content.goal");

  return (
    <TextCard id="objetivo" title={t("title")}>
      <p>{t("body")}</p>
    </TextCard>
  );
}
