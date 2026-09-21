import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Language, JobVacancy } from '../types';
import { TRANSLATIONS, JOB_VACANCIES } from '../data/content';
import { parseRouteId, useLiveJobs, type LiveJobOpening } from '../lib/chegattaJobs';

interface JobDetailPageProps {
  currentLang: Language;
}

interface ResolvedJob {
  routeId: string;
  title: string;
  department: string;
  location: string;
  contractType: string;
  description: string | null;
  reference: string;
  opensAt: string | null;
  closesAt: string | null;
  openPositions: number | null;
  liveJob: LiveJobOpening | null;
}

function resolveStatic(v: JobVacancy): ResolvedJob {
  return {
    routeId: v.id,
    title: v.title,
    department: v.department,
    location: v.location,
    contractType: v.contractType,
    description: null,
    reference: `EQX-${v.id.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8) || 'GEN'}`,
    opensAt: null,
    closesAt: null,
    openPositions: null,
    liveJob: null,
  };
}

function resolveLive(job: LiveJobOpening): ResolvedJob {
  return {
    routeId: `live-${job.id}`,
    title: job.title,
    department: '',
    location: '',
    contractType: '',
    description: job.description,
    reference: `EQX-${job.id}`,
    opensAt: job.opens_at,
    closesAt: job.closes_at,
    openPositions: job.open_positions,
    liveJob: job,
  };
}

/**
 * Dedicated vacancy page (Randstad/Adecco pattern): the full posting with
 * reference code, dates and open positions, ending in one Apply action.
 * Reached from the openings list; deep-linkable and shareable per vacancy.
 */
export const JobDetailPage: React.FC<JobDetailPageProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const { jobId = '' } = useParams();
  const navigate = useNavigate();
  const { feed, loading, error } = useLiveJobs();

  useEffect(() => {
    document.title = 'EQX — Vaga';
  }, []);

  const parsed = parseRouteId(jobId);
  let resolved: ResolvedJob | null = null;
  if ('liveId' in parsed) {
    const found = feed?.jobs.find((j) => j.id === parsed.liveId) ?? null;
    resolved = found ? resolveLive(found) : null;
  } else if (parsed.slug) {
    const found = JOB_VACANCIES[currentLang].find((v) => v.id === parsed.slug) ?? null;
    resolved = found ? resolveStatic(found) : null;
  }

  useEffect(() => {
    if (resolved) document.title = `EQX — ${resolved.title}`;
  });

  return (
    <div className="min-h-screen bg-[#07090e] text-[#e2e2ea] pt-24 sm:pt-28 pb-20">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
        <button
          type="button"
          onClick={() => navigate('/#recrutamento')}
          className="inline-flex items-center gap-1.5 text-xs font-epilogue font-bold text-slate-400 hover:text-[#ffc174] transition-colors mb-6"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>{t.careers.backToVacancies}</span>
        </button>

        {loading ? (
          <div className="rounded-2xl bg-[#131923] border border-white/10 p-8 animate-pulse">
            <div className="h-6 w-2/3 rounded bg-white/10 mb-3" />
            <div className="h-4 w-1/3 rounded bg-white/10 mb-6" />
            <div className="h-24 rounded bg-white/5" />
          </div>
        ) : error || !resolved ? (
          <div className="rounded-2xl bg-[#131923] border border-rose-500/30 p-8 text-center">
            <h1 className="font-epilogue text-2xl font-bold text-white mb-2">
              {t.careers.jobNotFound}
            </h1>
            <p className="font-body text-sm text-slate-400 mb-6">
              {error || t.careers.jobNotFoundBody}
            </p>
            <Link
              to="/#recrutamento"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#ea580c] text-[#331c00] font-epilogue font-bold text-sm"
            >
              {t.careers.backToVacancies}
            </Link>
          </div>
        ) : (
          <article className="rounded-2xl bg-[#131923] border border-white/10 overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-space-grotesk text-[10px] font-bold uppercase">
                  {t.careers.openNow}
                </span>
                <span className="font-space-grotesk text-[11px] text-slate-500">
                  REF {resolved.reference}
                </span>
              </div>
              <h1 className="font-epilogue text-2xl sm:text-3xl font-bold text-white mb-3">
                {resolved.title}
              </h1>
              <div className="flex flex-wrap gap-x-5 gap-y-1.5 font-space-grotesk text-xs text-slate-400">
                {resolved.department ? <span>{resolved.department}</span> : null}
                {resolved.location ? <span>{resolved.location}</span> : null}
                {resolved.contractType ? <span>{resolved.contractType}</span> : null}
                {resolved.openPositions != null ? (
                  <span>{t.careers.openPositions.replace('{n}', String(resolved.openPositions))}</span>
                ) : null}
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              {resolved.description ? (
                <p className="font-body text-sm sm:text-base text-slate-300 leading-relaxed whitespace-pre-line">
                  {resolved.description}
                </p>
              ) : null}
              {(resolved.opensAt || resolved.closesAt) && (
                <p className="font-space-grotesk text-xs text-slate-500">
                  {[resolved.opensAt, resolved.closesAt].filter(Boolean).join(' — ')}
                </p>
              )}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => navigate(`/candidatura/${resolved!.routeId}`)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#ea580c] hover:brightness-110 text-[#331c00] font-epilogue font-bold text-sm sm:text-base shadow-[0_0_24px_rgba(245,158,11,0.35)] active:scale-[0.99] transition-all"
                >
                  <span>{t.careers.applyNow}</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </article>
        )}
      </div>
    </div>
  );
};
