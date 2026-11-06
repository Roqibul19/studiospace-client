"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import GoogleButton from "@/components/auth/GoogleButton";
import { authClient } from "@/lib/auth-client";
import { safeRedirect } from "@/lib/validation";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = safeRedirect(searchParams.get("redirect"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const { error: loginError } = await authClient.signIn.email({
      email: email.trim(),
      password,
    });

    if (loginError) {
      const message = loginError.message || "Login failed. Please try again.";
      setError(message);
      toast.error(message);
      setLoading(false);
      return;
    }

    toast.success("Welcome back to StudioSpace!");
    router.push(redirectTo);
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-box border border-base-300 bg-base-200 p-6 sm:p-8">
      <h1 className="text-3xl font-bold">Login</h1>
      <p className="mt-2 text-sm text-base-content/70">
        Welcome back. Sign in to manage your studios and bookings.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            placeholder="you@example.com"
            className="input w-full bg-base-100"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            placeholder="Your password"
            className="input w-full bg-base-100"
          />
          <div className="mt-2 text-right">
            <button
              type="button"
              onClick={() =>
                toast.info("Password reset is not available right now.")
              }
              className="link link-hover text-sm text-base-content/70"
            >
              Forgot Password?
            </button>
          </div>
        </div>

        {error && (
          <p role="alert" className="text-sm text-error">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading && <span className="loading loading-spinner loading-sm" />}
          Login
        </button>
      </form>

      <div className="divider text-sm text-base-content/60">or</div>
      <GoogleButton callbackURL={redirectTo} />

      <p className="mt-6 text-center text-sm text-base-content/70">
        New to StudioSpace?{" "}
        <Link href="/register" className="link font-medium text-primary">
          Register
        </Link>
      </p>
    </div>
  );
}
