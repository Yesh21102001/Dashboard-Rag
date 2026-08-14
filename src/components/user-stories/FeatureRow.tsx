import Icon from "@/components/ui/Icon";
import { FeatureRowData } from "@/types";

interface FeatureRowProps {
  feature: FeatureRowData;
  expanded: boolean;
  onToggle: () => void;
}

export default function FeatureRow({ feature, expanded, onToggle }: FeatureRowProps) {
  return (
    <div className="flex items-center min-h-[32px] border-b border-outline-variant bg-surface-container-lowest table-row-hover">
      <div
        onClick={onToggle}
        className="w-10 px-2 flex items-center justify-center border-r border-outline-variant h-full self-stretch cursor-pointer hover:text-primary"
      >
        <Icon name={expanded ? "expand_more" : "chevron_right"} className="text-[18px]" />
      </div>
      <div className="flex-1 px-3 border-r border-outline-variant h-full self-stretch flex items-center gap-2 pl-6">
        <span className="px-1.5 py-0.5 rounded-sm bg-secondary text-on-secondary font-label-caps text-[9px] leading-none uppercase tracking-wider">
          FEAT
        </span>
        <span>
          {feature.code}: {feature.title}
        </span>
      </div>
      <div className="w-32 px-3 border-r border-outline-variant h-full self-stretch flex items-center">
        <span className="px-2 py-0.5 rounded-sm bg-surface-container border border-outline-variant text-[11px]">
          {feature.status}
        </span>
      </div>
      <div className="w-48 px-3 border-r border-outline-variant h-full self-stretch flex items-center text-on-surface-variant truncate">
        {feature.preFlow}
      </div>
      <div className="w-64 px-3 border-r border-outline-variant h-full self-stretch flex items-center text-on-surface-variant truncate">
        N/A
      </div>
      <div className="w-40 px-3 border-r border-outline-variant h-full self-stretch flex items-center text-on-surface-variant truncate">
        {feature.scope}
      </div>
      <div className="w-40 px-3 border-r border-outline-variant h-full self-stretch flex items-center text-on-surface-variant truncate">
        {feature.reqMapping}
      </div>
      <div className="w-24 px-3 border-r border-outline-variant h-full self-stretch flex items-center">
        {feature.assignee ? (
          <span className="text-[12px] truncate">{feature.assignee.name}</span>
        ) : (
          <span className="text-[12px] text-on-surface-variant italic">Unassigned</span>
        )}
      </div>
      <div className="w-20 px-3 h-full self-stretch flex items-center justify-center">
        <button className="text-on-surface-variant hover:text-primary">
          <Icon name="more_vert" className="text-[18px]" />
        </button>
      </div>
    </div>
  );
}
