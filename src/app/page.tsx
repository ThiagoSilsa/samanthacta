import { Hero } from "@/components/sections/hero";
import { IntegratedAssessment } from "@/components/sections/integrated-assessment";
import { ProfessionalGoal } from "@/components/sections/professional-goal";
import { Timeline } from "@/components/sections/timeline";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Timeline />
      <IntegratedAssessment />
      <ProfessionalGoal />
    </>
  );
}
