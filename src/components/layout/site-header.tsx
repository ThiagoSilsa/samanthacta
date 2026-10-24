import Link from "next/link";

import { profile } from "@/data/profile";

import { LocaleSelect } from "./locale-select";
import { ThemeToggle } from "./theme-toggle";

/**
 * Esqueleto do cabeçalho. Os ícones de contato e a navegação entram na etapa 05 — aqui o
 * objetivo é provar que o shell e os controles funcionam nos três idiomas.
 */
export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-5 py-4">
        <Link href="/" className="font-heading">
          {profile.name}
        </Link>

        <div className="flex items-center gap-4">
          <LocaleSelect />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
