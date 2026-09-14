import FooterEditor from "@/components/admin/cms/FooterEditor";
import { getSiteContentMap } from "@/lib/cms/queries";

export default async function AdminFooterContentPage() {
  const { content, updatedAt } = await getSiteContentMap();
  return <FooterEditor initial={content.footer} initialUpdatedAt={updatedAt.footer ?? null} />;
}
