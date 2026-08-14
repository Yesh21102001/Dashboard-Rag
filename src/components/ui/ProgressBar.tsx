import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number; // 0-100
  colorClass: string;
  animate?: boolean;
}

export default function ProgressBar({ progress, colorClass, animate }: ProgressBarProps) {
  return (
    <div className="flex-1 h-1 bg-surface-variant rounded-full overflow-hidden">
      <div
        className={cn("h-full", colorClass, animate && "animate-pulse")}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
