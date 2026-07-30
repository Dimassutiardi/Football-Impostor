import React from "react";
import { ChevronLeft, Shield, Home, Clock3, ChartColumn, SlidersHorizontal } from "lucide-react";

const bottomTabs = [
  { key: "home", label: "Beranda", icon: Home },
  { key: "history", label: "Riwayat", icon: Clock3 },
  { key: "leaderboard", label: "Leaderboard", icon: ChartColumn },
  { key: "settings", label: "Pengaturan", icon: SlidersHorizontal },
];

export default function ScreenFrame({
  stepLabel,
  title,
  subtitle,
  children,
  footer,
  activeTab = "home",
  showBack = false,
  rightIcon,
}) {
  return (
    <section className="screen-card w-full">
      <div className="screen-panel p-4 sm:p-6">
        {/* Header Bar */}
        <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-lime-400/30 bg-lime-400/10 shrink-0">
              <Shield className="h-5 w-5 text-lime-400" strokeWidth={2.2} />
            </div>
            <div className="text-left leading-tight min-w-0">
              <div className="text-xs sm:text-sm font-black tracking-wider text-white truncate">
                GUESS THE IMPOSTOR
              </div>
              <div className="text-[0.6rem] font-semibold uppercase tracking-widest text-lime-400/80 truncate">
                Football Knowledge
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {showBack && (
              <button type="button" className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 transition">
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}

            {stepLabel && (
              <div className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-white/80">
                {stepLabel}
              </div>
            )}

            {rightIcon && <div className="text-white/70">{rightIcon}</div>}
          </div>
        </div>

        {/* Header Judul Screen */}
        <div className="mb-5 text-center">
          <h2 className="text-sm sm:text-base font-black uppercase tracking-widest text-lime-400">
            {title}
          </h2>
          {subtitle && <p className="mt-0.5 text-xs text-white/60">{subtitle}</p>}
        </div>

        {/* Konten Utama */}
        <div className="w-full">{children}</div>

        {/* Navigation Bar Bawah */}
        <div className="mt-6 grid grid-cols-4 gap-1 rounded-2xl border border-white/10 bg-black/30 p-1.5 text-center">
          {bottomTabs.map((tab) => {
            const Icon = tab.icon;
            const active = tab.key === activeTab;

            return (
              <button
                key={tab.key}
                type="button"
                className={`flex flex-col items-center justify-center gap-1 py-2 rounded-xl transition-all ${
                  active
                    ? "bg-white/10 text-lime-300 font-bold border border-lime-400/20"
                    : "text-white/50 hover:bg-white/5 hover:text-white/80"
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? "text-lime-300" : "text-white/50"}`} />
                <span className="text-[0.6rem]">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </section>
  );
}