import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <section className="px-4 py-12 sm:py-16">
      <RegisterForm />
    </section>
  );
}
