import TeamMemberDetailPage from "@/features/pages/TeamMemberDetailPage";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return buildMetadata({
    title: `Chi tiết thành viên | LOOP`,
    description: "Hồ sơ chi tiết thành viên của LOOPS.",
  });
}

export default async function TeamMemberRoute({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <TeamMemberDetailPage id={resolvedParams.id} />;
}
