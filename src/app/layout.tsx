import type { Metadata } from "next";
import "../styles/index.css";

export const metadata: Metadata = {
  title: {
    default: "LOOP — Thiết kế & Thuê Website chuẩn SEO",
    template: "%s | LOOP",
  },
  description:
    "Thiết kế và thuê website chuyên nghiệp, chuẩn SEO. Giao trong 5 ngày, hỗ trợ 24/7 qua Zalo.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://loops.vn",
  ),
  openGraph: {
    locale: "vi_VN",
    siteName: "LOOP",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
