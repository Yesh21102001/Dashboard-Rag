import Icon from "@/components/ui/Icon";

interface ToolbarProps {
  epicLabel: string;
}

export default function Toolbar({ epicLabel }: ToolbarProps) {
  return (
    <div className="h-12 border-b border-outline-variant bg-surface-container-lowest flex items-center justify-between px-md shrink-0">
      <div className="flex items-center gap-sm">
        <h1 className="font-title-sm text-title-sm text-on-surface">Manage User Stories</h1>
        <span className="px-2 py-0.5 rounded-DEFAULT bg-surface-variant text-on-surface-variant font-label-caps text-label-caps border border-outline-variant">
          {epicLabel}
        </span>
      </div>
      <div className="flex items-center gap-sm">
        <button className="px-3 py-1 rounded-DEFAULT border border-outline-variant text-on-surface font-body-sm text-body-sm hover:bg-surface-variant transition-colors flex items-center gap-1 bg-surface-container-lowest">
          <Icon name="filter_list" className="text-[16px]" />
          Filter
        </button>
        <button className="px-3 py-1 rounded-DEFAULT border border-outline-variant text-on-surface font-body-sm text-body-sm hover:bg-surface-variant transition-colors flex items-center gap-1 bg-surface-container-lowest">
          <Icon name="view_column" className="text-[16px]" />
          Columns
        </button>
        <button className="px-3 py-1 rounded-DEFAULT bg-primary-container text-on-primary font-body-sm text-body-sm hover:bg-primary transition-colors flex items-center gap-1">
          <Icon name="add" className="text-[16px]" />
          New Story
        </button>
      </div>
    </div>
  );
}
