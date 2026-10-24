import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";

import type { Experience } from "@/data/types";
import { formatPeriod } from "@/lib/dates";
import { cn } from "@/lib/utils";

/**
 * Um item da linha do tempo.
 *
 * O resumo usa `<details>`/`<summary>` nativo, não o `Accordion` do Radix. Dois motivos:
 * o cabeçalho do Radix é um `<h3>`, então cada item criava **dois** headings — o título e um
 * "Ver resumo" no meio da hierarquia, o que atrapalha quem navega por títulos; e o nativo
 * resolve teclado e leitor de tela sem JavaScript.
 *
 * Diferenciação entre principal e secundária é **tipográfica e de espaço**, não de cor ou
 * caixa: título maior e mais respiro para as principais.
 */
export async function TimelineEntry({
  experience,
}: {
  experience: Experience;
}) {
  const locale = await getLocale();
  const t = await getTranslations();

  const key = `content.experiences.${experience.slug}`;
  const title = t(`${key}.title`);
  const role = t(`${key}.role`);
  const summary = t(`${key}.summary`);

  const isPrincipal = experience.kind !== "outra";
  const period = formatPeriod(experience, locale, t("ui.timeline.current"));

  return (
    <li
      className={cn(
        "border-l border-border pl-5",
        isPrincipal ? "pb-10" : "pb-6",
      )}
    >
      <article>
        <header>
          <p className="text-sm text-muted-foreground">
            {experience.start ? (
              <time dateTime={experience.start}>{period}</time>
            ) : (
              <span>{period}</span>
            )}
          </p>

          <h3 className={cn("mt-1", isPrincipal ? "text-h3" : "text-lead")}>
            {title}
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            {role} · {experience.organization}
          </p>
        </header>

        <details className="group mt-1">
          <summary className="flex min-h-11 w-fit cursor-pointer list-none items-center gap-1 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 [&::-webkit-details-marker]:hidden">
            {t("ui.timeline.summaryToggle")}
            <FiChevronDown
              aria-hidden
              className="size-4 group-open:rotate-180"
            />
          </summary>
          <p className="mt-1 mb-2 text-muted-foreground">{summary}</p>
        </details>

        <Link
          href={`/experiencias/${experience.slug}`}
          className="inline-flex min-h-11 items-center text-sm text-primary underline underline-offset-4"
        >
          {t("ui.timeline.seeFull")}
        </Link>
      </article>
    </li>
  );
}
