import { notFound } from "next/navigation";
import { fetchSiteConfig } from "@/features/legacy-core/site-config-api";
import { generateSlug } from "@/lib/slug";
import { ProjectDetailPage } from "@/components/pages/project-detail-page";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const config = await fetchSiteConfig();
  const projects = config.portfolio.projects || [];
  
  const project = projects.find(p => (p.slug || generateSlug(p.title)) === resolvedParams.slug);
  
  if (!project) return { title: "Dự án không tồn tại" };

  return {
    title: `${project.title} | Dự án LOOP`,
    description: `Chi tiết dự án ${project.title} - ${project.cat} (${project.year})`,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const config = await fetchSiteConfig();
  const projects = config.portfolio.projects || [];
  
  const project = projects.find(p => (p.slug || generateSlug(p.title)) === resolvedParams.slug);
  
  if (!project) {
    notFound();
  }
  const bgUrl = config.portfolio.bgUrl || "";
  
  return <ProjectDetailPage project={project} bgUrl={bgUrl} />;
}
