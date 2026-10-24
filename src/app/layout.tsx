// external
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { Source_Sans_3, Spectral } from "next/font/google";

// components
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeProvider } from "@/components/layout/theme-provider";

// data
import { profile } from "@/data/profile";
import { absoluteUrl, hasPublicUrl, site, siteUrl } from "@/data/site";

// i18n
import { HTML_LANG, type Locale } from "@/i18n/config";

// styles
import "./globals.css";

/*
 * Só `latin`: português e espanhol usam Latin-1 (á, ã, ç, ñ), que já está nesse subset.
 * `latin-ext` dobrava o número de arquivos de fonte sem nenhum caractere a mais para este
 * conteúdo.
 */
const bodyFont = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

const headingFont = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ui.meta");
  const locale = await getLocale();

  return {
    metadataBase: siteUrl,
    title: {
      default: t("title"),
      template: `%s — ${site.name}`,
    },
    description: t("description"),
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: HTML_LANG[(locale as Locale) ?? "pt"],
      title: t("title"),
      description: t("description"),
      url: "/",
    },
    // Sem URL pública, nada de indexar: canonical e sitemap apontariam para localhost.
    robots: hasPublicUrl ? undefined : { index: false, follow: false },
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
  const metaT = await getTranslations("ui.meta");

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

        {/*
          Dados estruturados: só o que é verificável. Nada de `worksFor`, `hasCredential`
          ou CRP — ela ainda não tem registro profissional, e o site não pode sugerir que
          tenha (I-1).
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: profile.name,
              jobTitle: metaT("jobTitle"),
              url: absoluteUrl("/"),
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: site.affiliation,
              },
              knowsLanguage: ["pt-BR", "en", "es"],
            }),
          }}
        />
      </body>
    </html>
  );
}
