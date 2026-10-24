import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  /*
   * `cacheComponents` vinha ligado no scaffold do create-next-app. Desligado na etapa 04:
   * com ele, qualquer leitura de `params` precisa estar sob `<Suspense>` e `new Date()` no
   * render quebra o prerender — custo real para um site de quatro rotas inteiramente
   * estáticas, sem dados por usuário. Se um dia entrar conteúdo dinâmico (agenda,
   * depoimento de paciente), reavaliar.
   */
  cacheComponents: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withNextIntl(nextConfig);
