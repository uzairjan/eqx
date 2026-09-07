import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/content';

interface CookieConsentBannerProps {
  currentLang: Language;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const [status, setStatus] = useState<'pending' | 'accepted' | 'denied' | 'customized'>('pending');
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    functional: true,
    analytics: true,
    marketing: false
  });

  const handleAccept = () => {
    setStatus('accepted');
    setShowPreferences(false);
  };

  const handleDeny = () => {
    setStatus('denied');
    setShowPreferences(false);
  };

  const handleSavePreferences = () => {
    setStatus('customized');
    setShowPreferences(false);
  };

  // If already accepted/denied, display a floating discreet pill so user can manage anytime
  if (status !== 'pending' && !showPreferences) {
    return (
      <button
        type="button"
        onClick={() => setShowPreferences(true)}
        className="fixed bottom-4 right-4 z-40 px-3 py-2 rounded-xl bg-[#131923]/95 border border-white/10 backdrop-blur-md shadow-xl font-space-grotesk text-xs text-slate-300 hover:text-white hover:border-[#f59e0b]/40 flex items-center gap-2 transition-all hover:scale-105"
        title="Gerir Cookies"
      >
        <span className="material-symbols-outlined text-[16px] text-[#f59e0b]">cookie</span>
        <span className="hidden sm:inline">Cookies</span>
      </button>
    );
  }

  return (
    <>
      {/* Floating Bottom Card Banner */}
      {status === 'pending' && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 w-[calc(100%-2rem)] sm:w-[420px] rounded-2xl bg-[#131923]/95 border border-white/15 p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl animate-fade-in-up">
          <div className="flex items-center justify-between gap-3 mb-2.5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#f59e0b]">cookie</span>
              <h4 className="font-epilogue text-sm sm:text-base font-bold text-white">
                {t.cookies.title}
              </h4>
            </div>
            <button
              type="button"
              onClick={handleDeny}
              className="text-slate-400 hover:text-white p-1"
              aria-label="Fechar"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <p className="font-body text-xs text-slate-300 leading-relaxed mb-4">
            {t.cookies.desc}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-white/10">
            <button
              type="button"
              onClick={handleAccept}
              className="flex-1 py-2 px-3.5 rounded-xl bg-[#f59e0b] hover:bg-[#fbbf24] text-[#331c00] font-epilogue text-xs font-bold transition-all shadow-[0_0_12px_rgba(245,158,11,0.25)]"
            >
              {t.cookies.accept}
            </button>
            <button
              type="button"
              onClick={handleDeny}
              className="py-2 px-3.5 rounded-xl bg-[#191c21] hover:bg-white/10 text-slate-300 hover:text-white font-epilogue text-xs font-semibold border border-white/10 transition-all"
            >
              {t.cookies.deny}
            </button>
            <button
              type="button"
              onClick={() => setShowPreferences(true)}
              className="text-xs font-space-grotesk text-slate-400 hover:text-[#4cd7f6] underline px-2 py-1"
            >
              {t.cookies.preferences}
            </button>
          </div>
        </div>
      )}

      {/* Preferences Detailed Modal */}
      {showPreferences && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-[#131923] border border-white/20 p-6 sm:p-7 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <h3 className="font-epilogue text-lg font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#f59e0b]">tune</span>
                <span>Preferências de Cookies</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-3.5 rounded-xl bg-[#0c1017] border border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="font-epilogue text-xs font-bold text-white">Estritamente Necessários</h4>
                  <p className="font-body text-[11px] text-slate-400">Essenciais para navegação e segurança.</p>
                </div>
                <span className="font-space-grotesk text-xs text-[#06b6d4] font-bold">Sempre Ativo</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0c1017] border border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="font-epilogue text-xs font-bold text-white">Funcionais & Desempenho</h4>
                  <p className="font-body text-[11px] text-slate-400">Preferências de idioma e métricas operacionais.</p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.functional}
                  onChange={e => setPreferences({ ...preferences, functional: e.target.checked })}
                  className="w-4 h-4 text-[#f59e0b] focus:ring-[#f59e0b] rounded bg-slate-800"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-[#0c1017] border border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="font-epilogue text-xs font-bold text-white">Comunicação & Vagas</h4>
                  <p className="font-body text-[11px] text-slate-400">Alertas de vagas e oportunidades profissionais.</p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={e => setPreferences({ ...preferences, marketing: e.target.checked })}
                  className="w-4 h-4 text-[#f59e0b] focus:ring-[#f59e0b] rounded bg-slate-800"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleSavePreferences}
                className="flex-1 py-2.5 rounded-xl bg-[#f59e0b] hover:bg-[#fbbf24] text-[#331c00] font-epilogue text-xs sm:text-sm font-bold shadow-md transition-all"
              >
                Guardar Preferências
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className="px-4 py-2.5 rounded-xl bg-[#191c21] hover:bg-white/10 text-white font-epilogue text-xs sm:text-sm font-semibold border border-white/10 transition-all"
              >
                Aceitar Tudo
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
