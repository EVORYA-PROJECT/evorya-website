import ProcessEditor from "@/components/admin/cms/ProcessEditor";
import { getSiteContentMap } from "@/lib/cms/queries";

export default async function AdminProcessContentPage() {
  const { content, updatedAt } = await getSiteContentMap();
  return <ProcessEditor initial={content.process} initialUpdatedAt={updatedAt.process ?? null} />;
}
