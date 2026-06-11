SECTION_CHANGE - BỘ CODE SECTION TÁI SỬ DỤNG
============================================

Thư mục này chứa bản copy riêng của các phần bạn yêu cầu để có thể mang qua website khác:

1. Header
   File: components/layout/Header.tsx
   Export: Header

2. Trang đội ngũ
   File: pages/TeamPage.tsx
   Export: TeamPage từ index.ts

3. Section "Sáng tạo x Tầm nhìn"
   File: components/sections/CreativeVisionSection.tsx
   Export: CreativeVisionSection

4. Section "Hệ sinh thái dịch vụ"
   File: components/sections/ServiceEcosystemSection.tsx
   Export: ServiceEcosystemSection

5. Section "Bảo tàng Dự án"
   File: components/sections/ProjectMuseumSection.tsx
   Export: ProjectMuseumSection

6. Section "Gói thuê website"
   File: components/sections/WebsiteRentalPricingSection.tsx
   Export: WebsiteRentalPricingSection


CÁC FILE PHỤ THUỘC ĐÃ COPY KÈM
------------------------------

components/shared/GlassCard.tsx
components/shared/SectionHeader.tsx
components/ui/useBreakpoint.ts
hooks/useTilt3D.ts
styles/fonts.css
styles/theme.css
styles/effects.css

Các file này giúp section chạy độc lập hơn khi đem qua dự án khác.


CÁCH DÙNG NHANH
---------------

Copy cả thư mục Section_change vào project mới, sau đó import component cần dùng.

Ví dụ:

import {
  Header,
  CreativeVisionSection,
  ServiceEcosystemSection,
  ProjectMuseumSection,
  WebsiteRentalPricingSection,
} from './Section_change';

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <Header />
      <CreativeVisionSection />
      <ServiceEcosystemSection />
      <ProjectMuseumSection />
      <WebsiteRentalPricingSection />
    </div>
  );
}


DÙNG TRANG ĐỘI NGŨ
------------------

import { TeamPage } from './Section_change';

export default function AboutTeam() {
  return <TeamPage />;
}


IMPORT CSS CẦN THIẾT
--------------------

Trong app chính của project mới, nên import thêm:

import './Section_change/styles/fonts.css';
import './Section_change/styles/theme.css';
import './Section_change/styles/effects.css';

Nếu project mới đã có Tailwind theme riêng thì có thể không cần copy theme.css,
nhưng nên giữ fonts.css và effects.css để visual gần giống bản gốc.


THƯ VIỆN CẦN CÓ TRONG PROJECT MỚI
---------------------------------

Các component này đang dùng:

- react
- lucide-react
- motion
- tailwindcss

Nếu project mới chưa có, cài thêm:

pnpm add lucide-react motion

hoặc:

npm install lucide-react motion


LƯU Ý KHI GẮN QUA WEBSITE KHÁC
------------------------------

1. Nếu project mới không dùng Tailwind, giao diện sẽ không lên đúng style.
2. Nếu đường dẫn import khác, chỉ cần sửa lại path trong các file component.
3. Header đang dùng link dạng /#services, /#portfolio, /#pricing và /doi-ngu.
   Nếu route website mới khác, sửa trong components/layout/Header.tsx.
4. Section có animation scroll dùng motion/react, nên cần package motion.
5. Một số hiệu ứng dark luxury phụ thuộc class Tailwind và style global trong effects.css.


FILE DEMO
---------

Có sẵn file:

ExampleLandingPage.tsx

File này cho thấy cách ráp nhanh Header + 4 section chính thành một landing page.
