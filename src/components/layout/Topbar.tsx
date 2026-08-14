import Image from "next/image";
import Icon from "@/components/ui/Icon";
import SearchBar from "./SearchBar";

export default function Topbar() {
  return (
    <header className="bg-surface-container-lowest text-primary border-b border-outline-variant flex justify-between items-center w-full px-md h-12 z-50 sticky top-0 transition-colors duration-150 ease-in-out">
      <div className="flex items-center gap-lg">
        <span className="font-headline-md text-headline-md font-bold text-primary">
          RAG-Test-Platform
        </span>
        <SearchBar />
      </div>

      <div className="flex items-center gap-md">
        {/* Trailing Secondary Action */}
        <div className="flex items-center gap-xs text-secondary px-sm py-1 rounded bg-secondary-container bg-opacity-20">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-label-caps text-label-caps text-on-surface">
            RAG Sync Active
          </span>
        </div>

        {/* Trailing Icon Actions */}
        <button className="text-on-surface-variant hover:bg-surface-container p-xs rounded-sm transition-colors">
          <Icon name="notifications" />
        </button>
        <button className="text-on-surface-variant hover:bg-surface-container p-xs rounded-sm transition-colors">
          <Icon name="smart_toy" />
        </button>

        {/* Profile */}
        <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center ml-sm overflow-hidden border border-outline-variant">
          <Image
            alt="User Profile"
            className="w-full h-full object-cover"
            width={32}
            height={32}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBObsEjTkdZAySe9YrWS-0bGvWqa6W4RypDLza9P4P16LgG3l5W0cgFXDZPEaBy-0-DD_3f8UeBZpuMj14wHWtL934qtiUyDZAl1OVQffjJp6FgVLkd8i-t1jEeorNwrIWMKfhDzwuK4Ejko3ISaZ-Om-9r_fWWDytjsuZZ5y5L0GKOnvC54fB_7m-ZljVN8_8XGOI5BbP-DhSsbCrGX7XD8o_ppHAjrXSZJFb4R4a9EV-CcKMDayqr"
          />
        </div>
      </div>
    </header>
  );
}
