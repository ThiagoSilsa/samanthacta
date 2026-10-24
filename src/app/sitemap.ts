import type { MetadataRoute } from "next";

import { EXPERIENCES } from "@/data/experiences";
import { absoluteUrl } from "@/data/site";

/**
 * Uma URL por página — o idioma não muda o endereço (D-013), então não há variantes a listar.
 * As 12 páginas de experiência vêm dos dados: experiência nova entra no sitemap sozinha.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = ["/", "/experiencias", "/competencias"].map((route) => ({
    url: absoluteUrl(route),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1 : 0.7,
  }));

  const experienceRoutes = EXPERIENCES.map((experience) => ({
    url: absoluteUrl(`/experiencias/${experience.slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...experienceRoutes];
}
