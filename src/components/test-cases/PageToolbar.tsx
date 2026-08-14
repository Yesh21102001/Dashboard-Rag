import Icon from "@/components/ui/Icon";

interface PageToolbarProps {
  workspaceLabel: string;
}

export default function PageToolbar({ workspaceLabel }: PageToolbarProps) {
  return (
    <header className="bg-surface-container-lowest border-b border-outline-variant h-12 flex items-center justify-between px-md shrink-0">
      <div className="flex items-center gap-2">
        <Icon name="rule" className="text-primary text-xl" />
        <h1 className="font-title-sm text-title-sm text-on-surface">Test Case Management</h1>
        <span className="text-on-surface-variant mx-2">/</span>
        <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
          <Icon name="folder" className="text-sm" /> {workspaceLabel}
        </span>
      </div>
      <div className="flex gap-2">
        <button className="px-3 py-1.5 border border-outline-variant rounded-DEFAULT text-body-sm font-title-sm hover:bg-surface-variant transition-colors bg-surface-container-lowest text-on-surface flex items-center gap-2">
          <Icon name="download" className="text-sm" /> Export
        </button>
        <button className="px-3 py-1.5 bg-primary-container text-on-primary border border-transparent rounded-DEFAULT text-body-sm font-title-sm hover:bg-opacity-90 transition-colors flex items-center gap-2">
          <Icon name="add" className="text-sm" /> New Test Case
        </button>
      </div>
    </header>
  );
}
