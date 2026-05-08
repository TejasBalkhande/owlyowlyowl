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

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-300 text-[#1e3a5f] focus:ring-[#1e3a5f]"
                  />
                  <span className="text-xs text-slate-600">Remember me</span>
                </label>
                <button type="button" className="text-xs font-medium text-[#1e3a5f] hover:underline bg-transparent border-0 cursor-pointer p-0">
                  Forgot password?
                </button>
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
                className="mt-1 w-full h-12 rounded-[11px] border-0 cursor-pointer font-['DM_Sans',sans-serif] text-sm font-semibold flex items-center justify-center gap-2 bg-[#1e3a5f] text-white shadow-lg hover:bg-[#163050] transition-all"
              >
                {isLoginPending ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In
                    <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>

              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-2 text-slate-400 font-medium uppercase tracking-tighter">Secure Login</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button type="button" className="flex items-center justify-center h-11 rounded-[10px] border border-slate-200 bg-white hover:bg-slate-50 transition-all">
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </button>
                <button type="button" className="flex items-center justify-center h-11 rounded-[10px] border border-slate-200 bg-white hover:bg-slate-50 transition-all">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="black"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.28 2.67-2.43 4.69-3.74 4.25z" /></svg>
                </button>
                <button type="button" className="flex items-center justify-center h-11 rounded-[10px] border border-slate-200 bg-white hover:bg-slate-50 transition-all">
                  <svg width="18" height="18" viewBox="0 0 24 24"><rect x="1" y="1" width="10" height="10" fill="#F25022" /><rect x="13" y="1" width="10" height="10" fill="#7FBA00" /><rect x="1" y="13" width="10" height="10" fill="#00A4EF" /><rect x="13" y="13" width="10" height="10" fill="#FFB900" /></svg>
                </button>
              </div>
            </div>
          </form>
        ) : (
          <form action={signUpAction}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                {/* Username */}
                <div className="flex flex-col gap-1.5">
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
                      placeholder="choose_a_handle"
                      required
                      className="w-full h-11 pl-10 pr-3.5 border border-slate-200 rounded-[10px] bg-white text-sm outline-none focus:border-[#1e3a5f]"
                    />
                  </div>
                </div>

                {/* Email */}
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
                      className="w-full h-11 pl-10 pr-3.5 border border-slate-200 rounded-[10px] bg-white text-sm outline-none focus:border-[#1e3a5f]"
                    />
                  </div>
                </div>

                {/* Password */}
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
                      className="w-full h-11 pl-10 pr-3.5 border border-slate-200 rounded-[10px] bg-white text-sm outline-none focus:border-[#1e3a5f]"
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-1.5">
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
                      className="w-full h-11 pl-10 pr-3.5 border border-slate-200 rounded-[10px] bg-white text-sm outline-none focus:border-[#1e3a5f]"
                    />
                  </div>
                </div>
              </div>

              {signUpState?.error && (
                <div className="p-3 rounded-lg text-xs font-medium bg-red-50 border border-red-200 text-red-700">
                  {signUpState.error}
                </div>
              )}
              {signUpState?.success && (
                <div className="p-3 rounded-lg text-xs font-medium bg-green-50 border border-green-200 text-green-700">
                  {signUpState.success}
                </div>
              )}

              <button
                disabled={isSignUpPending}
                className="mt-1 w-full h-12 rounded-[11px] border-0 cursor-pointer font-semibold flex items-center justify-center gap-2 bg-[#1e3a5f] text-white shadow-lg hover:bg-[#163050] transition-all"
              >
                {isSignUpPending ? (
                   <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
              <button type="button" className="font-semibold text-[#1e3a5f] hover:underline" onClick={() => setIsLoginView(false)}>Sign up free</button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button type="button" className="font-semibold text-[#1e3a5f] hover:underline" onClick={() => setIsLoginView(true)}>Sign in</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}