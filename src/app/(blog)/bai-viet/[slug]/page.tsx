import { notFound } from "next/navigation";
import { BlogPostPage } from "@/components/pages/blog-post-page";
import { getArticleBySlug, getArticleSlugs } from "@/lib/site-config-server";
import { ARTICLES } from "@/features/legacy-core/articles";
import { articleJsonLd, buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const dbArticle = await getArticleBySlug(slug);
  const fallback = ARTICLES.find((a) => a.slug === slug);

  const article = dbArticle ?? fallback;
  if (!article) return {};

  return buildMetadata({
    title: `${article.title} | LOOP Blog`,
    description: article.excerpt,
    path: `/bai-viet/${slug}`,
    ogImage: article.cover,
  });
}

export default async function BlogPostRoute({ params }: Props) {
  const { slug } = await params;
  const dbArticle = await getArticleBySlug(slug);
  const fallback = ARTICLES.find((a) => a.slug === slug);

  if (!dbArticle && !fallback) notFound();

  const jsonLd = dbArticle
    ? articleJsonLd({
        title: dbArticle.title,
        excerpt: dbArticle.excerpt,
        cover: dbArticle.cover,
        author: dbArticle.author,
        publishedAt: dbArticle.publishedAt,
        slug: dbArticle.slug,
      })
    : null;

  const { getSiteConfig } = await import("@/lib/site-config-server");
  const config = await getSiteConfig();
  const bgUrl = config.blog?.bgUrl || "";

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <BlogPostPage slug={slug} bgUrl={bgUrl} />
    </>
  );
}
