"use client";

import { useState } from "react";

interface NewStoryModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (payload: any) => void;
}

export default function NewStoryModal({ open, onClose, onCreate }: NewStoryModalProps) {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("Ready for Review");
  const [preFlow, setPreFlow] = useState("");
  const [given, setGiven] = useState("");
  const [whenVal, setWhenVal] = useState("");
  const [thenVal, setThenVal] = useState("");
  const [scopeIn, setScopeIn] = useState("");
  const [scopeOut, setScopeOut] = useState("");
  const [reqMapping, setReqMapping] = useState("");
  const [assignee, setAssignee] = useState("");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newStory = {
      id: `us-${Date.now()}`,
      code: code || "US",
      title: title || "Untitled Story",
      status,
      preFlow,
      acceptanceCriteria: { given, when: whenVal, then: thenVal },
      scopeIn,
      scopeOut,
      reqMapping: reqMapping.split(",").map((s) => s.trim()).filter(Boolean),
      assignee: assignee ? { name: assignee } : null,
      syncedWith: null,
    };

    onCreate(newStory);
    // reset
    setTitle("");
    setCode("");
    setStatus("Ready for Review");
    setPreFlow("");
    setGiven("");
    setWhenVal("");
    setThenVal("");
    setScopeIn("");
    setScopeOut("");
    setReqMapping("");
    setAssignee("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />
      <form onSubmit={handleSubmit} className="relative bg-surface w-[720px] max-w-full rounded-lg shadow-lg p-lg z-50">
        <h2 className="font-title-sm text-title-sm mb-3">Create New User Story</h2>

        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface-variant">Code</span>
            <input value={code} onChange={(e) => setCode(e.target.value)} className="mt-1 p-2 border border-outline rounded-sm" />
          </label>
          <label className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface-variant">Title</span>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 p-2 border border-outline rounded-sm" />
          </label>

          <label className="flex flex-col col-span-2">
            <span className="font-label-caps text-label-caps text-on-surface-variant">Pre-flow</span>
            <input value={preFlow} onChange={(e) => setPreFlow(e.target.value)} className="mt-1 p-2 border border-outline rounded-sm" />
          </label>

          <label className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface-variant">Given</span>
            <input value={given} onChange={(e) => setGiven(e.target.value)} className="mt-1 p-2 border border-outline rounded-sm" />
          </label>
          <label className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface-variant">When</span>
            <input value={whenVal} onChange={(e) => setWhenVal(e.target.value)} className="mt-1 p-2 border border-outline rounded-sm" />
          </label>
          <label className="flex flex-col col-span-2">
            <span className="font-label-caps text-label-caps text-on-surface-variant">Then</span>
            <input value={thenVal} onChange={(e) => setThenVal(e.target.value)} className="mt-1 p-2 border border-outline rounded-sm" />
          </label>

          <label className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface-variant">Scope In</span>
            <input value={scopeIn} onChange={(e) => setScopeIn(e.target.value)} className="mt-1 p-2 border border-outline rounded-sm" />
          </label>
          <label className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface-variant">Scope Out</span>
            <input value={scopeOut} onChange={(e) => setScopeOut(e.target.value)} className="mt-1 p-2 border border-outline rounded-sm" />
          </label>

          <label className="flex flex-col col-span-2">
            <span className="font-label-caps text-label-caps text-on-surface-variant">Req Mapping (comma separated)</span>
            <input value={reqMapping} onChange={(e) => setReqMapping(e.target.value)} className="mt-1 p-2 border border-outline rounded-sm" />
          </label>

          <label className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface-variant">Assignee</span>
            <input value={assignee} onChange={(e) => setAssignee(e.target.value)} className="mt-1 p-2 border border-outline rounded-sm" />
          </label>

          <div className="col-span-2 flex justify-end gap-2 mt-3">
            <button type="button" onClick={onClose} className="px-3 py-1 rounded-DEFAULT border border-outline-variant">Cancel</button>
            <button type="submit" className="px-4 py-1 rounded-DEFAULT bg-primary text-on-primary">Create</button>
          </div>
        </div>
      </form>
    </div>
  );
}
