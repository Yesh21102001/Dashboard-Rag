import Image from "next/image";
import Icon from "@/components/ui/Icon";

export default function TreeTopbar() {
  return (
    <nav className="bg-surface-container-lowest border-b border-outline-variant flex justify-between items-center w-full px-md h-12 z-50 fixed top-0 transition-colors duration-150 ease-in-out">
      <div className="flex items-center gap-md">
        <span className="font-headline-md text-headline-md font-bold text-primary">
          RAG-Test-Platform
        </span>
      </div>

      <div className="flex items-center gap-md">
        <div className="relative hidden md:block">
          <span
            className="material-symbols-outlined absolute left-2 top-1.5 text-on-surface-variant"
            style={{ fontSize: "18px" }}
          >
            search
          </span>
          <input
            className="pl-8 pr-3 py-1 bg-surface-container border border-outline-variant rounded-DEFAULT focus:border-primary focus:ring-1 focus:ring-primary text-body-sm w-64 text-on-surface outline-none transition-all"
            placeholder="Search across workspace..."
            type="text"
          />
        </div>

        <div className="flex items-center gap-sm">
          <button className="p-1.5 hover:bg-surface-container rounded-DEFAULT text-on-surface-variant transition-colors">
            <Icon name="notifications" />
          </button>
          <button className="p-1.5 hover:bg-surface-container rounded-DEFAULT text-on-surface-variant transition-colors">
            <Icon name="smart_toy" />
          </button>
        </div>

        <div className="h-6 w-px bg-outline-variant mx-1" />

        <div className="flex items-center gap-sm">
          <span className="font-label-caps text-label-caps text-secondary">RAG Sync Active</span>
          <div className="w-6 h-6 rounded-full bg-primary-container flex items-center justify-center overflow-hidden shrink-0">
            <Image
              alt="User Profile"
              className="w-full h-full object-cover"
              width={24}
              height={24}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxm9W9hcn5w7yJUg7BG4XR_ReURY6RzEmAA489aSDY9M06PYo5rRxZ3sWOKOdoxmSV4YPdJMJRK57RkcHfqzuuoNG17hXPOmj8EAwFdFu9fv5EZ6Wbh6BcP5H1WhkDYmw5Lbq05jqc4oB63x0j9zDQBKgZNUsitruHt7xQ_CHRihoEIRzSTxWL2VjG_X25anLsLGBXY5Z0F04MDFQSwVY8SEpbcnGJivZq1LpbkRSsc0wZFWqMwfbW"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
