import { Suspense } from "react";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <section className="px-4 py-12 sm:py-16">
      <Suspense
        fallback={
          <div className="flex justify-center py-24">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </section>
  );
}
