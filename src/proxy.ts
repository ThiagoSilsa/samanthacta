import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

/**
 * No Next.js 16 o arquivo `middleware.ts` foi renomeado para `proxy.ts` (e a função, para
 * `proxy`). O comportamento é o mesmo; só o nome mudou.
 */
export const proxy = createMiddleware(routing);

export const config = {
  // Tudo, menos rotas internas e arquivos com extensão.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
