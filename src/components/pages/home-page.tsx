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
import { useSiteData } from "@/features/legacy-core/SiteDataContext";

export function HomePage() {
  const { config, isLoading } = useSiteData();

  if (isLoading || !config) {
    return null;
  }

  const visibility = config.sectionsVisibility || {
    hero: true,
    marquee: true,
    creativeVision: true,
    service: true,
    whyChooseUs: true,
    portfolio: true,
    process: true,
    pricing: true,
    blog: true,
    contact: true,
  };

  return (
    <>
      {visibility.hero !== false && <HeroCarousel />}
      {visibility.marquee !== false && <Marquee />}
      {visibility.creativeVision !== false && <CreativeVisionSection />}
      {visibility.service !== false && <ServiceEcosystemSection />}
      {visibility.whyChooseUs !== false && <WhySection />}
      {visibility.portfolio !== false && <ProjectMuseumSection />}
      {visibility.process !== false && <ProcessSection />}
      {visibility.pricing !== false && <WebsiteRentalPricingSection />}
      {visibility.blog !== false && <BlogPreviewSection />}
      {visibility.contact !== false && <ContactSection />}
    </>
  );
}
