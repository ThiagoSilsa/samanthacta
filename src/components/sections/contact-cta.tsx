import { getTranslations } from "next-intl/server";

import { ContactLinks } from "@/components/layout/contact-links";
import { profile } from "@/data/profile";

/**
 * CTA de contato — **última seção da rota `/`** (D-011, invariante I-7).
 *
 * Sem formulário: o clique abre o cliente de e-mail com assunto pronto. Endereço aparece
 * como texto e como link — quem não usa cliente de e-mail precisa poder copiar.
 *
 * Bloco centralizado, ao contrário do resto da página: é o fechamento, e o briefing pede os
 * ícones centralizados no fim.
 */
export async function ContactCta() {
  const t = await getTranslations("ui.contact");
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(t("subject"))}`;

  return (
    <section
      aria-labelledby="contato"
      className="mt-20 border-t border-border pt-12 pb-4 text-center"
    >
      <h2 id="contato" className="text-h2">
        {t("title")}
      </h2>

      <p className="mx-auto mt-4 max-w-prose text-body text-muted-foreground">
        {t("body")}
      </p>

      <p className="mt-6">
        <a
          href={mailto}
          className="font-heading text-lead text-foreground underline underline-offset-4"
        >
          {profile.email}
        </a>
      </p>

      <div className="mt-3 flex justify-center">
        <ContactLinks asNav={false} />
      </div>
    </section>
  );
}
