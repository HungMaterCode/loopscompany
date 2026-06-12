import {
  Layout, ShoppingBag, Globe, Search, PenTool, Headphones,
  Zap, Smartphone, Shield, Users, MessageCircle, Rocket, BarChart2,
  Heart, Clock, Award, Lightbulb,
} from "lucide-react";
import { IMG } from "./images";

export const NAV_LINKS = [
  { label: "Dịch Vụ",  href: "#dich-vu" },
  { label: "Danh Mục", href: "#danh-muc" },
  { label: "Bảng Giá", href: "#bang-gia" },
  { label: "Quy Trình",href: "#quy-trinh" },
  { label: "Đội Ngũ",  href: "/doi-ngu",  isRoute: true },
  { label: "Bài Viết", href: "/bai-viet", isRoute: true },
  { label: "Liên Hệ",  href: "#lien-he" },
];

export const MARQUEE_ITEMS = [
  "Nhà Hàng & F&B","Spa & Thẩm Mỹ","Thời Trang","Bất Động Sản",
  "Giáo Dục","Y Tế & Phòng Khám","Cửa Hàng Online","Du Lịch",
  "Sự Kiện","Làm Đẹp","Dịch Vụ Pháp Lý","Phòng Gym & Yoga",
];

export const SERVICES = [
  { icon: Layout,      img: IMG.ui1,      name: "Landing Page",           desc: "Trang đích tối ưu chuyển đổi, thu hút khách hàng tiềm năng và tăng tỷ lệ liên hệ ngay khi họ truy cập.",  tag: "Phổ biến", price: "Từ 189K/tháng" },
  { icon: ShoppingBag, img: IMG.shopping, name: "Cửa Hàng Online",        desc: "Website bán hàng đầy đủ: giỏ hàng, thanh toán, quản lý đơn hàng. Bán 24/7 không cần thuê nhân viên.",   tag: "",         price: "Từ 589K/tháng" },
  { icon: Globe,       img: IMG.ui3,      name: "Website Doanh Nghiệp",   desc: "Hình ảnh thương hiệu chuyên nghiệp, giới thiệu công ty và dịch vụ theo chuẩn B2B hiện đại.",             tag: "",         price: "Từ 889K/tháng" },
  { icon: Search,      img: IMG.seo,      name: "SEO & Top Google",       desc: "Tối ưu kỹ thuật và nội dung để xuất hiện trang đầu Google khi khách hàng tìm kiếm ngành hàng của bạn.",  tag: "Hot",      price: "Liên hệ" },
  { icon: PenTool,     img: IMG.branding, name: "Thiết Kế Thương Hiệu",   desc: "Logo, màu sắc, font chữ và bộ nhận diện nhất quán. Tạo dấu ấn riêng biệt trong tâm trí khách hàng.",    tag: "",         price: "Liên hệ" },
  { icon: Headphones,  img: IMG.support,  name: "Bảo Trì & Hỗ Trợ 24/7", desc: "Cập nhật nội dung, sửa lỗi kỹ thuật và hỗ trợ qua Zalo. Bao gồm trong mọi gói thuê, không thêm phí.",   tag: "Miễn phí", price: "Bao gồm" },
];

export const WHY_POINTS = [
  { icon: Zap,        title: "Giao website trong 5 ngày",         desc: "Quy trình tối ưu — từ tư vấn đến go-live chỉ trong một tuần làm việc, không trễ hẹn." },
  { icon: Smartphone, title: "Chuẩn mobile, nhanh gấp đôi",      desc: "70% khách hàng Việt dùng điện thoại. Website hiển thị hoàn hảo trên mọi màn hình." },
  { icon: Shield,     title: "SSL, bảo mật & sao lưu tự động",   desc: "Mã hoá HTTPS, sao lưu mỗi ngày, chống hack và malware. Bạn không cần lo về kỹ thuật." },
  { icon: Users,      title: "Hỗ trợ Zalo 24/7, phản hồi nhanh", desc: "Nhắn Zalo bất kỳ lúc nào — đội hỗ trợ phản hồi trong vòng 30 phút trong giờ làm việc." },
];

export const PORTFOLIO = [
  { src: IMG.ui1,       name: "Spa Ngọc Châu Anh",        type: "Landing Page" },
  { src: IMG.ui2,       name: "Shop Thời Trang Linh",      type: "Cửa hàng online" },
  { src: IMG.ui3,       name: "Phòng Khám Đa Khoa Việt",  type: "Doanh nghiệp" },
  { src: IMG.ui4,       name: "Nhà Hàng Phở Sài Gòn",     type: "Nhà hàng & F&B" },
  { src: IMG.ui5,       name: "Bất Động Sản Nam Long",     type: "Doanh nghiệp" },
  { src: IMG.ui6,       name: "Học Viện Tiếng Anh IELTS",  type: "Landing Page" },
  { src: IMG.analytics, name: "Dashboard Kinh Doanh",      type: "Doanh nghiệp" },
  { src: IMG.mobile,    name: "App Giao Hàng Di Động",     type: "Cửa hàng online" },
];

