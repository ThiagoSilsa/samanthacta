// components
import { ContactCta } from "@/components/sections/contact-cta";
import { Hero } from "@/components/sections/hero";
import { IntegratedAssessment } from "@/components/sections/integrated-assessment";
import { ProfessionalGoal } from "@/components/sections/professional-goal";
import { Skills } from "@/components/sections/skills";
import { Timeline } from "@/components/sections/timeline";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Timeline />
      {/*
       * Avaliação e objetivo lado a lado a partir de 1024px (D-015). Empilhados no celular,
       * com 48px de respiro — sem o `mt` que cada seção carregava antes.
       */}
      <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-8">
        <IntegratedAssessment />
        <ProfessionalGoal />
      </div>
      <Skills />
      {/* Última seção da página, por decisão explícita (D-011). */}
      <ContactCta />
    </>
  );
}
