import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { TreeFile } from "@/types";

export default function FileTreeItem({ file }: { file: TreeFile }) {
  if (file.active) {
    return (
      <li>
        <div className="flex items-center gap-xs px-xs py-1 hover:bg-surface-container rounded-sm cursor-pointer border-l-2 border-primary bg-secondary-container bg-opacity-30 -ml-[5px] pl-[7px]">
          <Icon name="description" className="text-[16px] text-primary" />
          <span className="text-on-surface font-medium">{file.name}</span>
        </div>
      </li>
    );
  }

  return (
    <li>
      <div className="flex items-center gap-xs px-xs py-1 hover:bg-surface-container rounded-sm cursor-pointer">
        <Icon name="description" className="text-[16px] text-outline" />
        <span className="text-on-surface-variant">{file.name}</span>
      </div>
    </li>
  );
}
