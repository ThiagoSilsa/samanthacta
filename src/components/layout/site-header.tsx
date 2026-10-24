import Link from "next/link";

import { profile } from "@/data/profile";

import { ContactLinks } from "./contact-links";
import { LocaleSelect } from "./locale-select";
import { ThemeSwitch } from "./theme-switch";

/**
 * Cabeçalho: nome à esquerda, contato e controles à direita.
 *
 * Em 360px não cabe tudo numa linha — os controles descem para a segunda, alinhados à
 * direita. Sem menu hambúrguer: não há navegação a esconder.
 */
export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-4">
        <Link href="/" className="font-heading">
          {profile.name}
        </Link>

        <div className="flex items-center gap-2">
          <ContactLinks />
          <LocaleSelect />
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}
