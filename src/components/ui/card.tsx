// external
import * as React from "react";
import { Slot } from "radix-ui";

// lib
import { cn } from "@/lib/utils";

/**
 * Card — cópia do registro do shadcn, adaptada à direção de arte (D-015).
 *
 * A estrutura e a API são as do registro: `Card`, `CardHeader`, `CardTitle`,
 * `CardDescription`, `CardAction`, `CardContent`, `CardFooter`. A aparência é que mudou,
 * porque aqui card não é caixa:
 *
 * - `ring-1` (contorno fechado pela borda toda) virou **filete de 2px no topo**;
 * - `bg-card` saiu: `--card` é a **mesma cor** do fundo, não existe superfície de card;
 * - `rounded-*` saiu: raio 0 em todo o site, e o utilitário só existia para acompanhar o
 *   contorno;
 * - o padding horizontal saiu para o texto alinhar com a única margem esquerda da página.
 *
 * `Card` e `CardTitle` ganharam `asChild` por dois motivos concretos: o título precisa
 * continuar sendo `<h2>` (o registro usa `div`, e heading de mentira aparece na navegação
 * por títulos) e o card precisa ser um `<article aria-labelledby>` de verdade.
 *
 * O `import { cn } from "cn"` do registro original aponta para o pacote `cn`; aqui usa o
 * helper do projeto. Toda vez que o CLI do shadcn regenerar este arquivo, conferir os dois
 * pontos: o import do `cn` e a volta do `ring-1`.
 */

function Card({
  className,
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & {
  size?: "default" | "sm";
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-(--card-spacing) border-t-2 border-foreground/40 pt-6 text-body text-card-foreground [--card-spacing:--spacing(4)] data-[size=sm]:[--card-spacing:--spacing(3)]",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]",
        className,
      )}
      {...props}
    />
  );
}

/**
 * `CardTitle` não define tamanho de letra de propósito. O registro traz `text-base` e
 * `font-medium`, e os dois brigam com a escala do projeto: `text-base` não é reconhecido
 * pelo `twMerge` como conflitante com `text-h2` (um é utilitário do Tailwind, o outro é
 * token), então os dois `font-size` sobrevivem e **quem ganha é a ordem do CSS** — o
 * resultado era título de 16px acima de texto de 17px. Aqui o tamanho vem sempre do consumo
 * (`text-h2`, `text-h3`), e o `font-heading` só garante a família para quem renderizar uma
 * `div` em vez de heading.
 */
function CardTitle({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      data-slot="card-title"
      className={cn("font-heading", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn(className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center border-t pt-(--card-spacing)",
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
