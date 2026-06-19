import { notFound } from "next/navigation";
import { BlogPostPage } from "@/components/pages/blog-post-page";
import { getArticleBySlug, getArticleSlugs, getPublishedArticles } from "@/lib/site-config-server";
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

  const article = dbArticle
    ? {
        slug: dbArticle.slug,
        category: dbArticle.category,
        categoryColor: dbArticle.categoryColor,
        title: dbArticle.title,
        excerpt: dbArticle.excerpt,
        content: dbArticle.content,
        cover: dbArticle.cover,
        author: dbArticle.author,
        authorRole: dbArticle.authorRole,
        date: dbArticle.publishedAt.toLocaleDateString("vi-VN"),
        readTime: dbArticle.readTime,
        tags: dbArticle.tags,
      }
    : fallback;

  if (!article) notFound();

  const dbArticles = await getPublishedArticles();
  const allArticles = dbArticles.length > 0
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
      <BlogPostPage article={article} allArticles={allArticles} bgUrl={bgUrl} />
    </>
  );
}
