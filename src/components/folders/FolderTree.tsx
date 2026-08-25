import React, { useEffect, useState } from "react";
import { FolderNode } from "@/types";
import FolderTreeItem from "./FolderTreeItem";
import axiosInstance from "@/lib/axios";
import NewFolderModal from "./NewFolderModal";

interface FolderTreeProps {
  moduleType: "userStories" | "testCases";
  onSelectFolder: (folder: FolderNode | null) => void;
  selectedId?: string;
}

export default function FolderTree({ moduleType, onSelectFolder, selectedId }: FolderTreeProps) {
  const [hierarchy, setHierarchy] = useState<FolderNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [newFolderOpen, setNewFolderOpen] = useState(false);
  const [parentId, setParentId] = useState<string | null>(null);

  useEffect(() => {
    fetchFolderHierarchy();
  }, [moduleType]);

  const fetchFolderHierarchy = async () => {
    try {
      const { data } = await axiosInstance.get("/folders/hierarchy", {
        params: { moduleType },
      });
      if (data.success) {
        setHierarchy(data.hierarchy);
      }
    } catch (error) {
      console.error("Failed to fetch folder hierarchy:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFolder = async (folderId: string) => {
    if (!confirm("Are you sure you want to delete this folder and all its contents?")) {
      return;
    }

    try {
      await axiosInstance.delete(`/folders/${folderId}`);
      await fetchFolderHierarchy();
    } catch (error) {
      console.error("Failed to delete folder:", error);
      alert("Failed to delete folder");
    }
  };

  const handleNewFolder = (parentId: string) => {
    setParentId(parentId);
    setNewFolderOpen(true);
  };

  const handleCreateFolder = async (folderData: any) => {
    try {
      await axiosInstance.post("/folders", {
        ...folderData,
        moduleType,
        parentId,
      });
      await fetchFolderHierarchy();
      setNewFolderOpen(false);
    } catch (error) {
      console.error("Failed to create folder:", error);
      alert("Failed to create folder");
    }
  };

  if (loading) {
    return <div className="p-4 text-sm text-on-surface-variant">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-full bg-surface-container-lowest">
      <div className="flex-1 overflow-y-auto p-2">
        {hierarchy.length === 0 ? (
          <div className="text-sm text-on-surface-variant p-4">
            No folders yet. Create one to get started.
          </div>
        ) : (
          hierarchy.map((node) => (
            <FolderTreeItem
              key={node._id}
              node={node}
              level={0}
              onSelect={onSelectFolder}
              onNewItem={handleNewFolder}
              onDelete={handleDeleteFolder}
              selectedId={selectedId}
            />
          ))
        )}
      </div>

      <div className="border-t border-outline p-2">
        <button
          onClick={() => {
            setParentId(null);
            setNewFolderOpen(true);
          }}
          className="w-full px-3 py-2 rounded bg-primary text-white text-sm hover:bg-primary/90"
        >
          + New Folder
        </button>
      </div>

      <NewFolderModal
        open={newFolderOpen}
        onClose={() => setNewFolderOpen(false)}
        onCreate={handleCreateFolder}
        parentId={parentId}
      />
    </div>
  );
}
