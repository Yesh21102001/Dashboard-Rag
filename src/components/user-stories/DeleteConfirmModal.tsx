"use client";

import Icon from "@/components/ui/Icon";

interface DeleteConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  storyCode: string;
}

export default function DeleteConfirmModal({ open, onClose, onConfirm, storyCode }: DeleteConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden p-5 box-border">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative z-10 w-[400px] max-w-[calc(100vw-32px)] rounded-lg border border-outline-variant bg-surface-container-lowest shadow-xl box-border">
        <div className="p-5 flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-error/20 flex items-center justify-center flex-shrink-0">
              <Icon name="warning" className="text-[20px] text-error" />
            </div>
            <div className="flex-1">
              <h2 className="font-title-sm text-title-sm text-on-surface">Delete Story</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Are you sure you want to delete story <span className="font-semibold text-error">{storyCode}</span>? This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-outline-variant pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-outline-variant px-4 py-2 text-body-sm text-on-surface hover:bg-surface-variant"
            >
              No, Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="rounded-md bg-error px-4 py-2 text-body-sm font-medium text-on-error hover:bg-error/90"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
