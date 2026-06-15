import { BlogPage } from "@/components/pages/blog-page";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 1800;

export const metadata = buildMetadata({
  title: "Blog SEO & Thiết Kế Web | LOOP",
  description:
    "Kiến thức SEO, thiết kế website và kinh doanh online từ đội ngũ LOOP.",
  path: "/bai-viet",
});

import { fetchSiteConfig } from "@/features/legacy-core/site-config-api";

export default async function BlogRoute() {
  const config = await fetchSiteConfig();
  const bgUrl = config.blog?.bgUrl || "";
  return <BlogPage bgUrl={bgUrl} />;
}
