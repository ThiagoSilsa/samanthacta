"use client";

// external
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

/**
 * O tema é aplicado por classe (`attribute="class"`), que é o que os tokens `.dark` do
 * `globals.css` esperam.
 *
 * `defaultTheme="system"` + `enableSystem`: quem nunca escolheu nada recebe o tema do
 * sistema operacional. `disableTransitionOnChange` evita a transição de cores ao alternar,
 * que numa página inteira de creme para quase-preto parece piscada.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
