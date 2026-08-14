import TreeTopbar from "@/components/layout/TreeTopbar";
import TreeSidebar from "@/components/layout/TreeSidebar";
import PageToolbar from "@/components/test-cases/PageToolbar";
import TestCasesWorkspace from "@/components/test-cases/TestCasesWorkspace";
import { testCasesTree, tc801 } from "@/data/testCasesData";

export default function TestCasesPage() {
  return (
    <div className="bg-background text-on-surface font-body-md flex h-full w-full overflow-hidden">
      <TreeTopbar />
      <TreeSidebar />

      <main className="ml-sidebar-width mt-12 flex-1 h-[calc(100vh-48px)] flex flex-col bg-background overflow-hidden relative">
        <PageToolbar workspaceLabel="Payment Gateway RAG" />
        <TestCasesWorkspace epics={testCasesTree} initialSelectedId={tc801.id} />
      </main>
    </div>
  );
}
