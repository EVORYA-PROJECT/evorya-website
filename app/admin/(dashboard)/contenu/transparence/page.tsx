import TransparencyEditor from "@/components/admin/cms/TransparencyEditor";
import { getSiteContentMap } from "@/lib/cms/queries";

export default async function AdminTransparencyContentPage() {
  const { content, updatedAt } = await getSiteContentMap();
  return (
    <TransparencyEditor
      initial={content.transparency}
      initialUpdatedAt={updatedAt.transparency ?? null}
    />
  );
}
