"use client";

import { useState } from "react";
import { UserStoryRowData } from "@/types";

interface EditStoryModalProps {
  open: boolean;
  onClose: () => void;
  story: UserStoryRowData;
  onSave: (story: UserStoryRowData) => void;
}

export default function EditStoryModal({ open, onClose, story, onSave }: EditStoryModalProps) {
  const [code, setCode] = useState(story.code);
  const [title, setTitle] = useState(story.title);
  const [preFlow, setPreFlow] = useState(story.preFlow);
  const [scopeIn, setScopeIn] = useState(story.scopeIn);
  const [scopeOut, setScopeOut] = useState(story.scopeOut);
  const [reqMapping, setReqMapping] = useState(story.reqMapping.join(", "));
  const [acceptanceCriteria, setAcceptanceCriteria] = useState(
    `Given: ${story.acceptanceCriteria.given}\nWhen: ${story.acceptanceCriteria.when}\nThen: ${story.acceptanceCriteria.then}`
  );
  const [assignee, setAssignee] = useState(story.assignee?.name || "");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedStory: UserStoryRowData = {
      ...story,
      code: code || story.code,
      title: title || story.title,
      preFlow,
      scopeIn,
      scopeOut,
      reqMapping: reqMapping.split(",").map((s) => s.trim()).filter(Boolean),
      acceptanceCriteria: story.acceptanceCriteria,
      assignee: assignee ? { name: assignee } : story.assignee,
    };

    onSave(updatedStory);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden p-5 box-border">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-[720px] max-w-[calc(100vw-32px)] max-h-[calc(100vh-40px)] rounded-lg border border-outline-variant bg-surface-container-lowest shadow-xl box-border overflow-y-auto overscroll-contain"
        style={{ scrollbarGutter: "stable" }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-outline-variant bg-surface-container-lowest px-5 py-4">
          <h2 className="font-title-sm text-title-sm text-on-surface">Edit User Story</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-outline-variant px-2 py-1 text-sm text-on-surface-variant hover:bg-surface-variant"
          >
            Close
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2">
          <label className="flex flex-col gap-1">
            <span className="font-label-caps text-label-caps text-on-surface-variant">Code</span>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="rounded-md border border-outline-variant bg-surface-container px-3 py-2 text-body-sm text-on-surface outline-none focus:border-primary"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="font-label-caps text-label-caps text-on-surface-variant">Title</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-md border border-outline-variant bg-surface-container px-3 py-2 text-body-sm text-on-surface outline-none focus:border-primary"
            />
          </label>

          <label className="flex flex-col gap-1 md:col-span-2">
            <span className="font-label-caps text-label-caps text-on-surface-variant">Pre-flow</span>
            <input
              value={preFlow}
              onChange={(e) => setPreFlow(e.target.value)}
              className="rounded-md border border-outline-variant bg-surface-container px-3 py-2 text-body-sm text-on-surface outline-none focus:border-primary"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="font-label-caps text-label-caps text-on-surface-variant">Scope In</span>
            <input
              value={scopeIn}
              onChange={(e) => setScopeIn(e.target.value)}
              className="rounded-md border border-outline-variant bg-surface-container px-3 py-2 text-body-sm text-on-surface outline-none focus:border-primary"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="font-label-caps text-label-caps text-on-surface-variant">Scope Out</span>
            <input
              value={scopeOut}
              onChange={(e) => setScopeOut(e.target.value)}
              className="rounded-md border border-outline-variant bg-surface-container px-3 py-2 text-body-sm text-on-surface outline-none focus:border-primary"
            />
          </label>

          <label className="flex flex-col gap-1 md:col-span-2">
            <span className="font-label-caps text-label-caps text-on-surface-variant">Req Mapping (comma separated)</span>
            <input
              value={reqMapping}
              onChange={(e) => setReqMapping(e.target.value)}
              className="rounded-md border border-outline-variant bg-surface-container px-3 py-2 text-body-sm text-on-surface outline-none focus:border-primary"
            />
          </label>

          <label className="flex flex-col gap-1 md:col-span-2">
            <span className="font-label-caps text-label-caps text-on-surface-variant">Acceptance Criteria</span>
            <textarea
              value={acceptanceCriteria}
              onChange={(e) => setAcceptanceCriteria(e.target.value)}
              rows={4}
              className="rounded-md border border-outline-variant bg-surface-container px-3 py-2 text-body-sm text-on-surface outline-none focus:border-primary resize-none"
              placeholder="Given: ...\nWhen: ...\nThen: ..."
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="font-label-caps text-label-caps text-on-surface-variant">Assignee</span>
            <input
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              className="rounded-md border border-outline-variant bg-surface-container px-3 py-2 text-body-sm text-on-surface outline-none focus:border-primary"
            />
          </label>

          <div className="md:col-span-2 mt-3 flex justify-end gap-2 border-t border-outline-variant pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-outline-variant px-4 py-2 text-body-sm text-on-surface hover:bg-surface-variant"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-primary px-4 py-2 text-body-sm font-medium text-on-primary hover:bg-primary/90"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}