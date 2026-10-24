import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { Source_Sans_3, Spectral } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { HTML_LANG, type Locale } from "@/i18n/config";

import "./globals.css";

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

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ui.meta");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = (await getLocale()) as Locale;
  const messages = await getMessages();
  const t = await getTranslations("ui.nav");

  return (
    <html
      lang={HTML_LANG[locale] ?? "pt-BR"}
      // next-themes escreve a classe no <html> antes da hidratação.
      suppressHydrationWarning
      className={`${bodyFont.variable} ${headingFont.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <a
              href="#conteudo"
              className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
            >
              {t("skipToContent")}
            </a>

            <SiteHeader />

            <main
              id="conteudo"
              className="mx-auto w-full max-w-5xl flex-1 px-5 py-10"
            >
              {children}
            </main>

            <SiteFooter />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
