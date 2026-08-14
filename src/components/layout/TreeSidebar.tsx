"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { mainNavItems, footerNavItems } from "@/data/mockData";

export default function TreeSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-12 h-[calc(100vh-48px)] flex-col z-40 bg-surface-container border-r border-outline-variant w-sidebar-width transition-all duration-200 ease-in-out">
      <div className="p-md border-b border-outline-variant flex items-center gap-3">
        <div className="w-8 h-8 rounded-DEFAULT bg-primary text-on-primary flex items-center justify-center font-bold">
          W
        </div>
        <div>
          <h2 className="font-title-sm text-title-sm text-primary">Enterprise QA</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">RAG Workflow</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-sm flex flex-col gap-1 px-2">
        {mainNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-DEFAULT transition-colors group",
                isActive
                  ? "bg-secondary-container text-on-secondary-container border-r-2 border-primary"
                  : "text-on-surface-variant hover:bg-surface-variant"
              )}
            >
              <Icon
                name={item.icon}
                className={cn(!isActive && "text-on-surface-variant group-hover:text-on-surface")}
              />
              <span
                className={cn("font-body-md text-body-md", isActive && "font-semibold")}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="mt-auto border-t border-outline-variant p-2 flex flex-col gap-1">
        {footerNavItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-DEFAULT text-on-surface-variant hover:bg-surface-variant transition-colors group"
          >
            <Icon
              name={item.icon}
              className="text-on-surface-variant group-hover:text-on-surface"
            />
            <span className="font-body-md text-body-md">{item.label}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
