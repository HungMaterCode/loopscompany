import { prisma } from "./prisma";
import {
  DEFAULT_SITE_CONFIG,
  type SiteConfig,
} from "@/features/legacy-core/site-config-api";

export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const row = await prisma.siteSetting.findUnique({ where: { id: "default" } });
    
    // Fetch all projects from the Project table
    let dbProjects = await prisma.project.findMany({
      orderBy: { num: "asc" }
    });

    let dbConfig = row?.config ? (row.config as unknown as SiteConfig) : DEFAULT_SITE_CONFIG;

    // Auto-migration: If the Project table is empty but we have projects in the JSON config or defaults, seed them
    if (dbProjects.length === 0) {
      const projectsToMigrate = dbConfig.portfolio?.projects || DEFAULT_SITE_CONFIG.portfolio.projects || [];
      if (projectsToMigrate.length > 0) {
        await prisma.project.createMany({
          data: projectsToMigrate.map(p => ({
            num: p.num,
            title: p.title,
            category: p.cat,
            year: p.year,
            result: p.result,
            img: p.img,
            accent: p.accent,
            url: p.url || null,
          }))
        });
        dbProjects = await prisma.project.findMany({
          orderBy: { num: "asc" }
        });
      }
    }

    const portfolioProjects = dbProjects.map(p => ({
      id: p.id,
      num: p.num,
      title: p.title,
      cat: p.category,
      year: p.year,
      result: p.result,
      img: p.img,
      accent: p.accent,
      url: p.url || undefined,
    }));

    if (row?.config) {
      const dbConfig = row.config as unknown as SiteConfig;
      return {
        ...DEFAULT_SITE_CONFIG,
        ...dbConfig,
        hero: {
          ...DEFAULT_SITE_CONFIG.hero,
          ...(dbConfig.hero || {}),
        },
        oldSections: {
          ...DEFAULT_SITE_CONFIG.oldSections,
          ...(dbConfig.oldSections || {}),
        },
        creativeVision: {
          ...DEFAULT_SITE_CONFIG.creativeVision,
          ...(dbConfig.creativeVision || {}),
        },
        service: {
          ...DEFAULT_SITE_CONFIG.service,
          ...(dbConfig.service || {}),
        },
        portfolio: {
          ...DEFAULT_SITE_CONFIG.portfolio,
          ...(dbConfig.portfolio || {}),
          projects: portfolioProjects,
        },
        pricing: {
          ...DEFAULT_SITE_CONFIG.pricing,
          ...(dbConfig.pricing || {}),
        },
        whyChooseUs: {
          ...DEFAULT_SITE_CONFIG.whyChooseUs,
          ...(dbConfig.whyChooseUs || {}),
        },
        process: {
          ...DEFAULT_SITE_CONFIG.process,
          ...(dbConfig.process || {}),
        },
      };
    } else {
      return {
        ...DEFAULT_SITE_CONFIG,
        portfolio: {
          ...DEFAULT_SITE_CONFIG.portfolio,
          projects: portfolioProjects,
        }
      };
    }
  } catch (err) {
    console.error("Error in getSiteConfig:", err);
  }
  return DEFAULT_SITE_CONFIG;
}

export async function saveSiteConfigToDb(config: SiteConfig) {
  // Extract projects list
  const projects = config.portfolio?.projects || [];

  // Strip projects list from config to avoid duplicate storage in SiteSetting
  const { projects: _, ...cleanPortfolio } = config.portfolio;
  const configWithoutProjects = {
    ...config,
    portfolio: cleanPortfolio
  };

  // Perform database sync for Projects
  try {
    await prisma.$transaction(async (tx) => {
      // 1. Get all existing project IDs
      const existingDbProjects = await tx.project.findMany({
        select: { id: true }
      });
      const existingIds = existingDbProjects.map(p => p.id);

      // 2. Identify projects to upsert
      const incomingIds = projects.map(p => p.id).filter(Boolean) as string[];

      // 3. Delete projects that are no longer in the list
      const idsToDelete = existingIds.filter(id => !incomingIds.includes(id));
      if (idsToDelete.length > 0) {
        await tx.project.deleteMany({
          where: { id: { in: idsToDelete } }
        });
      }

      // 4. Upsert incoming projects
      for (const p of projects) {
        const id = p.id;
        const projectData = {
          num: p.num,
          title: p.title,
          category: p.cat,
          year: p.year,
          result: p.result,
          img: p.img,
          accent: p.accent,
          url: p.url || null,
        };

        if (id) {
          await tx.project.upsert({
            where: { id },
            update: projectData,
            create: { id, ...projectData }
          });
        } else {
          await tx.project.create({
            data: projectData
          });
        }
      }
    });
  } catch (err) {
    console.error("Failed to sync Projects to DB:", err);
  }

  // Save the cleaned site setting
  return prisma.siteSetting.upsert({
    where: { id: "default" },
    create: { id: "default", config: configWithoutProjects as object },
    update: { config: configWithoutProjects as object },
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
    const { ARTICLES } = await import("@/features/legacy-core/articles");
    return ARTICLES.map((a) => a.slug);
  }
}
