import ProgressBar from "@/components/ui/ProgressBar";
import { SyncStatus } from "@/types";

interface StatusBadgeProps {
  status: SyncStatus;
  progress: number;
}

export default function StatusBadge({ status, progress }: StatusBadgeProps) {
  const isSynced = status === "SYNCED";

  return (
    <div className="flex items-center gap-sm">
      <span
        className={
          isSynced
            ? "bg-primary-container text-on-primary rounded-[2px] px-1 py-[1px] font-label-caps text-[9px] uppercase tracking-wider"
            : "bg-tertiary-fixed-dim text-on-tertiary-fixed-variant rounded-[2px] px-1 py-[1px] font-label-caps text-[9px] uppercase tracking-wider"
        }
      >
        {isSynced ? "Synced" : "Processing"}
      </span>
      <ProgressBar
        progress={progress}
        colorClass={isSynced ? "bg-primary" : "bg-tertiary-fixed-dim"}
        animate={!isSynced}
      />
    </div>
  );
}
