"use client";

import { FormEvent, useState } from "react";
import { TestCaseNode } from "@/types";

interface NewTestCaseModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (payload: TestCaseNode) => void;
  selectedFolder?: string | null;
}

const DEFAULT_STATUS = "Draft";

export default function NewTestCaseModal({ open, onClose, onCreate, selectedFolder }: NewTestCaseModalProps) {
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [testSteps, setTestSteps] = useState("");
  const [expectedResults, setExpectedResults] = useState("");
  const [status, setStatus] = useState(DEFAULT_STATUS);
  const [preconditions, setPreconditions] = useState("");
  const [folderId, setFolderId] = useState(selectedFolder || "");

  if (!open) return null;

  const resetForm = () => {
    setCode("");
    setTitle("");
    setDescription("");
    setTestSteps("");
    setExpectedResults("");
    setStatus(DEFAULT_STATUS);
    setPreconditions("");
    setFolderId(selectedFolder || "");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedCode = code.trim();
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const trimmedTestSteps = testSteps.trim();
    const trimmedExpectedResults = expectedResults.trim();
    const filteredPreconditions = preconditions
      .split(/\n|\r\n|,/) 
      .map((item) => item.trim())
      .filter(Boolean);

    if (
      !trimmedCode ||
      !trimmedTitle ||
      !trimmedDescription ||
      !trimmedTestSteps ||
      !trimmedExpectedResults ||
      filteredPreconditions.length === 0
    ) {
      return;
    }

    const newTestCase: any = {
      id: `tc-${Date.now()}`,
      code: trimmedCode,
      title: trimmedTitle,
      description: trimmedDescription,
      status,
      ragGenUnlocked: true,
      ragGenReason: "RAG Gen: Unlocked (Manual Entry)",
      preconditions: filteredPreconditions,
      links: [],
      steps: [
        {
          id: `step-${Date.now()}`,
          order: 1,
          action: trimmedTestSteps,
          expected: trimmedExpectedResults,
        },
      ],
      folderId: folderId || null,
    };

    onCreate(newTestCase);
    resetForm();
    onClose();
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
          <h2 className="font-title-sm text-title-sm text-on-surface">Create New Test Case</h2>
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
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="rounded-md border border-outline-variant bg-surface-container px-3 py-2 text-body-sm text-on-surface outline-none focus:border-primary"
              placeholder="TC-901"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="font-label-caps text-label-caps text-on-surface-variant">Status</span>
            <select
              required
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-md border border-outline-variant bg-surface-container px-3 py-2 text-body-sm text-on-surface outline-none focus:border-primary"
            >
              <option value="Draft">Draft</option>
              <option value="Ready for Review">Ready for Review</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="On Hold">On Hold</option>
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span className="font-label-caps text-label-caps text-on-surface-variant">Folder (Optional)</span>
            <input
              type="text"
              value={folderId}
              onChange={(e) => setFolderId(e.target.value)}
              placeholder="Folder ID"
              className="rounded-md border border-outline-variant bg-surface-container px-3 py-2 text-body-sm text-on-surface outline-none focus:border-primary"
            />
          </label>

          <label className="flex flex-col gap-1 md:col-span-2">
            <span className="font-label-caps text-label-caps text-on-surface-variant">Title</span>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-md border border-outline-variant bg-surface-container px-3 py-2 text-body-sm text-on-surface outline-none focus:border-primary"
              placeholder="Payment refund validation"
            />
          </label>

          <label className="flex flex-col gap-1 md:col-span-2">
            <span className="font-label-caps text-label-caps text-on-surface-variant">Description</span>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="rounded-md border border-outline-variant bg-surface-container px-3 py-2 text-body-sm text-on-surface outline-none focus:border-primary"
              placeholder="Describe what this test validates."
            />
          </label>

          <label className="flex flex-col gap-1 md:col-span-2">
            <span className="font-label-caps text-label-caps text-on-surface-variant">Test Steps</span>
            <textarea
              required
              value={testSteps}
              onChange={(e) => setTestSteps(e.target.value)}
              rows={4}
              className="rounded-md border border-outline-variant bg-surface-container px-3 py-2 text-body-sm text-on-surface outline-none focus:border-primary"
              placeholder="Describe the steps to perform this test."
            />
          </label>

          <label className="flex flex-col gap-1 md:col-span-2">
            <span className="font-label-caps text-label-caps text-on-surface-variant">Expected Results</span>
            <textarea
              required
              value={expectedResults}
              onChange={(e) => setExpectedResults(e.target.value)}
              rows={4}
              className="rounded-md border border-outline-variant bg-surface-container px-3 py-2 text-body-sm text-on-surface outline-none focus:border-primary"
              placeholder="What should happen after the steps are executed?"
            />
          </label>

          <label className="flex flex-col gap-1 md:col-span-2">
            <span className="font-label-caps text-label-caps text-on-surface-variant">Preconditions</span>
            <textarea
              required
              value={preconditions}
              onChange={(e) => setPreconditions(e.target.value)}
              rows={4}
              className="rounded-md border border-outline-variant bg-surface-container px-3 py-2 text-body-sm text-on-surface outline-none focus:border-primary"
              placeholder="One precondition per line or separated by commas"
            />
          </label>
        </div>

        <div className="sticky bottom-0 z-10 mt-5 flex justify-end gap-2 border-t border-outline-variant bg-surface-container-lowest px-5 py-4">
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
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