export const PROCESS = [
  { num:"01", icon: MessageCircle, title:"Tư vấn miễn phí",      desc:"Nhắn Zalo hoặc điền form. Chuyên viên liên hệ trong 30 phút để hiểu nhu cầu của bạn." },
  { num:"02", icon: PenTool,       title:"Thiết kế & Phê duyệt", desc:"Demo trong 48 giờ. Chỉnh sửa không giới hạn cho đến khi bạn thật sự hài lòng." },
  { num:"03", icon: Rocket,        title:"Ra mắt website",        desc:"Website go-live trong 5 ngày làm việc. Đầy đủ domain, hosting, SSL và email." },
  { num:"04", icon: Headphones,    title:"Hỗ trợ liên tục",      desc:"Báo cáo traffic hàng tháng, cập nhật nội dung và hỗ trợ kỹ thuật 24/7 qua Zalo." },
];

export const PLANS = [
  { code:"W-01", name:"GÓI THUÊ 1", tag:"Khởi đầu",      price:"189.000",    period:"tháng", setupFee:"0đ", highlight:false,
    features:["01 Landing Page đơn giản","Responsive mọi thiết bị","Tên miền phụ miễn phí","Hỗ trợ kỹ thuật cơ bản","Băng thông không giới hạn"],
    missing:["SSL bảo mật","SEO tối ưu","Email doanh nghiệp"] },
  { code:"W-02", name:"GÓI THUÊ 2", tag:"Tiêu chuẩn",    price:"589.000",    period:"tháng", setupFee:"0đ", highlight:false,
    features:["Landing Page tùy chỉnh thương hiệu","Form liên hệ + tích hợp Zalo","SSL bảo mật miễn phí","Hỗ trợ ưu tiên","Tên miền riêng .com/.vn"],
    missing:["SEO nâng cao","Email doanh nghiệp"] },
  { code:"W-03", name:"GÓI THUÊ 3", tag:"Phổ biến nhất", price:"889.000",    period:"tháng", setupFee:"0đ", highlight:true,
    features:["Landing Page đa phần + Blog","Thiết kế premium cao cấp","SEO cơ bản & Core Web Vitals","Google Analytics","Hỗ trợ 24/7","Tên miền + Email doanh nghiệp","Sao lưu dữ liệu hàng tuần"],
    missing:[] },
  { code:"W-04", name:"GÓI THUÊ 4", tag:"Doanh nghiệp",  price:"1.189.000",  period:"tháng", setupFee:"0đ", highlight:false,
    features:["Website đầy đủ tính năng","Thiết kế độc quyền theo brand","SEO nâng cao & tối ưu tốc độ","Báo cáo thống kê hàng tháng","Hỗ trợ VIP 24/7 + hotline riêng","Hosting VIP + CDN toàn cầu","Cập nhật nội dung không giới hạn","Bảo mật nâng cao"],
    missing:[] },
];

export const TESTIMONIALS = [
  { initials:"NH", name:"Nguyễn Hồng Nhung",  role:"Chủ Spa Ngọc Châu Anh, Q.Bình Thạnh",     stars:5, text:"Trước đây tôi đăng Facebook mà khách vẫn không tìm được. Từ khi có web qua Việt Web, mỗi tháng thêm 35–50 khách mới từ Google. Chi phí thuê rẻ hơn 1 buổi chạy quảng cáo!" },
  { initials:"TM", name:"Trần Minh Đức",       role:"Chủ chuỗi F&B Phở Sài Gòn, 3 chi nhánh", stars:5, text:"Team làm rất nhanh và chuyên nghiệp. Giao demo trong 2 ngày, ra web trong 5 ngày đúng cam kết. Hỗ trợ qua Zalo rất nhiệt tình, phản hồi trong vài phút." },
  { initials:"LN", name:"Lê Thị Bích Ngọc",   role:"CEO Ngọc Beauty Spa, Đà Nẵng",            stars:5, text:"Tôi không biết gì về website nhưng Việt Web hướng dẫn tận tình từng bước. Giá hợp lý, thiết kế đẹp hơn cả mong đợi. Đã giới thiệu cho 4 người bạn cùng đăng ký." },
];

