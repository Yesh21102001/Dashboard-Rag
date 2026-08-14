import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import PageHeader from "@/components/knowledge-base/PageHeader";
import FolderTree from "@/components/knowledge-base/FolderTree";
import ContentTable from "@/components/knowledge-base/ContentTable";
import { brmsFiles } from "@/data/mockData";

export default function KnowledgeBasePage() {
  return (
    <>
      <Sidebar />

      <div className="flex-1 flex flex-col ml-sidebar-width h-full bg-surface-container-low relative">
        <Topbar />
        <PageHeader />

        {/* Split Pane Layout */}
        <div className="flex-1 flex flex-row overflow-hidden">
          <FolderTree />
          <ContentTable title="BRMs Content" files={brmsFiles} />
        </div>
      </div>
    </>
  );
}
