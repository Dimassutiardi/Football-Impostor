import React from "react";
import { ChevronLeft, HelpCircle, Shield, Home, Clock3, ChartColumn, SlidersHorizontal } from "lucide-react";

const bottomTabs = [
  { key: "home", label: "Beranda", icon: Home },
  { key: "history", label: "Riwayat", icon: Clock3 },
  { key: "leaderboard", label: "Leaderboard", icon: ChartColumn },
  { key: "settings", label: "Pengaturan", icon: SlidersHorizontal },
];

export default function ScreenFrame({
  step,
  stepLabel,
  title,
  subtitle,
  children,
  footer,
  activeTab = "home",
  showBack = true,
  showHelp = true,
  rightIcon,
}) {
  return (
    <section className="screen-card w-full max-w-[446px]">
      <div className="screen-panel overflow-hidden px-4 py-4 sm:px-5 sm:py-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="brand-chip text-white">
              <Shield className="h-4.5 w-4.5" strokeWidth={2.3} />
            </div>
            <div className="text-left leading-tight">
              <div className="text-[0.95rem] font-black tracking-[0.18em] text-white sm:text-[1.02rem]">
                MR WHITE
              </div>
              <div className="text-[0.57rem] font-semibold uppercase tracking-[0.32em] text-lime-400/90 sm:text-[0.62rem]">
                Football Knowledge
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-white/70 sm:gap-2">
            {showBack ? (
              <button className="ui-icon-button">
                <ChevronLeft className="h-4.5 w-4.5" />
              </button>
            ) : (
              <div className="h-8 w-8" />
            )}
            <div className="glass-chip flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-white/80 sm:text-[0.6rem]">
              <span className="grid h-5 w-5 place-items-center rounded-full border border-white/15 text-[0.58rem] text-white/90">
                {step}
              </span>
              <span className="hidden sm:inline whitespace-nowrap">{stepLabel}</span>
            </div>
            {showHelp ? (
              <button className="ui-icon-button">
                {rightIcon || <HelpCircle className="h-4.5 w-4.5" />}
              </button>
            ) : (
              <div className="h-8 w-8" />
            )}
          </div>
        </div>

        <div className="mx-auto max-w-[410px]">
          <div className="mb-3 text-center sm:mb-4">
            <div className="text-[0.62rem] font-semibold uppercase tracking-[0.38em] text-lime-400/80 sm:text-[0.68rem]">
              {title}
            </div>
            <p className="mt-1.5 text-[0.82rem] leading-snug text-white/55 sm:text-[0.9rem]">{subtitle}</p>
          </div>

          {children}
        </div>

        <div className="mt-4 grid grid-cols-4 gap-1.5 rounded-[1.35rem] border border-white/8 bg-black/18 p-2 text-center text-[0.58rem] font-medium text-white/42 sm:mt-5 sm:rounded-[1.45rem] sm:text-[0.62rem]">
          {bottomTabs.map((tab) => {
            const Icon = tab.icon;
            const active = tab.key === activeTab;

            return (
              <button
                key={tab.key}
                type="button"
                className={`ui-tab-button ${active ? "is-active" : ""}`}
              >
                <Icon className={`h-3.5 w-3.5 ${active ? "text-lime-300" : "text-white/45"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {footer ? <div className="mt-4">{footer}</div> : null}
      </div>
    </section>
  );
}