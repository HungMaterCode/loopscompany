"use client";

import { BlogPost } from "@/features/blog/BlogPost";

export function BlogPostPage({ slug, bgUrl }: { slug: string; bgUrl?: string }) {
  return <BlogPost slug={slug} bgUrl={bgUrl} />;
}
