import Icon from "@/components/ui/Icon";

export default function SearchBar() {
  return (
    <div className="relative w-64 hidden md:block">
      <Icon
        name="search"
        className="absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]"
      />
      <input
        className="w-full pl-8 pr-sm py-1 bg-surface border border-outline-variant rounded-sm font-body-sm text-body-sm focus:outline-none focus:border-primary transition-colors"
        placeholder="Search knowledge..."
        type="text"
      />
    </div>
  );
}
