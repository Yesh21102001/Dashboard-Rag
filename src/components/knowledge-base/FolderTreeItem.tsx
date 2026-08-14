"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { TreeFolder } from "@/types";
import FileTreeItem from "./FileTreeItem";

export default function FolderTreeItem({ folder }: { folder: TreeFolder }) {
  const [expanded, setExpanded] = useState(!!folder.expanded);
  const hasChildren = !!folder.children?.length;

  return (
    <li>
      <div
        onClick={() => hasChildren && setExpanded((prev) => !prev)}
        className={cn(
          "flex items-center gap-xs px-xs py-1 hover:bg-surface-container rounded-sm cursor-pointer group",
          expanded && "bg-surface-variant"
        )}
      >
        <Icon
          name={expanded ? "expand_more" : "chevron_right"}
          className={cn(
            "text-[16px] transition-colors",
            expanded ? "text-on-surface" : "text-outline group-hover:text-primary"
          )}
        />
        <Icon
          name={expanded ? "folder_open" : folder.icon}
          className={cn("text-[16px]", folder.iconColorClass)}
        />
        <span className={cn("text-on-surface", expanded && "font-medium")}>
          {folder.name}
        </span>
      </div>

      {hasChildren && expanded && (
        <ul className="ml-[20px] border-l border-outline-variant pl-xs mt-[2px] flex flex-col gap-[2px]">
          {folder.children!.map((file) => (
            <FileTreeItem key={file.id} file={file} />
          ))}
        </ul>
      )}
    </li>
  );
}
