import React, { useEffect, useState } from 'react';
import { Language, B2BProposalData } from '../types';
import { TRANSLATIONS } from '../data/content';
import { isLiveMode, submitLead, JobsApiError } from '../lib/chegattaJobs';

interface B2BModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onSuccess: () => void;
}

export const B2BModal: React.FC<B2BModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onSuccess
}) => {
  const t = TRANSLATIONS[currentLang];
  const [formData, setFormData] = useState<B2BProposalData>(() => ({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    sector: 'Energias Renováveis',
    specialistsNeeded: '5 - 15 Especialistas',
    deploymentLocation: '',
    message: ''
  }));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Fresh form every time the modal opens; never show a stale success.
  useEffect(() => {
    if (isOpen) {
      setIsSent(false);
      setSubmitError(null);
      setIsSubmitting(false);
      setFormData({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        sector: t.b2bModal.sectorOptions[0],
        specialistsNeeded: t.b2bModal.headcountOptions[1],
        deploymentLocation: '',
        message: ''
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Escape closes (but never while sending).
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSubmitting) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.email || !formData.phone) {
      setSubmitError(t.b2bModal.errRequired);
      return;
    }

    // Static preview (no business token): the lead has nowhere to go.
    // Say so honestly instead of faking success.
    if (!isLiveMode()) {
      setSubmitError(t.b2bModal.previewNotice);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await submitLead({
        company_name: formData.companyName,
        contact_person: formData.contactPerson,
        email: formData.email,
        phone: formData.phone || undefined,
        sector: formData.sector || undefined,
        headcount: formData.specialistsNeeded || undefined,
        message: [
          formData.deploymentLocation ? `Location: ${formData.deploymentLocation}` : '',
          formData.message || '',
        ].filter(Boolean).join('\n') || undefined,
      });
      setIsSent(true);
      onSuccess();
    } catch (err) {
      if (err instanceof JobsApiError && err.status === 422 && Object.keys(err.fields).length > 0) {
        const [field, messages] = Object.entries(err.fields)[0];
        setSubmitError(`${field}: ${messages.join(', ')}`);
      } else {
        setSubmitError(err instanceof Error ? err.message : t.b2bModal.submitError);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto"
      onClick={() => {
        if (!isSubmitting) onClose();
      }}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-[#131923] border border-white/20 p-6 sm:p-8 shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Fechar"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        {isSent ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/40 flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[36px]">business_center</span>
            </div>
            <h3 className="font-epilogue text-2xl font-bold text-white mb-2">
              {t.b2bModal.successTitle}
            </h3>
            <p className="font-body text-slate-300 text-sm max-w-md mx-auto mb-6">
              {t.b2bModal.success}
            </p>
            <button
              type="button"
              onClick={() => {
                setIsSent(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-[#f59e0b] text-[#331c00] font-epilogue text-sm font-bold shadow-lg"
            >
              {t.b2bModal.doneAction}
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6 pb-4 border-b border-white/10">
              <span className="font-space-grotesk text-xs font-bold text-[#f59e0b] uppercase tracking-wider block mb-1">
                {t.b2bModal.eyebrow}
              </span>
              <h3 className="font-epilogue text-2xl font-bold text-white">
                {t.b2bModal.title}
              </h3>
              <p className="font-body text-xs sm:text-sm text-slate-400 mt-1">
                {t.b2bModal.subtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-space-grotesk text-xs font-semibold text-slate-300 block mb-1">
                    {t.b2bModal.company}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: WindPower Systems GmbH"
                    value={formData.companyName}
                    onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c1017] border border-white/10 text-white text-sm focus:border-[#f59e0b] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-space-grotesk text-xs font-semibold text-slate-300 block mb-1">
                    {t.b2bModal.person}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Eng. Klaus Weber"
                    value={formData.contactPerson}
                    onChange={e => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c1017] border border-white/10 text-white text-sm focus:border-[#f59e0b] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-space-grotesk text-xs font-semibold text-slate-300 block mb-1">
                    {t.b2bModal.email}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="k.weber@company.eu"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c1017] border border-white/10 text-white text-sm focus:border-[#f59e0b] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-space-grotesk text-xs font-semibold text-slate-300 block mb-1">
                    {t.b2bModal.phone}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+49 30 12345678"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c1017] border border-white/10 text-white text-sm focus:border-[#f59e0b] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-space-grotesk text-xs font-semibold text-slate-300 block mb-1">
                    {t.b2bModal.sector}
                  </label>
                  <select
                    value={formData.sector}
                    onChange={e => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0c1017] border border-white/10 text-white text-xs focus:border-[#f59e0b] focus:outline-none"
                  >
                    {t.b2bModal.sectorOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-space-grotesk text-xs font-semibold text-slate-300 block mb-1">
                    {t.b2bModal.headcount}
                  </label>
                  <select
                    value={formData.specialistsNeeded}
                    onChange={e => setFormData({ ...formData, specialistsNeeded: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0c1017] border border-white/10 text-white text-xs focus:border-[#f59e0b] focus:outline-none"
                  >
                    {t.b2bModal.headcountOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-space-grotesk text-xs font-semibold text-slate-300 block mb-1">
                    {t.b2bModal.location}
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Bremen, Alemanha"
                    value={formData.deploymentLocation}
                    onChange={e => setFormData({ ...formData, deploymentLocation: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0c1017] border border-white/10 text-white text-xs focus:border-[#f59e0b] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-space-grotesk text-xs font-semibold text-slate-300 block mb-1">
                  {t.b2bModal.details}
                </label>
                <textarea
                  rows={3}
                  placeholder={t.b2bModal.detailsPlaceholder}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c1017] border border-white/10 text-white text-sm focus:border-[#f59e0b] focus:outline-none resize-none"
                />
              </div>

              {submitError ? (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 font-body text-xs">
                  {submitError}
                </div>
              ) : null}

              <div className="flex gap-3 pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#ea580c] hover:brightness-110 text-[#331c00] font-epilogue font-bold text-sm shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-[#331c00] border-t-transparent animate-spin" />
                      <span>{t.b2bModal.processing}</span>
                    </>
                  ) : (
                    <span>{t.b2bModal.submit}</span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 rounded-xl bg-[#191c21] hover:bg-white/10 text-white font-epilogue text-sm font-semibold border border-white/10"
                >
                  {t.b2bModal.cancel}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
