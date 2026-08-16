"use client";

import Icon from "@/components/ui/Icon";
import { UserStoryRowData } from "@/types";

interface ViewStoryModalProps {
  open: boolean;
  onClose: () => void;
  story: UserStoryRowData;
}

export default function ViewStoryModal({ open, onClose, story }: ViewStoryModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden p-5 box-border">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative z-10 w-[600px] max-w-[calc(100vw-32px)] rounded-lg border border-outline-variant bg-surface-container-lowest shadow-xl box-border max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between gap-3 border-b border-outline-variant bg-surface-container-lowest px-5 py-4 sticky top-0">
          <h2 className="font-title-sm text-title-sm text-on-surface">Story Details</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-outline-variant px-2 py-1 text-sm text-on-surface-variant hover:bg-surface-variant"
          >
            Close
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="font-label-caps text-label-caps text-on-surface-variant block mb-2">
                Code
              </label>
              <p className="px-3 py-2 bg-surface-container rounded-md border border-outline-variant text-body-sm text-on-surface">
                {story.code}
              </p>
            </div>
            <div className="flex-1">
              <label className="font-label-caps text-label-caps text-on-surface-variant block mb-2">
                Status
              </label>
              <p className="px-3 py-2 bg-surface-container rounded-md border border-outline-variant text-body-sm text-on-surface">
                {story.status}
              </p>
            </div>
          </div>

          <div>
            <label className="font-label-caps text-label-caps text-on-surface-variant block mb-2">
              Title
            </label>
            <p className="px-3 py-2 bg-surface-container rounded-md border border-outline-variant text-body-sm text-on-surface">
              {story.title}
            </p>
          </div>

          <div>
            <label className="font-label-caps text-label-caps text-on-surface-variant block mb-2">
              Pre-flow
            </label>
            <p className="px-3 py-2 bg-surface-container rounded-md border border-outline-variant text-body-sm text-on-surface">
              {story.preFlow}
            </p>
          </div>

          <div>
            <label className="font-label-caps text-label-caps text-on-surface-variant block mb-2">
              Acceptance Criteria
            </label>
            <div className="space-y-2">
              <div className="px-3 py-2 bg-surface-container rounded-md border border-outline-variant text-body-sm text-on-surface">
                <span className="font-semibold text-primary">Given:</span> {story.acceptanceCriteria.given}
              </div>
              <div className="px-3 py-2 bg-surface-container rounded-md border border-outline-variant text-body-sm text-on-surface">
                <span className="font-semibold text-primary">When:</span> {story.acceptanceCriteria.when}
              </div>
              <div className="px-3 py-2 bg-surface-container rounded-md border border-outline-variant text-body-sm text-on-surface">
                <span className="font-semibold text-primary">Then:</span> {story.acceptanceCriteria.then}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="font-label-caps text-label-caps text-on-surface-variant block mb-2">
                Scope In
              </label>
              <p className="px-3 py-2 bg-surface-container rounded-md border border-outline-variant text-body-sm text-on-surface">
                {story.scopeIn}
              </p>
            </div>
            <div className="flex-1">
              <label className="font-label-caps text-label-caps text-on-surface-variant block mb-2">
                Scope Out
              </label>
              <p className="px-3 py-2 bg-surface-container rounded-md border border-outline-variant text-body-sm text-on-surface">
                {story.scopeOut}
              </p>
            </div>
          </div>

          <div>
            <label className="font-label-caps text-label-caps text-on-surface-variant block mb-2">
              Requirement Mapping
            </label>
            <div className="flex flex-wrap gap-2">
              {story.reqMapping.map((req) => (
                <span
                  key={req}
                  className="px-2 py-1 bg-surface-container rounded-sm border border-outline-variant text-body-sm text-on-surface"
                >
                  {req}
                </span>
              ))}
            </div>
          </div>

          {story.assignee && (
            <div>
              <label className="font-label-caps text-label-caps text-on-surface-variant block mb-2">
                Assignee
              </label>
              <div className="flex items-center gap-2">
                {story.assignee.avatarUrl && (
                  <img
                    src={story.assignee.avatarUrl}
                    alt={story.assignee.name}
                    className="w-6 h-6 rounded-full"
                  />
                )}
                <p className="text-body-sm text-on-surface">{story.assignee.name}</p>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 border-t border-outline-variant pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-outline-variant px-4 py-2 text-body-sm text-on-surface hover:bg-surface-variant"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
