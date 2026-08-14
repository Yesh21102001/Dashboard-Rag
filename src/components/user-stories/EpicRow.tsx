import Image from "next/image";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { EpicRowData } from "@/types";

interface EpicRowProps {
  epic: EpicRowData;
  expanded: boolean;
  onToggle: () => void;
}

export default function EpicRow({ epic, expanded, onToggle }: EpicRowProps) {
  return (
    <div className="flex items-center min-h-[32px] border-b border-outline-variant bg-surface-variant/30 font-semibold table-row-hover">
      <div
        onClick={onToggle}
        className="w-10 px-2 flex items-center justify-center border-r border-outline-variant h-full self-stretch cursor-pointer hover:text-primary"
      >
        <Icon name={expanded ? "expand_more" : "chevron_right"} className="text-[18px]" />
      </div>
      <div className="flex-1 px-3 border-r border-outline-variant h-full self-stretch flex items-center gap-2">
        <span className="px-1.5 py-0.5 rounded-sm bg-primary text-on-primary font-label-caps text-[9px] leading-none uppercase tracking-wider">
          EPIC
        </span>
        <span>
          {epic.code}: {epic.title}
        </span>
      </div>
      <div className="w-32 px-3 border-r border-outline-variant h-full self-stretch flex items-center">
        <span className="px-2 py-0.5 rounded-sm bg-surface-container border border-outline-variant text-[11px]">
          {epic.status}
        </span>
      </div>
      <div className="w-48 px-3 border-r border-outline-variant h-full self-stretch flex items-center text-on-surface-variant truncate">
        N/A
      </div>
      <div className="w-64 px-3 border-r border-outline-variant h-full self-stretch flex items-center text-on-surface-variant truncate">
        N/A
      </div>
      <div className="w-40 px-3 border-r border-outline-variant h-full self-stretch flex items-center text-on-surface-variant truncate">
        {epic.scope}
      </div>
      <div className="w-40 px-3 border-r border-outline-variant h-full self-stretch flex items-center text-on-surface-variant truncate">
        {epic.reqMapping}
      </div>
      <div className="w-24 px-3 border-r border-outline-variant h-full self-stretch flex items-center">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-surface-variant border border-outline-variant overflow-hidden">
            <Image
              alt={epic.assignee.name}
              className="w-full h-full object-cover"
              width={20}
              height={20}
              src={epic.assignee.avatarUrl!}
            />
          </div>
          <span className="text-[12px] truncate">{epic.assignee.name}</span>
        </div>
      </div>
      <div className="w-20 px-3 h-full self-stretch flex items-center justify-center">
        <button className="text-on-surface-variant hover:text-primary">
          <Icon name="more_vert" className="text-[18px]" />
        </button>
      </div>
    </div>
  );
}
