import React, { useEffect, useState } from "react";
import { FolderNode } from "@/types";
import axiosInstance from "@/lib/axios";
import HierarchyTreeView from "./HierarchyTreeView";
import NewHierarchyItemModal from "./NewHierarchyItemModal";

interface HierarchyPanelProps {
  moduleType: "userStories" | "testCases";
  onSelectItem: (item: any) => void;
}

type HierarchyLevel = "epic" | "feature" | "story" | "testcase";

export default function HierarchyPanel({ moduleType, onSelectItem }: HierarchyPanelProps) {
  const [hierarchy, setHierarchy] = useState<FolderNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState<{
    parentId: string | null;
    parentType: HierarchyLevel;
  } | null>(null);

  useEffect(() => {
    fetchHierarchy();
  }, [moduleType]);

  const fetchHierarchy = async () => {
    try {
      const { data } = await axiosInstance.get("/folders/hierarchy", {
        params: { moduleType },
      });
      if (data.success) {
        setHierarchy(data.hierarchy);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error("Failed to fetch hierarchy:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const handleAddItem = (parentId: string | null, parentType: HierarchyLevel) => {
    setModalContext({ parentId, parentType });
    setModalOpen(true);
  };

  const handleCreateItem = async (data: any) => {
    try {
      const payload = {
        ...data,
        moduleType,
        parentId: modalContext?.parentId || null,
      };
      console.log("Creating item with payload:", payload);
      const response = await axiosInstance.post("/folders", payload);
      console.log("Create response:", response.data);
      await fetchHierarchy();
      setModalOpen(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error("Failed to create item:", errorMessage);
      alert(`Failed to create item: ${errorMessage}`);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!confirm("Delete this item? This will delete all children as well.")) {
      return;
    }

    try {
      await axiosInstance.delete(`/folders/${itemId}`);
      await fetchHierarchy();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error("Failed to delete item:", errorMessage);
      alert(`Failed to delete item: ${errorMessage}`);
    }
  };

  if (loading) {
    return <div className="p-4 text-sm text-on-surface-variant">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-full bg-surface-container-lowest overflow-hidden">
      {/* Header */}
      <div className="border-b border-outline p-3">
        <h3 className="text-sm font-semibold text-on-surface mb-3">
          {moduleType === "userStories" ? "📚 Manage User Stories" : "🧪 Manage Test Cases"}
        </h3>
        <button
          onClick={() => handleAddItem(null, "epic")}
          className="w-full px-3 py-2 rounded bg-primary text-white text-xs font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-1"
        >
          <span>⊕</span>
          <span>{moduleType === "userStories" ? "New Epic" : "New Suite"}</span>
        </button>
      </div>

      {/* Tree View */}
      <div className="flex-1 overflow-y-auto p-2">
        {hierarchy.length === 0 ? (
          <div className="text-xs text-on-surface-variant p-4 text-center">
            Create a folder to get started
          </div>
        ) : (
          <HierarchyTreeView
            items={hierarchy}
            expandedFolders={expandedFolders}
            onToggle={toggleFolder}
            onSelect={onSelectItem}
            onAdd={handleAddItem}
            onDelete={handleDeleteItem}
            moduleType={moduleType}
          />
        )}
      </div>

      {/* Modal */}
      <NewHierarchyItemModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreateItem}
        parentType={modalContext?.parentType || "epic"}
        moduleType={moduleType}
      />
    </div>
  );
}
