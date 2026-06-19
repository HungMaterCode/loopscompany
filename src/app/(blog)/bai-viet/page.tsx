import { BlogPage } from "@/components/pages/blog-page";
import { buildMetadata } from "@/lib/seo";
import { fetchSiteConfig } from "@/features/legacy-core/site-config-api";
import { getPublishedArticles } from "@/lib/site-config-server";
import { ARTICLES } from "@/features/legacy-core/articles";

export const revalidate = 1800;

export const metadata = buildMetadata({
  title: "Blog SEO & Thiết Kế Web | LOOP",
  description:
    "Kiến thức SEO, thiết kế website và kinh doanh online từ đội ngũ LOOP.",
  path: "/bai-viet",
});

export default async function BlogRoute() {
  const config = await fetchSiteConfig();
  const bgUrl = config.blog?.bgUrl || "";
  
  const dbArticles = await getPublishedArticles();
  const articles = dbArticles.length > 0
    ? dbArticles.map((a) => ({
        slug: a.slug,
        category: a.category,
        categoryColor: a.categoryColor,
        title: a.title,
        excerpt: a.excerpt,
        content: a.content,
        cover: a.cover,
        author: a.author,
        authorRole: a.authorRole,
        date: a.publishedAt.toLocaleDateString("vi-VN"),
        readTime: a.readTime,
        tags: a.tags,
      }))
    : ARTICLES;

  return <BlogPage initialArticles={articles} bgUrl={bgUrl} />;
}
