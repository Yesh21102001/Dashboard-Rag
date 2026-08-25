import React, { useState } from "react";

interface NewFolderModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (folderData: any) => void;
  parentId?: string | null;
}

export default function NewFolderModal({
  open,
  onClose,
  onCreate,
  parentId,
}: NewFolderModalProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState<"folder" | "epic" | "feature">("folder");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter a name");
      return;
    }

    setLoading(true);
    try {
      await onCreate({
        name,
        type,
        description,
        parentId,
      });
      setName("");
      setType("folder");
      setDescription("");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-surface-container rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold text-on-surface mb-4">Create New Folder</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-on-surface mb-1">
              Folder Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter folder name"
              className="w-full px-3 py-2 border border-outline rounded bg-surface-container text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface mb-1">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full px-3 py-2 border border-outline rounded bg-surface-container text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={loading}
            >
              <option value="folder">Folder</option>
              <option value="epic">Epic</option>
              <option value="feature">Feature</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface mb-1">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              rows={3}
              className="w-full px-3 py-2 border border-outline rounded bg-surface-container text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={loading}
            />
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-outline text-on-surface hover:bg-surface-container-high"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/90 disabled:bg-primary/50"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
