import { useTranslations } from "next-intl";

import { profile } from "@/data/profile";

/**
 * Sem ano no rodapé, de propósito: o ano exigiria ler o relógio no render, o que o Cache
 * Components bloqueia, e um ano fixo viraria mentira na virada do ano. "© Nome" é suficiente.
 */
export function SiteFooter() {
  const t = useTranslations("ui.footer");

  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-1 px-5 py-6 text-sm text-muted-foreground">
        <p>© {profile.name}</p>
        <p>{t("location")}</p>
      </div>
    </footer>
  );
}
