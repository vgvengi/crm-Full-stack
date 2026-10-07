import { type FormEvent, type ReactNode, useState } from "react";
import { FiArrowRight, FiLock, FiMail, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/users", {
        body: JSON.stringify({ name: fullName, email, password }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const data: { message?: string; success?: boolean } = await response
        .json()
        .catch(() => ({}));

      if (!response.ok || !data.success) {
        setError(data.message ?? "Unable to create your account. Please try again.");
        return;
      }

      navigate("/dashboard");
    } catch (requestError) {
      console.error("Account creation request failed:", requestError);
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f8fb] px-5 py-8 sm:px-8 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:p-0">
      <section className="relative hidden overflow-hidden bg-[#0b4f4a] px-12 py-14 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:28px_28px]" />
        <div className="relative flex items-center gap-3 text-xl font-bold">
          <span className="grid size-10 place-items-center rounded-lg bg-[#ff7a59] text-lg">
            H
          </span>
          HubSpot CRM
        </div>
        <div className="relative max-w-xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#9de0d2]">
            Sales workspace
          </p>
          <h1 className="text-5xl font-semibold leading-tight">
            Build stronger customer relationships from day one.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-[#d6f3ed]">
            Bring your contacts, companies, and deals into one focused workspace.
          </p>
        </div>
        <p className="relative text-sm text-[#b8dfd8]">HubSpot CRM workspace</p>
      </section>

      <section className="mx-auto flex w-full max-w-md items-center lg:max-w-none lg:px-[max(3rem,12%)]">
        <div className="w-full">
          <div className="mb-10 flex items-center gap-3 text-xl font-bold text-[#0b4f4a] lg:hidden">
            <span className="grid size-10 place-items-center rounded-lg bg-[#ff7a59] text-lg text-white">
              H
            </span>
            HubSpot CRM
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#2f6f68]">
            Get started
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">
            Create your account
          </h1>
          <p className="mt-3 text-slate-600">
            Start organizing your customer relationships in one place.
          </p>

          <form className="mt-9 space-y-5" onSubmit={handleSubmit}>
            <FormField
              autoComplete="name"
              icon={<FiUser size={18} />}
              label="Full name"
              onChange={setFullName}
              placeholder="Your full name"
              type="text"
              value={fullName}
            />
            <FormField
              autoComplete="email"
              icon={<FiMail size={18} />}
              label="Email address"
              onChange={setEmail}
              placeholder="you@company.com"
              type="email"
              value={email}
            />
            <FormField
              autoComplete="new-password"
              icon={<FiLock size={18} />}
              label="Password"
              minLength={8}
              onChange={setPassword}
              placeholder="At least 8 characters"
              type="password"
              value={password}
            />
            <FormField
              autoComplete="new-password"
              icon={<FiLock size={18} />}
              label="Confirm password"
              minLength={8}
              onChange={setConfirmPassword}
              placeholder="Re-enter your password"
              type="password"
              value={confirmPassword}
            />

            {error && (
              <p aria-live="polite" className="text-sm font-medium text-red-600">
                {error}
              </p>
            )}

            <button
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#0b5f5a] font-semibold text-white transition hover:bg-[#084d49] focus:outline-none focus:ring-2 focus:ring-[#0b7a75] focus:ring-offset-2"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Creating account..." : "Create account"} <FiArrowRight size={18} />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link className="font-semibold text-[#0b6b66] hover:underline" to="/">
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

type FormFieldProps = {
  autoComplete: string;
  icon: ReactNode;
  label: string;
  minLength?: number;
  onChange: (value: string) => void;
  placeholder: string;
  type: "email" | "password" | "text";
  value: string;
};

function FormField({
  autoComplete,
  icon,
  label,
  minLength,
  onChange,
  placeholder,
  type,
  value,
}: FormFieldProps) {
  return (
    <label className="block space-y-2 text-sm font-semibold text-slate-800">
      <span>{label}</span>
      <span className="flex h-12 items-center gap-3 rounded-lg border border-slate-300 bg-white px-4 transition focus-within:border-[#0b7a75] focus-within:ring-2 focus-within:ring-[#0b7a75]/20">
        <span className="shrink-0 text-slate-500">{icon}</span>
        <input
          autoComplete={autoComplete}
          className="min-w-0 flex-1 bg-transparent font-normal text-slate-900 outline-none placeholder:text-slate-400"
          minLength={minLength}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          required
          type={type}
          value={value}
        />
      </span>
    </label>
  );
}
