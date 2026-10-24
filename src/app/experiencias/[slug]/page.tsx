import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { notFound } from "next/navigation";

import { EXPERIENCES, findExperienceBySlug } from "@/data/experiences";
import { formatPeriod } from "@/lib/dates";

/**
 * Rotas enumeradas a partir dos dados: experiência nova aparece aqui sozinha, sem tocar em
 * rota.
 */
export function generateStaticParams() {
  return EXPERIENCES.map((experience) => ({ slug: experience.slug }));
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const experience = findExperienceBySlug(slug);

  if (!experience) {
    notFound();
  }

  const locale = await getLocale();
  const t = await getTranslations();

  const key = `content.experiences.${experience.slug}`;
  const activities = t.raw(`${key}.activities`) as string[];

  return (
    <article className="max-w-prose">
      <nav aria-label={t("ui.experiences.breadcrumb")}>
        <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-foreground">
              {t("ui.experiences.home")}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/experiencias" className="hover:text-foreground">
              {t("ui.experiences.title")}
            </Link>
          </li>
        </ol>
      </nav>

      <h1 className="mt-6 text-h1">{t(`${key}.title`)}</h1>

      <p className="mt-2 text-muted-foreground">
        {t(`${key}.role`)} · {experience.organization}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        {experience.start ? (
          <time dateTime={experience.start}>
            {formatPeriod(experience, locale, t("ui.timeline.current"))}
          </time>
        ) : (
          <span>
            {formatPeriod(experience, locale, t("ui.timeline.current"))}
          </span>
        )}
      </p>

      <p className="mt-6 text-body">{t(`${key}.summary`)}</p>

      <h2 className="mt-10 text-h2">{t("ui.experiences.activities")}</h2>
      <ul className="mt-3 space-y-2">
        {activities.map((activity) => (
          <li key={activity} className="border-l border-border pl-4">
            {activity}
          </li>
        ))}
      </ul>

      <nav
        aria-label={t("ui.experiences.backNav")}
        className="mt-12 flex flex-col gap-2 text-sm"
      >
        <Link
          href="/experiencias"
          className="w-fit text-primary underline underline-offset-4"
        >
          {t("ui.experiences.backToIndex")}
        </Link>
        <Link
          href="/#trajetoria"
          className="w-fit text-primary underline underline-offset-4"
        >
          {t("ui.experiences.backToTimeline")}
        </Link>
      </nav>
    </article>
  );
}
