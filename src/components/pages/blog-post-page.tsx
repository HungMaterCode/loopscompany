"use client";

import { BlogPost } from "@/features/blog/BlogPost";

export function BlogPostPage({ slug }: { slug: string }) {
  return <BlogPost slug={slug} />;
}
