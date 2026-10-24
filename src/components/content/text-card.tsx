// external
import type { ReactNode } from "react";

/**
 * Card de texto do posicionamento.
 *
 * O que separa o card do resto da página é um **filete de 2px no topo** e espaço — não uma
 * caixa. O `--card` do tema é a mesma cor do fundo, então um contorno fechado seria apenas
 * uma moldura desenhada em volta de dois parágrafos; a direção de arte (D-015) escolheu
 * filete justamente para não virar "feature card" de landing page.
 *
 * Segundo uso real: avaliação integrada e objetivo profissional. Se um terceiro card nascer
 * com a mesma forma, este é o lugar.
 */
export function TextCard({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article
      aria-labelledby={id}
      className="border-t-2 border-foreground/40 pt-6"
    >
      <h2 id={id} className="text-h2">
        {title}
      </h2>

      <div className="mt-5 max-w-prose text-body">{children}</div>
    </article>
  );
}
