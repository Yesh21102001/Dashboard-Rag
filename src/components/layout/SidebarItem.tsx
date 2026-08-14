"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";

export default function SidebarItem({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <li>
      <Link
        href={item.href}
        className={cn(
          "transition-all duration-200 ease-in-out flex items-center gap-sm px-sm py-sm rounded-sm",
          isActive
            ? "bg-secondary-container text-on-secondary-container border-r-2 border-primary"
            : "text-on-surface-variant hover:bg-surface-variant"
        )}
      >
        <Icon name={item.icon} className="text-[20px]" />
        <span className="font-label-caps text-label-caps">{item.label}</span>
      </Link>
    </li>
  );
}
