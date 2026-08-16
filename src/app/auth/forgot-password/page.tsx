"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSubmitted(true);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <div className="w-full max-w-md">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-bold text-title-md mx-auto mb-3">
              EQ
            </div>
            <h1 className="font-headline-md text-headline-md text-on-surface">Reset Password</h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              {submitted ? "Check your email" : "We'll help you reset your password"}
            </p>
          </div>

          {!submitted ? (
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

              <p className="text-body-sm text-on-surface-variant">
                Enter the email address associated with your account, and we'll send you a link to reset your password.
              </p>

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
                {isLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-secondary-container/30 border border-secondary rounded-lg">
                <p className="text-body-sm text-on-surface">
                  We've sent a password reset link to <span className="font-semibold">{email}</span>
                </p>
              </div>
              <p className="text-body-sm text-on-surface-variant">
                Check your email for a link to reset your password. If you don't see it, check your spam folder.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="w-full px-4 py-2 bg-surface-container border border-outline-variant text-on-surface rounded-lg font-label-caps text-label-caps hover:bg-surface-variant transition-colors"
              >
                Try Another Email
              </button>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-outline-variant">
            <p className="text-body-sm text-on-surface-variant text-center">
              Remember your password?{" "}
              <Link href="/auth/login" className="text-primary hover:text-primary/80 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
