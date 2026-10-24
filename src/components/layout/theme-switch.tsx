"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * Alternador de tema: **dois estados**, claro e escuro.
 *
 * Não existe opção "sistema" na interface. Na primeira visita o `next-themes` resolve o tema
 * pelo `prefers-color-scheme` do sistema e já aplica claro ou escuro; a partir do primeiro
 * toque, a escolha é explícita e fica salva.
 *
 * `useSyncExternalStore` responde "não hidratado" no servidor e "hidratado" no cliente logo
 * depois. Sem isso, um visitante com sistema escuro recebia o HTML com o switch desligado e o
 * cliente renderizava ligado — o React não corrige atributo em descompasso de hidratação, e
 * o interruptor ficava mostrando "claro" com a página escura. Custa um quadro de atraso; é o
 * preço de o servidor não poder saber a preferência do sistema.
 */
export function ThemeSwitch() {
  const t = useTranslations("ui.nav");
  const { resolvedTheme, setTheme } = useTheme();

  const isHydrated = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const isDark = isHydrated && resolvedTheme === "dark";

  return (
    <div className="flex items-center gap-2">
      <FiSun
        aria-hidden
        className={cn("size-4 shrink-0 text-muted-foreground", isDark && "opacity-40")}
      />
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        // O nome descreve o ajuste; o estado vem do `aria-checked` do próprio switch.
        aria-label={t("themeToggle")}
        size="sm"
      />
      <FiMoon
        aria-hidden
        className={cn("size-4 shrink-0 text-muted-foreground", !isDark && "opacity-40")}
      />
    </div>
  );
}
