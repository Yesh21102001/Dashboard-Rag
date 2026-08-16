"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await login(email, password);
      router.push("/knowledge-base");
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <div className="w-full max-w-md">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-bold text-title-md mx-auto mb-3">
              EQ
            </div>
            <h1 className="font-headline-md text-headline-md text-on-surface">RAG-Test-Platform</h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Enterprise QA Workflow</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-label-caps text-label-caps text-on-surface-variant block mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2 bg-surface-container border border-outline-variant rounded-lg text-body-sm text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>

            <div>
              <label className="font-label-caps text-label-caps text-on-surface-variant block mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 bg-surface-container border border-outline-variant rounded-lg text-body-sm text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>

            {error && (
              <div className="px-4 py-2 bg-error/10 border border-error rounded-lg">
                <p className="text-body-sm text-error">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 bg-primary text-on-primary rounded-lg font-label-caps text-label-caps hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-outline-variant">
            <p className="text-body-sm text-on-surface-variant text-center">
              Don't have an account?{" "}
              <Link href="/auth/register" className="text-primary hover:text-primary/80 font-medium">
                Create one
              </Link>
            </p>
          </div>

          <div className="mt-4">
            <Link
              href="/auth/forgot-password"
              className="text-body-sm text-on-surface-variant hover:text-primary text-center block font-medium"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
