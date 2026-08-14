import Icon from "@/components/ui/Icon";

export default function TreeFilterBar() {
  return (
    <div className="p-2 border-b border-outline-variant bg-surface-container">
      <div className="relative">
        <span
          className="material-symbols-outlined absolute left-2 top-1.5 text-on-surface-variant"
          style={{ fontSize: "16px" }}
        >
          filter_list
        </span>
        <input
          className="w-full pl-8 pr-2 py-1 bg-surface-container-lowest border border-outline-variant rounded-DEFAULT text-body-sm focus:border-primary outline-none transition-all"
          placeholder="Filter tree..."
          type="text"
        />
      </div>
    </div>
  );
}
