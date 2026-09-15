import WhyEditor from "@/components/admin/cms/WhyEditor";
import { getSiteContentMap } from "@/lib/cms/queries";

export default async function AdminWhyContentPage() {
  const { content, updatedAt } = await getSiteContentMap();
  return <WhyEditor initial={content.why} initialUpdatedAt={updatedAt.why ?? null} />;
}
