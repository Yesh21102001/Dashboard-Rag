import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function AnalyticsPage() {
  return (
    <>
      <Sidebar />
      <div className="flex-1 flex flex-col ml-sidebar-width h-full bg-surface-container-low relative">
        <Topbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="font-body-md text-body-md text-on-surface-variant">
            Analytics — coming soon.
          </p>
        </div>
      </div>
    </>
  );
}
