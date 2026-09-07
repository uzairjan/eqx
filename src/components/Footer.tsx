import React from 'react';
import { EqxLogo } from './EqxLogo';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/content';

interface FooterProps {
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <footer className="relative bg-[#07090e] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#f59e0b]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/[0.08]">
          {/* Brand Info & Mission Statement */}
          <div className="lg:col-span-4 space-y-4">
            <EqxLogo size="lg" />
            <p className="font-body text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm pt-2">
              {t.footer.tagline}
            </p>
            <div className="pt-2">
              <span className="font-space-grotesk text-[10px] text-slate-500 uppercase tracking-widest block">
                {t.footer.hqTitle}
              </span>
              <p className="font-space-grotesk text-xs text-slate-300 whitespace-pre-line mt-0.5">
                {t.footer.hqAddress}
              </p>
            </div>
          </div>

          {/* Standards & Certifications */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-space-grotesk text-xs font-bold text-[#f59e0b] uppercase tracking-wider">
              {t.footer.certsTitle}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-space-grotesk">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#06b6d4]">verified</span>
                <span>{t.footer.cert1}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#06b6d4]">security</span>
                <span>{t.footer.cert2}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#f59e0b]">shield</span>
                <span>{t.footer.cert3}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#f59e0b]">construction</span>
                <span>{t.footer.cert4}</span>
              </li>
            </ul>
          </div>

          {/* Mission Telemetry Summary */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-space-grotesk text-xs font-bold text-[#06b6d4] uppercase tracking-wider">
              {t.footer.telemetryTitle}
            </h4>
            <div className="space-y-2.5 font-space-grotesk">
              <div className="p-2.5 rounded-lg bg-[#131923] border border-white/5 flex items-center justify-between">
                <span className="text-xs text-slate-400">{t.footer.inOperation}</span>
                <span className="text-sm font-bold text-[#4cd7f6]">{t.footer.inOpVal}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#131923] border border-white/5 flex items-center justify-between">
                <span className="text-xs text-slate-400">{t.footer.relIndex}</span>
                <span className="text-sm font-bold text-[#f59e0b]">{t.footer.relVal}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#131923] border border-white/5 flex items-center justify-between">
                <span className="text-xs text-slate-400">{t.footer.hubsLabel}</span>
                <span className="text-sm font-bold text-white">{t.footer.hubsVal}</span>
              </div>
            </div>
          </div>

          {/* Quick Contact & Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-space-grotesk text-xs font-bold text-slate-400 uppercase tracking-wider">
              {t.footer.directLine}
            </h4>
            <a
              href="tel:+351223160304"
              className="font-space-grotesk text-sm font-bold text-white hover:text-[#f59e0b] transition-colors block"
            >
              +351 223 160 304
            </a>
            <a
              href="mailto:geral@eqx.pt"
              className="font-space-grotesk text-xs text-[#06b6d4] hover:underline block"
            >
              geral@eqx.pt
            </a>

            <div className="pt-2">
              <span className="font-space-grotesk text-[11px] text-slate-400 block mb-1">
                {t.footer.continuousRecruitment}
              </span>
              <a
                href="#recrutamento"
                className="inline-flex items-center gap-1 font-epilogue text-xs font-bold text-[#f59e0b] hover:underline"
              >
                <span>Candidatura Direta</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal Copyright & Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-space-grotesk">
          <p className="text-center sm:text-left">
            {t.footer.copyright}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">
              {t.footer.terms}
            </a>
            <span>•</span>
            <a
              href="https://www.livroreclamacoes.pt"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              {t.footer.complaints}
            </a>
            <span>•</span>
            <span className="text-[#06b6d4]">European Mobility Reg: 2026/EQX-EU</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
