import { useTranslations } from "next-intl";
import { FaLinkedin } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";

import { profile } from "@/data/profile";

/**
 * Contato no cabeçalho: só os ícones, como pede o briefing.
 *
 * Cada ícone é um link com alvo de 44×44 (o ícone tem 20px, o resto é área de toque) e nome
 * acessível próprio — ícone sozinho, sem rótulo, é inutilizável por leitor de tela. O ícone
 * em si é `aria-hidden`: quem anuncia é o link.
 */
export function ContactLinks() {
  const t = useTranslations("ui.nav");

  const itemClass =
    "flex size-11 items-center justify-center text-muted-foreground hover:text-foreground";

  return (
    <nav aria-label={t("contact")}>
      <ul className="flex items-center gap-1">
        <li>
          <a
            href={`mailto:${profile.email}`}
            aria-label={t("contactEmail", { email: profile.email })}
            className={itemClass}
          >
            <SiGmail aria-hidden className="size-5" />
          </a>
        </li>
        <li>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("contactLinkedin")}
            className={itemClass}
          >
            <FaLinkedin aria-hidden className="size-5" />
          </a>
        </li>
      </ul>
    </nav>
  );
}
