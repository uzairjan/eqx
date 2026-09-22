import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/content';

interface ContactsSectionProps {
  currentLang: Language;
  onOpenInquiry: () => void;
}

export const ContactsSection: React.FC<ContactsSectionProps> = ({
  currentLang,
  onOpenInquiry
}) => {
  const t = TRANSLATIONS[currentLang];
  const [copied, setCopied] = useState<string | null>(null);
  const [copyFailed, setCopyFailed] = useState(false);

  const markCopied = (label: string) => {
    setCopyFailed(false);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const legacyCopy = (text: string): boolean => {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'absolute';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  };

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      markCopied(label);
      return;
    } catch {
      // Non-HTTPS / denied permission: legacy fallback.
    }
    if (legacyCopy(text)) {
      markCopied(label);
    } else {
      setCopyFailed(true);
    }
  };

  return (
    <section id="contactos" className="relative py-20 sm:py-28 bg-[#07090e] border-t border-white/[0.08]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <span className="font-space-grotesk text-xs font-bold text-[#f59e0b] uppercase tracking-widest block mb-2">
            {t.contacts.eyebrow}
          </span>
          <h2 className="font-epilogue text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            {t.contacts.title}
          </h2>
          <p className="font-body text-slate-300 text-sm sm:text-base leading-relaxed">
            {t.contacts.desc}
          </p>
        </div>

        {/* 3 Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1: Direct Phone & Email */}
          <div className="p-7 rounded-2xl bg-[#131923] border border-white/[0.08] hover:border-[#f59e0b]/40 transition-all duration-300 group shadow-lg flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/10 text-[#f59e0b] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[24px]">phone_in_talk</span>
              </div>
              <h3 className="font-epilogue text-xl font-bold text-white mb-2">
                {t.contacts.directLines}
              </h3>
              <p className="font-body text-xs text-slate-400 mb-6">
                {t.contacts.directDesc}
              </p>

              <div className="space-y-3 mb-6">
                <div className="p-3 rounded-xl bg-[#0c1017] border border-white/5 flex items-center justify-between">
                  <a
                    href="tel:+351223160304"
                    className="font-space-grotesk text-base font-bold text-white hover:text-[#ffc174] transition-colors"
                  >
                    {t.contacts.telText}
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy('+351 223 160 304', 'phone')}
                    className="text-slate-400 hover:text-white p-1"
                    title={t.contacts.copyPhone}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {copied === 'phone' ? 'done' : 'content_copy'}
                    </span>
                  </button>
                </div>
                <span className="font-space-grotesk text-[10px] text-slate-500 block px-1">
                  {t.contacts.telNote}
                </span>

                <div className="p-3 rounded-xl bg-[#0c1017] border border-white/5 flex items-center justify-between">
                  <a
                    href="mailto:geral@eqx.pt"
                    className="font-space-grotesk text-sm font-bold text-[#4cd7f6] hover:underline"
                  >
                    {t.contacts.emailText}
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy('geral@eqx.pt', 'email')}
                    className="text-slate-400 hover:text-white p-1"
                    title={t.contacts.copyEmail}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {copied === 'email' ? 'done' : 'content_copy'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <a
              href="tel:+351223160304"
              className="w-full py-3 rounded-xl bg-[#191c21] hover:bg-[#f59e0b] text-[#ffc174] hover:text-[#331c00] border border-[#f59e0b]/30 font-epilogue text-xs sm:text-sm font-bold text-center transition-all"
            >
              {t.contacts.callDirect}
            </a>
            {copyFailed ? (
              <p className="font-body text-[11px] text-rose-300 mt-2 text-center">
                {t.contacts.copyFailed}
              </p>
            ) : null}
          </div>

          {/* Card 2: HQ Location */}
          <div className="p-7 rounded-2xl bg-[#131923] border border-white/[0.08] hover:border-[#06b6d4]/40 transition-all duration-300 group shadow-lg flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#06b6d4]/10 text-[#06b6d4] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[24px]">location_on</span>
              </div>
              <h3 className="font-epilogue text-xl font-bold text-white mb-2">
                {t.contacts.location}
              </h3>
              <p className="font-body text-xs text-slate-400 mb-6">
                {t.contacts.locationDesc}
              </p>

              <div className="p-4 rounded-xl bg-[#0c1017] border border-white/5 space-y-1 mb-6">
                <span className="font-epilogue text-sm font-bold text-white block">
                  {t.contacts.street}
                </span>
                <span className="font-body text-xs text-slate-300 block">
                  {t.contacts.postal}
                </span>
                <span className="font-space-grotesk text-xs text-[#4cd7f6] block pt-1">
                  {t.contacts.country}
                </span>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Rua+de+Angola+40+Vila+Nova+de+Gaia"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-[#191c21] hover:bg-[#06b6d4] text-[#4cd7f6] hover:text-[#0c1017] border border-[#06b6d4]/30 font-epilogue text-xs sm:text-sm font-bold text-center transition-all inline-flex items-center justify-center gap-2"
            >
              <span>{t.contacts.mapsBtn}</span>
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </a>
          </div>

          {/* Card 3: Social & Business Inquiry */}
          <div className="p-7 rounded-2xl bg-[#131923] border border-white/[0.08] hover:border-white/20 transition-all duration-300 group shadow-lg flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[24px]">connect_without_contact</span>
              </div>
              <h3 className="font-epilogue text-xl font-bold text-white mb-2">
                {t.contacts.social}
              </h3>
              <p className="font-body text-xs text-slate-400 mb-6">
                {t.contacts.socialDesc}
              </p>

              {/* Social profiles intentionally omitted until the client
                  provides real profile URLs: generic homepages dump
                  visitors on login walls. */}
            </div>

            <button
              type="button"
              onClick={onOpenInquiry}
              className="w-full py-3 rounded-xl bg-[#f59e0b] hover:bg-[#fbbf24] text-[#331c00] font-epilogue text-xs sm:text-sm font-bold text-center transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)]"
            >
              {t.contacts.requestBusinessContact}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
