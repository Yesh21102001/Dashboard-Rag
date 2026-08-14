import Icon from "@/components/ui/Icon";

export default function ConnectSourceButton() {
  return (
    <button className="bg-primary-container text-on-primary rounded-sm px-md py-sm font-label-caps text-label-caps hover:opacity-90 flex items-center gap-xs transition-opacity shadow-sm">
      <Icon name="add_link" className="text-[18px]" />
      Connect Source
    </button>
  );
}