export const TEAM = [
  { name:"Nguyễn Minh Hùng", role:"Giám Đốc & Nhà Sáng Lập",   photo: IMG.t1, exp:"12 năm", specialty:"Chiến lược & Phát triển kinh doanh", bio:"Hơn 12 năm kinh nghiệm lĩnh vực công nghệ và web, Hùng đã dẫn dắt hơn 500 dự án thành công cho doanh nghiệp Việt Nam.", skills:["Strategy","Business Dev","Leadership"] },
  { name:"Trần Thị Hương",    role:"Trưởng Phòng Thiết Kế",      photo: IMG.t2, exp:"8 năm",  specialty:"UI/UX Design & Branding",           bio:"Hương mang đến phong cách thiết kế tinh tế, cân bằng thẩm mỹ và tính năng. Tốt nghiệp RMIT, từng làm tại Agency quốc tế.", skills:["UI/UX","Figma","Branding"] },
  { name:"Lê Văn Đức",        role:"Trưởng Nhóm Lập Trình",      photo: IMG.t3, exp:"7 năm",  specialty:"Full-stack & Performance",          bio:"Đức chuyên xây dựng website tốc độ cao, đạt chuẩn Core Web Vitals. Yêu thích code sạch và kiến trúc có khả năng mở rộng.", skills:["React","Node.js","SEO Tech"] },
  { name:"Phạm Thị Lan",      role:"Chuyên Viên SEO",             photo: IMG.t4, exp:"5 năm",  specialty:"SEO & Content Strategy",            bio:"Lan đã đưa hơn 200 từ khóa của khách hàng lên top Google. Chuyên gia về kỹ thuật SEO và chiến lược nội dung ngành dịch vụ.", skills:["On-page SEO","Analytics","Content"] },
  { name:"Vũ Minh Khoa",      role:"Quản Lý Dự Án",               photo: IMG.t5, exp:"6 năm",  specialty:"Project Management & QA",           bio:"Khoa đảm bảo mọi dự án giao đúng hẹn và đúng chất lượng. Quy trình làm việc rõ ràng là bí quyết để giữ cam kết 5 ngày.", skills:["Scrum","QA","Communication"] },
  { name:"Đỗ Thị Mai",        role:"Chăm Sóc Khách Hàng",         photo: IMG.t6, exp:"4 năm",  specialty:"Customer Success & Support",        bio:"Mai là người đầu tiên bạn liên hệ và người cuối cùng đảm bảo bạn hài lòng. 98% tỷ lệ hài lòng là minh chứng cho sự tận tâm.", skills:["Zalo Support","CRM","Training"] },
];

export const TEAM_VALUES = [
  { icon: Heart,     title:"Tận Tâm",       desc:"Mỗi dự án đều được đối xử như thể đó là website của chính chúng tôi." },
  { icon: Lightbulb, title:"Sáng Tạo",      desc:"Thiết kế không chỉ đẹp mắt mà còn giải quyết vấn đề kinh doanh thực tế." },
  { icon: Award,     title:"Chuyên Nghiệp", desc:"Quy trình làm việc bài bản, giao tiếp minh bạch và cam kết rõ ràng." },
  { icon: Clock,     title:"Đúng Hẹn",      desc:"5 ngày là cam kết — không phải khẩu hiệu. Đã làm là làm đúng hẹn." },
];

export const HERO_SLIDES = [
  { bg: "heroBg" as const, badge:"Hơn 500 doanh nghiệp Việt tin tưởng", title:["Website đẹp —","bán được hàng","cho người Việt"],    accent:1, sub:"Thiết kế chuyên nghiệp, giao website trong 5 ngày. Không cần kiến thức kỹ thuật. Hỗ trợ 24/7 qua Zalo.", cta:"Xem gói từ 189K/tháng",    ui1:"ui1" as const, ui2:"ui3" as const },
  { bg: "hero2" as const, badge:"Giao đúng hẹn — không phát sinh thêm",  title:["Giao website","trong 5 ngày —","không trễ hẹn"],    accent:2, sub:"Từ tư vấn đến go-live chỉ 5 ngày làm việc. Demo sau 48 giờ, chỉnh sửa không giới hạn cho đến khi hài lòng.", cta:"Bắt đầu ngay hôm nay",    ui1:"ui2" as const, ui2:"ui5" as const },
  { bg: "hero3" as const, badge:"Không cần trả trước — thuê linh hoạt",  title:["Thuê website","từ 189K/tháng —","nâng cấp bất kỳ lúc nào"], accent:0, sub:"Không phí thiết lập. Không ràng buộc. Bao gồm hosting, SSL, email và hỗ trợ kỹ thuật toàn bộ.", cta:"Xem bảng giá", ui1:"ui4" as const, ui2:"ui6" as const },
];
