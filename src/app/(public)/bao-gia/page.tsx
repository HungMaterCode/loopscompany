import BaogiaWeb from "@/features/baogia/BaogiaWeb";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Báo Giá Thiết Kế & Thuê Website Chuyên Nghiệp | LOOP",
  description: "Xem báo giá chi tiết dịch vụ thiết kế website và thuê website trọn gói tại LOOP.",
  path: "/bao-gia",
});

export default function BaoGiaPage() {
  return (
    <main>
      <BaogiaWeb />
    </main>
  );
}
