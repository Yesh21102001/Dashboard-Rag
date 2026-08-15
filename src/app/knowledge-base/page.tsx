import AppShell from "@/components/layout/AppShell";
import PageHeader from "@/components/knowledge-base/PageHeader";
import FolderTree from "@/components/knowledge-base/FolderTree";
import ContentTable from "@/components/knowledge-base/ContentTable";
import { brmsFiles } from "@/data/mockData";

export default function KnowledgeBasePage() {
  return (
    <AppShell>
      <PageHeader />

      <div className="flex-1 flex flex-row overflow-hidden">
        <FolderTree />
        <ContentTable title="BRMs Content" files={brmsFiles} />
      </div>
    </AppShell>
  );
}
