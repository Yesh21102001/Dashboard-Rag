import Icon from "@/components/ui/Icon";
import { connectedFolders } from "@/data/mockData";
import { FileItem } from "@/types";
import FolderTreeItem from "./FolderTreeItem";
import { useState } from "react";

interface FolderTreeProps {
  files: FileItem[];
  selectedFileId: string;
  onSelectFile: (id: string) => void;
}

export default function FolderTree({ files, selectedFileId, onSelectFile }: FolderTreeProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["srs-brs"]));

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(folderId)) {
        next.delete(folderId);
      } else {
        next.add(folderId);
      }
      return next;
    });
  };

  return (
    <div className="w-72 bg-surface-container-lowest border-r border-outline-variant flex flex-col h-full">
      <div className="p-sm border-b border-outline-variant bg-surface-bright flex justify-between items-center">
        <span className="font-label-caps text-label-caps text-on-surface-variant">
          Connected Folders
        </span>
        <button className="text-on-surface-variant hover:text-primary transition-colors">
          <Icon name="filter_list" className="text-[16px]" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-sm font-body-sm text-body-sm">
        <ul className="flex flex-col gap-[2px]">
          {connectedFolders.map((folder) => (
            <div key={folder.id}>
              <button
                onClick={() => toggleFolder(folder.id)}
                className="w-full flex items-center gap-2 p-2 hover:bg-surface-container rounded transition-colors text-on-surface"
              >
                <Icon
                  name={expandedFolders.has(folder.id) ? "expand_more" : "chevron_right"}
                  className="text-[18px]"
                />
                <Icon name={folder.icon} className={`text-[18px] ${folder.iconColorClass}`} />
                <span className="truncate">{folder.name}</span>
              </button>

              {expandedFolders.has(folder.id) && (
                <ul className="pl-6 flex flex-col gap-[2px]">
                  {folder.id === "srs-brs"
                    ? files.map((file) => (
                        <li key={file.id}>
                          <button
                            onClick={() => onSelectFile(file.id)}
                            className={`w-full flex items-center gap-2 p-2 rounded transition-colors truncate text-left ${
                              selectedFileId === file.id
                                ? "bg-secondary-container text-on-secondary-container"
                                : "hover:bg-surface-container text-on-surface-variant hover:text-on-surface"
                            }`}
                          >
                            <Icon name={file.icon === "pdf" ? "description" : "article"} className="text-[16px] flex-shrink-0" />
                            <span className="truncate text-body-sm">{file.filename}</span>
                          </button>
                        </li>
                      ))
                    : folder.children?.map((child) => {
                        const file = files.find((f) => f.id === child.id);
                        return (
                          <li key={child.id}>
                            <button
                              onClick={() => onSelectFile(child.id)}
                              className={`w-full flex items-center gap-2 p-2 rounded transition-colors truncate text-left ${
                                selectedFileId === child.id
                                  ? "bg-secondary-container text-on-secondary-container"
                                  : "hover:bg-surface-container text-on-surface-variant hover:text-on-surface"
                              }`}
                            >
                              <Icon name={file?.icon === "pdf" ? "description" : "article"} className="text-[16px] flex-shrink-0" />
                              <span className="truncate text-body-sm">{child.name}</span>
                            </button>
                          </li>
                        );
                      })}
                </ul>
              )}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
