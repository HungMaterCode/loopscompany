"use client";

import { HeroCarousel } from "@/sections/HeroCarousel";
import { Marquee } from "@/sections/Marquee";
import { WhySection } from "@/sections/WhySection";
import { ProcessSection } from "@/sections/ProcessSection";
import { BlogPreviewSection } from "@/sections/BlogPreviewSection";
import { ContactSection } from "@/sections/ContactSection";
import { CreativeVisionSection } from "@/sections/CreativeVisionSection";
import { ServiceEcosystemSection } from "@/sections/ServiceEcosystemSection";
import { ProjectMuseumSection } from "@/sections/ProjectMuseumSection";
import { WebsiteRentalPricingSection } from "@/sections/WebsiteRentalPricingSection";

export function HomePage() {
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
