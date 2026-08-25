import React, { useState } from "react";

interface NewHierarchyItemModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (data: any) => void;
  parentType: "folder" | "epic" | "feature" | "story" | "testcase";
  moduleType: "userStories" | "testCases";
}

export default function NewHierarchyItemModal({
  open,
  onClose,
  onCreate,
  parentType,
  moduleType,
}: NewHierarchyItemModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "folder":
        return "Folder";
      case "epic":
        return "Epic";
      case "feature":
        return "Feature";
      case "story":
        return "User Story";
      case "testcase":
        return "Test Case";
      default:
        return "Item";
    }
  };

  const determineItemType = () => {
    if (parentType === "epic") return "feature";
    if (parentType === "feature") {
      return moduleType === "userStories" ? "story" : "testcase";
    }
    return "epic";
  };

  const itemType = determineItemType();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter a name");
      return;
    }

    setLoading(true);
    try {
      await onCreate({
        name: name.trim(),
        type: itemType,
        description: description.trim(),
      });
      setName("");
      setDescription("");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-on-surface">
            New {getTypeLabel(itemType)}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-on-surface-variant hover:text-on-surface"
          >
            ×
          </button>
        </div>

        {parentType !== "epic" && (
          <div className="mb-4 text-xs text-on-surface-variant">
            {getTypeLabel(parentType)}: <span className="font-semibold">{getTypeLabel(parentType)}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-on-surface mb-2">
              Title
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={`e.g., ${
                itemType === "epic"
                  ? "User Authentication"
                  : itemType === "feature"
                  ? "Social Login"
                  : "Display login button"
              }`}
              autoFocus
              className="w-full px-3 py-2 border border-outline rounded text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface mb-2">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details about this item..."
              rows={3}
              className="w-full px-3 py-2 border border-outline rounded text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              disabled={loading}
            />
          </div>

          <div className="flex gap-2 justify-end pt-4 border-t border-outline">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-outline text-on-surface text-sm font-medium hover:bg-surface-container-high transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors disabled:bg-primary/50"
              disabled={loading}
            >
              {loading ? "Creating..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
