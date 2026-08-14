"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { mainNavItems, footerNavItems } from "@/data/mockData";

export default function GridSidebar() {
  const pathname = usePathname();

  return (
    <nav className="fixed left-0 top-0 h-full flex flex-col z-40 bg-surface-container border-r border-outline-variant transition-all duration-200 ease-in-out md:relative md:w-sidebar-width shrink-0">
      <div className="p-md border-b border-outline-variant flex items-center gap-md h-12 shrink-0 md:mt-12">
        <div className="w-8 h-8 rounded-DEFAULT bg-primary-container text-on-primary flex items-center justify-center font-bold text-title-sm">
          EQ
        </div>
        <div className="flex flex-col">
          <span className="font-title-sm text-title-sm text-on-surface leading-tight">
            Enterprise QA
          </span>
          <span className="font-label-caps text-label-caps text-on-surface-variant leading-tight">
            RAG Workflow
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-sm">
        <ul className="flex flex-col gap-xs px-xs">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-sm px-3 py-2 rounded-DEFAULT transition-colors group",
                    isActive
                      ? "bg-secondary-container text-on-secondary-container border-r-2 border-primary"
                      : "text-on-surface-variant hover:bg-surface-variant"
                  )}
                >
                  <Icon
                    name={item.icon}
                    filled={isActive}
                    className={cn(
                      "text-[20px] transition-colors",
                      isActive ? "text-primary" : "group-hover:text-primary"
                    )}
                  />
                  <span
                    className={cn(
                      "font-label-caps text-label-caps pt-0.5",
                      isActive && "text-primary"
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-auto border-t border-outline-variant p-xs">
        <ul className="flex flex-col gap-xs">
          {footerNavItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className="flex items-center gap-sm px-3 py-2 rounded-DEFAULT text-on-surface-variant hover:bg-surface-variant transition-colors group"
              >
                <Icon
                  name={item.icon}
                  className="text-[20px] group-hover:text-primary transition-colors"
                />
                <span className="font-label-caps text-label-caps pt-0.5">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
