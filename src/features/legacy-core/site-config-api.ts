import { IMG } from "./images";

export interface HeroSlideConfig {
  bgUrl: string;
  badge: string;
  title1: string;
  title2: string;
  title3: string;
  accentIndex: number;
  textColor: string;
  accentColor: string;
  sub: string;
  cta: string;
}

export interface ProjectItemConfig {
  id?: string;
  num: string;
  title: string;
  cat: string;
  year: string;
  result: string;
  img: string;
  accent: string;
  url?: string;
}

export interface SiteConfig {
  hero: {
    slides: HeroSlideConfig[];
  };
  oldSections: {
    whyBg: string;
    processBg: string;
    testimonialsBg: string;
    contactBg: string;
  };
  creativeVision: {
    bgLight: string;
    bgDark: string;
    videoUrl: string;
    accent: string;
    bgUrl: string;
    titleRegular?: string;
    titleItalic?: string;
    pillars?: {
      num: string;
      title: string;
      body: string;
    }[];
  };
  service: {
    bgLight: string;
    bgDark: string;
    bgUrl: string;
  };
  portfolio: {
    bgLight: string;
    bgDark: string;
    bgUrl: string;
    titleRegular?: string;
    titleItalic?: string;
    subtitle?: string;
    projects?: ProjectItemConfig[];
  };
  pricing: {
    bgLight: string;
    bgDark: string;
    accent: string;
    bgUrl: string;
  };
  whyChooseUs: {
    bgUrl: string;
    title: string;
    description: string;
    stat1Number: string;
    stat1Label: string;
    stat2Title: string;
    stat2Sub: string;
    stat2Stars: number;
    points: {
      iconName: string;
      title: string;
      desc: string;
    }[];
  };
  process: {
    bgUrl: string;
    title: string;
    subtitle: string;
    steps: {
      num: string;
      iconName: string;
      title: string;
      desc: string;
    }[];
  };
  blog: {
    bgUrl: string;
  };
}

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  hero: {
    slides: [
      {
        bgUrl: IMG.heroBg,
        badge: "Hơn 500 doanh nghiệp Việt tin tưởng",
        title1: "Website đẹp —",
        title2: "bán được hàng",
        title3: "cho người Việt",
        accentIndex: 1,
        textColor: "#FFFFFF",
        accentColor: "#d43b1f",
        sub: "Thiết kế chuyên nghiệp, giao website trong 5 ngày. Không cần kiến thức kỹ thuật. Hỗ trợ 24/7 qua Zalo.",
        cta: "Xem gói từ 189K/tháng",
      },
      {
        bgUrl: IMG.hero2,
        badge: "Giao đúng hẹn — không phát sinh thêm",
        title1: "Giao website",
        title2: "trong 5 ngày —",
        title3: "không trễ hẹn",
        accentIndex: 2,
        textColor: "#FFFFFF",
        accentColor: "#d43b1f",
        sub: "Từ tư vấn đến go-live chỉ 5 ngày làm việc. Demo sau 48 giờ, chỉnh sửa không giới hạn cho đến khi hài lòng.",
        cta: "Bắt đầu ngay hôm nay",
      },
      {
        bgUrl: IMG.hero3,
        badge: "Không cần trả trước — thuê linh hoạt",
        title1: "Thuê website",
        title2: "từ 189K/tháng —",
        title3: "nâng cấp bất kỳ lúc nào",
        accentIndex: 0,
        textColor: "#FFFFFF",
        accentColor: "#d43b1f",
        sub: "Không phí thiết lập. Không ràng buộc. Bao gồm hosting, SSL, email và hỗ trợ kỹ thuật toàn bộ.",
        cta: "Xem bảng giá",
      },
    ],
  },
  oldSections: {
    whyBg: IMG.whyBg,
    processBg: IMG.procBg,
    testimonialsBg: IMG.testiBg,
    contactBg: IMG.contactBg,
  },
  creativeVision: {
    bgLight: "#f8f5ff",
    bgDark: "#020510",
    videoUrl:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4",
    accent: "#C8A261",
    bgUrl: "",
    titleRegular: "Sáng tạo",
    titleItalic: "Tầm nhìn",
    pillars: [
      { num: '01', title: 'Không gian sáng tạo', body: 'Mỗi đột phá đều bắt đầu tại giao điểm của chiến lược kỷ luật và tầm nhìn sáng tạo vượt trội. Chúng tôi biến tư duy táo bạo thành kết quả hữu hình.' },
      { num: '02', title: 'Định hình tương lai',  body: 'Công việc tốt nhất xuất hiện khi sự tò mò gặp sự kiên định. Quy trình của chúng tôi chuyển hóa cơ hội ẩn thành trải nghiệm còn vang vọng mãi.' },
      { num: '03', title: 'Dữ liệu & Cảm xúc',   body: 'Chúng tôi kết hợp phân tích dữ liệu chính xác với cảm xúc thương hiệu sâu sắc để tạo ra những chiến lược vừa đo được vừa cảm được.' },
    ],
  },
  service: { bgLight: "#f9f6ff", bgDark: "#050814", bgUrl: "" },
  portfolio: {
    bgLight: "#f5f5f7",
    bgDark: "#080b16",
    bgUrl: IMG.whyBg,
    titleRegular: "Bảo tàng",
    titleItalic: "Dự án",
    subtitle: "DỰ ÁN ĐÃ THỰC HIỆN",
    projects: [
      { num: '01', title: 'VinFast Toàn Cầu',     cat: 'WEB · STRATEGY',  year: '2024', result: '+340% traffic', img: 'https://images.unsplash.com/photo-1615829386703-e2bb66a7cb7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', accent: '#C8A261' },
      { num: '02', title: 'Vista Residence',       cat: 'BRAND · UX',      year: '2024', result: 'Top 1 Google',   img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', accent: '#7B61FF' },
      { num: '03', title: 'Pho Ha Noi Kitchen',    cat: 'SOCIAL · CONTENT', year: '2025', result: '2M+ impressions',img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', accent: '#00D9A3' },
      { num: '04', title: 'Nova Fashion Week',     cat: 'VIDEO · ADS',      year: '2025', result: '8M views',       img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', accent: '#FF6B6B' },
      { num: '05', title: 'TechViet Startup Hub',  cat: 'WEB APP · DESIGN', year: '2025', result: '500+ users/ngày',img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', accent: '#FFB347' },
      { num: '06', title: 'GreenLeaf Organic',     cat: 'BRAND · PACKAGE',  year: '2026', result: '120% ROI',       img: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', accent: '#00FF88' },
      { num: '07', title: 'SunHouse Real Estate',  cat: 'WEB · MARKETING',  year: '2026', result: '3× leads',       img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', accent: '#00CFFF' },
      { num: '08', title: 'FoodieApp Vietnam',     cat: 'APP · CONTENT',    year: '2026', result: '50K downloads',  img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', accent: '#C8A261' },
    ]
  },
  pricing: { bgLight: "#fffaf5", bgDark: "#050400", accent: "#C8A261", bgUrl: "" },
  whyChooseUs: {
    bgUrl: "",
    title: "Chúng tôi hiểu doanh nghiệp Việt",
    description: "Hơn 8 năm phục vụ các doanh nghiệp vừa và nhỏ tại Việt Nam, chúng tôi hiểu bạn cần gì: một website đẹp, ra đơn hàng, dễ quản lý và giá phải chăng.",
    stat1Number: "+40%",
    stat1Label: "Tăng khách tháng đầu",
    stat2Title: "98% hài lòng",
    stat2Sub: "500+ khách hàng",
    stat2Stars: 5,
    points: [
      { iconName: "Zap", title: "Giao website trong 5 ngày", desc: "Quy trình tối ưu — từ tư vấn đến go-live chỉ trong một tuần làm việc, không trễ hẹn." },
      { iconName: "Smartphone", title: "Chuẩn mobile, nhanh gấp đôi", desc: "70% khách hàng Việt dùng điện thoại. Website hiển thị hoàn hảo trên mọi màn hình." },
      { iconName: "Shield", title: "SSL, bảo mật & sao lưu tự động", desc: "Mã hoá HTTPS, sao lưu mỗi ngày, chống hack và malware. Bạn không cần lo về kỹ thuật." },
      { iconName: "Users", title: "Hỗ trợ Zalo 24/7, phản hồi nhanh", desc: "Nhắn Zalo bất kỳ lúc nào — đội hỗ trợ phản hồi trong vòng 30 phút trong giờ làm việc." },
    ],
  },
  process: {
    bgUrl: "",
    title: "Chỉ 4 bước — website\nsẵn sàng hoạt động",
    subtitle: "Quy trình làm việc",
    steps: [
      { num: "01", iconName: "MessageCircle", title: "Tư vấn miễn phí", desc: "Nhắn Zalo hoặc điền form. Chuyên viên liên hệ trong 30 phút để hiểu nhu cầu của bạn." },
      { num: "02", iconName: "PenTool", title: "Thiết kế & Phê duyệt", desc: "Demo trong 48 giờ. Chỉnh sửa không giới hạn cho đến khi bạn thật sự hài lòng." },
      { num: "03", iconName: "Rocket", title: "Ra mắt website", desc: "Website go-live trong 5 ngày làm việc. Đầy đủ domain, hosting, SSL và email." },
      { num: "04", iconName: "Headphones", title: "Hỗ trợ liên tục", desc: "Báo cáo traffic hàng tháng, cập nhật nội dung và hỗ trợ kỹ thuật 24/7 qua Zalo." },
    ],
  },
  blog: {
    bgUrl: "",
  },
};

export async function fetchSiteConfig(): Promise<SiteConfig> {
  if (typeof window === "undefined") {
    const { getSiteConfig } = await import("@/lib/site-config-server");
    return getSiteConfig();
  }

  try {
    const res = await fetch("/api/site-config");
    if (res.ok) return res.json();
  } catch {
    // fall through
  }

  return DEFAULT_SITE_CONFIG;
}

export async function saveSiteConfig(config: SiteConfig): Promise<void> {
  if (typeof window === "undefined") {
    const { saveSiteConfigToDb } = await import("@/lib/site-config-server");
    await saveSiteConfigToDb(config);
    return;
  }

  await fetch("/api/site-config", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(config),
  });
}
