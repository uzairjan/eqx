import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Language } from '../types';
import { TRANSLATIONS, JOB_VACANCIES } from '../data/content';
import {
  fetchOpenings,
  isLiveMode,
  type LiveJobOpening,
} from '../lib/chegattaJobs';

interface RecruitmentSectionProps {
  currentLang: Language;
}

interface ListedVacancy {
  routeId: string;
  title: string;
  department: string;
  location: string;
  contractType: string;
  status: 'Ativa' | 'Active';
}

/**
 * Careers section: live openings from the Chegatta hiring pipeline when
 * configured (VITE_EQX_BUSINESS_TOKEN), static featured list otherwise.
 * Every card links to a dedicated vacancy page (/vaga/:id) where the
 * candidate reads the posting and applies — the professional staffing
 * flow. Spontaneous candidates go to WhatsApp (there is no general
 * talent-pool endpoint, and fake submissions are not acceptable).
 */
export const RecruitmentSection: React.FC<RecruitmentSectionProps> = ({
  currentLang,
}) => {
  const t = TRANSLATIONS[currentLang];
  const navigate = useNavigate();

  const [liveJobs, setLiveJobs] = useState<LiveJobOpening[] | null>(null);
  const [jobsError, setJobsError] = useState<string | null>(null);
  const liveMode = isLiveMode();

  useEffect(() => {
    if (!liveMode) return;
    const ctrl = new AbortController();
    fetchOpenings(ctrl.signal)
      .then((feed) => {
        setLiveJobs(feed.jobs);
        setJobsError(null);
      })
      .catch((err) => {
        if ((err as Error)?.name === 'AbortError') return;
        setLiveJobs(null);
        setJobsError(t.careers.liveLoadError);
      });
    return () => ctrl.abort();
  }, [liveMode, t]);

  const vacancies: ListedVacancy[] = liveJobs !== null
    ? liveJobs.map((job) => ({
      routeId: `live-${job.id}`,
      title: job.title,
      department: '',
      location: (job.sites || []).map((s) => s.name).filter(Boolean).join(' • '),
      contractType: '',
      status: (currentLang === 'pt' ? 'Ativa' : 'Active') as 'Ativa' | 'Active',
    }))
    : JOB_VACANCIES[currentLang].map((v) => ({
      routeId: v.id,
      title: v.title,
      department: v.department,
      location: v.location,
      contractType: v.contractType,
      status: v.status,
    }));

  return (
    <section id="recrutamento" className="relative py-20 sm:py-28 bg-[#07090e]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="font-space-grotesk text-xs font-bold text-[#06b6d4] uppercase tracking-wider mb-2">
            {t.careers.eyebrow}
          </p>
          <h2 className="font-epilogue text-3xl sm:text-4xl font-bold text-white mb-4">
            {t.careers.title}
          </h2>
          <blockquote className="font-epilogue text-base sm:text-lg italic text-[#ffc174] font-medium border-l-2 border-[#f59e0b] pl-4 py-1 mb-4">
            {t.careers.quote}
          </blockquote>
          <p className="font-body text-slate-300 text-sm sm:text-base leading-relaxed">
            {t.careers.desc}
          </p>
        </div>

        {/* Two Columns: Openings List on Left, Spontaneous Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Featured Vacancies */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="font-space-grotesk text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#06b6d4] animate-ping" />
                {t.careers.openingsTitle}
              </h3>
              <span className="font-space-grotesk text-[11px] text-[#4cd7f6] font-semibold">
                {vacancies.length} Abertas
              </span>
            </div>

            {jobsError ? (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-body text-xs">
                {jobsError}
              </div>
            ) : null}

            {vacancies.map(job => (
              <div
                key={job.routeId}
                className="p-5 rounded-2xl bg-[#131923] border border-white/[0.08] hover:border-[#f59e0b]/40 transition-all duration-300 group hover:-translate-y-0.5 shadow-md flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    {job.department ? (
                      <span className="font-space-grotesk text-[10px] font-bold text-[#06b6d4] uppercase tracking-wider block mb-1">
                        {job.department}
                      </span>
                    ) : null}
                    <h4 className="font-epilogue text-base font-bold text-white group-hover:text-[#ffc174] transition-colors">
                      {job.title}
                    </h4>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-[#f59e0b]/20 text-[#ffc174] border border-[#f59e0b]/30 font-space-grotesk text-[10px] font-bold uppercase flex-shrink-0">
                    {job.status}
                  </span>
                </div>

                {job.location ? (
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 font-space-grotesk">
                    <span className="material-symbols-outlined text-[16px] text-slate-500">pin_drop</span>
                    <span>{job.location}</span>
                  </div>
                ) : null}

                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  {job.contractType ? (
                    <span className="font-space-grotesk text-[11px] text-slate-400 font-medium">
                      {job.contractType}
                    </span>
                  ) : <span />}
                  <button
                    type="button"
                    onClick={() => navigate(`/vaga/${job.routeId}`)}
                    className="inline-flex items-center gap-1.5 text-xs font-epilogue font-bold text-[#f59e0b] hover:text-[#fbbf24] hover:underline transition-all"
                  >
                    <span>{t.careers.viewDetails}</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}

            {/* Direct WhatsApp Support Box */}
            <div className="p-5 rounded-2xl bg-[#131923] border border-emerald-500/20 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <span className="material-symbols-outlined text-[24px]">chat</span>
                </div>
                <div>
                  <h5 className="font-epilogue text-sm font-bold text-white">
                    {t.careers.whatsapp}
                  </h5>
                  <span className="font-body text-xs text-slate-400">
                    Dúvidas sobre o processo de seleção
                  </span>
                </div>
              </div>
              <a
                href="https://wa.me/351223160304"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-epilogue text-xs font-bold transition-all"
              >
                Conversar
              </a>
            </div>
          </div>

          {/* Right Column: Spontaneous Application Card */}
          <div className="lg:col-span-5 rounded-2xl bg-[#131923] border border-white/10 p-6 sm:p-8 shadow-2xl lg:sticky lg:top-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/10 flex items-center justify-center text-[#f59e0b]">
                <span className="material-symbols-outlined text-[24px]">person_add</span>
              </div>
              <h3 className="font-epilogue text-xl font-bold text-white">
                {t.careers.spontTitle}
              </h3>
            </div>
            <p className="font-body text-sm text-slate-300 leading-relaxed mb-6">
              {t.careers.spontBody}
            </p>
            <a
              href="https://wa.me/351223160304?text=Ol%C3%A1%2C%20quero%20enviar%20a%20minha%20candidatura%20espont%C3%A2nea."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-epilogue font-bold text-sm transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>{t.careers.spontCta}</span>
            </a>
            <p className="font-body text-xs text-slate-500 mt-4 text-center">
              {t.careers.spontHint}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
