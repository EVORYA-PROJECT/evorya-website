import FaqEditor from "@/components/admin/cms/FaqEditor";
import { getSiteContentMap } from "@/lib/cms/queries";

export default async function AdminFaqContentPage() {
  const { content, updatedAt } = await getSiteContentMap();
  return <FaqEditor initial={content.faq} initialUpdatedAt={updatedAt.faq ?? null} />;
}
