/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('pt');
  const [preselectedArea, setPreselectedArea] = useState<string>('Energias Renováveis');
  const [b2bModalOpen, setB2bModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyClick = () => {
    scrollToSection('recrutamento');
  };

  const handleExploreSectors = () => {
    scrollToSection('areas-de-atuacao');
  };

  const handleApplyForSector = (sectorTitle: string) => {
    setPreselectedArea(sectorTitle);
    scrollToSection('recrutamento');
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-[#e2e2ea] flex flex-col selection:bg-[#f59e0b] selection:text-[#613b00] font-body relative">
      {/* Toast Notification */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}

      {/* Fixed Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenCandidatePortal={handleApplyClick}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection
          currentLang={currentLang}
          onApplyClick={handleApplyClick}
          onExploreSectorsClick={handleExploreSectors}
        />

        <StatsSection currentLang={currentLang} />

        <SectorsSection
          currentLang={currentLang}
          onApplyForSector={handleApplyForSector}
        />

        <TurnkeyModelSection
          currentLang={currentLang}
          onRequestProposal={() => setB2bModalOpen(true)}
        />

        <RecruitmentSection
          currentLang={currentLang}
          preselectedArea={preselectedArea}
          onApplicationSuccess={() =>
            showToast('Candidatura submetida com sucesso! A equipa de recrutamento entrará em contacto.')
          }
        />

        <EuropeMapSection currentLang={currentLang} />

        <ContactsSection
          currentLang={currentLang}
          onOpenInquiry={() => setB2bModalOpen(true)}
        />
      </main>

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
  );
}
