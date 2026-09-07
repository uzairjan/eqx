import React, { useState } from 'react';
import { Language, OperationalHub } from '../types';
import { TRANSLATIONS, OPERATIONAL_HUBS } from '../data/content';

interface EuropeMapSectionProps {
  currentLang: Language;
}

export const EuropeMapSection: React.FC<EuropeMapSectionProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const hubs = OPERATIONAL_HUBS[currentLang];
  const [activeHubId, setActiveHubId] = useState<string>('portugal');

  const selectedHub = hubs.find(h => h.id === activeHubId) || hubs[0];

  return (
    <section className="relative py-20 sm:py-28 bg-[#0c1017] border-t border-white/[0.08] overflow-hidden">
      {/* Background glow and subtle radar grid */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-[#06b6d4]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="max-w-3xl mb-12">
          <span className="font-space-grotesk text-xs font-bold text-[#06b6d4] uppercase tracking-widest block mb-2">
            {t.europe.eyebrow}
          </span>
          <h2 className="font-epilogue text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            {t.europe.title}
          </h2>
          <p className="font-body text-slate-300 text-sm sm:text-base leading-relaxed">
            {t.europe.desc}
          </p>
        </div>

        {/* Bento Grid: Radar Visualization on Left/Top, Hubs Detail & Metrics on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Radar Canvas Visualization */}
          <div className="lg:col-span-7 rounded-2xl bg-[#131923] border border-[#06b6d4]/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            {/* Top Telemetry Header in Radar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#06b6d4] animate-ping" />
                <span className="font-space-grotesk text-xs font-bold text-[#4cd7f6] uppercase tracking-wider">
                  {t.europe.activeMap}
                </span>
              </div>
              <span className="font-space-grotesk text-[11px] text-emerald-400 font-semibold">
                {t.europe.status}
              </span>
            </div>

            {/* Simulated European Industrial Radar Map SVG */}
            <div className="relative w-full h-72 sm:h-96 rounded-xl bg-[#07090e] border border-white/5 flex items-center justify-center overflow-hidden">
              {/* Radar concentric rings and sweeping line */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-48 sm:w-64 h-48 sm:h-64 rounded-full border border-[#06b6d4]/20" />
                <div className="w-72 sm:w-96 h-72 sm:h-96 rounded-full border border-[#06b6d4]/10" />
                <div className="absolute inset-0 bg-[radial-gradient(#06b6d420_1px,transparent_1px)] [background-size:20px_20px]" />
              </div>

              {/* Coordinates Grid Overlay */}
              <div className="absolute top-3 left-3 font-space-grotesk text-[10px] text-slate-500">
                LAT 36°N — 65°N // LON 10°W — 25°E
              </div>

              {/* Interactive Hub Pointers */}
              {/* Portugal (Gaia HQ) */}
              <button
                type="button"
                onClick={() => setActiveHubId('portugal')}
                className={`absolute left-[20%] bottom-[30%] group focus:outline-none transition-all ${
                  activeHubId === 'portugal' ? 'scale-125 z-20' : 'z-10'
                }`}
                title="Portugal (Sede Operacional Gaia)"
              >
                <div className="relative flex items-center justify-center">
                  <span className="w-4 h-4 rounded-full bg-[#f59e0b] radar-pulse-amber" />
                  <span className="absolute w-2 h-2 rounded-full bg-white" />
                </div>
                <span className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-space-grotesk text-[10px] font-bold text-[#ffc174] bg-[#0c1017]/90 px-1.5 py-0.5 rounded border border-[#f59e0b]/30">
                  PT (Gaia HQ)
                </span>
              </button>

              {/* France & Germany */}
              <button
                type="button"
                onClick={() => setActiveHubId('france-germany')}
                className={`absolute left-[45%] top-[45%] group focus:outline-none transition-all ${
                  activeHubId === 'france-germany' ? 'scale-125 z-20' : 'z-10'
                }`}
                title="França & Alemanha"
              >
                <div className="relative flex items-center justify-center">
                  <span className="w-4 h-4 rounded-full bg-[#06b6d4] radar-pulse-ring" />
                  <span className="absolute w-2 h-2 rounded-full bg-white" />
                </div>
                <span className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-space-grotesk text-[10px] font-bold text-[#4cd7f6] bg-[#0c1017]/90 px-1.5 py-0.5 rounded border border-[#06b6d4]/30">
                  FR & DE
                </span>
              </button>

              {/* Netherlands & Belgium */}
              <button
                type="button"
                onClick={() => setActiveHubId('netherlands-belgium')}
                className={`absolute left-[50%] top-[30%] group focus:outline-none transition-all ${
                  activeHubId === 'netherlands-belgium' ? 'scale-125 z-20' : 'z-10'
                }`}
                title="Holanda & Bélgica"
              >
                <div className="relative flex items-center justify-center">
                  <span className="w-4 h-4 rounded-full bg-[#06b6d4] radar-pulse-ring" />
                  <span className="absolute w-2 h-2 rounded-full bg-white" />
                </div>
                <span className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-space-grotesk text-[10px] font-bold text-[#4cd7f6] bg-[#0c1017]/90 px-1.5 py-0.5 rounded border border-[#06b6d4]/30">
                  NL & BE
                </span>
              </button>

              {/* Scandinavia & Spain */}
              <button
                type="button"
                onClick={() => setActiveHubId('scandinavia-spain')}
                className={`absolute right-[30%] top-[18%] group focus:outline-none transition-all ${
                  activeHubId === 'scandinavia-spain' ? 'scale-125 z-20' : 'z-10'
                }`}
                title="Escandinávia & Espanha"
              >
                <div className="relative flex items-center justify-center">
                  <span className="w-4 h-4 rounded-full bg-[#f59e0b] radar-pulse-amber" />
                  <span className="absolute w-2 h-2 rounded-full bg-white" />
                </div>
                <span className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-space-grotesk text-[10px] font-bold text-[#ffc174] bg-[#0c1017]/90 px-1.5 py-0.5 rounded border border-[#f59e0b]/30">
                  Nordics & ES
                </span>
              </button>

              {/* Bottom active hub info pill */}
              <div className="absolute bottom-3 right-3 font-space-grotesk text-[11px] text-slate-300 bg-[#131923]/90 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                {selectedHub.name} • {selectedHub.coordinates}
              </div>
            </div>
          </div>

          {/* Right Column: Hubs Selector & Metrics Strip */}
          <div className="lg:col-span-5 space-y-6">
            {/* Hub Selector Buttons */}
            <div className="space-y-3">
              <h3 className="font-space-grotesk text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Hubs Estratégicos Ativos
              </h3>
              {hubs.map(hub => {
                const isActive = hub.id === activeHubId;
                return (
                  <button
                    key={hub.id}
                    type="button"
                    onClick={() => setActiveHubId(hub.id)}
                    className={`w-full p-4 rounded-xl text-left border transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-[#191c21] border-[#f59e0b] shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                        : 'bg-[#131923] border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <h4 className="font-epilogue text-sm font-bold text-white mb-0.5">
                        {hub.name}
                      </h4>
                      <span className="font-space-grotesk text-xs text-slate-400 block">
                        {hub.role}
                      </span>
                      <p className="font-body text-xs text-slate-400 mt-1">
                        {hub.highlight}
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0 ml-3">
                      <span className="font-space-grotesk text-base font-bold text-[#4cd7f6] block">
                        {hub.activeSpecialists}
                      </span>
                      <span className="font-space-grotesk text-[10px] text-slate-500 uppercase">
                        Especialistas
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* 3 Metric Counters */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-[#131923] border border-white/10 text-center">
                <span className="font-epilogue text-xl sm:text-2xl font-black text-white block">
                  {t.europe.hubsCount}
                </span>
                <span className="font-space-grotesk text-[10px] sm:text-[11px] text-slate-400 uppercase">
                  {t.europe.hubsLabel}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#131923] border border-white/10 text-center">
                <span className="font-epilogue text-xl sm:text-2xl font-black text-[#f59e0b] block">
                  {t.europe.accomCount}
                </span>
                <span className="font-space-grotesk text-[10px] sm:text-[11px] text-slate-400 uppercase">
                  {t.europe.accomLabel}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#131923] border border-white/10 text-center">
                <span className="font-epilogue text-xl sm:text-2xl font-black text-[#4cd7f6] block">
                  {t.europe.stopsCount}
                </span>
                <span className="font-space-grotesk text-[10px] sm:text-[11px] text-slate-400 uppercase">
                  {t.europe.stopsLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
