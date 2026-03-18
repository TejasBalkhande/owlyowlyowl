"use client";

import { useActionState, useState } from "react";
import { login, signUp } from "./actions";

export default function AuthForm() {
  const [loginState, loginAction, isLoginPending] = useActionState(login, null);
  const [signUpState, signUpAction, isSignUpPending] = useActionState(signUp, null);
  
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="grid gap-8">
      {isLoginView ? (
        /* ================= LOGIN SECTION ================= */
        <div className="space-y-6">
          <form action={loginAction} className="space-y-4">
            <input 
              name="email" 
              type="email" 
              placeholder="Email" 
              required 
              className="w-full h-11 px-4 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent outline-none focus:ring-2 focus:ring-black" 
            />
            <input 
              name="password" 
              type="password" 
              placeholder="Password" 
              required 
              className="w-full h-11 px-4 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent outline-none focus:ring-2 focus:ring-black" 
            />
            
            {loginState?.error && <p className="text-red-500 text-xs">{loginState.error}</p>}
            
            <button 
              disabled={isLoginPending} 
              className="w-full h-11 rounded-lg bg-black text-white dark:bg-white dark:text-black font-medium hover:opacity-90 disabled:opacity-50"
            >
              {isLoginPending ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="text-center text-sm text-zinc-500">
            {/* ESLINT FIX: Escaped the apostrophe in Don't -> Don&apos;t */}
            Don&apos;t have an account?{" "}
            <button 
              type="button" 
              onClick={() => setIsLoginView(false)} 
              className="text-black dark:text-white font-medium hover:underline focus:outline-none"
            >
              Sign up
            </button>
          </div>
        </div>
      ) : (
        /* ================= SIGN UP SECTION ================= */
        <div className="space-y-6">
          <form action={signUpAction} className="space-y-4">
            <input 
              name="username" 
              type="text" 
              placeholder="Username" 
              required 
              className="w-full h-11 px-4 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent outline-none focus:ring-2 focus:ring-black" 
            />
            <input 
              name="email" 
              type="email" 
              placeholder="Email" 
              required 
              className="w-full h-11 px-4 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent outline-none focus:ring-2 focus:ring-black" 
            />
            <input 
              name="password" 
              type="password" 
              placeholder="Password" 
              required 
              className="w-full h-11 px-4 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent outline-none focus:ring-2 focus:ring-black" 
            />
            <input 
              name="confirmPassword" 
              type="password" 
              placeholder="Confirm Password" 
              required 
              className="w-full h-11 px-4 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent outline-none focus:ring-2 focus:ring-black" 
            />
            
            {signUpState?.error && <p className="text-red-500 text-xs">{signUpState.error}</p>}
            {signUpState?.success && <p className="text-green-500 text-xs">{signUpState.success}</p>}

            <button 
              disabled={isSignUpPending} 
              className="w-full h-11 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-black dark:text-white font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50"
            >
              {isSignUpPending ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <div className="text-center text-sm text-zinc-500">
            Already have an account?{" "}
            <button 
              type="button"
              onClick={() => setIsLoginView(true)} 
              className="text-black dark:text-white font-medium hover:underline focus:outline-none"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}