import React, { useState } from 'react';
import { EqxLogo } from './EqxLogo';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/content';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenCandidatePortal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  onOpenCandidatePortal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLang];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#0c1017]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.6)] transition-all">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Logo & Telemetry Pill */}
        <div className="flex items-center gap-4 lg:gap-6">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center transition-transform hover:scale-[1.02]"
            aria-label="EQX Empower Solutions"
          >
            <EqxLogo size="md" />
          </a>

          {/* Desktop Telemetry Pill */}
          <div className="hidden 2xl:flex items-center gap-2 px-3 py-1 rounded-full bg-[#131923]/90 border border-[#06b6d4]/20 shadow-[0_0_12px_rgba(6,182,212,0.15)] anim-float">
            <span className="w-2 h-2 rounded-full bg-[#06b6d4] animate-ping" />
            <span className="font-space-grotesk text-[11px] font-semibold text-[#4cd7f6] uppercase tracking-wider">
              {t.nav.hudBadge}
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 lg:gap-2 text-[14px]">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-3 py-1.5 text-slate-300 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors font-medium"
          >
            {t.nav.home}
          </a>
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="px-3 py-1.5 text-slate-300 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors font-medium"
          >
            {t.nav.about}
          </a>
          <a
            href="#areas-de-atuacao"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#areas-de-atuacao');
            }}
            className="px-3 py-1.5 text-slate-300 hover:text-[#4cd7f6] hover:bg-white/[0.04] rounded-lg transition-colors font-medium"
          >
            {t.nav.areas}
          </a>
          <a
            href="#modelo-turnkey"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#modelo-turnkey');
            }}
            className="px-3 py-1.5 text-slate-300 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors font-medium"
          >
            {t.nav.portfolio}
          </a>
          <a
            href="#recrutamento"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#recrutamento');
            }}
            className="px-3 py-1.5 text-slate-300 hover:text-[#ffc174] hover:bg-white/[0.04] rounded-lg transition-colors font-medium"
          >
            {t.nav.careers}
          </a>
          <a
            href="#contactos"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contactos');
            }}
            className="px-3 py-1.5 text-slate-300 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors font-medium"
          >
            {t.nav.contacts}
          </a>
        </nav>

        {/* Right Controls: Lang Switch, Primary CTA, User Avatar & Mobile Hamburger */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Language Switch */}
          <div className="flex items-center bg-[#191c21] rounded-lg p-1 border border-white/[0.06]">
            <button
              type="button"
              onClick={() => onLanguageChange('pt')}
              className={`px-2 py-0.5 font-space-grotesk text-[11px] font-bold rounded transition-all ${
                currentLang === 'pt'
                  ? 'bg-[#282a30] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              PT
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-0.5 font-space-grotesk text-[11px] font-bold rounded transition-all ${
                currentLang === 'en'
                  ? 'bg-[#282a30] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          {/* Direct Careers Portal CTA */}
          <button
            type="button"
            onClick={onOpenCandidatePortal}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#f59e0b] hover:bg-[#fbbf24] text-[#472a00] font-epilogue text-sm font-bold shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            {t.nav.applyAreaBtn}
          </button>

          {/* User Icon indicator */}
          <div
            className="hidden sm:flex w-9 h-9 rounded-full bg-[#191c21] border border-white/10 items-center justify-center text-[#ffc174] shadow-sm hover:border-[#f59e0b]/40 cursor-pointer"
            title="EQX Portal de Especialistas"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            aria-label="Abrir Menu de Navegação"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-10 h-10 rounded-xl bg-[#131923] border border-white/10 flex items-center justify-center text-white hover:text-[#f59e0b] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden w-full bg-[#0c1017]/98 backdrop-blur-2xl border-b border-white/10 px-4 py-5 shadow-2xl animate-fade-in-up">
          <nav className="flex flex-col gap-1">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2.5 text-white hover:text-[#f59e0b] rounded-lg hover:bg-white/[0.04] font-epilogue text-sm font-semibold flex items-center justify-between"
            >
              <span>{t.nav.home}</span>
              <span className="material-symbols-outlined text-[18px] text-slate-500">chevron_right</span>
            </a>
            <a
              href="#areas-de-atuacao"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#areas-de-atuacao');
              }}
              className="px-3 py-2.5 text-slate-300 hover:text-[#4cd7f6] rounded-lg hover:bg-white/[0.04] font-epilogue text-sm font-semibold flex items-center justify-between"
            >
              <span>{t.nav.areas}</span>
              <span className="material-symbols-outlined text-[18px] text-slate-500">chevron_right</span>
            </a>
            <a
              href="#modelo-turnkey"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#modelo-turnkey');
              }}
              className="px-3 py-2.5 text-slate-300 hover:text-[#f59e0b] rounded-lg hover:bg-white/[0.04] font-epilogue text-sm font-semibold flex items-center justify-between"
            >
              <span>{t.nav.portfolio}</span>
              <span className="material-symbols-outlined text-[18px] text-slate-500">chevron_right</span>
            </a>
            <a
              href="#recrutamento"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#recrutamento');
              }}
              className="px-3 py-2.5 text-slate-300 hover:text-[#f59e0b] rounded-lg hover:bg-white/[0.04] font-epilogue text-sm font-semibold flex items-center justify-between"
            >
              <span>{t.nav.careers}</span>
              <span className="material-symbols-outlined text-[18px] text-slate-500">chevron_right</span>
            </a>
            <a
              href="#contactos"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contactos');
              }}
              className="px-3 py-2.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/[0.04] font-epilogue text-sm font-semibold flex items-center justify-between"
            >
              <span>{t.nav.contacts}</span>
              <span className="material-symbols-outlined text-[18px] text-slate-500">chevron_right</span>
            </a>
          </nav>

          <div className="pt-4 mt-2 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCandidatePortal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#f59e0b] text-[#472a00] font-epilogue text-sm font-bold shadow-[0_0_20px_rgba(245,158,11,0.35)] active:scale-[0.98] transition-transform"
            >
              <span>{t.nav.applyAreaBtn}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
