import { getTranslations } from "next-intl/server";

import { InstrumentGroups } from "@/components/content/instrument-groups";
import { CFP_RESOLUTIONS, CERTIFICATIONS, CANVA_PIECES } from "@/data/skills";

function certificationById(id: string) {
  return CERTIFICATIONS.find((certification) => certification.id === id);
}

/**
 * Competências técnicas.
 *
 * Cinco blocos com títulos próprios (`h3`) sob o `h2` da seção. A ordem é a do briefing:
 * documentos, instrumentos, idiomas, planilhas, Canva.
 *
 * Imagens dos certificados e do curso ficam pendentes (P-013) e **não** são simuladas: um
 * retângulo "[IMAGEM]" em produção parece página quebrada, diferente do retrato, que tem
 * função de layout.
 */
export async function Skills() {
  const t = await getTranslations();
  const toefl = certificationById("toefl-itp");
  const excel = certificationById("excel-intermediario");
  const powerBi = certificationById("power-bi");

  return (
    <section aria-labelledby="competencias" className="mt-16">
      <h2 id="competencias" className="text-h2">
        {t("ui.skills.title")}
      </h2>

      <div className="mt-10 space-y-12">
        {/* 1. Documentos psicológicos */}
        <section aria-labelledby="comp-documentos" className="max-w-prose">
          <h3 id="comp-documentos" className="text-h3">
            {t("ui.skills.documents")}
          </h3>
          <p className="mt-3 text-body">{t("content.skills.documents")}</p>
          <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-sm text-muted-foreground">
            {CFP_RESOLUTIONS.map((resolution) => (
              <li
                key={resolution}
                className="after:ml-2 after:text-border after:content-['·'] last:after:content-none"
              >
                {resolution}
              </li>
            ))}
          </ul>
        </section>

        {/* 2. Instrumentos psicométricos */}
        <section aria-labelledby="comp-instrumentos" className="max-w-prose">
          <h3 id="comp-instrumentos" className="text-h3">
            {t("ui.skills.instruments")}
          </h3>
          {/*
            Enquadramento ético (I-3): sem esta frase, a lista lê-se como prática autônoma,
            e a Resolução CFP nº 09/2018 restringe o uso de teste a psicólogo.
          */}
          <p className="mt-3 text-body text-muted-foreground">
            {t("content.instruments.disclaimer")}
          </p>

          <InstrumentGroups />
        </section>

        {/* 3. Inglês */}
        <section aria-labelledby="comp-idiomas" className="max-w-prose">
          <h3 id="comp-idiomas" className="text-h3">
            {t("ui.skills.languages")}
          </h3>
          <p className="mt-3 text-body">{t("content.skills.languages")}</p>
          {toefl && (
            <p className="mt-3 text-sm text-muted-foreground">
              {toefl.name} — {t("content.certifications.toefl-itp.detail")}
            </p>
          )}
        </section>

        {/* 4. Planilhas */}
        <section aria-labelledby="comp-planilhas" className="max-w-prose">
          <h3 id="comp-planilhas" className="text-h3">
            {t("ui.skills.spreadsheets")}
          </h3>
          <p className="mt-3 text-body">{t("content.skills.spreadsheets")}</p>

          <p className="mt-3 text-sm text-muted-foreground">
            {(t.raw("content.skills.spreadsheetFunctions") as string[]).join(
              " · ",
            )}
          </p>

          <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
            {[excel, powerBi].filter(Boolean).map((certification) => (
              <li key={certification!.id}>
                {certification!.name} —{" "}
                {t(`content.certifications.${certification!.id}.detail`)}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Canva — só aparece quando houver peças (P-013) */}
        {CANVA_PIECES.length > 0 && (
          <section aria-labelledby="comp-canva" className="max-w-prose">
            <h3 id="comp-canva" className="text-h3">
              {t("ui.skills.canva")}
            </h3>
            <p className="mt-3 text-body">{t("content.skills.canva")}</p>
          </section>
        )}
      </div>
    </section>
  );
}
