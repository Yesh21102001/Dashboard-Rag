"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoading) {
      if (isAuthenticated) {
        router.push("/knowledge-base");
      } else {
        router.push("/auth/login");
      }
    }
  }, [isAuthenticated, isLoading, router, mounted]);

  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <p className="text-on-surface-variant">Redirecting...</p>
    </div>
  );
}
