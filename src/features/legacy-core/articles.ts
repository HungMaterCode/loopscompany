export type Article = {
  slug:       string;
  category:   string;
  categoryColor: string;
  title:      string;
  excerpt:    string;
  content:    string;
  cover:      string;
  author:     string;
  authorRole: string;
  date:       string;
  readTime:   number;
  tags:       string[];
};

export const CATEGORIES = [
  { id: "all",      label: "Tất cả" },
  { id: "seo",      label: "SEO & Marketing" },
  { id: "thiet-ke", label: "Thiết Kế Web" },
  { id: "kinh-doanh", label: "Kinh Doanh Online" },
  { id: "cong-nghe",  label: "Công Nghệ" },
];

export const ARTICLES: Article[] = [
  {
    slug: "7-bi-quyet-seo-dia-phuong-len-top-google",
    category: "seo",
    categoryColor: "#16a34a",
    title: "7 Bí Quyết SEO Địa Phương Giúp Doanh Nghiệp Việt Lên Top Google 2025",
    excerpt: "Khách hàng gần bạn đang tìm kiếm dịch vụ của bạn mỗi ngày — nhưng họ có tìm thấy bạn không? Hướng dẫn SEO địa phương toàn diện dành cho doanh nghiệp Việt Nam.",
    cover: "https://images.unsplash.com/photo-1599658880436-c61792e70672?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    author: "Trần Minh Khoa",
    authorRole: "SEO Specialist",
    date: "05/06/2025",
    readTime: 8,
    tags: ["SEO", "Google Business", "Local SEO", "Doanh nghiệp vừa và nhỏ"],
    content: `
## Tại sao SEO địa phương quan trọng?

Hơn **76% người dùng** tìm kiếm trên điện thoại sẽ ghé thăm cửa hàng trong vòng 24 giờ. Nếu doanh nghiệp của bạn không xuất hiện trong kết quả tìm kiếm địa phương, bạn đang mất đi hàng trăm khách hàng tiềm năng mỗi tháng.

## 7 bí quyết cốt lõi

### 1. Tối ưu Google Business Profile
Điền đầy đủ thông tin, thêm ảnh chất lượng cao, và cập nhật giờ làm việc chính xác. Đây là bước đầu tiên và quan trọng nhất.

### 2. Sử dụng từ khóa địa phương
Thay vì "thiết kế web", hãy dùng "thiết kế web TP.HCM" hay "công ty web Quận 7". Tính cụ thể giúp bạn cạnh tranh dễ hơn.

### 3. Xây dựng citations nhất quán
Tên, địa chỉ, số điện thoại (NAP) phải giống nhau trên mọi nền tảng: website, Google, Facebook, Zalo OA.

### 4. Thu thập đánh giá 5 sao
Yêu cầu khách hàng hài lòng để lại Google Review. Một chiến lược đơn giản: gửi link đánh giá qua Zalo sau khi hoàn thành dự án.

### 5. Tạo nội dung địa phương
Viết về "xu hướng thiết kế web 2025 tại Việt Nam", "doanh nghiệp Hà Nội cần biết về website"... Google ưu tiên nội dung liên quan đến khu vực.

### 6. Tối ưu tốc độ tải trang
Core Web Vitals là yếu tố xếp hạng chính thức. LCP < 2.5s, FID < 100ms, CLS < 0.1.

### 7. Schema Markup cho doanh nghiệp
Thêm LocalBusiness schema vào website để Google hiểu rõ hơn về doanh nghiệp của bạn.

## Kết luận
SEO địa phương không phải là một lần làm xong — đây là quá trình liên tục. Bắt đầu với 3 bí quyết đầu tiên trong tuần này và bạn sẽ thấy sự khác biệt trong 2-3 tháng tới.
    `,
  },
  {
    slug: "thiet-ke-responsive-mobile-first",
    category: "thiet-ke",
    categoryColor: "#2563eb",
    title: "Thiết Kế Responsive: Tại Sao 80% Khách Hàng Thoát Trang Trên Mobile?",
    excerpt: "Hơn 70% lưu lượng web tại Việt Nam đến từ điện thoại. Nếu website không tối ưu mobile, bạn đang mất hầu hết khách hàng trước khi họ đọc dù một dòng.",
    cover: "https://images.unsplash.com/photo-1593972103969-44fe3b162148?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    author: "Lê Thị Hương",
    authorRole: "UI/UX Designer",
    date: "28/05/2025",
    readTime: 6,
    tags: ["Mobile", "Responsive", "UX", "Thiết kế"],
    content: `
## Thực trạng mobile tại Việt Nam

Theo báo cáo We Are Social 2025, **73% người Việt Nam** lướt web chủ yếu bằng điện thoại. Điều đó có nghĩa là nếu website của bạn không tải nhanh và đẹp trên mobile, bạn đang tự loại bỏ 3/4 khách hàng tiềm năng.

## Nguyên nhân 80% người dùng bỏ trang

1. **Tốc độ tải chậm** — trên 4G Việt Nam, mỗi giây delay tăng bounce rate 20%
2. **Chữ quá nhỏ** — font-size dưới 14px trên mobile = người dùng phải zoom
3. **Nút bấm quá gần nhau** — ngón tay vô tình bấm sai liên kết
4. **Ảnh không được nén** — ảnh 5MB trên mobile = 8 giây chờ đợi
5. **Layout bị vỡ** — menu không responsive, bảng giá bị cắt mất

## Checklist thiết kế mobile-first

- [ ] Viewport meta tag: \`<meta name="viewport" content="width=device-width, initial-scale=1">\`
- [ ] Font-size tối thiểu 16px cho body text
- [ ] Touch target tối thiểu 44x44px
- [ ] Ảnh dùng WebP format, nén dưới 200KB
- [ ] Test trên ít nhất 3 loại thiết bị thực tế

## Kết luận

Mobile-first không còn là tùy chọn — đây là tiêu chuẩn bắt buộc. Google đã chuyển sang Mobile-First Indexing hoàn toàn từ 2023.
    `,
  },
  {
    slug: "thue-website-vs-tu-xay",
    category: "kinh-doanh",
    categoryColor: "#d97706",
    title: "Thuê Website vs Xây Website Riêng: Đâu Là Lựa Chọn Khôn Ngoan?",
    excerpt: "Chi 20 triệu xây website một lần hay trả 500K/tháng thuê dịch vụ? Phân tích chi phí thực tế và bài toán ROI dành cho doanh nghiệp Việt Nam.",
    cover: "https://images.unsplash.com/photo-1487338875411-8880f74114a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    author: "Nguyễn Văn Đức",
    authorRole: "Business Consultant",
    date: "20/05/2025",
    readTime: 7,
    tags: ["Kinh doanh", "Chi phí", "ROI", "Tư vấn"],
    content: `
## So sánh chi phí thực tế

| | Thuê Website | Xây Website Riêng |
|---|---|---|
| Chi phí ban đầu | 0đ | 15–50 triệu |
| Chi phí hàng tháng | 189K–1.2 triệu | Hosting + bảo trì |
| Thời gian ra mắt | 5–7 ngày | 4–12 tuần |
| Cập nhật tính năng | Tự động | Phải thuê dev |
| Hỗ trợ kỹ thuật | 24/7 | Tùy công ty |

## Khi nào nên THUÊ?

- Doanh nghiệp mới khởi nghiệp, ngân sách hạn chế
- Cần website nhanh trong vài ngày
- Không có team IT nội bộ
- Muốn tập trung vào kinh doanh cốt lõi

## Khi nào nên XÂY RIÊNG?

- Có yêu cầu đặc thù cao (hệ thống đặt hàng phức tạp, tích hợp ERP...)
- Doanh thu đủ lớn để justify chi phí
- Có team IT hoặc budget thuê dev dài hạn

## Kết luận

Với 90% doanh nghiệp vừa và nhỏ Việt Nam, **thuê website là lựa chọn tối ưu** về mặt tài chính và tốc độ. Số tiền tiết kiệm có thể đầu tư vào marketing để tạo doanh thu sớm hơn.
    `,
  },
  {
    slug: "toi-uu-toc-do-website-pagespeed-90",
    category: "cong-nghe",
    categoryColor: "#7c3aed",
    title: "Hướng Dẫn Tối Ưu Tốc Độ Website Đạt Điểm Google PageSpeed 90+",
    excerpt: "Website chậm = mất khách, mất thứ hạng Google. Hướng dẫn kỹ thuật từng bước để tối ưu Core Web Vitals và đạt điểm PageSpeed trên 90.",
    cover: "https://images.unsplash.com/photo-1547658719-da2b51169166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    author: "Phạm Hoàng Long",
    authorRole: "Web Developer",
    date: "14/05/2025",
    readTime: 10,
    tags: ["PageSpeed", "Performance", "Core Web Vitals", "Technical SEO"],
    content: `
## Tại sao tốc độ quan trọng?

Google xác nhận: tốc độ tải trang là yếu tố xếp hạng trực tiếp. Mỗi 1 giây chậm hơn làm tỷ lệ chuyển đổi giảm **7%**.

## Kiểm tra hiện trạng

Truy cập [PageSpeed Insights](https://pagespeed.web.dev/) và nhập URL của bạn. Điểm dưới 50 là đáng lo ngại.

## 8 bước tối ưu tốc độ

### 1. Nén và tối ưu hình ảnh
Chuyển sang định dạng WebP, nén ảnh về dưới 100KB với TinyPNG hoặc Squoosh.

### 2. Lazy Loading
Chỉ tải ảnh khi người dùng cuộn đến. Thêm \`loading="lazy"\` vào thẻ img.

### 3. Minify CSS/JS
Xóa khoảng trắng, comment không cần thiết. Dùng Terser cho JS, CSSNano cho CSS.

### 4. Sử dụng CDN
Cloudflare miễn phí cung cấp CDN giúp tải nhanh hơn từ máy chủ gần người dùng.

### 5. Kích hoạt Browser Caching
Cài đặt cache headers để trình duyệt lưu tài nguyên tĩnh.

### 6. Loại bỏ Render-Blocking Resources
Di chuyển CSS không cần thiết xuống dưới, dùng defer/async cho JS.

### 7. Preload Critical Resources
Dùng \`<link rel="preload">\` cho fonts và CSS quan trọng.

### 8. Sử dụng hosting tốt
Shared hosting rẻ tiền thường là nguyên nhân số 1 của website chậm.

## Kết quả thực tế

Sau khi áp dụng đầy đủ, điển hình website Việt Web giúp khách hàng tăng điểm từ 42 lên 94 điểm PageSpeed.
    `,
  },
  {
    slug: "xu-huong-thiet-ke-web-2025",
    category: "thiet-ke",
    categoryColor: "#2563eb",
    title: "5 Xu Hướng Thiết Kế Web 2025 Cho Doanh Nghiệp Việt Nam",
    excerpt: "Từ AI-generated content đến glassmorphism, dark mode và micro-animations — những xu hướng thiết kế nào đang định hình trải nghiệm web năm 2025?",
    cover: "https://images.unsplash.com/photo-1602576666092-bf6447a729fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    author: "Lê Thị Hương",
    authorRole: "UI/UX Designer",
    date: "08/05/2025",
    readTime: 5,
    tags: ["Xu hướng", "UI Design", "2025", "Glassmorphism"],
    content: `
## 5 xu hướng không thể bỏ qua năm 2025

### 1. Glassmorphism & Frosted Glass
Hiệu ứng kính mờ, background blur tạo chiều sâu và cảm giác hiện đại. Đặc biệt phù hợp với doanh nghiệp công nghệ và tài chính.

### 2. Dark Mode Mặc Định
60% người dùng thích dark mode. Website có hỗ trợ dark mode tăng thời gian ở trang lên 23%.

### 3. Micro-animations
Hiệu ứng nhỏ khi hover, scroll, click tạo cảm giác "sống động" và tăng tương tác.

### 4. AI-Personalization
Website tự động điều chỉnh nội dung theo hành vi người dùng. Công nghệ này đang trở nên accessible hơn với SME.

### 5. Mobile-First Video
Short-form video dọc (9:16) thay thế ảnh hero. TikTok-style storytelling cho doanh nghiệp.

## Xu hướng cần tránh

- Ảnh stock generic, không chân thực
- Pop-up quá nhiều, gây khó chịu
- Loading screen splash lâu
- Font chữ quá nhỏ trên mobile
    `,
  },
  {
    slug: "viet-noi-dung-website-chuan-seo",
    category: "seo",
    categoryColor: "#16a34a",
    title: "Cách Viết Nội Dung Website Chuẩn SEO Thu Hút Khách Hàng Tiềm Năng",
    excerpt: "Nội dung tốt không chỉ làm Google yêu thích — nó còn thuyết phục khách hàng bấm 'Liên hệ ngay'. Hướng dẫn viết content website từ A đến Z.",
    cover: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    author: "Trần Minh Khoa",
    authorRole: "SEO Specialist",
    date: "01/05/2025",
    readTime: 9,
    tags: ["Content Marketing", "Copywriting", "SEO", "Inbound Marketing"],
    content: `
## Content là vua — nhưng cần đúng cách

Google Helpful Content Update 2024 đã thay đổi cuộc chơi: chỉ nội dung thực sự hữu ích cho người đọc mới được xếp hạng cao. "Nhồi từ khóa" không chỉ vô ích mà còn bị phạt.

## Framework AIDA cho content website

**A — Attention (Thu hút)**
Tiêu đề phải chứa từ khóa chính và giải quyết pain point cụ thể. Ví dụ: "Thiết Kế Website Bán Hàng: Tăng 300% Đơn Hàng Online Trong 90 Ngày"

**I — Interest (Gây hứng thú)**
Đoạn đầu trả lời ngay: "Tại sao họ cần đọc tiếp?" Đưa ra số liệu, case study thực tế.

**D — Desire (Tạo khát khao)**
Mô tả lợi ích cụ thể, không phải tính năng. "Không phải website đẹp — mà là website tạo ra doanh thu".

**A — Action (Kêu gọi hành động)**
CTA rõ ràng, cụ thể: "Nhận tư vấn miễn phí trong 30 phút" thay vì "Liên hệ chúng tôi".

## Checklist content chuẩn SEO

- [ ] Từ khóa chính xuất hiện trong title, H1, 3 đoạn đầu
- [ ] Meta description 150-160 ký tự, hấp dẫn
- [ ] Ảnh có alt text mô tả
- [ ] Internal links đến ít nhất 2-3 trang khác
- [ ] Độ dài tối thiểu 800 từ cho blog post
- [ ] Structured data (FAQ schema, Article schema)
    `,
  },
  {
    slug: "landing-page-vs-website",
    category: "kinh-doanh",
    categoryColor: "#d97706",
    title: "Landing Page vs Website Đầy Đủ: Khi Nào Nên Dùng Cái Nào?",
    excerpt: "Doanh nghiệp mới có thực sự cần website đầy đủ 10 trang? Hay một landing page chuyển đổi cao là đủ? Phân tích thực tế từ 200+ khách hàng Việt Web.",
    cover: "https://images.unsplash.com/photo-1664123383266-af963158749d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    author: "Nguyễn Văn Đức",
    authorRole: "Business Consultant",
    date: "22/04/2025",
    readTime: 6,
    tags: ["Landing Page", "Conversion", "Digital Marketing", "Startup"],
    content: `
## Định nghĩa rõ ràng

**Landing Page:** Trang đơn, tập trung 100% vào một mục tiêu chuyển đổi (đăng ký, mua hàng, gọi điện).

**Website đầy đủ:** Nhiều trang, xây dựng thương hiệu, cung cấp thông tin toàn diện.

## Chọn Landing Page khi:

- Chạy quảng cáo Facebook/Google Ads
- Ra mắt sản phẩm/dịch vụ mới cần test thị trường nhanh
- Event, webinar, khóa học cụ thể
- Budget hạn chế, cần kết quả nhanh

**Conversion rate trung bình:** Landing page tốt đạt 5-15%, website thông thường 1-3%.

## Chọn Website đầy đủ khi:

- Xây dựng thương hiệu dài hạn
- Có nhiều dịch vụ/sản phẩm đa dạng
- Cần SEO organic traffic
- Muốn tạo uy tín với đối tác, nhà đầu tư

## Giải pháp tối ưu

**Cả hai cùng lúc:** Website đầy đủ làm nền tảng SEO + Landing page riêng cho từng chiến dịch quảng cáo.

Đây là chiến lược của 80% doanh nghiệp tăng trưởng mà Việt Web đang hỗ trợ.
    `,
  },
  {
    slug: "chi-phi-thiet-ke-website-2025",
    category: "kinh-doanh",
    categoryColor: "#d97706",
    title: "Chi Phí Thiết Kế Website 2025: Bảng Giá Chi Tiết Và Những Gì Ẩn Sau Đó",
    excerpt: "Tại sao một website có giá 2 triệu và website khác giá 50 triệu? Phân tích minh bạch các mức chi phí và những gì bạn thực sự nhận được.",
    cover: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    author: "Nguyễn Văn Đức",
    authorRole: "Business Consultant",
    date: "15/04/2025",
    readTime: 8,
    tags: ["Chi phí", "Bảng giá", "Tư vấn", "Ngân sách"],
    content: `
## Tại sao giá chênh lệch lớn?

Giá thiết kế website dao động từ 500.000đ đến hàng trăm triệu. Sự chênh lệch này không phải ngẫu nhiên.

## Phân tích 4 phân khúc giá

### Dưới 2 triệu đồng
Thường là template WordPress cài đặt nhanh, ít tùy chỉnh. Phù hợp với blog cá nhân nhưng **không phù hợp để kinh doanh** vì thiếu tối ưu SEO, bảo mật và hỗ trợ.

### 2–10 triệu đồng
WordPress/Wix tùy chỉnh cao hơn, có thiết kế theo brief. Hỗ trợ cơ bản. Phù hợp với freelancer, doanh nghiệp siêu nhỏ.

### 10–50 triệu đồng
Thiết kế custom UI/UX, tích hợp tính năng đặt hàng/booking. Phù hợp với SME.

### Trên 50 triệu đồng
Hệ thống phức tạp, tích hợp ERP/CRM, đội ngũ full-stack. Dành cho enterprise.

## Mô hình thuê tháng — xu hướng 2025

**589.000đ/tháng** thay vì 15 triệu một lần:
- Chi phí dải đều, không áp lực dòng tiền
- Luôn được cập nhật công nghệ mới nhất
- Hỗ trợ kỹ thuật 24/7 included
- ROI dương ngay từ tháng đầu nếu website tạo được 1 đơn hàng

## Kết luận

Đừng chọn website rẻ nhất — chọn website mang lại ROI tốt nhất. Một website 589K/tháng tạo ra 5 đơn hàng mỗi tháng = ROI 100%+.
    `,
  },
];
