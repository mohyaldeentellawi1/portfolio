"use client";

import { useState, useTransition } from "react";
import { Lock, Loader2, Eye, EyeOff } from "lucide-react";
import { dashboardLoginAction } from "@/lib/actions/auth/action";

export default function DashboardLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      const result = await dashboardLoginAction(password);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
            <Lock size={20} className="text-primary" />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground mb-1">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your password to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              required
              className="w-full h-10 rounded border border-input bg-background px-3 pe-10 text-sm
                         text-foreground placeholder:text-muted-foreground
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                         transition-shadow duration-200"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 inset-e-0 flex items-center px-3 text-muted-foreground
                         hover:text-foreground transition-colors duration-200
                         focus-visible:outline-none"
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

          {error && (
            <p className="text-xs text-destructive text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isPending || !password}
            className="h-10 w-full rounded bg-primary text-sm font-medium text-primary-foreground
                       hover:bg-primary/85 active:scale-[0.98] transition-colors duration-200
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
                       inline-flex items-center justify-center gap-2"
          >
            {isPending ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              "Sign in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
