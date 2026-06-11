export type WebsiteModuleStatus = "Đang bật" | "Nháp";

export type WebsiteModule = {
  id: string;
  name: string;
  desc: string;
  status: WebsiteModuleStatus;
  updated: string;
  route?: string;
  cmsKey: string;
};

export const SITE_INFO = {
  brand: "Loops-Company",
  hotline: "+84 378443602",
  zalo: "+84 378443602",
  email: "ducanhnhatbui@gmail.com",
  address: "Cần Thơ",
};

export const WEBSITE_MODULES: WebsiteModule[] = [
  { id: "hero", name: "Banner carousel", desc: "3 slide hero chính, CTA, hình mockup và hiệu ứng chuyển cảnh.", status: "Đang bật", updated: "Hôm nay", route: "/", cmsKey: "heroSlides" },
  { id: "services", name: "Dịch vụ", desc: "Các gói dịch vụ thiết kế website, SEO, branding và hỗ trợ.", status: "Đang bật", updated: "2 giờ trước", route: "/#dich-vu", cmsKey: "services" },
  { id: "portfolio", name: "Danh mục dự án", desc: "Dự án mẫu, phân loại ngành nghề và marquee cuộn liên tục.", status: "Đang bật", updated: "Hôm qua", route: "/#danh-muc", cmsKey: "portfolio" },
  { id: "pricing", name: "Bảng giá W-01 → W-04", desc: "Quản lý giá thuê website, tính năng và gói nổi bật.", status: "Đang bật", updated: "Hôm nay", route: "/#bang-gia", cmsKey: "pricing" },
  { id: "team", name: "Đội ngũ", desc: "Trang đội ngũ agency/editorial, CEO spotlight và culture strip.", status: "Đang bật", updated: "3 ngày trước", route: "/doi-ngu", cmsKey: "team" },
  { id: "seo", name: "SEO", desc: "Quản lý meta title, description, từ khóa, OG image và chỉ số kỹ thuật.", status: "Đang bật", updated: "Vừa thêm", route: "/admin", cmsKey: "seo" },
  { id: "blog", name: "Bài viết SEO", desc: "Khu vực nội dung mở rộng cho chiến dịch SEO tương lai.", status: "Nháp", updated: "Chưa xuất bản", route: "/blog", cmsKey: "posts" },
];

export const ADMIN_WORKFLOW = ["Nhận lead", "Tư vấn Zalo", "Chốt gói", "Thiết kế", "Go-live", "Chăm sóc"];
