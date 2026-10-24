import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Source_Sans_3, Spectral } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { routing } from "@/i18n/routing";

import "../globals.css";

const bodyFont = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const headingFont = Spectral({
  variable: "--font-spectral",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600"],
  display: "swap",
});

/**
 * `lang` é o código de idioma do conteúdo, não o do locale interno: português é `pt-BR`,
 * porque o português de Portugal tem outra norma ortográfica e não é o público aqui.
 */
const HTML_LANG: Record<string, string> = { pt: "pt-BR", en: "en", es: "es" };

type LocaleParams = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: locale === routing.defaultLocale ? "/" : `/${locale}`,
      languages: {
        "pt-BR": "/",
        en: "/en",
        es: "/es",
        "x-default": "/",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleParams & { children: React.ReactNode }) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Sem isso o layout é dinâmico e a página perde a geração estática.
  setRequestLocale(locale);

  const t = await getTranslations("nav");

  return (
    <html
      lang={HTML_LANG[locale] ?? locale}
      // next-themes escreve a classe no <html> antes da hidratação.
      suppressHydrationWarning
      className={`${bodyFont.variable} ${headingFont.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <ThemeProvider>
          <NextIntlClientProvider>
            <a
              href="#conteudo"
              className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
            >
              {t("skipToContent")}
            </a>

            <SiteHeader />

            <main id="conteudo" className="mx-auto w-full max-w-5xl flex-1 px-5 py-10">
              {children}
            </main>

            <SiteFooter />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
