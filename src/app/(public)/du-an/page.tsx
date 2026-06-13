import { PortfolioPage } from "@/components/pages/portfolio-page";
import { fetchSiteConfig } from "@/features/legacy-core/site-config-api";

export const metadata = {
  title: "Dự Án Đã Thực Hiện | LOOP",
  description: "Khám phá các dự án thiết kế website, branding và ứng dụng nổi bật của LOOP.",
};

export default async function Page() {
  const config = await fetchSiteConfig();
  
  // Provide the portfolio projects to the client component
  const projects = config.portfolio.projects || [];
  const bgUrl = config.portfolio.bgUrl || "";
  
  return <PortfolioPage projects={projects} bgUrl={bgUrl} />;
}
