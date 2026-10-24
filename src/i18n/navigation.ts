import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

/**
 * Navegação ciente do idioma: `Link` e `usePathname` trabalham com o caminho **sem** prefixo
 * de locale, e o prefixo é aplicado conforme o idioma ativo.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
