import ContactEditor from "@/components/admin/cms/ContactEditor";
import { getSiteContentMap } from "@/lib/cms/queries";

export default async function AdminContactContentPage() {
  const { content, updatedAt } = await getSiteContentMap();
  return <ContactEditor initial={content.contact} initialUpdatedAt={updatedAt.contact ?? null} />;
}
