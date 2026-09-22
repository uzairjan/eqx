/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Language } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { StatsSection } from './components/StatsSection';
import { SectorsSection } from './components/SectorsSection';
import { TurnkeyModelSection } from './components/TurnkeyModelSection';
import { RecruitmentSection } from './components/RecruitmentSection';
import { EuropeMapSection } from './components/EuropeMapSection';
import { ContactsSection } from './components/ContactsSection';
import { Footer } from './components/Footer';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { B2BModal } from './components/B2BModal';
import { Toast } from './components/Toast';
import { JobDetailPage } from './pages/JobDetailPage';
import { ApplyPage } from './pages/ApplyPage';

/**
 * Scrolls to `#hash` targets after client-side navigation (react-router
 * does not do this natively) and resets scroll on plain page changes.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  React.useEffect(() => {
    if (hash) {
      const t = setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return null;
}

function NotFound({ currentLang }: { currentLang: Language }) {
  React.useEffect(() => {
    document.title = 'EQX — 404';
  }, []);
  return (
    <div className="min-h-screen bg-[#07090e] text-[#e2e2ea] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-epilogue text-4xl font-bold text-white mb-2">404</h1>
        <p className="font-body text-slate-400 mb-6">
          {currentLang === 'pt' ? 'Página não encontrada.' : 'Page not found.'}
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#ea580c] text-[#331c00] font-epilogue font-bold text-sm"
        >
          EQX
        </a>
      </div>
    </div>
  );
}

function HomePage({
  currentLang,
  showToast,
  onRequestProposal,
}: {
  currentLang: Language;
  showToast: (message: string) => void;
  onRequestProposal: () => void;
}) {
  React.useEffect(() => {
    document.title = 'EQX Empower Solutions';
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="flex-1">
      <HeroSection
        currentLang={currentLang}
        onApplyClick={() => scrollToSection('recrutamento')}
        onExploreSectorsClick={() => scrollToSection('areas-de-atuacao')}
      />

      <StatsSection currentLang={currentLang} />

      <SectorsSection
        currentLang={currentLang}
        onApplyForSector={() => {
          scrollToSection('recrutamento');
        }}
      />

      <TurnkeyModelSection
        currentLang={currentLang}
        onRequestProposal={onRequestProposal}
      />

      <RecruitmentSection currentLang={currentLang} />

      <EuropeMapSection currentLang={currentLang} />

      <ContactsSection
        currentLang={currentLang}
        onOpenInquiry={onRequestProposal}
      />
    </main>
  );
}

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('pt');
  const [b2bModalOpen, setB2bModalOpen] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);
  const toastId = React.useRef(0);

  // Queued toasts: concurrent successes (e.g. B2B + application) no
  // longer overwrite each other; each lives 4.5s.
  const showToast = (message: string) => {
    const id = ++toastId.current;
    setToasts((prev) => [...prev.slice(-2), { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#07090e] text-[#e2e2ea] flex flex-col selection:bg-[#f59e0b] selection:text-[#613b00] font-body relative">
        <ScrollManager />
        {/* Toast Notifications */}
        {toasts.length > 0 ? (
          <div className="fixed top-24 right-4 sm:right-8 z-50 flex flex-col gap-2 max-w-md">
            {toasts.map((toast) => (
              <Toast
                key={toast.id}
                message={toast.message}
                onClose={() =>
                  setToasts((prev) => prev.filter((t) => t.id !== toast.id))
                }
              />
            ))}
          </div>
        ) : null}

        {/* Fixed Header */}
        <Header
          currentLang={currentLang}
          onLanguageChange={setCurrentLang}
          onOpenCandidatePortal={() => {
            // Works from any page (full reload only off-home; same-page
            // stays a smooth client-side scroll).
            if (window.location.pathname !== '/') {
              window.location.href = '/#recrutamento';
            } else {
              document.getElementById('recrutamento')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />

        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                currentLang={currentLang}
                showToast={showToast}
                onRequestProposal={() => setB2bModalOpen(true)}
              />
            }
          />
          <Route path="/vaga/:jobId" element={<JobDetailPage currentLang={currentLang} />} />
          <Route path="/candidatura/:jobId" element={<ApplyPage currentLang={currentLang} />} />
          <Route path="*" element={<NotFound currentLang={currentLang} />} />
        </Routes>

        {/* Corporate Footer */}
        <Footer currentLang={currentLang} />

        {/* Persistent / Floating Cookie Consent Banner */}
        <CookieConsentBanner currentLang={currentLang} />

        {/* B2B Turnkey Proposal Modal */}
        <B2BModal
          isOpen={b2bModalOpen}
          onClose={() => setB2bModalOpen(false)}
          currentLang={currentLang}
          onSuccess={() => {
            showToast('Pedido de proposta empresarial enviado com sucesso!');
          }}
        />
      </div>
    </BrowserRouter>
  );
}
