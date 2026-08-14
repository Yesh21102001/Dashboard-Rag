import Icon from "@/components/ui/Icon";

export default function GridHeaderRow() {
  return (
    <div className="sticky top-0 bg-surface z-10 border-b border-outline-variant flex font-label-caps text-label-caps text-on-surface-variant h-8 items-center bg-surface-container-low shadow-sm">
      <div className="w-10 px-2 flex items-center justify-center border-r border-outline-variant h-full">
        <Icon name="expand_all" className="text-[16px]" />
      </div>
      <div className="flex-1 px-3 border-r border-outline-variant h-full flex items-center">
        Summary / Hierarchy
      </div>
      <div className="w-32 px-3 border-r border-outline-variant h-full flex items-center">Status</div>
      <div className="w-48 px-3 border-r border-outline-variant h-full flex items-center">Pre-flow</div>
      <div className="w-64 px-3 border-r border-outline-variant h-full flex items-center">
        Acceptance Criteria
      </div>
      <div className="w-40 px-3 border-r border-outline-variant h-full flex items-center">Scope</div>
      <div className="w-40 px-3 border-r border-outline-variant h-full flex items-center">
        Req Mapping
      </div>
      <div className="w-24 px-3 border-r border-outline-variant h-full flex items-center">Assignee</div>
      <div className="w-20 px-3 h-full flex items-center justify-center">Actions</div>
    </div>
  );
}
