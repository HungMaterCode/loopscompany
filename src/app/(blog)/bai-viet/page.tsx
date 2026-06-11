import { BlogPage } from "@/components/pages/blog-page";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 1800;

export const metadata = buildMetadata({
  title: "Blog SEO & Thiết Kế Web | LOOP",
  description:
    "Kiến thức SEO, thiết kế website và kinh doanh online từ đội ngũ LOOP.",
  path: "/bai-viet",
});

export default function BlogRoute() {
  return <BlogPage />;
}
