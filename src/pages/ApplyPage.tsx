import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Language } from '../types';
import { TRANSLATIONS, JOB_VACANCIES } from '../data/content';
import { parseRouteId, useLiveJobs } from '../lib/chegattaJobs';
import { ApplicationForm } from '../components/ApplicationForm';

interface ApplyPageProps {
  currentLang: Language;
}

/**
 * Dedicated application page for one vacancy: job summary on top, the
 * application form below. Submitting posts a REAL application to the
 * hiring pipeline. When the opening is not a live one (static preview
 * without a configured business token), the form is replaced by an
 * honest pointer to direct contact — never a fake submission.
 */
export const ApplyPage: React.FC<ApplyPageProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const { jobId = '' } = useParams();
  const navigate = useNavigate();
  const { feed, loading } = useLiveJobs();

  useEffect(() => {
    document.title = 'EQX — Candidatura';
  }, []);

  const parsed = parseRouteId(jobId);
  const liveJob = ('liveId' in parsed)
    ? feed?.jobs.find((j) => j.id === parsed.liveId) ?? null
    : null;
  const staticJob = ('slug' in parsed)
    ? JOB_VACANCIES[currentLang].find((v) => v.id === parsed.slug) ?? null
    : null;
  const title = liveJob?.title ?? staticJob?.title ?? '';
  const jobKnown = Boolean(liveJob || staticJob);

  useEffect(() => {
    if (title) document.title = `EQX — Candidatura: ${title}`;
  }, [title]);

  return (
    <div className="min-h-screen bg-[#07090e] text-[#e2e2ea] pt-24 sm:pt-28 pb-20">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
        <button
          type="button"
          onClick={() => navigate(jobKnown ? `/vaga/${jobId}` : '/#recrutamento')}
          className="inline-flex items-center gap-1.5 text-xs font-epilogue font-bold text-slate-400 hover:text-[#ffc174] transition-colors mb-6"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>{t.careers.backToVacancy}</span>
        </button>

        <div className="rounded-2xl bg-[#131923] border border-white/10 p-6 sm:p-8">
          <span className="font-space-grotesk text-[11px] text-slate-500">
            REF {liveJob ? `EQX-${liveJob.id}` : jobId.toUpperCase().slice(0, 12)}
          </span>
          <h1 className="font-epilogue text-2xl sm:text-3xl font-bold text-white mt-1 mb-6">
            {title || t.careers.applyTitleFallback}
          </h1>

          {loading ? (
            <div className="animate-pulse space-y-3">
              <div className="h-10 rounded-xl bg-white/10" />
              <div className="h-10 rounded-xl bg-white/10" />
              <div className="h-24 rounded-xl bg-white/10" />
            </div>
          ) : (liveJob || staticJob) ? (
            liveJob ? (
              <ApplicationForm
                currentLang={currentLang}
                liveJob={liveJob}
                onSuccess={() => {}}
              />
            ) : (
              <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-5 text-center">
                <p className="font-body text-sm text-amber-200 mb-4">
                  {t.careers.applyOfflineNotice}
                </p>
                <a
                  href="#contactos"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/#contactos');
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#ea580c] text-[#331c00] font-epilogue font-bold text-sm"
                >
                  {t.careers.contactUs}
                </a>
              </div>
            )
          ) : (
            <div className="rounded-xl bg-rose-500/10 border border-rose-500/30 p-5 text-center">
              <p className="font-body text-sm text-rose-200 mb-4">
                {t.careers.jobNotFoundBody}
              </p>
              <Link
                to="/#recrutamento"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 text-white font-epilogue font-bold text-sm border border-white/10"
              >
                {t.careers.backToVacancies}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
