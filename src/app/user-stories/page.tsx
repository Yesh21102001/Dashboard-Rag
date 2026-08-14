import GridTopbar from "@/components/layout/GridTopbar";
import GridSidebar from "@/components/layout/GridSidebar";
import Toolbar from "@/components/user-stories/Toolbar";
import GridHeaderRow from "@/components/user-stories/GridHeaderRow";
import StoriesGrid from "@/components/user-stories/StoriesGrid";
import StatusBar from "@/components/user-stories/StatusBar";
import { userStoriesEpics } from "@/data/userStoriesData";

export default function UserStoriesPage() {
  return (
    <div className="h-full w-full flex flex-col font-body-md text-on-surface bg-background overflow-hidden">
      <GridTopbar />

      <div className="flex flex-1 overflow-hidden">
        <GridSidebar />

        <main className="flex-1 flex flex-col h-full bg-background overflow-hidden relative">
          <Toolbar epicLabel="Epic: Authentication Rewrite" />

          {/* Agile Grid Workspace */}
          <div className="flex-1 overflow-auto bg-surface-container-lowest relative">
            <div className="min-w-[1400px] w-full">
              <GridHeaderRow />
              <StoriesGrid epics={userStoriesEpics} />
            </div>
          </div>

          <StatusBar totalRows={142} selected={0} />
        </main>
      </div>
    </div>
  );
}
