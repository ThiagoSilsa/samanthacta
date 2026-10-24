// external
import type { MetadataRoute } from "next";

// data
import { absoluteUrl, hasPublicUrl } from "@/data/site";

/**
 * Com URL pública definida, libera a indexação. Sem ela, bloqueia tudo: um preview da Vercel
 * indexado cria conteúdo duplicado, e um sitemap apontando para `localhost` é pior que
 * sitemap nenhum.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: hasPublicUrl
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
