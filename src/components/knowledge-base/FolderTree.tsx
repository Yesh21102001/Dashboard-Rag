import Icon from "@/components/ui/Icon";
import { connectedFolders } from "@/data/mockData";
import FolderTreeItem from "./FolderTreeItem";

export default function FolderTree() {
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
            <FolderTreeItem key={folder.id} folder={folder} />
          ))}
        </ul>
      </div>
    </div>
  );
}
