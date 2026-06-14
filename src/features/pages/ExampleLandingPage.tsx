import { Header } from "@/components/layout/Header";
import { CreativeVisionSection } from "@/sections/CreativeVisionSection";
import { ServiceEcosystemSection } from "@/sections/ServiceEcosystemSection";
import { ProjectMuseumSection } from "@/sections/ProjectMuseumSection";
import { WebsiteRentalPricingSection } from "@/sections/WebsiteRentalPricingSection";

export default function ExampleLandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <Header />
      <main>
        <CreativeVisionSection />
        <ServiceEcosystemSection />
        <ProjectMuseumSection />
        <WebsiteRentalPricingSection />
      </main>
    </div>
  );
}
