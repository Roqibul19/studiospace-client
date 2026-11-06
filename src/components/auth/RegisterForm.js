"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import GoogleButton from "@/components/auth/GoogleButton";
import { authClient } from "@/lib/auth-client";
import { getPasswordErrors, isValidHttpUrl } from "@/lib/validation";

const EMPTY_FORM = { name: "", email: "", image: "", password: "" };

export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState(EMPTY_FORM);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function showError(message) {
    setError(message);
    toast.error(message);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const invalidPassword = getPasswordErrors(form.password);
    setPasswordErrors(invalidPassword);
    if (invalidPassword.length) {
      toast.error(invalidPassword[0]);
      return;
    }
    if (!isValidHttpUrl(form.image.trim())) {
      showError("Please enter a valid photo URL starting with http or https.");
      return;
    }

    setLoading(true);
    const { error: signUpError } = await authClient.signUp.email({
      name: form.name.trim(),
      email: form.email.trim(),
      image: form.image.trim(),
      password: form.password,
    });

    if (signUpError) {
      showError(signUpError.message || "Registration failed. Please try again.");
      setLoading(false);
      return;
    }

    // Better Auth signs a new user in automatically, but this project sends
    // them to the Login page to sign in themselves.
    await authClient.signOut();
    toast.success("Account created. Please login to continue.");
    router.push("/login");
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-box border border-base-300 bg-base-200 p-6 sm:p-8">
      <h1 className="text-3xl font-bold">Register</h1>
      <p className="mt-2 text-sm text-base-content/70">
        Create your account to book studios or host your own space.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={updateField}
            autoComplete="name"
            placeholder="Your full name"
            className="input w-full bg-base-100"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={updateField}
            autoComplete="email"
            placeholder="you@example.com"
            className="input w-full bg-base-100"
          />
        </div>

        <div>
          <label htmlFor="image" className="mb-1 block text-sm font-medium">
            Photo URL
          </label>
          <input
            id="image"
            name="image"
            type="url"
            required
            value={form.image}
            onChange={updateField}
            placeholder="https://example.com/photo.jpg"
            className="input w-full bg-base-100"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={form.password}
            onChange={updateField}
            autoComplete="new-password"
            placeholder="Create a password"
            aria-describedby="password-help"
            className="input w-full bg-base-100"
          />
          {passwordErrors.length > 0 ? (
            <ul id="password-help" role="alert" className="mt-2 space-y-1 text-sm text-error">
              {passwordErrors.map((message) => (
                <li key={message}>{message}</li>
              ))}
            </ul>
          ) : (
            <p id="password-help" className="mt-2 text-xs text-base-content/60">
              At least 6 characters, with an uppercase and a lowercase letter.
            </p>
          )}
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
          Register
        </button>
      </form>

      <div className="divider text-sm text-base-content/60">or</div>
      <GoogleButton />

      <p className="mt-6 text-center text-sm text-base-content/70">
        Already have an account?{" "}
        <Link href="/login" className="link font-medium text-primary">
          Login
        </Link>
      </p>
    </div>
  );
}
