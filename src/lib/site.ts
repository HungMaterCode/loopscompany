export const SITE = {
  name: "LOOPS",
  brand: "LOOPS Company",
  description:
    "Thiết kế và thuê website chuyên nghiệp, chuẩn SEO. Giao trong 5 ngày, hỗ trợ 24/7 qua Zalo.",
  locale: "vi_VN",
  hotline: "+84 378443602",
  zalo: "+84 378443602",
  email: "ducanhnhatbui@gmail.com",
  address: "Cần Thơ",
} as const;

export function getSiteUrl(path = "") {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  return `${base.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

export const SITE_URLS = {
  primary: "https://www.loops.vn",
  staging: "https://loopscompany.vercel.app",
} as const;
