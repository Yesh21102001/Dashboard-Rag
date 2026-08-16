"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { useAuth } from "@/context/AuthContext";

export default function GridTopbar() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [menuOpen]);

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <header className="flex justify-between items-center w-full px-md h-12 z-50 bg-surface-container-lowest border-b border-outline-variant shrink-0 transition-colors duration-150 ease-in-out">
      <div className="flex items-center gap-md">
        <span className="font-headline-md text-headline-md font-bold text-primary">
          RAG-Test-Platform
        </span>
      </div>

      <div className="flex items-center gap-sm">
        <div className="relative hidden md:block mr-md">
          <Icon
            name="search"
            className="absolute left-2 top-1/2 -translate-y-1/2 text-outline-variant text-[18px]"
          />
          <input
            className="pl-8 pr-3 py-1 bg-surface-container border border-outline-variant rounded-DEFAULT text-body-sm focus:outline-none focus:border-primary transition-colors h-7 w-64 text-on-surface placeholder:text-outline"
            placeholder="Search..."
            type="text"
          />
        </div>

        <div className="flex items-center gap-xs">
          <button className="w-8 h-8 flex items-center justify-center rounded-DEFAULT text-on-surface-variant hover:bg-surface-container transition-colors duration-150 ease-in-out">
            <Icon name="notifications" className="text-[20px]" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-DEFAULT text-on-surface-variant hover:bg-surface-container transition-colors duration-150 ease-in-out">
            <Icon name="smart_toy" className="text-[20px]" />
          </button>
        </div>

        <div className="h-5 w-px bg-outline-variant mx-sm" />

        <span className="font-label-caps text-label-caps text-primary-container px-2 py-1 bg-secondary-container rounded-DEFAULT flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-primary block" />
          RAG Sync Active
        </span>

        <div className="relative ml-sm" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-7 h-7 rounded-full bg-surface-variant flex items-center justify-center border border-outline-variant overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
          >
            <div className="w-full h-full flex items-center justify-center bg-primary-container text-on-primary font-bold text-[12px]">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
          </button>

          {menuOpen && (
            <div className="absolute top-10 right-0 bg-surface-container border border-outline-variant rounded-lg shadow-lg z-50 min-w-[180px]">
              <div className="px-4 py-2 border-b border-outline-variant">
                <p className="text-[12px] font-semibold text-on-surface">{user?.name}</p>
                <p className="text-[11px] text-on-surface-variant">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-[12px] text-on-surface hover:bg-surface-variant transition-colors flex items-center gap-2"
              >
                <Icon name="logout" className="text-[14px]" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
