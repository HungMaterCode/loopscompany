import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { DEFAULT_SITE_CONFIG } from "../src/features/legacy-core/site-config-api";
import { ARTICLES } from "../src/features/legacy-core/articles";

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

  const domains = [
    { id: "dm_01", label: ".com", price: 350000, order: 1, active: true },
    { id: "dm_02", label: ".vn", price: 438000, order: 2, active: true },
    { id: "dm_03", label: ".com.vn", price: 563000, order: 3, active: true },
    { id: "dm_04", label: ".net", price: 400000, order: 4, active: true },
    { id: "dm_05", label: ".org", price: 438000, order: 5, active: true },
    { id: "dm_06", label: ".info", price: 313000, order: 6, active: true },
    { id: "dm_07", label: ".biz", price: 350000, order: 7, active: true },
    { id: "dm_08", label: ".io", price: 875000, order: 8, active: true },
  ];

  for (const domain of domains) {
    await (prisma as any).domain.upsert({
      where: { id: domain.id },
      update: domain,
      create: domain,
    });
  }

  const hostings = [
    { id: "ht_01", label: "Khởi đầu", price: 540000, order: 1, active: true },
    { id: "ht_02", label: "Tiêu chuẩn", price: 918000, order: 2, active: true },
    { id: "ht_03", label: "Nâng cao", price: 1836000, order: 3, active: true },
    { id: "ht_04", label: "Doanh nghiệp", price: 3366000, order: 4, active: true },
  ];

  for (const hosting of hostings) {
    await (prisma as any).hosting.upsert({
      where: { id: hosting.id },
      update: hosting,
      create: hosting,
    });
  }

  const seoPackages = [
    { id: "seo_01", label: "Miễn phí", description: "5 bài /tháng", price: 0, order: 1, active: true },
    { id: "seo_02", label: "Cơ bản", description: "10 bài /tháng", price: 2000000, order: 2, active: true },
    { id: "seo_03", label: "Doanh nghiệp", description: "15 bài /tháng", price: 6000000, order: 3, active: true },
    { id: "seo_04", label: "Phổ biến", description: "20 bài /tháng", price: 36000000, order: 4, active: true },
  ];

  for (const seoPack of seoPackages) {
    await (prisma as any).seoPackage.upsert({
      where: { id: seoPack.id },
      update: seoPack,
      create: seoPack,
    });
  }

  const defaultWebPages = [
    // Mua gói website (isRental: false)
    {
      code: "W-01",
      name: "Landing Page",
      tag: "Khởi đầu",
      subtitle: "Trang đích chuyển đổi cao",
      price: 3890000,
      cover: "https://images.unsplash.com/photo-1634084462412-b54873c0a56d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
      icon: "Zap",
      highlight: false,
      features: ["1 trang đích tối ưu CRO", "Form liên hệ + Zalo OA tích hợp", "Responsive hoàn hảo mọi thiết bị", "SEO cơ bản On-page", "Tên miền phụ miễn phí", "Băng thông không giới hạn"],
      missing: ["SSL bảo mật cao cấp", "Email doanh nghiệp", "Blog & nội dung"],
      order: 1,
      active: true,
      isRental: false,
    },
    {
      code: "W-02",
      name: "Bán Hàng Online",
      tag: "Tiêu chuẩn",
      subtitle: "Cửa hàng online đầy đủ tính năng",
      price: 6890000,
      cover: "https://images.unsplash.com/photo-1631125915902-d8abe9225ff2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
      icon: "ShoppingBag",
      highlight: false,
      features: ["Danh mục sản phẩm & giỏ hàng", "Quản lý đơn hàng tự động", "Thanh toán online đa cổng", "SSL bảo mật miễn phí", "Tên miền riêng .com/.vn", "Hỗ trợ ưu tiên"],
      missing: ["SEO nâng cao", "Email doanh nghiệp"],
      order: 2,
      active: true,
      isRental: false,
    },
    {
      code: "W-03",
      name: "Doanh Nghiệp",
      tag: "Phổ biến nhất",
      subtitle: "Website tổ chức chuyên nghiệp",
      price: 9890000,
      cover: "https://images.unsplash.com/photo-1766330977451-de1b64b5e641?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
      icon: "Building2",
      highlight: true,
      features: ["Đa trang + Blog tích hợp", "Thiết kế premium cao cấp", "SEO nâng cao & Core Web Vitals", "Google Analytics & Heatmap", "Tên miền + Email doanh nghiệp", "Hỗ trợ VIP 24/7", "Sao lưu dữ liệu hàng tuần"],
      missing: [],
      order: 3,
      active: true,
      isRental: false,
    },
    {
      code: "W-04",
      name: "Theo Yêu Cầu",
      tag: "Enterprise",
      subtitle: "Giải pháp tùy chỉnh độc quyền",
      price: 12890000,
      cover: "https://images.unsplash.com/photo-1709486511766-76bdd8b51713?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
      icon: "Wand2",
      highlight: false,
      features: ["Thiết kế UI/UX độc quyền 100%", "Tích hợp hệ thống CRM/ERP", "Bảo mật nâng cao enterprise", "Báo cáo thống kê hàng tháng", "Hosting VIP + CDN toàn cầu", "Hotline hỗ trợ riêng 24/7", "Cập nhật nội dung không giới hạn"],
      missing: [],
      order: 4,
      active: true,
      isRental: false,
    },
    // Thuê website (isRental: true)
    {
      code: "R-01",
      name: "Landing Page",
      tag: "Khởi đầu",
      subtitle: "Trang đích chuyển đổi cao",
      price: 189000,
      cover: "https://images.unsplash.com/photo-1634084462412-b54873c0a56d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
      icon: "Zap",
      highlight: false,
      features: [
        "Landing Page đơn giản chuẩn CRO",
        "Responsive mọi thiết bị",
        "Tên miền phụ miễn phí",
        "Hỗ trợ kỹ thuật cơ bản",
        "Băng thông không giới hạn"
      ],
      missing: ["SSL bảo mật", "SEO tối ưu", "Email doanh nghiệp"],
      isRental: true,
      order: 1,
      active: true
    },
    {
      code: "R-02",
      name: "Bán Hàng Online",
      tag: "Tiêu chuẩn",
      subtitle: "Cửa hàng online đầy đủ tính năng",
      price: 589000,
      cover: "https://images.unsplash.com/photo-1631125915902-d8abe9225ff2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
      icon: "ShoppingBag",
      highlight: false,
      features: [
        "Landing Page tùy chỉnh thương hiệu",
        "Form liên hệ + Zalo OA",
        "SSL bảo mật miễn phí",
        "Hỗ trợ ưu tiên",
        "Tên miền riêng .com/.vn"
      ],
      missing: ["SEO nâng cao", "Email doanh nghiệp"],
      isRental: true,
      order: 2,
      active: true
    },
    {
      code: "R-03",
      name: "Doanh Nghiệp",
      tag: "Phổ biến nhất",
      subtitle: "Website tổ chức chuyên nghiệp",
      price: 889000,
      cover: "https://images.unsplash.com/photo-1766330977451-de1b64b5e641?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
      icon: "Building2",
      highlight: true,
      features: [
        "Landing Page đa phần + Blog",
        "Thiết kế premium cao cấp",
        "SEO cơ bản & Core Web Vitals",
        "Google Analytics tích hợp",
        "Hỗ trợ 24/7",
        "Tên miền + Email doanh nghiệp",
        "Sao lưu dữ liệu hàng tuần"
      ],
      missing: [],
      isRental: true,
      order: 3,
      active: true
    },
    {
      code: "R-04",
      name: "Theo Yêu Cầu",
      tag: "Enterprise",
      subtitle: "Giải pháp tùy chỉnh hoàn toàn",
      price: 1189000,
      cover: "https://images.unsplash.com/photo-1709486511766-76bdd8b51713?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
      icon: "Wand2",
      highlight: false,
      features: [
        "Website đầy đủ tính năng",
        "Thiết kế độc quyền theo brand",
        "SEO nâng cao & tối ưu tốc độ",
        "Báo cáo thống kê hàng tháng",
        "Hỗ trợ VIP 24/7 + hotline riêng",
        "Hosting VIP + CDN toàn cầu",
        "Cập nhật nội dung không giới hạn",
        "Bảo mật nâng cao"
      ],
      missing: [],
      isRental: true,
      order: 4,
      active: true
    }
  ];

  for (const page of defaultWebPages) {
    await (prisma.webPage as any).upsert({
      where: { code: page.code },
      update: page,
      create: page,
    });
  }

  const teamMembers = [
    {
      id: "team_01",
      name: "Nguyễn An",
      role: "Giám đốc Sáng tạo",
      roleEn: "Creative Director",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
      years: 10,
      projects: 120,
      bio: "Kiến trúc sư của những trải nghiệm thị giác — nơi thẩm mỹ gặp gỡ hiệu năng. Với 10+ năm trong ngành thiết kế, An đã dẫn dắt hơn 200 dự án thương hiệu tại 15 quốc gia.",
      skills: ["Brand Identity", "UI/UX Design", "Creative Strategy", "Art Direction"],
      gradient: "linear-gradient(145deg, #C8A261 0%, #E8D4A8 40%, #B89240 100%)",
      email: "an@loops.vn",
      zalo: "https://zalo.me/0901234567",
      facebook: "https://facebook.com/nguyenan",
      phone: "0901234567",
      order: 1,
      active: true,
    },
    {
      id: "team_02",
      name: "Trần Đức",
      role: "Kiến trúc sư Trải nghiệm",
      roleEn: "Experience Architect",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
      years: 7,
      projects: 85,
      bio: "Người dệt những hành trình kỹ thuật số từng điểm chạm, từng khoảnh khắc. Đức chuyên về UX research và interaction design, giúp người dùng cảm nhận sự khác biệt.",
      skills: ["UX Research", "Interaction Design", "Prototyping", "Motion Design"],
      gradient: "linear-gradient(145deg, #2A2520 0%, #1A1A1A 50%, #3A3530 100%)",
      email: "duc@loops.vn",
      zalo: "https://zalo.me/0901234567",
      facebook: "https://facebook.com/tranduc",
      phone: "0901234567",
      order: 2,
      active: true,
    },
    {
      id: "team_03",
      name: "Lê Minh",
      role: "Giám đốc Công nghệ",
      roleEn: "Chief Technology Officer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
      years: 8,
      projects: 95,
      bio: "Kỹ sư của những hệ thống vô hình — mạnh mẽ, thanh lịch và không thể thay thế. Minh xây dựng kiến trúc kỹ thuật đằng sau mỗi sản phẩm số của LOOPS.",
      skills: ["Full-Stack Dev", "System Architecture", "AI Integration", "DevOps"],
      gradient: "linear-gradient(145deg, #8C8276 0%, #B0A898 50%, #7A7068 100%)",
      email: "minh@loops.vn",
      zalo: "https://zalo.me/0901234567",
      facebook: "https://facebook.com/leminh",
      phone: "0901234567",
      order: 3,
      active: true,
    },
    {
      id: "team_04",
      name: "Phạm Linh",
      role: "Giám đốc Marketing",
      roleEn: "Head of Marketing",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
      years: 6,
      projects: 110,
      bio: "Chiến lược gia marketing với tư duy dữ liệu và trái tim nghệ sĩ. Linh đã tạo ra các chiến dịch viral thu hút hàng triệu người dùng trên khắp Đông Nam Á.",
      skills: ["Digital Marketing", "Content Strategy", "Performance Ads", "Analytics"],
      gradient: "linear-gradient(145deg, #4A3560 0%, #6B5080 50%, #3A2550 100%)",
      email: "linh@loops.vn",
      zalo: "https://zalo.me/0901234567",
      facebook: "https://facebook.com/phamlinh",
      phone: "0901234567",
      order: 4,
      active: true,
    },
    {
      id: "team_05",
      name: "Hoàng Nam",
      role: "Đạo diễn Sáng tạo",
      roleEn: "Creative Producer",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
      years: 5,
      projects: 75,
      bio: "Nhà sản xuất phim thương mại và content creator với con mắt điện ảnh sắc bén. Nam tạo ra những câu chuyện thương hiệu chạm đến trái tim người xem.",
      skills: ["Video Production", "Storytelling", "Photography", "Post-Production"],
      gradient: "linear-gradient(145deg, #1E3A3A 0%, #2A5050 50%, #163030 100%)",
      email: "nam@loops.vn",
      zalo: "https://zalo.me/0901234567",
      facebook: "https://facebook.com/hoangnam",
      phone: "0901234567",
      order: 5,
      active: true,
    },
    {
      id: "team_06",
      name: "Vũ Mai",
      role: "Trưởng nhóm Content",
      roleEn: "Content Lead",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
      years: 6,
      projects: 200,
      bio: "Người kể chuyện với ngôn từ và hình ảnh. Mai xây dựng chiến lược nội dung giúp thương hiệu tạo ra giá trị thực sự và kết nối sâu sắc với cộng đồng.",
      skills: ["Copywriting", "SEO Content", "Editorial", "Brand Voice"],
      gradient: "linear-gradient(145deg, #3A2020 0%, #5A3030 50%, #2A1818 100%)",
      email: "mai@loops.vn",
      zalo: "https://zalo.me/0901234567",
      facebook: "https://facebook.com/vumai",
      phone: "0901234567",
      order: 6,
      active: true,
    }
  ];

  for (const member of teamMembers) {
    await (prisma.teamMember as any).upsert({
      where: { id: member.id },
      update: member,
      create: member,
    });
  }

  const defaultServices = [
    {
      id: "service_01",
      label: "Tạo Website",
      sub: "Landing page, web app, thương mại điện tử chuyên nghiệp.",
      img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      tags: ["Landing Page", "Web App", "E-commerce"],
      size: "large",
      glassBg: "rgba(15, 32, 67, 0.45)",
      link: "/bao-gia",
      order: 1,
      active: true,
    },
    {
      id: "service_02",
      label: "Marketing",
      sub: "Chiến lược digital, Google Ads, Meta Ads, tăng trưởng thực.",
      img: "https://images.unsplash.com/photo-1683721003111-070bcc053d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      tags: ["Google Ads", "Meta Ads", "SEO"],
      size: "small",
      glassBg: "linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(236, 72, 153, 0.3) 100%)",
      link: "/coming-soon",
      order: 2,
      active: true,
    },
    {
      id: "service_03",
      label: "Content",
      sub: "Copywriting, bài viết blog, kịch bản thương hiệu chất lượng cao.",
      img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      tags: ["Copywriting", "Blog", "Script"],
      size: "small",
      glassBg: "rgba(184, 134, 11, 0.3)",
      link: "/coming-soon",
      order: 3,
      active: true,
    },
    {
      id: "service_04",
      label: "Media & Video",
      sub: "Ảnh thương mại, video quảng cáo, reels viral chất lượng điện ảnh.",
      img: "https://images.unsplash.com/photo-1497015289639-54688650d173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      tags: ["Video Ads", "Reels", "Photography"],
      size: "large",
      glassBg: "rgba(139, 69, 19, 0.3)",
      link: "/coming-soon",
      order: 4,
      active: true,
    },
    {
      id: "service_05",
      label: "Thương hiệu",
      sub: "Logo, bộ nhận diện thương hiệu đồng bộ, design system.",
      img: "https://images.unsplash.com/photo-1779261320306-8885b83599ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      tags: ["Logo", "Brand Kit", "Design System"],
      size: "small",
      glassBg: "rgba(13, 148, 136, 0.3)",
      link: "/coming-soon",
      order: 5,
      active: true,
    },
    {
      id: "service_06",
      label: "Analytics",
      sub: "Đo lường hiệu quả, báo cáo ROI, tối ưu chiến dịch liên tục.",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      tags: ["Dashboard", "ROI Report", "A/B Test"],
      size: "small",
      glassBg: "rgba(4, 120, 87, 0.3)",
      link: "/coming-soon",
      order: 6,
      active: true,
    },
    {
      id: "service_07",
      label: "Vận hành & Bảo trì",
      sub: "Bảo mật, tối ưu tốc độ, nâng cấp hệ thống trơn tru 24/7.",
      img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      tags: ["Hosting", "Security", "Speed"],
      size: "small",
      glassBg: "rgba(200, 162, 97, 0.25)",
      link: "/coming-soon",
      order: 7,
      active: true,
    },
  ];

  for (const svc of defaultServices) {
    await (prisma as any).service.upsert({
      where: { id: svc.id },
      update: svc,
      create: svc,
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
