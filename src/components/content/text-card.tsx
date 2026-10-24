// external
import type { ReactNode } from "react";

// components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Card de texto do posicionamento.
 *
 * Usa o `card` do shadcn (`Card`, `CardHeader`, `CardTitle`, `CardContent`), adaptado em
 * `ui/card.tsx` à direção de arte: o contorno fechado do registro virou **filete de 2px no
 * topo**, e o padding horizontal saiu para o texto alinhar com a única margem esquerda da
 * página.
 *
 * `asChild` nos dois componentes existe para não perder semântica: o card é um
 * `<article aria-labelledby>` e o título é um `<h2>` — o registro usaria `div` nos dois.
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
    <Card asChild>
      <article aria-labelledby={id}>
        <CardHeader>
          <CardTitle asChild>
            <h2 id={id} className="text-h2">
              {title}
            </h2>
          </CardTitle>
        </CardHeader>

        <CardContent className="max-w-prose">{children}</CardContent>
      </article>
    </Card>
  );
}
