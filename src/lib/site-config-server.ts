import { prisma } from "./prisma";
import {
  DEFAULT_SITE_CONFIG,
  type SiteConfig,
} from "@/legacy-app/site-config-api";

export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const row = await prisma.siteSetting.findUnique({ where: { id: "default" } });
    if (row?.config) {
      return { ...DEFAULT_SITE_CONFIG, ...(row.config as unknown as SiteConfig) };
    }
  } catch {
    // Database unavailable during build or local dev without Neon
  }
  return DEFAULT_SITE_CONFIG;
}

export async function saveSiteConfigToDb(config: SiteConfig) {
  return prisma.siteSetting.upsert({
    where: { id: "default" },
    create: { id: "default", config: config as object },
    update: { config: config as object },
  });
}

export async function getSeoPage(pageId: string) {
  try {
    return await prisma.seoPage.findUnique({ where: { pageId } });
  } catch {
    return null;
  }
}

export async function getPublishedArticles() {
  try {
    return await prisma.article.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    });
  } catch {
    return [];
  }
}

export async function getArticleBySlug(slug: string) {
  try {
    return await prisma.article.findFirst({
      where: { slug, published: true },
    });
  } catch {
    return null;
  }
}

export async function getArticleSlugs() {
  try {
    const rows = await prisma.article.findMany({
      where: { published: true },
      select: { slug: true },
    });
    return rows.map((r) => r.slug);
  } catch {
    const { ARTICLES } = await import("@/legacy-app/articles");
    return ARTICLES.map((a) => a.slug);
  }
}
