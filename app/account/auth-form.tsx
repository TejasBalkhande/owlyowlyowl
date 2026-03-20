"use client";

import { useActionState, useState } from "react";
import { login, signUp } from "./actions";

export default function AuthForm() {
  const [loginState, loginAction, isLoginPending] = useActionState(login, null);
  const [signUpState, signUpAction, isSignUpPending] = useActionState(signUp, null);
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="font-['DM_Sans',sans-serif]">
      {/* Tabs */}
      <div className="flex gap-1 rounded-[10px] bg-slate-100 p-1 mb-7">
        <button
          className={`flex-1 rounded-[7px] py-[9px] text-sm font-semibold border-none bg-transparent text-slate-400 cursor-pointer transition-colors duration-200 ${
            isLoginView ? "bg-white text-slate-900 shadow-sm" : "hover:text-slate-600"
          }`}
          onClick={() => setIsLoginView(true)}
        >
          Sign In
        </button>
        <button
          className={`flex-1 rounded-[7px] py-[9px] text-sm font-semibold border-none bg-transparent text-slate-400 cursor-pointer transition-colors duration-200 ${
            !isLoginView ? "bg-white text-slate-900 shadow-sm" : "hover:text-slate-600"
          }`}
          onClick={() => setIsLoginView(false)}
        >
          Create Account
        </button>
      </div>

      <div key={isLoginView ? "login" : "signup"}>
        {isLoginView ? (
          <form action={loginAction}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-700">Email address</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 flex text-slate-400 pointer-events-none">
                    <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="w-full h-11 pl-10 pr-3.5 border border-slate-200 rounded-[10px] bg-white font-['DM_Sans',sans-serif] text-sm text-slate-900 outline-none transition-colors focus:border-[#1e3a5f] focus:shadow-[0_0_0_3px_rgba(30,58,95,0.09)]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-700">Password</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 flex text-slate-400 pointer-events-none">
                    <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="w-full h-11 pl-10 pr-3.5 border border-slate-200 rounded-[10px] bg-white font-['DM_Sans',sans-serif] text-sm text-slate-900 outline-none transition-colors focus:border-[#1e3a5f] focus:shadow-[0_0_0_3px_rgba(30,58,95,0.09)]"
                  />
                </div>
              </div>

              {loginState?.error && (
                <div className="flex items-start gap-2 p-3 rounded-lg text-xs font-medium bg-red-50 border border-red-200 text-red-700">
                  <span className="flex-shrink-0 mt-0.5">
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  {loginState.error}
                </div>
              )}

              <button
                disabled={isLoginPending}
                className="mt-1 w-full h-12 rounded-[11px] border-0 cursor-pointer font-['DM_Sans',sans-serif] text-sm font-semibold flex items-center justify-center gap-2 bg-[#1e3a5f] text-white shadow-lg hover:bg-[#163050] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoginPending ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in…
                  </>
                ) : (
                  <>
                    Sign In
                    <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <form action={signUpAction}>
            <div className="flex flex-col gap-4">
              {/* Two-column grid for input fields */}
              <div className="grid grid-cols-2 gap-3">
                {/* Username */}
                <div className="flex flex-col gap-1.5 col-span-1">
                  <label className="text-xs font-semibold text-gray-700">Username</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 flex text-slate-400 pointer-events-none">
                      <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                    <input
                      name="username"
                      type="text"
                      placeholder="your_handle"
                      required
                      className="w-full h-11 pl-10 pr-3.5 border border-slate-200 rounded-[10px] bg-white font-['DM_Sans',sans-serif] text-sm text-slate-900 outline-none transition-colors focus:border-[#1e3a5f] focus:shadow-[0_0_0_3px_rgba(30,58,95,0.09)]"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5 col-span-1">
                  <label className="text-xs font-semibold text-gray-700">Email address</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 flex text-slate-400 pointer-events-none">
                      <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <input
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="w-full h-11 pl-10 pr-3.5 border border-slate-200 rounded-[10px] bg-white font-['DM_Sans',sans-serif] text-sm text-slate-900 outline-none transition-colors focus:border-[#1e3a5f] focus:shadow-[0_0_0_3px_rgba(30,58,95,0.09)]"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5 col-span-1">
                  <label className="text-xs font-semibold text-gray-700">Password</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 flex text-slate-400 pointer-events-none">
                      <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                    <input
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="w-full h-11 pl-10 pr-3.5 border border-slate-200 rounded-[10px] bg-white font-['DM_Sans',sans-serif] text-sm text-slate-900 outline-none transition-colors focus:border-[#1e3a5f] focus:shadow-[0_0_0_3px_rgba(30,58,95,0.09)]"
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-1.5 col-span-1">
                  <label className="text-xs font-semibold text-gray-700">Confirm Password</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 flex text-slate-400 pointer-events-none">
                      <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    <input
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="w-full h-11 pl-10 pr-3.5 border border-slate-200 rounded-[10px] bg-white font-['DM_Sans',sans-serif] text-sm text-slate-900 outline-none transition-colors focus:border-[#1e3a5f] focus:shadow-[0_0_0_3px_rgba(30,58,95,0.09)]"
                    />
                  </div>
                </div>
              </div>

              {signUpState?.error && (
                <div className="flex items-start gap-2 p-3 rounded-lg text-xs font-medium bg-red-50 border border-red-200 text-red-700">
                  <span className="flex-shrink-0 mt-0.5">
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  {signUpState.error}
                </div>
              )}
              {signUpState?.success && (
                <div className="flex items-start gap-2 p-3 rounded-lg text-xs font-medium bg-green-50 border border-green-200 text-green-700">
                  <span className="flex-shrink-0 mt-0.5">
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {signUpState.success}
                </div>
              )}

              <button
                disabled={isSignUpPending}
                className="mt-1 w-full h-12 rounded-[11px] border-0 cursor-pointer font-['DM_Sans',sans-serif] text-sm font-semibold flex items-center justify-center gap-2 bg-[#1e3a5f] text-white shadow-lg hover:bg-[#163050] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isSignUpPending ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating account…
                  </>
                ) : (
                  <>
                    Create Account
                    <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        <div className="mt-5 text-center text-sm text-slate-500">
          {isLoginView ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                className="bg-none border-0 cursor-pointer font-['DM_Sans',sans-serif] text-sm font-semibold text-[#1e3a5f] p-0 hover:text-[#163050] hover:underline"
                onClick={() => setIsLoginView(false)}
              >
                Sign up free
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                className="bg-none border-0 cursor-pointer font-['DM_Sans',sans-serif] text-sm font-semibold text-[#1e3a5f] p-0 hover:text-[#163050] hover:underline"
                onClick={() => setIsLoginView(true)}
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}