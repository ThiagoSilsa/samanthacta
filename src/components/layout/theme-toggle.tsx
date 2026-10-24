"use client";

import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

const ORDER = ["system", "light", "dark"] as const;
type ThemeChoice = (typeof ORDER)[number];

/**
 * Alternador de três estados, em ciclo: sistema → claro → escuro.
 *
 * Três estados porque dois escondem o `prefers-color-scheme`: quem escolhe "claro" uma vez
 * nunca mais volta ao automático sem limpar o armazenamento.
 *
 * Sem `useState`/`useEffect` de "mounted": no servidor o tema ainda não é conhecido, então
 * o rótulo sai como "Sistema" e o `suppressHydrationWarning` absorve a diferença quando o
 * `next-themes` lê a preferência salva. Ler o tema num efeito para trocar estado dispararia
 * render em cascata — e o lint do React 19 reclama disso, com razão.
 */
export function ThemeToggle() {
  const t = useTranslations("nav");
  const { theme, setTheme } = useTheme();

  const current: ThemeChoice = isChoice(theme) ? theme : "system";
  const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length] ?? "system";

  const label: Record<ThemeChoice, string> = {
    system: t("themeSystem"),
    light: t("themeLight"),
    dark: t("themeDark"),
  };

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      // O rótulo diz o estado atual e para onde o clique leva.
      aria-label={`${t("theme")}: ${label[current]}. ${t("themeChange")} → ${label[next]}.`}
      // O servidor não conhece a preferência salva, então o `aria-label` sai diferente no
      // primeiro render do cliente. Sem isso, o React registra erro de hidratação.
      suppressHydrationWarning
      className="inline-block min-w-[9ch] text-left text-muted-foreground hover:text-foreground focus-visible:text-foreground"
    >
      <span suppressHydrationWarning>{label[current]}</span>
    </button>
  );
}

function isChoice(value: string | undefined): value is ThemeChoice {
  return value === "system" || value === "light" || value === "dark";
}
