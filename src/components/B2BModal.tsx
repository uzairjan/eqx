import React, { useState } from 'react';
import { Language, B2BProposalData } from '../types';
import { TRANSLATIONS } from '../data/content';

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
  const [formData, setFormData] = useState<B2BProposalData>({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    sector: 'Energias Renováveis',
    specialistsNeeded: '10 - 25 Especialistas',
    deploymentLocation: 'Alemanha / Escandinávia',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.email || !formData.phone) {
      alert('Por favor, preencha os campos obrigatórios (*).');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      onSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#131923] border border-white/20 p-6 sm:p-8 shadow-2xl my-8">
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
              Proposta Requisitada com Sucesso
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
              Concluir
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6 pb-4 border-b border-white/10">
              <span className="font-space-grotesk text-xs font-bold text-[#f59e0b] uppercase tracking-wider block mb-1">
                B2B Turnkey Workforce Solutions
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
                    <option value="Energias Renováveis">Energias Renováveis</option>
                    <option value="Indústria Naval">Indústria Naval</option>
                    <option value="Eletricidade Industrial">Eletricidade Industrial</option>
                    <option value="Metalomecânica & Precisão">Metalomecânica & Precisão</option>
                    <option value="Multi-disciplinar">Multi-disciplinar</option>
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
                    <option value="1 - 5 Especialistas">1 - 5 Especialistas</option>
                    <option value="5 - 15 Especialistas">5 - 15 Especialistas</option>
                    <option value="15 - 50 Especialistas">15 - 50 Especialistas</option>
                    <option value="50+ Força Operacional">50+ Força Operacional</option>
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

              <div className="flex gap-3 pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#ea580c] hover:brightness-110 text-[#331c00] font-epilogue font-bold text-sm shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-[#331c00] border-t-transparent animate-spin" />
                      <span>A processar proposta...</span>
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
