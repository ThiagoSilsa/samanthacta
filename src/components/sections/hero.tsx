import { getTranslations } from "next-intl/server";

import { profile } from "@/data/profile";

/**
 * Apresentação.
 *
 * Mobile: retrato, nome e texto empilhados e centralizados, como a cliente pediu no briefing.
 * A partir de `md`, o retrato vai para a esquerda e o texto fica alinhado à esquerda — texto
 * centralizado em bloco longo de desktop é difícil de ler, e o olho não tem onde se ancorar.
 *
 * O retrato é o único elemento circular do site. Enquanto a foto não chega, o espaço tem a
 * proporção final, para que trocar o arquivo não mexa no layout.
 *
 * Não há botão de contato aqui: P-012 está aberta (remover ou virar âncora para a seção
 * final). O CTA principal é a última seção da página (D-011).
 */
export async function Hero() {
  const t = await getTranslations();

  return (
    <section
      aria-labelledby="apresentacao"
      className="mx-auto w-full max-w-3xl"
    >
      <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:gap-10 md:text-left">
        <div
          className="flex aspect-square w-40 shrink-0 items-center justify-center rounded-full border border-border text-sm text-muted-foreground md:w-44"
          // Placeholder sem papel informativo: quando virar foto, recebe `alt` descritivo.
          role="img"
          aria-label="[FOTO]"
        >
          [FOTO]
        </div>

        <div className="max-w-prose">
          <p className="text-sm text-muted-foreground">
            {t("content.profile.greeting")}
          </p>
          <h1 id="apresentacao" className="text-h1">
            {profile.name}
          </h1>
          <p className="mt-5 text-lead text-foreground">
            {t("content.profile.headline")}
          </p>
          <p className="mt-4 text-muted-foreground">
            {t("content.profile.welcome")}
          </p>
          <p className="mt-6 text-sm text-muted-foreground">
            {t("content.profile.locationLine")}
          </p>
        </div>
      </div>
    </section>
  );
}
