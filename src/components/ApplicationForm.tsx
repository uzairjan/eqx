import React, { useRef, useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/content';
import {
  submitApplication,
  JobsApiError,
  type LiveJobOpening,
} from '../lib/chegattaJobs';

interface ApplicationFormProps {
  currentLang: Language;
  /** Live opening from the hiring pipeline. Null = applications offline. */
  liveJob: LiveJobOpening | null;
  initialArea?: string;
  onSuccess: () => void;
}

/**
 * Job application form for a specific vacancy (used by the dedicated
 * application page). Posts a REAL application to the Chegatta hiring
 * pipeline — no fake submissions: when no live opening is attached the
 * form explains applications are unavailable instead of pretending.
 */
export const ApplicationForm: React.FC<ApplicationFormProps> = ({
  currentLang,
  liveJob,
  initialArea,
  onSuccess,
}) => {
  const t = TRANSLATIONS[currentLang];

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [primaryArea, setPrimaryArea] = useState(initialArea || t.careers.areaOptions[0]);
  const [experience, setExperience] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvFileName, setCvFileName] = useState<string | null>(null);
  const [gdprAccepted, setGdprAccepted] = useState(true);
  const [dragOver, setDragOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const keepFile = (file: File | undefined) => {
    if (!file) return;
    setCvFile(file);
    setCvFileName(file.name);
  };

  const clearFile = () => {
    setCvFile(null);
    setCvFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const resetAll = () => {
    setSubmitted(false);
    setSubmitError(null);
    setFullName('');
    setPhone('');
    setEmail('');
    setPrimaryArea(initialArea || t.careers.areaOptions[0]);
    setExperience('');
    clearFile();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      alert('Por favor, preencha todos os campos obrigatórios (*).');
      return;
    }
    if (!gdprAccepted) {
      alert('É necessário aceitar a proteção de dados RGPD para avançar.');
      return;
    }
    if (!liveJob) return;

    if (!liveJob) return;
    if (cvFile && cvFile.size > 2 * 1024 * 1024) {
      setSubmitError(t.careers.fileTooLarge);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const areaNote = primaryArea ? `Área: ${primaryArea}` : '';
      const notes = [areaNote, experience.trim()].filter(Boolean).join('\n') || undefined;
      await submitApplication(liveJob, {
        name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        notes,
        cv: cvFile,
      });
      setSubmitted(true);
      onSuccess();
    } catch (err) {
      if (err instanceof JobsApiError && err.status === 422 && Object.keys(err.fields).length > 0) {
        const [field, messages] = Object.entries(err.fields)[0];
        setSubmitError(`${field}: ${messages.join(', ')}`);
      } else {
        setSubmitError(err instanceof Error ? err.message : String(err));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="py-12 px-6 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-[36px]">check_circle</span>
        </div>
        <h4 className="font-epilogue text-2xl font-bold text-white mb-2">
          Candidatura Recebida!
        </h4>
        <p className="font-body text-slate-300 text-sm max-w-md mx-auto mb-6">
          {t.careers.applySuccess}
        </p>
        <button
          type="button"
          onClick={resetAll}
          className="px-6 py-2.5 rounded-xl bg-[#191c21] hover:bg-white/10 text-white font-epilogue text-sm font-semibold border border-white/10 transition-colors"
        >
          Submeter Nova Candidatura
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-space-grotesk text-xs font-semibold text-slate-300 block mb-1.5">
            {t.careers.nameLabel}
          </label>
          <input
            type="text"
            required
            placeholder={t.careers.namePlaceholder}
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-[#0c1017] border border-white/10 text-white text-sm focus:border-[#f59e0b] focus:outline-none focus:ring-1 focus:ring-[#f59e0b] transition-colors"
          />
        </div>
        <div>
          <label className="font-space-grotesk text-xs font-semibold text-slate-300 block mb-1.5">
            {t.careers.phoneLabel}
          </label>
          <input
            type="tel"
            required
            placeholder={t.careers.phonePlaceholder}
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-[#0c1017] border border-white/10 text-white text-sm focus:border-[#f59e0b] focus:outline-none focus:ring-1 focus:ring-[#f59e0b] transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-space-grotesk text-xs font-semibold text-slate-300 block mb-1.5">
            {t.careers.emailLabel}
          </label>
          <input
            type="email"
            required
            placeholder={t.careers.emailPlaceholder}
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoCapitalize="none"
            autoCorrect="off"
            className="w-full px-4 py-2.5 rounded-xl bg-[#0c1017] border border-white/10 text-white text-sm focus:border-[#f59e0b] focus:outline-none focus:ring-1 focus:ring-[#f59e0b] transition-colors"
          />
        </div>
        <div>
          <label className="font-space-grotesk text-xs font-semibold text-slate-300 block mb-1.5">
            {t.careers.areaLabel}
          </label>
          <select
            value={primaryArea}
            onChange={e => setPrimaryArea(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-[#0c1017] border border-white/10 text-white text-sm focus:border-[#f59e0b] focus:outline-none focus:ring-1 focus:ring-[#f59e0b] transition-colors"
          >
            {t.careers.areaOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="font-space-grotesk text-xs font-semibold text-slate-300 block mb-1.5">
          {t.careers.expLabel}
        </label>
        <textarea
          rows={3}
          placeholder={t.careers.expPlaceholder}
          value={experience}
          onChange={e => setExperience(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl bg-[#0c1017] border border-white/10 text-white text-sm focus:border-[#f59e0b] focus:outline-none focus:ring-1 focus:ring-[#f59e0b] transition-colors resize-none"
        />
      </div>

      <div>
        <label className="font-space-grotesk text-xs font-semibold text-slate-300 block mb-1.5">
          {t.careers.attachCv}
        </label>
        <input
          type="file"
          ref={fileInputRef}
          accept=".pdf,.doc,.docx"
          onChange={e => keepFile(e.target.files?.[0])}
          className="hidden"
        />
        <div
          onDragOver={e => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => {
            e.preventDefault();
            setDragOver(false);
            keepFile(e.dataTransfer.files?.[0]);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`p-4 rounded-xl border border-dashed transition-colors cursor-pointer flex flex-col items-center justify-center text-center ${
            cvFileName
              ? 'border-emerald-500/50 bg-emerald-500/10'
              : dragOver
                ? 'border-[#f59e0b] bg-[#f59e0b]/10'
                : 'border-white/20 bg-[#0c1017] hover:border-white/40'
          }`}
        >
          {cvFileName ? (
            <div className="flex items-center gap-2 text-emerald-400 font-space-grotesk text-sm">
              <span className="material-symbols-outlined text-[20px]">description</span>
              <span className="font-semibold">{cvFileName}</span>
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  clearFile();
                }}
                className="text-slate-400 hover:text-rose-400 ml-2"
              >
                <span className="material-symbols-outlined text-[18px]">cancel</span>
              </button>
            </div>
          ) : (
            <>
              <span className="material-symbols-outlined text-[28px] text-slate-400 mb-1">
                cloud_upload
              </span>
              <span className="font-body text-xs text-slate-300 font-medium">
                Clique ou arraste o ficheiro de CV aqui
              </span>
              <span className="font-space-grotesk text-[10px] text-slate-500 mt-0.5">
                {t.careers.maxSize}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-start gap-2 pt-2">
        <input
          type="checkbox"
          id="gdpr-apply"
          checked={gdprAccepted}
          onChange={e => setGdprAccepted(e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded border-slate-700 text-[#f59e0b] focus:ring-[#f59e0b] bg-[#0c1017]"
        />
        <label htmlFor="gdpr-apply" className="font-body text-xs text-slate-400 leading-snug">
          Concordo com o tratamento dos meus dados pessoais nos termos do{' '}
          <strong className="text-slate-300 font-semibold">{t.careers.gdpr}</strong> para
          processos de recrutamento e mobilidade internacional da EQX.
        </label>
      </div>

      {submitError ? (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 font-body text-xs">
          {submitError}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting || !liveJob}
        title={!liveJob ? t.careers.applyOfflineNotice : undefined}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#ea580c] hover:brightness-110 text-[#331c00] font-epilogue font-bold text-sm sm:text-base shadow-[0_0_24px_rgba(245,158,11,0.35)] active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-4"
      >
        {isSubmitting ? (
          <>
            <span className="w-4 h-4 rounded-full border-2 border-[#331c00] border-t-transparent animate-spin" />
            <span>A validar candidatura...</span>
          </>
        ) : (
          <span>{t.careers.submitBtn}</span>
        )}
      </button>
    </form>
  );
};
