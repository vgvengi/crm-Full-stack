import { type FormEvent, useState } from "react";
import { FiArrowRight, FiLock, FiMail } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate("/");
  }

  return (
    <main
      className="min-h-screen bg-[#f6f8fb] px-5 py-8 sm:px-8 lg:grid
     lg:grid-cols-[1.15fr_0.85fr] lg:p-0"
    >
      <section
        className="relative hidden overflow-hidden bg-[#0b4f4a]
       px-12 py-14 text-white lg:flex lg:flex-col lg:justify-between"
      >
        <div
          className="absolute inset-0 bg-[linear-gradient(135deg,
        rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:28px_28px]"
        />
        <div className="relative flex items-center gap-3 text-xl font-bold">
          <span
            className="grid size-10 place-items-center rounded-lg
           bg-[#ff7a59] text-lg"
          >
            H
          </span>
          HubSpot CRM
        </div>
        <div className="relative max-w-xl">
          <p
            className="mb-5 text-sm font-semibold uppercase 
          tracking-[0.18em] text-[#9de0d2]"
          >
            Sales workspace
          </p>
          <h1 className="text-5xl font-semibold leading-tight">
            Keep every customer conversation moving forward.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-[#d6f3ed]">
            Manage contacts, companies, and deals from one focused workspace.
          </p>
        </div>
        <p className="relative text-sm text-[#b8dfd8]">HubSpot CRM workspace</p>
      </section>

      <section
        className="mx-auto flex w-full max-w-md items-center 
      lg:max-w-none lg:px-[max(3rem,12%)]"
      >
        <div className="w-full">
          <div
            className="mb-10 flex items-center gap-3 text-xl 
          font-bold text-[#0b4f4a] lg:hidden"
          >
            <span
              className="grid size-10 place-items-center rounded-lg
             bg-[#ff7a59] text-lg text-white"
            >
              H
            </span>
            HubSpot CRM
          </div>
          <p
            className="text-sm font-semibold uppercase
           tracking-[0.14em] text-[#2f6f68]"
          >
            Welcome back
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">
            Sign in to your account
          </h1>
          <p className="mt-3 text-slate-600">
            Enter your details to access your sales workspace.
          </p>

          <form className="mt-9 space-y-5" onSubmit={handleSubmit}>
            <label
              className="block space-y-2 text-sm font-semibold 
            text-slate-800"
            >
              <span>Email address</span>
              <span
                className="flex h-12 items-center gap-3 rounded-lg
               border border-slate-300 bg-white px-4 transition 
               focus-within:border-[#0b7a75] focus-within:ring-2
                focus-within:ring-[#0b7a75]/20"
              >
                <FiMail className="shrink-0 text-slate-500" size={18} />
                <input
                  autoComplete="email"
                  className="min-w-0 flex-1 bg-transparent 
                  font-normal text-slate-900 outline-none
                  ` placeholder:text-slate-400"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@company.com"
                  required
                  type="email"
                  value={email}
                />
              </span>
            </label>

            <label className="block space-y-2 text-sm font-semibold text-slate-800">
              <span>Password</span>
              <span className="flex h-12 items-center gap-3 rounded-lg border border-slate-300 bg-white px-4 transition focus-within:border-[#0b7a75] focus-within:ring-2 focus-within:ring-[#0b7a75]/20">
                <FiLock className="shrink-0 text-slate-500" size={18} />
                <input
                  autoComplete="current-password"
                  className="min-w-0 flex-1 bg-transparent font-normal text-slate-900 outline-none placeholder:text-slate-400"
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  required
                  type="password"
                  value={password}
                />
              </span>
            </label>

            <div className="flex items-center justify-between gap-4 text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input className="size-4 accent-[#0b6b66]" type="checkbox" />
                Remember me
              </label>
              <a
                className="font-semibold text-[#0b6b66] hover:underline"
                href="#forgot-password"
              >
                Forgot password?
              </a>
            </div>

            <button
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#0b5f5a] font-semibold text-white transition hover:bg-[#084d49] focus:outline-none focus:ring-2 focus:ring-[#0b7a75] focus:ring-offset-2"
              type="submit"
            >
              Sign in <FiArrowRight size={18} />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600">
            New to HubSpot CRM?{" "}
            <Link className="font-semibold text-[#0b6b66] hover:underline" to="/sign-up">
              Create an account
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
