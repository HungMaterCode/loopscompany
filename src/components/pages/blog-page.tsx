"use client";

import { Blog } from "@/features/blog/Blog";

export function BlogPage({ bgUrl }: { bgUrl?: string }) {
  return <Blog bgUrl={bgUrl} />;
}
