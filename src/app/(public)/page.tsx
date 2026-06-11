import { HomePage } from "@/components/pages/home-page";
import { getSeoPage } from "@/lib/site-config-server";
import { buildMetadata, organizationJsonLd, webSiteJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const revalidate = 3600;

export async function generateMetadata() {
  const seo = await getSeoPage("home");
  if (seo) {
    return buildMetadata({
      title: seo.title,
      description: seo.description,
      canonical: seo.canonical,
      keywords: seo.keywords,
      ogTitle: seo.ogTitle,
      ogDescription: seo.ogDescription,
      ogImage: seo.ogImage,
      robots: seo.robots,
    });
  }

  return buildMetadata({
    title: "Thiết Kế & Thuê Website Chuyên Nghiệp | LOOP",
    description: SITE.description,
    path: "/",
  });
}

export default async function Home() {
  const jsonLd = [organizationJsonLd(), webSiteJsonLd()];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePage />
    </>
  );
}
