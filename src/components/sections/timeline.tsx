import { getTranslations } from "next-intl/server";

import { TimelineEntry } from "@/components/content/timeline-entry";
import { ORDERED_EXPERIENCES } from "@/data/experiences";

/**
 * Linha do tempo da formação.
 *
 * Lista ordenada de verdade (`<ol>`): a ordem carrega significado. A ordem vem de
 * `ORDERED_EXPERIENCES`, derivada das datas — nunca digitada à mão.
 *
 * O documento da etapa previa um bloco separado para itens sem período. Ele não faz sentido
 * agora: **todas** as 12 entradas estão sem data (P-001, P-002), então o bloco conteria a
 * lista inteira. Quando as datas chegarem, o que faltar pode ser separado.
 */
export async function Timeline() {
  const t = await getTranslations("ui.timeline");

  return (
    <section aria-labelledby="trajetoria" className="mt-16">
      <h2 id="trajetoria" className="text-h2">
        {t("title")}
      </h2>

      <ol className="mt-8">
        {ORDERED_EXPERIENCES.map((experience) => (
          <TimelineEntry key={experience.slug} experience={experience} />
        ))}
      </ol>
    </section>
  );
}
