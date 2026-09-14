import StudioEditor from "@/components/admin/cms/StudioEditor";
import { getSiteContentMap } from "@/lib/cms/queries";

export default async function AdminStudioContentPage() {
  const { content, updatedAt } = await getSiteContentMap();
  return <StudioEditor initial={content.studio} initialUpdatedAt={updatedAt.studio ?? null} />;
}
