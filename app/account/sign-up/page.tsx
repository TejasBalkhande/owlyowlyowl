"use client";

import { useActionState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signup } from "@/actions/auth";

export default function SignUpPage() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(signup, null);
  const redirecting = useRef(false);

  // Show success message and redirect after a short delay
  useEffect(() => {
    if (state?.success && !redirecting.current) {
      redirecting.current = true;
      const timer = setTimeout(() => {
        router.push("/account/dashboard");
      }, 100); // 2 second delay to show the message
      return () => clearTimeout(timer);
    }
  }, [state?.success, router]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left side - Sign-up form */}
      <div className="w-full md:w-2/5 bg-white flex flex-col h-full overflow-auto">
        {/* Logo */}
        <div className="flex items-center p-2 md:p-2 lg:p-3 lg:mb-10 md:mb-10 mb-8">
          <div className="relative flex items-center justify-center">
            <Image
              src="/logo-c.png"
              alt="OwlenForge"
              width={50}
              height={50}
              priority
              className="object-contain"
            />
          </div>
          <span className="ml-3 text-2xl font-times font-medium text-stone-800">
            OwlenForge
          </span>
        </div>

        {/* Form */}
        <div className="flex-1 flex flex-col justify-center px-4 md:px-6 lg:px-8 pb-8">
          <h1 className="text-2xl font-bold text-stone-800 mb-3 tracking-tight">
            Create an account
          </h1>
          <p className="text-stone-600 mb-8 text-base leading-relaxed">
            Sign up to start your exam preparation journey.
          </p>

          {/* Success message */}
          {state?.success && (
            <div className="mb-6 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
              🎉 Account created successfully! Redirecting to dashboard...
            </div>
          )}

          {/* Error message */}
          {state?.error && !state.success && (
            <div className="mb-6 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              {state.error}
            </div>
          )}

          <form action={formAction} className="space-y-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-stone-700 mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                disabled={state?.success} // disable form after success
                className="w-full px-5 py-2 border border-stone-200 rounded-xl focus:ring-4 focus:ring-amber-200 focus:border-amber-600 outline-none transition-all bg-white text-stone-800 placeholder-stone-400 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="johndoe"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                disabled={state?.success}
                className="w-full px-5 py-2 border border-stone-200 rounded-xl focus:ring-4 focus:ring-amber-200 focus:border-amber-600 outline-none transition-all bg-white text-stone-800 placeholder-stone-400 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="name@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                disabled={state?.success}
                className="w-full px-5 py-2 border border-stone-200 rounded-xl focus:ring-4 focus:ring-amber-200 focus:border-amber-600 outline-none transition-all bg-white text-stone-800 placeholder-stone-400 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="········"
              />
            </div>

            {/* Confirm Password – client‑side check only (optional) */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-stone-700 mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                disabled={state?.success}
                className="w-full px-5 py-2 border border-stone-200 rounded-xl focus:ring-4 focus:ring-amber-200 focus:border-amber-600 outline-none transition-all bg-white text-stone-800 placeholder-stone-400 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="········"
                onChange={(e) => {
                  // simple inline match check
                  const pwd = (document.getElementById("password") as HTMLInputElement).value;
                  if (e.target.value && e.target.value !== pwd) {
                    e.target.setCustomValidity("Passwords do not match");
                  } else {
                    e.target.setCustomValidity("");
                  }
                }}
              />
            </div>

            <button
              type="submit"
              disabled={pending || state?.success}
              className="w-full bg-[#1E4A76] text-white py-3 px-4 rounded-xl hover:bg-[#1E4A76]/90 transition-all shadow-lg hover:shadow-xl font-medium text-base tracking-wide transform hover:-translate-y-0.5 active:translate-y-0 focus:ring-4 focus:ring-amber-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {pending ? "Signing up..." : "Sign up"}
            </button>
          </form>

          <p className="text-center text-sm text-stone-600 mt-8">
            Already have an account?{" "}
            <Link
              href="/account/login"
              className="text-[#1E4A76] font-semibold hover:text-amber-800 hover:underline underline-offset-2 transition-all"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Cover image (unchanged) */}
      <div
        className="hidden md:block md:w-3/5 relative bg-cover bg-center"
        style={{ backgroundImage: "url('/account/Cover4.png')" }}
      >
        <div className="absolute inset-0 flex flex-col justify-start px-8 pt-7 text-white">
          <h2 className="text-2xl font-serif italic leading-tight max-w-xl drop-shadow-xl">
            “At the end of the day, you&apos;ve gotta feel some way. So why not feel unbeatable?”
          </h2>
          <div className="mt-1 w-16 h-1 bg-amber-400 rounded-full"></div>
        </div>

        <Image
          src="/account/welcome1.png"
          alt="Welcome"
          width={200}
          height={200}
          className="w-40 mt-5 mr-4 absolute bottom-0 right-0"
        />

        <div className="absolute inset-0 bg-[url('/account/pattern.svg')] opacity-10 mix-blend-overlay"></div>
      </div>
    </div>
  );
}