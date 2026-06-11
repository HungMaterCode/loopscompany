import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { DEFAULT_SITE_CONFIG } from "../src/legacy-app/site-config-api";
import { ARTICLES } from "../src/legacy-app/articles";

const prisma = new PrismaClient();

function parseDate(v: string) {
  const [d, m, y] = v.split("/");
  return new Date(Number(y), Number(m) - 1, Number(d));
}

async function main() {
  const password = await bcrypt.hash("admin123", 12);

  await prisma.user.upsert({
    where: { email: "admin@loops.vn" },
    update: {},
    create: {
      email: "admin@loops.vn",
      password,
      name: "Quản trị viên LOOP",
      role: "admin",
    },
  });

  await prisma.siteSetting.upsert({
    where: { id: "default" },
    update: { config: DEFAULT_SITE_CONFIG as object },
    create: { id: "default", config: DEFAULT_SITE_CONFIG as object },
  });

  const seoPages = [
    {
      pageId: "home",
      label: "Trang chủ",
      title: "Thiết Kế & Thuê Website Chuyên Nghiệp | LOOP",
      description:
        "Thuê website đẹp, chuẩn SEO, giao trong 5 ngày từ 189K/tháng. Hỗ trợ 24/7 qua Zalo. LOOP — đơn vị thiết kế website uy tín tại Cần Thơ.",
      keywords:
        "thiết kế website, thuê website, landing page, website doanh nghiệp, LOOP",
      ogTitle: "Thiết Kế & Thuê Website Chuyên Nghiệp — LOOP",
      ogDescription:
        "Giao website trong 5 ngày, từ 189K/tháng. Hỗ trợ Zalo 24/7.",
      canonical: "https://loops.vn/",
    },
    {
      pageId: "team",
      label: "Đội ngũ",
      title: "Đội Ngũ Chuyên Gia Thiết Kế Web | LOOP",
      description:
        "Gặp gỡ đội ngũ chuyên gia thiết kế website, SEO và customer success tại LOOP.",
      keywords: "đội ngũ LOOP, chuyên gia thiết kế web, developer Cần Thơ",
      ogTitle: "Đội Ngũ LOOP — Chuyên Gia Thiết Kế Website",
      ogDescription: "Chuyên gia thiết kế website và SEO tại Cần Thơ.",
      canonical: "https://loops.vn/doi-ngu",
    },
    {
      pageId: "blog",
      label: "Blog",
      title: "Blog SEO & Thiết Kế Web | LOOP",
      description:
        "Kiến thức SEO, thiết kế website và kinh doanh online từ đội ngũ LOOP.",
      keywords: "blog SEO, thiết kế web, marketing online",
      ogTitle: "Blog LOOP",
      ogDescription: "Bài viết SEO và thiết kế website.",
      canonical: "https://loops.vn/bai-viet",
    },
  ];

  for (const page of seoPages) {
    await prisma.seoPage.upsert({
      where: { pageId: page.pageId },
      update: page,
      create: page,
    });
  }

  for (const article of ARTICLES) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {
        category: article.category,
        categoryColor: article.categoryColor,
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        cover: article.cover,
        author: article.author,
        authorRole: article.authorRole,
        publishedAt: parseDate(article.date),
        readTime: article.readTime,
        tags: article.tags,
        published: true,
      },
      create: {
        slug: article.slug,
        category: article.category,
        categoryColor: article.categoryColor,
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        cover: article.cover,
        author: article.author,
        authorRole: article.authorRole,
        publishedAt: parseDate(article.date),
        readTime: article.readTime,
        tags: article.tags,
        published: true,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
