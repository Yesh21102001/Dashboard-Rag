import SidebarItem from "./SidebarItem";
import { mainNavItems, footerNavItems } from "@/data/mockData";

export default function Sidebar() {
  return (
    <nav className="bg-surface-container text-primary font-label-caps text-label-caps border-r border-outline-variant fixed left-0 top-0 h-full flex flex-col z-40 w-sidebar-width">
      {/* Header */}
      <div className="p-md flex items-center gap-sm border-b border-outline-variant">
        <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-title-sm text-title-sm">
          W
        </div>
        <div>
          <div className="font-title-sm text-title-sm text-on-surface">Enterprise QA</div>
          <div className="font-body-sm text-body-sm text-on-surface-variant">RAG Workflow</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex-1 overflow-y-auto py-sm">
        <ul className="flex flex-col gap-xs px-sm">
          {mainNavItems.map((item) => (
            <SidebarItem key={item.id} item={item} />
          ))}
        </ul>
      </div>

      {/* Footer Tabs */}
      <div className="p-sm border-t border-outline-variant">
        <ul className="flex flex-col gap-xs">
          {footerNavItems.map((item) => (
            <SidebarItem key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </nav>
  );
}
