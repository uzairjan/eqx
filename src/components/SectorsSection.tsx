import React, { useEffect, useState } from 'react';
import { Language, SectorItem } from '../types';
import { TRANSLATIONS, SECTORS_DATA } from '../data/content';

interface SectorsSectionProps {
  currentLang: Language;
  onApplyForSector: (sectorTitle: string) => void;
}

export const SectorsSection: React.FC<SectorsSectionProps> = ({
  currentLang,
  onApplyForSector
}) => {
  const t = TRANSLATIONS[currentLang];
  const sectors = SECTORS_DATA[currentLang];
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeModalSector, setActiveModalSector] = useState<SectorItem | null>(null);

  // Escape closes the detail modal.
  useEffect(() => {
    if (!activeModalSector) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModalSector(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeModalSector]);

  const filters = [
    { id: 'all', label: t.areas.filterAll },
    { id: 'wind_solar', label: t.areas.filterOffshore },
    { id: 'naval', label: t.areas.filterNaval },
    { id: 'electrical', label: t.areas.filterElectric },
    { id: 'metalwork', label: t.areas.filterMetal }
  ];

  const filteredSectors = selectedFilter === 'all'
    ? sectors
    : sectors.filter(s => s.category === selectedFilter);

  return (
    <section id="areas-de-atuacao" className="relative py-20 sm:py-28 bg-[#07090e]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -right-48 w-80 h-80 rounded-full bg-[#06b6d4]/5 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="font-space-grotesk text-xs font-bold text-[#06b6d4] uppercase tracking-widest block mb-2">
              {t.areas.eyebrow}
            </span>
            <h2 className="font-epilogue text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              {t.areas.title}
            </h2>
            <p className="font-body text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
              {t.areas.subtitle}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#131923] border border-white/[0.08] self-start md:self-auto">
            {filters.map(filter => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-3.5 py-1.5 rounded-lg font-space-grotesk text-xs font-semibold transition-all ${
                  selectedFilter === filter.id
                    ? 'bg-[#f59e0b] text-[#331c00] shadow-[0_0_12px_rgba(245,158,11,0.3)] font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredSectors.map((sector) => {
            const isCyan = sector.badgeColor === 'cyan';
            return (
              <div
                key={sector.id}
                className={`relative rounded-2xl overflow-hidden bg-[#131923] border transition-all duration-300 flex flex-col ${
                  isCyan
                    ? 'border-[#06b6d4]/20 hover:border-[#06b6d4]/60 shadow-[0_10px_30px_rgba(0,0,0,0.5)] card-glow-hover'
                    : 'border-[#f59e0b]/20 hover:border-[#f59e0b]/60 shadow-[0_10px_30px_rgba(0,0,0,0.5)] card-glow-amber-hover'
                }`}
              >
                {/* Visual Banner */}
                <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-slate-900 group">
                  <img
                    src={sector.imageUrl}
                    alt={sector.altText}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131923] via-[#131923]/30 to-transparent" />

                  {/* Badges Over Image */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full font-space-grotesk text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider backdrop-blur-md border ${
                        isCyan
                          ? 'bg-[#06b6d4]/20 text-[#4cd7f6] border-[#06b6d4]/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                          : 'bg-[#f59e0b]/20 text-[#ffc174] border-[#f59e0b]/40 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                      }`}
                    >
                      {sector.badge}
                    </span>

                    <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 font-space-grotesk text-[10px] text-slate-300 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {sector.availability}
                    </span>
                  </div>

                  {/* Sector Number identifier */}
                  <div className="absolute bottom-3 left-4">
                    <span className="font-space-grotesk text-xs font-bold text-slate-400">
                      {sector.number}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-epilogue text-2xl font-bold text-white mb-2">
                      {sector.title}
                    </h3>
                    <p className="font-body text-slate-300 text-sm leading-relaxed mb-5">
                      {sector.description}
                    </p>

                    {/* Bullet Points */}
                    <ul className="space-y-2.5 mb-6">
                      {sector.bulletPoints.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <span
                            className={`material-symbols-outlined text-[18px] flex-shrink-0 mt-0.5 ${
                              isCyan ? 'text-[#06b6d4]' : 'text-[#f59e0b]'
                            }`}
                          >
                            check_circle
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions: Apply directly or inspect */}
                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onApplyForSector(sector.title)}
                      className={`flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-epilogue text-xs sm:text-sm font-bold transition-all ${
                        isCyan
                          ? 'bg-[#191c21] hover:bg-[#06b6d4] text-[#4cd7f6] hover:text-[#0c1017] border border-[#06b6d4]/30 shadow-sm'
                          : 'bg-[#191c21] hover:bg-[#f59e0b] text-[#ffc174] hover:text-[#331c00] border border-[#f59e0b]/30 shadow-sm'
                      }`}
                    >
                      <span>{t.areas.applyCard}</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveModalSector(sector)}
                      className="p-3 rounded-xl bg-[#191c21] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/10 transition-colors"
                      title="Ver Especificações"
                    >
                      <span className="material-symbols-outlined text-[18px]">info</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sector Technical Detail Modal */}
      {activeModalSector && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveModalSector(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl bg-[#131923] border border-white/20 p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveModalSector(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>

            <span className="font-space-grotesk text-xs font-bold text-[#f59e0b] uppercase tracking-wider block mb-1">
              {activeModalSector.number} {activeModalSector.badge}
            </span>
            <h3 className="font-epilogue text-2xl font-bold text-white mb-3">
              {activeModalSector.title}
            </h3>
            <p className="font-body text-slate-300 text-sm leading-relaxed mb-5">
              {activeModalSector.description}
            </p>

            <div className="mb-6 p-4 rounded-xl bg-[#0c1017] border border-white/5">
              <h4 className="font-space-grotesk text-xs font-bold text-slate-400 uppercase mb-3">
                {t.areas.modalDisciplines}
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {activeModalSector.bulletPoints.map((bp, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#06b6d4]">arrow_right</span>
                    <span>{bp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  const title = activeModalSector.title;
                  setActiveModalSector(null);
                  onApplyForSector(title);
                }}
                className="flex-1 py-3 rounded-xl bg-[#f59e0b] hover:bg-[#fbbf24] text-[#331c00] font-epilogue text-sm font-bold shadow-lg transition-all"
              >
                {t.areas.modalApply}
              </button>
              <button
                type="button"
                onClick={() => setActiveModalSector(null)}
                className="px-5 py-3 rounded-xl bg-[#191c21] hover:bg-white/10 text-white font-epilogue text-sm font-semibold border border-white/10 transition-all"
              >
                {t.areas.modalClose}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
