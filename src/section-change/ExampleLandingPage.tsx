import {
  Header,
  CreativeVisionSection,
  ServiceEcosystemSection,
  ProjectMuseumSection,
  WebsiteRentalPricingSection,
} from './components';

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
