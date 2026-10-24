"use client";

// external
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

// components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// i18n
import { LOCALE_COOKIE, LOCALES, LOCALE_NATIVE_NAME } from "@/i18n/config";

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

/**
 * Seletor de idioma.
 *
 * Não muda a URL: grava um cookie e pede ao servidor para renderizar de novo, agora com o
 * JSON do idioma escolhido. Assim a troca é resolvida no servidor — o HTML já vem no idioma
 * certo, sem piscar em português.
 *
 * O nome de cada idioma aparece **no próprio idioma**: quem lê inglês reconhece "English",
 * não "Inglês".
 */
export function LocaleSelect() {
  const t = useTranslations("ui.nav");
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleChange(nextLocale: string) {
    document.cookie = `${LOCALE_COOKIE}=${nextLocale}; path=/; max-age=${ONE_YEAR_IN_SECONDS}; samesite=lax`;
    startTransition(() => router.refresh());
  }

  return (
    <Select value={locale} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger
        // Nome acessível com o valor atual: sem isso o leitor de tela anuncia só "Idioma".
        aria-label={`${t("language")}: ${LOCALE_NATIVE_NAME[locale as keyof typeof LOCALE_NATIVE_NAME] ?? locale}`}
        className="w-fit gap-2 border-border bg-transparent px-2 py-1 text-muted-foreground hover:text-foreground"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {LOCALES.map((item) => (
          <SelectItem key={item} value={item} lang={item}>
            {LOCALE_NATIVE_NAME[item]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
