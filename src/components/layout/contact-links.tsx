// external
import { useTranslations } from "next-intl";

// icons
import { FaLinkedin } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";

// data
import { profile } from "@/data/profile";

/**
 * Contato no cabeçalho: só os ícones, como pede o briefing.
 *
 * Cada ícone é um link com alvo de 44×44 (o ícone tem 20px, o resto é área de toque) e nome
 * acessível próprio — ícone sozinho, sem rótulo, é inutilizável por leitor de tela. O ícone
 * em si é `aria-hidden`: quem anuncia é o link.
 */
export function ContactLinks({ asNav = true }: { asNav?: boolean }) {
  const t = useTranslations();
  // Assunto pré-preenchido e igual em todo lugar: o mesmo link não pode se comportar
  // de dois jeitos na mesma página.
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(t("ui.contact.subject"))}`;

  const itemClass =
    "flex size-11 items-center justify-center text-muted-foreground hover:text-foreground";

  const list = (
    <ul className="flex items-center gap-1">
      <li>
        <a
          href={mailto}
          aria-label={t("ui.nav.contactEmail", { email: profile.email })}
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
          aria-label={t("ui.nav.contactLinkedin")}
          className={itemClass}
        >
          <FaLinkedin aria-hidden className="size-5" />
        </a>
      </li>
    </ul>
  );

  /*
   * `asNav={false}` no CTA: a seção já é uma região rotulada por "Entre em contato", e dois
   * `nav` com o mesmo nome acessível deixam a navegação por landmarks ambígua.
   */
  return asNav ? <nav aria-label={t("ui.nav.contact")}>{list}</nav> : list;
}
