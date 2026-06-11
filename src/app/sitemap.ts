import type { MetadataRoute } from "next";
import { getArticleSlugs } from "@/lib/site-config-server";
import { getSiteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl("/").replace(/\/$/, "");
  const slugs = await getArticleSlugs();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "daily", priority: 1 },
    { url: `${base}/doi-ngu`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/bai-viet`, changeFrequency: "daily", priority: 0.9 },
  ];

  const posts: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${base}/bai-viet/${slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...posts];
}
