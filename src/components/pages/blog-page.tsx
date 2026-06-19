"use client";

import { Blog } from "@/features/blog/Blog";
import { type Article } from "@/features/legacy-core/articles";

export function BlogPage({ initialArticles, bgUrl }: { initialArticles: Article[]; bgUrl?: string }) {
  return <Blog initialArticles={initialArticles} bgUrl={bgUrl} />;
}
