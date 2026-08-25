import React from "react";
import { FolderNode } from "@/types";

interface HierarchyTreeViewProps {
  items: FolderNode[];
  expandedFolders: Set<string>;
  onToggle: (id: string) => void;
  onSelect: (item: any) => void;
  onAdd: (parentId: string | null, type: string) => void;
  onDelete: (id: string) => void;
  level?: number;
  moduleType: "userStories" | "testCases";
}

export default function HierarchyTreeView({
  items,
  expandedFolders,
  onToggle,
  onSelect,
  onAdd,
  onDelete,
  level = 0,
  moduleType,
}: HierarchyTreeViewProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "epic":
        return "📋";
      case "feature":
        return "⚡";
      case "story":
        return "📝";
      case "testcase":
        return "🧪";
      default:
        return "•";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "epic":
        return "Epic";
      case "feature":
        return "Feature";
      case "story":
        return "User Story";
      case "testcase":
        return "Test Case";
      default:
        return "Item";
    }
  };

  const getNextType = (currentType: string): string => {
    if (currentType === "epic") return "feature";
    if (currentType === "feature") {
      return moduleType === "userStories" ? "story" : "testcase";
    }
    return "epic";
  };

  const canAddChildren = (type: string) => {
    if (moduleType === "userStories") {
      return ["epic", "feature"].includes(type);
    }
    return ["epic", "feature"].includes(type);
  };

  return (
    <div>
      {items.map((item) => {
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expandedFolders.has(item._id);
        const paddingLeft = level * 16;

        return (
          <div key={item._id}>
            {/* Item Row */}
            <div
              className="group flex items-center gap-1 px-2 py-1.5 rounded hover:bg-surface-container transition-colors text-on-surface text-xs"
              style={{ paddingLeft: `${paddingLeft}px` }}
            >
              {/* Expand Button */}
              {hasChildren ? (
                <button
                  onClick={() => onToggle(item._id)}
                  className="w-5 h-5 flex items-center justify-center hover:bg-surface-container-high rounded text-xs p-0"
                  title="Expand/Collapse"
                >
                  {isExpanded ? "▼" : "▶"}
                </button>
              ) : (
                <div className="w-5" />
              )}

              {/* Icon */}
              <span className="text-sm flex-shrink-0">{getIcon(item.type)}</span>

              {/* Name */}
              <span
                onClick={() => onSelect(item)}
                className="flex-1 truncate cursor-pointer hover:text-primary font-medium"
              >
                {item.name}
              </span>

              {/* Actions */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {canAddChildren(item.type) && (
                  <button
                    onClick={() => onAdd(item._id, getNextType(item.type))}
                    className="px-2 py-0.5 hover:bg-primary/10 rounded text-xs font-semibold text-primary whitespace-nowrap"
                    title={`Add ${getTypeLabel(getNextType(item.type))}`}
                  >
                    + Add {getTypeLabel(getNextType(item.type))}
                  </button>
                )}
              </div>
            </div>

            {/* Children */}
            {hasChildren && isExpanded && (
              <HierarchyTreeView
                items={item.children!}
                expandedFolders={expandedFolders}
                onToggle={onToggle}
                onSelect={onSelect}
                onAdd={onAdd}
                onDelete={onDelete}
                level={level + 1}
                moduleType={moduleType}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
