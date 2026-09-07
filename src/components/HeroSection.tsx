import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/content';

interface HeroSectionProps {
  currentLang: Language;
  onApplyClick: () => void;
  onExploreSectorsClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentLang,
  onApplyClick,
  onExploreSectorsClick,
}) => {
  const t = TRANSLATIONS[currentLang];
  const [hudActive, setHudActive] = useState(true);

  return (
    <section id="hero" className="relative pt-24 sm:pt-28 lg:pt-36 pb-16 sm:pb-24 overflow-hidden">
      {/* Dynamic Background Glows & Energy Lines */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-[#06b6d4]/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 rounded-full bg-[#f59e0b]/10 blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

      {/* Animated subtle energy scanning line */}
      <div className="anim-energy-line top-1/2 left-[-20%] pointer-events-none opacity-20" />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Telemetry Tag Pill */}
        <div className="flex flex-wrap items-center gap-2.5 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131923] border border-[#06b6d4]/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#06b6d4] animate-ping" />
            <span className="font-space-grotesk text-xs sm:text-[13px] font-semibold text-[#4cd7f6] tracking-wide">
              {t.hero.tag}
            </span>
          </div>
          <span className="font-space-grotesk text-[11px] font-semibold text-slate-400">
            {t.hero.refId}
          </span>
        </div>

        {/* Bento Grid: Left Typography & CTAs, Right Visual HUD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Description, Actions */}
          <div className="lg:col-span-7 flex flex-col">
            <span className="font-space-grotesk text-xs font-bold text-[#f59e0b] uppercase tracking-widest mb-3">
              {t.hero.eyebrow}
            </span>

            <h1 className="font-epilogue text-3xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-extrabold text-white tracking-tight leading-[1.08] mb-6">
              {t.hero.titleStart}{' '}
              <span className="inline-block bg-gradient-to-r from-[#ffc174] via-[#f59e0b] to-[#ea580c] bg-clip-text text-transparent drop-shadow-[0_4px_16px_rgba(245,158,11,0.2)]">
                {t.hero.titleHighlight}
              </span>
            </h1>

            <p className="font-body text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
              {t.hero.description}
            </p>

            {/* Action Buttons & HUD Status */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button
                type="button"
                onClick={onApplyClick}
                className="btn-shimmer inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#ea580c] text-[#331c00] font-epilogue font-bold text-sm sm:text-base shadow-[0_0_28px_rgba(245,158,11,0.4)] hover:brightness-110 active:scale-[0.98] transition-all"
              >
                <span>{t.hero.applyNow}</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>

              <button
                type="button"
                onClick={onExploreSectorsClick}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl bg-[#131923] hover:bg-[#1a2332] text-slate-200 hover:text-white border border-white/10 font-epilogue font-semibold text-sm sm:text-base transition-all"
              >
                <span>{t.hero.knowMore}</span>
                <span className="material-symbols-outlined text-[18px]">expand_more</span>
              </button>

              {/* Interactive HUD toggle button */}
              <button
                type="button"
                onClick={() => setHudActive(!hudActive)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg font-space-grotesk text-xs font-semibold border transition-all ${
                  hudActive
                    ? 'bg-[#06b6d4]/10 text-[#4cd7f6] border-[#06b6d4]/40 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                    : 'bg-[#131923] text-slate-400 border-white/10'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${hudActive ? 'bg-[#06b6d4] animate-pulse' : 'bg-slate-500'}`} />
                <span>{t.hero.hudStatus}</span>
              </button>
            </div>

            {/* Certifications & Trust Badges */}
            <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-3 text-xs text-slate-300 font-space-grotesk">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#131923] border border-white/10">
                <span className="material-symbols-outlined text-[15px] text-[#06b6d4]">verified</span>
                {t.hero.iso}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#131923] border border-white/10">
                <span className="material-symbols-outlined text-[15px] text-[#f59e0b]">shield</span>
                {t.hero.gwo}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#131923] border border-white/10">
                <span className="material-symbols-outlined text-[15px] text-emerald-400">local_shipping</span>
                {t.hero.turnkey}
              </span>
            </div>
          </div>

          {/* Right Column: Visual Industrial Bento & Telemetry Cards */}
          <div className="lg:col-span-5 relative">
            {/* Main Sector 01: Wind & Offshore Card */}
            <div className="relative rounded-2xl overflow-hidden bg-[#131923] border border-[#06b6d4]/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group card-glow-hover">
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCce8UCwC9YLQqCpKfxYTG29KoS8xJNStUsQF_IMCleRtjUyfZmjb9OIzzMYzsILuZuV2wOwuluzDUBFPfc94IJE8-_RpET9eVmE1Bf4j_-CZVIgJ94e974ac1YmB2f6_F2B8dkZKmHixXzp4Q-57ep1OxVVcqLI_kJhiEPrbIfjGiXSyVY-QgFl5v9ATTP6J6eSQq-5hhEzgATaavnXKsqxoLmFiIyYZYcgt9F4GbTfMVOQNbkNpcE1A"
                  alt="Técnicos certificados em turbina eólica offshore"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/40 to-transparent" />
                
                {/* Sector Tag */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-[#06b6d4]/40 font-space-grotesk text-[11px] font-bold text-[#4cd7f6] uppercase tracking-wider">
                    {t.hero.sector01}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#f59e0b]/90 text-[#331c00] font-space-grotesk text-[10px] font-extrabold uppercase">
                    GWO
                  </span>
                </div>

                {/* Overlaid Title & Details */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-epilogue text-xl font-bold text-white mb-1">
                    {t.hero.renewables}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-slate-300">
                    {t.hero.renewablesDesc}
                  </p>
                </div>
              </div>

              {/* Sub-strip with live telemetry metrics */}
              {hudActive && (
                <div className="p-4 bg-[#0c1017] border-t border-white/10 grid grid-cols-2 gap-3 font-space-grotesk">
                  <div className="p-2.5 rounded-lg bg-[#131923] border border-white/5">
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">
                      {t.hero.mobilization}
                    </span>
                    <span className="text-sm font-bold text-[#4cd7f6] flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] animate-ping" />
                      {t.hero.countries}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#131923] border border-white/5">
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">
                      {t.hero.reliability}
                    </span>
                    <span className="text-sm font-bold text-[#f59e0b] flex items-center gap-1.5 mt-0.5">
                      <span className="material-symbols-outlined text-[15px]">verified</span>
                      99.8%
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Floating Naval Secondary Card overlapping bottom right */}
            <div className="mt-4 rounded-xl overflow-hidden bg-[#131923] border border-[#f59e0b]/30 p-3 sm:p-4 shadow-xl card-glow-amber-hover flex items-center gap-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-slate-800">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzb9RkFweiHnOJa3lPADtvoZ8hHlciCzij2mYh999GzCdUcSSN0AHxoeFq_J6S0IxPfK36Ba9hz45OS5kBbIIb8UbrATWtP17IzQO_2bVVTOpmi37OhA6TFYH2NYXsXVL1AYS3yhWbTLKnvWpR84d87zmYtT7bDEHZ-3F4OIzEtYqmoIWVhuigoqaQiFZAKGPdc28Ba_fIb4LyHO4yDSJeCtsTWylNFvsNWdgSMa3PBANgLY4wOtIxeA"
                  alt="Instalação elétrica de alta precisão em estaleiro naval"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-space-grotesk text-[10px] font-bold text-[#f59e0b] uppercase tracking-wider block">
                  {t.hero.sector02}
                </span>
                <h4 className="font-epilogue text-sm sm:text-base font-bold text-white truncate">
                  {t.hero.naval}
                </h4>
                <p className="font-body text-xs text-slate-400 line-clamp-1">
                  {t.hero.navalDesc}
                </p>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-[20px] group-hover:text-[#f59e0b] transition-colors">
                arrow_forward
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
