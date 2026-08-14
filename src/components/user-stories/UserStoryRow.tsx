import Icon from "@/components/ui/Icon";
import { STORY_STATUS_OPTIONS, UserStoryRowData } from "@/types";

interface UserStoryRowProps {
  story: UserStoryRowData;
}

export default function UserStoryRow({ story }: UserStoryRowProps) {
  return (
    <div className="flex items-stretch border-b border-outline-variant bg-surface-container-lowest table-row-hover group">
      <div className="w-10 px-2 flex items-center justify-center border-r border-outline-variant">
        {/* No expand icon for leaf node */}
      </div>

      <div className="flex-1 px-3 border-r border-outline-variant py-2 flex flex-col justify-center pl-10 gap-1 relative">
        {/* Active focus indicator line */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-primary transition-colors" />
        <div className="flex items-center gap-2">
          <span className="px-1.5 py-0.5 rounded-sm border border-outline-variant text-on-surface-variant font-label-caps text-[9px] leading-none uppercase tracking-wider bg-surface-container-low">
            {story.code}
          </span>
          <span className="font-medium text-primary">{story.title}</span>
        </div>
        {story.syncedWith && (
          <div className="flex items-center gap-1 mt-0.5">
            <Icon
              name="sync"
              className="text-[14px] text-primary"
              filled={false}
            />
            <span className="font-code-sm text-[10px] text-on-surface-variant bg-secondary-container/30 px-1 py-0.5 rounded text-secondary border border-secondary/20">
              {story.syncedWith}
            </span>
          </div>
        )}
      </div>

      <div className="w-32 px-3 border-r border-outline-variant py-2 flex items-center">
        <select
          defaultValue={story.status}
          className="w-full bg-surface-container-lowest border-none py-1 pl-2 pr-6 text-[12px] focus:ring-1 focus:ring-primary rounded-sm appearance-none cursor-pointer group-hover:bg-surface-variant/50 transition-colors"
        >
          {STORY_STATUS_OPTIONS.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="w-48 px-3 border-r border-outline-variant py-2 flex items-center">
        <p className="text-[12px] leading-tight line-clamp-2">{story.preFlow}</p>
      </div>

      <div className="w-64 px-3 border-r border-outline-variant py-2 flex flex-col justify-center gap-1">
        <div className="text-[11px] font-code-sm leading-tight">
          <span className="font-semibold text-primary">G:</span> {story.acceptanceCriteria.given}
        </div>
        <div className="text-[11px] font-code-sm leading-tight">
          <span className="font-semibold text-primary">W:</span> {story.acceptanceCriteria.when}
        </div>
        <div className="text-[11px] font-code-sm leading-tight">
          <span className="font-semibold text-primary">T:</span> {story.acceptanceCriteria.then}
        </div>
      </div>

      <div className="w-40 px-3 border-r border-outline-variant py-2 flex flex-col justify-center">
        <div className="text-[11px] leading-tight">
          <span className="font-semibold text-on-surface">In:</span> {story.scopeIn}
        </div>
        <div className="text-[11px] leading-tight text-on-surface-variant mt-1">
          <span className="font-semibold">Out:</span> {story.scopeOut}
        </div>
      </div>

      <div className="w-40 px-3 border-r border-outline-variant py-2 flex flex-col justify-center gap-1">
        {story.reqMapping.map((req) => (
          <span
            key={req}
            className="text-[11px] bg-surface-container px-1 py-0.5 rounded-sm border border-outline-variant w-fit font-code-sm"
          >
            {req}
          </span>
        ))}
      </div>

      <div className="w-24 px-3 border-r border-outline-variant py-2 flex items-center">
        <div className="flex items-center gap-1.5 cursor-pointer hover:bg-surface-variant px-1 py-0.5 rounded -ml-1">
          <div className="w-5 h-5 rounded-full bg-primary-container text-on-primary flex items-center justify-center text-[10px] font-bold">
            {story.assignee?.initials}
          </div>
        </div>
      </div>

      <div className="w-20 px-2 py-2 flex flex-col items-center justify-center gap-1">
        <button
          className="w-full h-6 flex items-center justify-center gap-1 bg-surface-container hover:bg-surface-variant border border-outline-variant rounded-sm text-[10px] font-medium transition-colors"
          title="Assign to Next Level Review"
        >
          <Icon name="forward" className="text-[14px]" /> Rev
        </button>
        <button
          className="w-full h-6 flex items-center justify-center gap-1 bg-surface-container hover:bg-surface-variant border border-outline-variant rounded-sm text-[10px] font-medium transition-colors text-primary"
          title="Regenerate via AI"
        >
          <Icon name="auto_awesome" className="text-[14px]" /> AI
        </button>
      </div>
    </div>
  );
}
