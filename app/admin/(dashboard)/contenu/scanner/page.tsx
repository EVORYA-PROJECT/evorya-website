import ScannerEditor from "@/components/admin/cms/ScannerEditor";
import { getSiteContentMap } from "@/lib/cms/queries";

export default async function AdminScannerContentPage() {
  const { content, updatedAt } = await getSiteContentMap();
  return <ScannerEditor initial={content.scanner} initialUpdatedAt={updatedAt.scanner ?? null} />;
}
