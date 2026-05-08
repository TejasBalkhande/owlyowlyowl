import { cookies } from "next/headers";
import Image from "next/image";
import { logout } from "./actions";
import AuthForm from "./auth-form";

export default async function Home() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  const avatars = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=80&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=80&q=80&fit=crop&crop=face",
  ];

  const features = [
    { title: "Adaptive Study Paths", desc: "AI-driven plans tailored to your weak spots.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
    { title: "Real-time Analytics", desc: "Instant feedback on every practice drill.", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
    { title: "Full-Length Mocks", desc: "Timed simulations that mirror the actual ACT.", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }
  ];

  const trustItems = [
    { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "SSL Secured" },
    { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", label: "Data Protected" },
    { icon: "M5 13l4 4L19 7", label: "Official Prep Material" },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-900 font-['DM_Sans',sans-serif]">
      
      {/* ── LEFT VISUAL PANEL ── */}
      <div className="relative hidden lg:flex flex-col flex-1 h-full overflow-hidden">
        <Image
          src="/account/d76d65f7-2ee9-4e7b-bec0-cffc8c7e4785.png"
          alt="Mountain sunrise"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />

        <div className="relative z-10 flex flex-col h-full px-12 xl:px-20 py-12">
          
          {/* Top Brand Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-lg border border-white/20">
              <Image src="/logo-feather.png" alt="Logo" fill className="object-cover" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">OwlenForge</span>
          </div>

          <div className="flex-1 flex flex-col justify-center max-w-[540px]">
            {/* Badge */}
            <div className="inline-flex w-fit items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md rounded-full px-3 py-1 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Enrollment Open • Summer 2026</span>
            </div>

            <h1 className="text-4xl xl:text-[3.2rem] font-bold text-white leading-[1.1] tracking-tight mb-6">
              Master the ACT with <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">Precision Prep.</span>
            </h1>
            
            <p className="text-[16px] text-slate-300 leading-relaxed font-medium mb-10">
              Stop guessing. Our data-driven platform identifies your performance gaps and builds a custom roadmap to your target score.
            </p>

            {/* Feature Highlights Section */}
            <div className="grid gap-5 mb-12">
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-900 transition-all duration-300">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={f.icon} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm mb-0.5">{f.title}</h3>
                    <p className="text-slate-400 text-xs leading-normal">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-4">
              {[
                { value: "12K+", label: "Students", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
                { value: "+4.2", label: "Avg Gain", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
              ].map((s) => (
                <div key={s.value} className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3">
                  <span className="text-white/60">
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.icon} />
                    </svg>
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white leading-none">{s.value}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{s.label}</span>
                  </div>
                </div>
              ))}

              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3">
                <div className="flex -space-x-2">
                  {avatars.slice(0, 3).map((src, i) => (
                    <img key={i} src={src} className="w-6 h-6 rounded-full border-2 border-slate-900 object-cover" />
                  ))}
                </div>
                <span className="text-[11px] font-bold text-slate-200">Join 10k+ achievers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT FORM PANEL ── */}
      <div className="w-full lg:w-[40%] max-w-[600px] h-full bg-white relative z-10 shadow-[-20px_0_40px_rgba(0,0,0,0.3)] flex flex-col overflow-y-auto">
        <div className="flex flex-col justify-center min-h-full px-10 sm:px-14 py-12">
          
          {session ? (
            <div className="flex flex-col gap-6 w-full">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-4 h-[2px] bg-[#1d4ed8]" />
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#1d4ed8]">Student Portal</span>
                </div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back!</h1>
                <p className="text-sm text-slate-500">You&apos;re signed in and ready to continue your learning journey.</p>
              </div>
              
              <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 mt-4">
                <div className="flex items-center gap-3 mb-4 border-b border-slate-200 pb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                    {session.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Session</div>
                    <div className="font-medium text-slate-900">{session}</div>
                  </div>
                </div>
                <form action={logout} className="w-full">
                  <button
                    type="submit"
                    className="w-full h-12 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors shadow-sm"
                  >
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-4 h-[2px] bg-[#1d4ed8]" />
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#1d4ed8]">Student Portal</span>
                </div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-1.5">
                  Start your Prep
                </h1>
                <p className="text-sm text-slate-500">
                  Access your dashboard, mocks, and personalized drills.
                </p>
              </div>

              <AuthForm />
            </>
          )}

          {/* Footer Trust Items */}
          <div className="flex justify-center items-center gap-6 mt-12 pt-8 border-t border-slate-100">
            {trustItems.map((item) => (
              <div key={item.label} className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={item.icon} />
                </svg>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}