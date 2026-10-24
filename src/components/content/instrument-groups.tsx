// external
import { getTranslations } from "next-intl/server";

// data
import { INSTRUMENTS, INSTRUMENT_DOMAIN_ORDER } from "@/data/instruments";

/**
 * Instrumentos agrupados por domínio.
 *
 * Lista corrida de 32 nomes é ilegível no celular e comunica acúmulo, não competência — o
 * agrupamento é o que dá sentido à lista. Quem aplicou mas não corrigiu fica marcado **em
 * texto** ("apenas aplicado"), não por cor: cor sozinha não é acessível e some na impressão.
 *
 * O agrupamento é proposta, não fato (P-010); o que não foi classificado aparece em "Outros
 * instrumentos".
 */
export async function InstrumentGroups() {
  const t = await getTranslations();

  return (
    <div className="mt-6 space-y-5">
      {INSTRUMENT_DOMAIN_ORDER.map((domain) => {
        const instruments = INSTRUMENTS.filter(
          (item) => item.domain === domain,
        );
        if (instruments.length === 0) return null;

        return (
          <div key={domain}>
            <h4 className="text-sm font-semibold tracking-wide text-foreground uppercase">
              {t(`content.instruments.domains.${domain}`)}
            </h4>

            <ul className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-muted-foreground">
              {instruments.map((instrument) => (
                <li
                  key={instrument.name}
                  className="after:ml-2 after:text-border after:content-['·'] last:after:content-none"
                >
                  {instrument.name}
                  {instrument.level === "applied-only" && (
                    <span className="ml-1 text-sm text-muted-foreground/80">
                      ({t("content.instruments.levels.applied-only")})
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
