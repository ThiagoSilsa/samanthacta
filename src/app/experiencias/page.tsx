// external
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";

// data
import { ORDERED_EXPERIENCES } from "@/data/experiences";

// lib
import { formatPeriod } from "@/lib/dates";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ui.experiences");
  const meta = await getTranslations("ui.meta");

  return {
    title: t("title"),
    description: meta("experiencesDescription"),
    alternates: { canonical: "/experiencias" },
    openGraph: { url: "/experiencias" },
  };
}

/**
 * Índice das experiências, separado em principais e outras — a mesma divisão da linha do
 * tempo, para que a hierarquia não mude conforme a página.
 */
export default async function ExperiencesPage() {
  const locale = await getLocale();
  const t = await getTranslations();

  const primary = ORDERED_EXPERIENCES.filter(
    (experience) => experience.kind !== "outra",
  );
  const other = ORDERED_EXPERIENCES.filter(
    (experience) => experience.kind === "outra",
  );

  const groups = [
    { id: "principais", title: t("ui.experiences.primary"), items: primary },
    { id: "outras", title: t("ui.experiences.other"), items: other },
  ];

  return (
    <div className="max-w-prose">
      <h1 className="text-h1">{t("ui.experiences.title")}</h1>

      {groups.map((group) => (
        <section
          key={group.id}
          aria-labelledby={`grupo-${group.id}`}
          className="mt-10"
        >
          <h2 id={`grupo-${group.id}`} className="text-h2">
            {group.title}
          </h2>

          <ul className="mt-4">
            {group.items.map((experience) => (
              <li key={experience.slug} className="border-b border-border">
                <Link
                  href={`/experiencias/${experience.slug}`}
                  className="flex min-h-11 flex-col justify-center py-3 hover:bg-muted/40"
                >
                  <span className="text-sm text-muted-foreground">
                    {formatPeriod(experience, locale, t("ui.timeline.current"))}
                  </span>
                  <span className="text-lead">
                    {t(`content.experiences.${experience.slug}.title`)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {t(`content.experiences.${experience.slug}.role`)} ·{" "}
                    {experience.organization}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
