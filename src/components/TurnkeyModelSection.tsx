import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/content';

interface TurnkeyModelSectionProps {
  currentLang: Language;
  onRequestProposal: () => void;
}

export const TurnkeyModelSection: React.FC<TurnkeyModelSectionProps> = ({
  currentLang,
  onRequestProposal
}) => {
  const t = TRANSLATIONS[currentLang];

  const steps = [
    {
      num: t.turnkey.step1Num,
      title: t.turnkey.step1Title,
      desc: t.turnkey.step1Desc,
      icon: 'fact_check',
      color: 'cyan'
    },
    {
      num: t.turnkey.step2Num,
      title: t.turnkey.step2Title,
      desc: t.turnkey.step2Desc,
      icon: 'flight_takeoff',
      color: 'amber'
    },
    {
      num: t.turnkey.step3Num,
      title: t.turnkey.step3Title,
      desc: t.turnkey.step3Desc,
      icon: 'rocket_launch',
      color: 'cyan'
    },
    {
      num: t.turnkey.step4Num,
      title: t.turnkey.step4Title,
      desc: t.turnkey.step4Desc,
      icon: 'monitoring',
      color: 'amber'
    }
  ];

  return (
    <section id="modelo-turnkey" className="relative py-20 sm:py-28 bg-[#0c1017] border-t border-white/[0.08]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Quote Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          <div className="lg:col-span-7">
            <span className="font-space-grotesk text-xs font-bold text-[#f59e0b] uppercase tracking-widest block mb-2">
              {t.turnkey.eyebrow}
            </span>
            <h2 className="font-epilogue text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-5">
              {t.turnkey.title}
            </h2>
            <p className="font-body text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {t.turnkey.desc}
            </p>
            <button
              type="button"
              onClick={onRequestProposal}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#191c21] hover:bg-[#f59e0b] text-[#ffc174] hover:text-[#331c00] border border-[#f59e0b]/40 font-epilogue text-sm font-bold shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all"
            >
              <span>{t.turnkey.requestProposal}</span>
              <span className="material-symbols-outlined text-[18px]">business</span>
            </button>
          </div>

          {/* Turnkey Guarantee Quote Box */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#131923] border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#f59e0b]/10 rounded-full blur-2xl pointer-events-none" />
            <span className="material-symbols-outlined text-4xl text-[#f59e0b]/60 mb-3 block">
              format_quote
            </span>
            <blockquote className="font-epilogue text-base sm:text-lg italic font-medium text-slate-200 leading-snug mb-4">
              {t.turnkey.quote}
            </blockquote>
            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <div className="w-8 h-8 rounded-full bg-[#f59e0b]/20 flex items-center justify-center text-[#f59e0b] font-epilogue font-bold text-xs">
                EQX
              </div>
              <div>
                <span className="font-space-grotesk text-xs font-bold text-white block">
                  EQX Empower Solutions
                </span>
                <span className="font-body text-[11px] text-slate-400">
                  Diretoria de Operações Pan-Europeias
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Execution Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const isCyan = step.color === 'cyan';
            return (
              <div
                key={idx}
                className="relative p-6 sm:p-7 rounded-2xl bg-[#131923] border border-white/[0.08] hover:border-white/20 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
              >
                {/* Step Number with luminous style */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`font-space-grotesk text-2xl sm:text-3xl font-black ${
                      isCyan ? 'text-[#06b6d4]' : 'text-[#f59e0b]'
                    }`}
                  >
                    {step.num}
                  </span>
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isCyan ? 'bg-[#06b6d4]/10 text-[#06b6d4]' : 'bg-[#f59e0b]/10 text-[#f59e0b]'
                    } group-hover:scale-110 transition-transform`}
                  >
                    <span className="material-symbols-outlined text-[22px]">{step.icon}</span>
                  </div>
                </div>

                <h3 className="font-epilogue text-lg font-bold text-white mb-2 group-hover:text-white">
                  {step.title}
                </h3>
                <p className="font-body text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {step.desc}
                </p>

                {/* Flow connector line on desktop */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-[#0c1017] border border-white/20 flex items-center justify-center text-slate-500 text-[12px]">
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
