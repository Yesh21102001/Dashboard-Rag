"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export function ProtectedLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-on-surface-variant">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push("/auth/login");
    return null;
  }

  return <>{children}</>;
}
