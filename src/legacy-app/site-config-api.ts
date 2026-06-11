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
  };
  pricing: {
    bgLight: string;
    bgDark: string;
    accent: string;
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
  },
  service: { bgLight: "#f9f6ff", bgDark: "#050814", bgUrl: "" },
  portfolio: { bgLight: "#f5f5f7", bgDark: "#080b16", bgUrl: "" },
  pricing: { bgLight: "#fffaf5", bgDark: "#050400", accent: "#C8A261", bgUrl: "" },
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
