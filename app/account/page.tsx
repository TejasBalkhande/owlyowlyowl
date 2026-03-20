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

  const trustItems = [
    { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "SSL Secured" },
    { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", label: "Data Protected" },
    { icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z", label: "Powered by Turso" },
  ];

  return (
    // Lock the entire page to the viewport — no page-level scroll
    <div className="h-screen overflow-hidden grid grid-cols-1 md:grid-cols-2 bg-white">

      {/* ── LEFT VISUAL PANEL ── */}
      <div className="relative hidden md:flex flex-col overflow-hidden h-screen">
        {/* Full-bleed photo */}
        <Image
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1400&q=90&fit=crop"
          alt="Students studying"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Slim gradient only at bottom — keeps photo visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/35" />

        {/* Content pinned to bottom */}
        <div className="relative z-10 flex flex-col h-full px-10 py-9">

          {/* Brand — top left */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-17 h-25 rounded-lg  flex items-center justify-center overflow-hidden backdrop-blur-sm">
              <Image src="/logo-color.png" alt="OwlenForge" width={100} height={130} priority />
            </div>
          </div>

          {/* Spacer pushes content to bottom */}
          <div className="flex-1" />

          {/* Bottom overlay content */}
          <div className="flex flex-col gap-5">

            {/* Badge */}
            <div className="inline-flex w-fit items-center gap-2 bg-white/15 border border-white/25 backdrop-blur-md rounded-full px-3.5 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399] animate-pulse" />
              <span className="text-[10.5px] font-semibold text-white uppercase tracking-widest">ACT Prep Platform</span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="font-['Sora',sans-serif] text-[2.6rem] font-extrabold text-white leading-[1.12] tracking-tight drop-shadow-md">
                Forge your path<br />to a perfect score.
              </h1>
              <p className="mt-2 text-[13px] text-white/70 max-w-[300px] leading-relaxed">
                Mock tests, smart analytics, and topic drills — everything to hit your target ACT score.
              </p>
            </div>

            {/* Stats row */}
            <div className="flex gap-8">
              {[
                { value: "12K+", label: "Students" },
                { value: "+4.2", label: "Avg. score gain" },
                { value: "98%", label: "Satisfaction" },
              ].map((s) => (
                <div key={s.value} className="flex flex-col gap-0.5">
                  <span className="font-['Sora',sans-serif] text-2xl font-extrabold text-white leading-none drop-shadow">{s.value}</span>
                  <span className="text-[11px] text-white/55 font-medium">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Avatar social proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {avatars.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Student ${i + 1}`}
                    className="w-8 h-8 rounded-full object-cover border-2 border-white/50 shadow-md"
                    style={{ zIndex: avatars.length - i }}
                  />
                ))}
                <div
                  className="w-8 h-8 rounded-full bg-white/20 backdrop-blur border-2 border-white/50 flex items-center justify-center"
                  style={{ zIndex: 0 }}
                >
                  <span className="text-[9px] font-bold text-white">+99</span>
                </div>
              </div>
              <span className="text-[12.5px] font-medium text-white/80">Join <span className="font-bold text-white">10,000+</span> students</span>
            </div>

          </div>
        </div>
      </div>

      {/* ── RIGHT FORM PANEL ── */}
      <div className="flex flex-col justify-center items-center px-8 md:px-12 h-screen overflow-y-auto bg-white">
        <div className="w-full max-w-md">
          {session ? (
            <div className="flex flex-col gap-4">
              <div>
                <div className="font-['Sora',sans-serif] text-3xl font-extrabold text-slate-900">Welcome back 👋</div>
                <div className="text-sm text-slate-500">You&apos;re signed in and ready to study.</div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-sm font-semibold text-green-700">
                <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_7px_rgba(34,197,94,0.6)] animate-pulse" />
                Active session
              </div>
              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Signed in as</div>
                <div className="font-mono text-sm text-slate-700 break-all">{session}</div>
              </div>
              <form action={logout} className="w-full">
                <button
                  type="submit"
                  className="w-full h-11 rounded-lg border border-red-200 bg-red-50 text-red-600 font-['DM_Sans',sans-serif] font-semibold flex items-center justify-center gap-2 hover:bg-red-100 hover:border-red-300 hover:-translate-y-0.5 transition-all"
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </form>
              <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                {trustItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2 before:block before:w-5 before:h-0.5 before:bg-[#1e3a5f] before:rounded">
                  <span className="text-xs font-bold tracking-widest uppercase text-[#1e3a5f]">Student Portal</span>
                </div>
                <h1 className="font-['Sora',sans-serif] text-2xl font-extrabold text-slate-900 tracking-tight mb-1.5">
                  Sign in to your account
                </h1>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Access mock tests, study resources, and your personal dashboard.
                </p>
              </div>

              <AuthForm />

              <div className="flex items-center gap-4 mt-6 pt-5 border-t border-slate-100">
                {trustItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                    {item.label}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}