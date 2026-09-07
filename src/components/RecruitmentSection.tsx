import React, { useState, useRef } from 'react';
import { Language, ApplicationFormData } from '../types';
import { TRANSLATIONS, JOB_VACANCIES } from '../data/content';

interface RecruitmentSectionProps {
  currentLang: Language;
  preselectedArea?: string;
  onApplicationSuccess: () => void;
}

export const RecruitmentSection: React.FC<RecruitmentSectionProps> = ({
  currentLang,
  preselectedArea,
  onApplicationSuccess
}) => {
  const t = TRANSLATIONS[currentLang];
  const vacancies = JOB_VACANCIES[currentLang];

  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: '',
    phone: '',
    email: '',
    primaryArea: preselectedArea || 'Energias Renováveis',
    experience: '',
    cvFileName: null,
    gdprAccepted: true
  });

  // Update primaryArea if preselectedArea changes
  React.useEffect(() => {
    if (preselectedArea) {
      setFormData(prev => ({ ...prev, primaryArea: preselectedArea }));
    }
  }, [preselectedArea]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, cvFileName: e.target.files[0].name });
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData({ ...formData, cvFileName: e.dataTransfer.files[0].name });
    }
  };

  const handleSelectVacancy = (title: string, dept: string) => {
    setFormData(prev => ({
      ...prev,
      primaryArea: dept,
      experience: prev.experience ? `${prev.experience}\n[Candidatura à vaga: ${title}]` : `[Candidatura à vaga: ${title}]`
    }));

    // Scroll smoothly to the form container
    const formElement = document.getElementById('candidatura-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert('Por favor, preencha todos os campos obrigatórios (*).');
      return;
    }
    if (!formData.gdprAccepted) {
      alert('É necessário aceitar a proteção de dados RGPD para avançar.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      onApplicationSuccess();
    }, 1200);
  };

  return (
    <section id="recrutamento" className="relative py-20 sm:py-28 bg-[#07090e]">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#f59e0b]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <span className="font-space-grotesk text-xs font-bold text-[#f59e0b] uppercase tracking-widest block mb-2">
            {t.careers.eyebrow}
          </span>
          <h2 className="font-epilogue text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            {t.careers.title}
          </h2>
          <blockquote className="font-epilogue text-base sm:text-lg italic text-[#ffc174] font-medium border-l-2 border-[#f59e0b] pl-4 py-1 mb-4">
            {t.careers.quote}
          </blockquote>
          <p className="font-body text-slate-300 text-sm sm:text-base leading-relaxed">
            {t.careers.desc}
          </p>
        </div>

        {/* Two Columns: Openings List on Left, Direct Application Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Featured Vacancies */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="font-space-grotesk text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#06b6d4] animate-ping" />
                {t.careers.openingsTitle}
              </h3>
              <span className="font-space-grotesk text-[11px] text-[#4cd7f6] font-semibold">
                {vacancies.length} Abertas
              </span>
            </div>

            {vacancies.map(job => (
              <div
                key={job.id}
                className="p-5 rounded-2xl bg-[#131923] border border-white/[0.08] hover:border-[#f59e0b]/40 transition-all duration-300 group hover:-translate-y-0.5 shadow-md flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="font-space-grotesk text-[10px] font-bold text-[#06b6d4] uppercase tracking-wider block mb-1">
                      {job.department}
                    </span>
                    <h4 className="font-epilogue text-base font-bold text-white group-hover:text-[#ffc174] transition-colors">
                      {job.title}
                    </h4>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-[#f59e0b]/20 text-[#ffc174] border border-[#f59e0b]/30 font-space-grotesk text-[10px] font-bold uppercase flex-shrink-0">
                    {job.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 font-space-grotesk">
                  <span className="material-symbols-outlined text-[16px] text-slate-500">pin_drop</span>
                  <span>{job.location}</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <span className="font-space-grotesk text-[11px] text-slate-400 font-medium">
                    {job.contractType}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleSelectVacancy(job.title, job.department)}
                    className="inline-flex items-center gap-1.5 text-xs font-epilogue font-bold text-[#f59e0b] hover:text-[#fbbf24] hover:underline transition-all"
                  >
                    <span>Candidatar</span>
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

          {/* Right Column: Application Form Terminal */}
          <div
            id="candidatura-form"
            className="lg:col-span-7 rounded-2xl bg-[#131923] border border-white/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div>
                <h3 className="font-epilogue text-xl sm:text-2xl font-bold text-white">
                  {t.careers.formTitle}
                </h3>
                <span className="font-space-grotesk text-xs text-slate-400">
                  {t.careers.formRef}
                </span>
              </div>
              <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            </div>

            {submitted ? (
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
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: '',
                      phone: '',
                      email: '',
                      primaryArea: 'Energias Renováveis',
                      experience: '',
                      cvFileName: null,
                      gdprAccepted: true
                    });
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#191c21] hover:bg-white/10 text-white font-epilogue text-sm font-semibold border border-white/10 transition-colors"
                >
                  Submeter Nova Candidatura
                </button>
              </div>
            ) : (
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
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
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
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
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
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0c1017] border border-white/10 text-white text-sm focus:border-[#f59e0b] focus:outline-none focus:ring-1 focus:ring-[#f59e0b] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="font-space-grotesk text-xs font-semibold text-slate-300 block mb-1.5">
                      {t.careers.areaLabel}
                    </label>
                    <select
                      value={formData.primaryArea}
                      onChange={e => setFormData({ ...formData, primaryArea: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0c1017] border border-white/10 text-white text-sm focus:border-[#f59e0b] focus:outline-none focus:ring-1 focus:ring-[#f59e0b] transition-colors"
                    >
                      <option value="Energias Renováveis">Energias Renováveis (Eólica / Solar)</option>
                      <option value="Indústria Naval">Indústria Naval (Construção & Conversão)</option>
                      <option value="Eletricidade Industrial">Eletricidade Industrial (BT / MT)</option>
                      <option value="Metalomecânica & Precisão">Metalomecânica & Precisão (Soldadura)</option>
                      <option value="Outra Especialidade">Outra Especialidade Técnica</option>
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
                    value={formData.experience}
                    onChange={e => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0c1017] border border-white/10 text-white text-sm focus:border-[#f59e0b] focus:outline-none focus:ring-1 focus:ring-[#f59e0b] transition-colors resize-none"
                  />
                </div>

                {/* CV File Upload Box (Drag & Drop + Manual Click) */}
                <div>
                  <label className="font-space-grotesk text-xs font-semibold text-slate-300 block mb-1.5">
                    {t.careers.attachCv}
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div
                    onDragOver={e => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`p-4 rounded-xl border border-dashed transition-colors cursor-pointer flex flex-col items-center justify-center text-center ${
                      dragOver
                        ? 'border-[#f59e0b] bg-[#f59e0b]/10'
                        : formData.cvFileName
                        ? 'border-emerald-500/50 bg-emerald-500/10'
                        : 'border-white/20 bg-[#0c1017] hover:border-white/40'
                    }`}
                  >
                    {formData.cvFileName ? (
                      <div className="flex items-center gap-2 text-emerald-400 font-space-grotesk text-sm">
                        <span className="material-symbols-outlined text-[20px]">description</span>
                        <span className="font-semibold">{formData.cvFileName}</span>
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            setFormData({ ...formData, cvFileName: null });
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

                {/* GDPR Checkbox */}
                <div className="flex items-start gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="gdpr"
                    checked={formData.gdprAccepted}
                    onChange={e => setFormData({ ...formData, gdprAccepted: e.target.checked })}
                    className="mt-0.5 w-4 h-4 rounded border-slate-700 text-[#f59e0b] focus:ring-[#f59e0b] bg-[#0c1017]"
                  />
                  <label htmlFor="gdpr" className="font-body text-xs text-slate-400 leading-snug">
                    Concordo com o tratamento dos meus dados pessoais nos termos do{' '}
                    <strong className="text-slate-300 font-semibold">{t.careers.gdpr}</strong> para
                    processos de recrutamento e mobilidade internacional da EQX.
                  </label>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#ea580c] hover:brightness-110 text-[#331c00] font-epilogue font-bold text-sm sm:text-base shadow-[0_0_24px_rgba(245,158,11,0.35)] active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-4"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-[#331c00] border-t-transparent animate-spin" />
                      <span>A validar candidatura...</span>
                    </>
                  ) : (
                    <>
                      <span>{t.careers.submitBtn}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
