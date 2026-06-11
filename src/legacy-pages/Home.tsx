import { HeroCarousel } from "../sections/HeroCarousel";
import { Marquee } from "../sections/Marquee";
import { WhySection } from "../sections/WhySection";
import { ProcessSection } from "../sections/ProcessSection";
import { BlogPreviewSection } from "../sections/BlogPreviewSection";
import { ContactSection } from "../sections/ContactSection";
import {
  CreativeVisionSection,
  ServiceEcosystemSection,
  ProjectMuseumSection,
  WebsiteRentalPricingSection,
} from "@/section-change";

export function Home() {
  return (
    <>
      <HeroCarousel />
      <Marquee />
      <CreativeVisionSection />
      <ServiceEcosystemSection />
      <WhySection />
      <ProjectMuseumSection />
      <ProcessSection />
      <WebsiteRentalPricingSection />
      <BlogPreviewSection />
      <ContactSection />
    </>
  );
}
