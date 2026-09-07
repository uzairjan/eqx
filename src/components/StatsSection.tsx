import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/content';

interface StatsSectionProps {
  currentLang: Language;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];

  const stats = [
    {
      label: t.stats.humanCapital,
      value: t.stats.specialists,
      unit: t.stats.specialistsUnit,
      desc: t.stats.specialistsDesc,
      icon: 'engineering',
      accent: 'amber' as const,
      borderGlow: 'hover:border-[#f59e0b]/50'
    },
    {
      label: t.stats.portfolio,
      value: t.stats.projects,
      unit: t.stats.projectsUnit,
      desc: t.stats.projectsDesc,
      icon: 'verified',
      accent: 'cyan' as const,
      borderGlow: 'hover:border-[#06b6d4]/50'
    },
    {
      label: t.stats.turnkey,
      value: t.stats.turnkeyVal,
      unit: t.stats.turnkeyUnit,
      desc: t.stats.turnkeyDesc,
      icon: 'home_repair_service',
      accent: 'amber' as const,
      borderGlow: 'hover:border-[#f59e0b]/50'
    },
    {
      label: t.stats.disciplines,
      value: t.stats.disciplinesVal,
      unit: t.stats.disciplinesUnit,
      desc: t.stats.disciplinesDesc,
      icon: 'hub',
      accent: 'cyan' as const,
      borderGlow: 'hover:border-[#06b6d4]/50'
    }
  ];

  return (
    <section className="relative py-12 sm:py-16 bg-[#0c1017] border-y border-white/[0.08]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className={`relative p-6 rounded-2xl bg-[#131923] border border-white/[0.08] ${item.borderGlow} transition-all duration-300 group hover:-translate-y-1 shadow-lg hover:shadow-2xl`}
            >
              {/* Top Accent Icon & Tag */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-space-grotesk text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  {item.label}
                </span>
                <span
                  className={`material-symbols-outlined text-[20px] ${
                    item.accent === 'amber' ? 'text-[#f59e0b]' : 'text-[#06b6d4]'
                  } group-hover:scale-110 transition-transform`}
                >
                  {item.icon}
                </span>
              </div>

              {/* Number and Unit */}
              <div className="flex items-baseline gap-2 mb-2">
                <span
                  className={`font-epilogue text-3xl sm:text-4xl font-black ${
                    item.accent === 'amber'
                      ? 'text-white group-hover:text-[#ffc174]'
                      : 'text-white group-hover:text-[#4cd7f6]'
                  } transition-colors`}
                >
                  {item.value}
                </span>
                <span className="font-space-grotesk text-sm font-semibold text-slate-400">
                  {item.unit}
                </span>
              </div>

              {/* Description */}
              <p className="font-body text-xs sm:text-sm text-slate-300 leading-relaxed">
                {item.desc}
              </p>

              {/* Subtle bottom indicator line */}
              <div
                className={`absolute bottom-0 left-6 right-6 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                  item.accent === 'amber' ? 'bg-[#f59e0b]' : 'bg-[#06b6d4]'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
