import { TeamPage } from "@/components/pages/team-page";
import { buildMetadata } from "@/lib/seo";
import { getSeoPage } from "@/lib/site-config-server";

export const revalidate = 3600;

export async function generateMetadata() {
  const seo = await getSeoPage("team");
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
    title: "Đội Ngũ Chuyên Gia Thiết Kế Web | LOOP",
    description:
      "Gặp gỡ đội ngũ chuyên gia thiết kế website, SEO và customer success tại LOOP.",
    path: "/doi-ngu",
  });
}

export default function TeamRoute() {
  return <TeamPage />;
}
