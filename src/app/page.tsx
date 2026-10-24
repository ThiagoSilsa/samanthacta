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
      <IntegratedAssessment />
      <ProfessionalGoal />
      <Skills />
      {/* Última seção da página, por decisão explícita (D-011). */}
      <ContactCta />
    </>
  );
}
