interface StatusBarProps {
  totalRows: number;
  selected: number;
}

export default function StatusBar({ totalRows, selected }: StatusBarProps) {
  return (
    <div className="h-8 border-t border-outline-variant bg-surface-container flex items-center justify-between px-md shrink-0 font-label-caps text-[10px] text-on-surface-variant">
      <div className="flex items-center gap-4">
        <span>Total Rows: {totalRows}</span>
        <span>Selected: {selected}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        RAG Vector DB Connected
      </div>
    </div>
  );
}
