"use client";

import { useLocale, useTranslations } from "next-intl";

import { usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/** Abreviações que não se traduzem: PT, EN, ES são reconhecíveis nos três idiomas. */
const SHORT: Record<string, string> = { pt: "PT", en: "EN", es: "ES" };

/**
 * Seletor de idioma como **links**, não como menu suspenso: funciona sem JavaScript, o
 * navegador mostra o destino real, e cada versão tem URL própria (bom para compartilhar e
 * para busca).
 *
 * O href é calculado aqui em vez de delegado ao `Link` do next-intl: com
 * `localePrefix: "as-needed"`, o componente gerava `/pt` para o idioma padrão — URL que só
 * existe como redirecionamento para `/`. Três links explícitos valem mais que a economia de
 * duas linhas.
 */
export function LocaleSwitcher() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  const hrefFor = (target: string) => {
    if (target === routing.defaultLocale) return pathname;
    return pathname === "/" ? `/${target}` : `/${target}${pathname}`;
  };

  return (
    <nav aria-label={t("language")}>
      <ul className="flex items-center gap-3">
        {routing.locales.map((item) => (
          <li key={item}>
            <a
              href={hrefFor(item)}
              hrefLang={item}
              aria-current={item === locale ? "true" : undefined}
              className={
                item === locale
                  ? "text-foreground underline underline-offset-4"
                  : "text-muted-foreground hover:text-foreground"
              }
            >
              {SHORT[item] ?? item.toUpperCase()}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
