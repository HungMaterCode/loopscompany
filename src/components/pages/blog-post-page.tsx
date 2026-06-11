"use client";

import { BlogPost } from "@/legacy-pages/BlogPost";

export function BlogPostPage({ slug }: { slug: string }) {
  return <BlogPost slug={slug} />;
}
