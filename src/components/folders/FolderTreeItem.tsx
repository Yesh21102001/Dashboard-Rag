import React, { useState } from "react";
import { FolderNode } from "@/types";

interface FolderTreeItemProps {
  node: FolderNode;
  level: number;
  onSelect: (folder: FolderNode) => void;
  onNewItem: (parentId: string, type: string) => void;
  onDelete: (folderId: string) => void;
  selectedId?: string;
}

export default function FolderTreeItem({
  node,
  level,
  onSelect,
  onNewItem,
  onDelete,
  selectedId,
}: FolderTreeItemProps) {
  const [expanded, setExpanded] = useState(true);
  const [showActions, setShowActions] = useState(false);

  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedId === node._id;
  const paddingLeft = level * 20;

  const getIcon = () => {
    if (node.type === "epic") return "📋";
    if (node.type === "feature") return "⚡";
    return "📁";
  };

  return (
    <div>
      <div
        className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer group relative ${
          isSelected
            ? "bg-primary text-white"
            : "hover:bg-surface-container text-on-surface"
        }`}
        style={{ paddingLeft: `${paddingLeft}px` }}
        onClick={() => onSelect(node)}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        {hasChildren && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className={`p-0 w-4 text-center transition-transform ${expanded ? "rotate-90" : ""}`}
          >
            ▶
          </button>
        )}
        {!hasChildren && <div className="w-4" />}

        <span className="text-base">{getIcon()}</span>
        <span className="flex-1 text-sm truncate">{node.name}</span>

        {showActions && (
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNewItem(node._id, "folder");
              }}
              className="p-1 hover:bg-surface-container rounded text-xs"
              title="New Folder"
            >
              +
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(node._id);
              }}
              className="p-1 hover:bg-error/10 rounded text-xs text-error"
              title="Delete"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {expanded && node.children && node.children.length > 0 && (
        <div>
          {node.children.map((child) => (
            <FolderTreeItem
              key={child._id}
              node={child}
              level={level + 1}
              onSelect={onSelect}
              onNewItem={onNewItem}
              onDelete={onDelete}
              selectedId={selectedId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
