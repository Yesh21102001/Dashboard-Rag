import { ReactNode } from "react";
import GridSidebar from "@/components/layout/GridSidebar";
import GridTopbar from "@/components/layout/GridTopbar";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: ReactNode;
  className?: string;
}

export default function AppShell({ children, className }: AppShellProps) {
  return (
    <div className="h-full w-full flex flex-col font-body-md text-on-surface bg-background overflow-hidden">
      <GridTopbar />

      <div className="flex flex-1 overflow-hidden">
        <GridSidebar />

        <main
          className={cn(
            "flex-1 flex flex-col h-full bg-background overflow-hidden relative",
            className
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
