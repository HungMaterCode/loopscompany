"use client";

import { BlogPost } from "@/features/blog/BlogPost";
import { type Article } from "@/features/legacy-core/articles";

export function BlogPostPage({ article, allArticles, bgUrl }: { article: Article; allArticles: Article[]; bgUrl?: string }) {
  return <BlogPost article={article} allArticles={allArticles} bgUrl={bgUrl} />;
}
