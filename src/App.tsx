import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Download, Pencil, Plus, RotateCcw, Upload } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { CertificationsSection } from './components/CertificationsSection';
import { ContactSection } from './components/ContactSection';
import {
  CertEditorModal,
  ContactEditorModal,
  SkillEditorModal,
} from './components/PortfolioModals';
import { usePortfolioStorage } from './hooks/usePortfolioStorage';
import {
  CertificationItem,
  DEFAULT_PROJECTS,
  PortfolioData,
  SkillItem,
} from './types/portfolio';

export default function App() {
  const {
    data,
    addSkill,
    updateSkill,
    deleteSkill,
    addCertification,
    updateCertification,
    deleteCertification,
    updateContact,
    replaceAllData,
    resetToDefault,
  } = usePortfolioStorage();

  const [isEditMode, setIsEditMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Editor modal state
  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<SkillItem | null>(null);

  const [certModalOpen, setCertModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<CertificationItem | null>(null);

  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 3200);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'skills', 'certifications', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: 0.05 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleOpenAddSkill = () => {
    setEditingSkill(null);
    setSkillModalOpen(true);
  };

  const handleOpenEditSkill = (skill: SkillItem) => {
    setEditingSkill(skill);
    setSkillModalOpen(true);
  };

  const handleSaveSkill = (values: Omit<SkillItem, 'id'>, existingId?: string) => {
    if (existingId) {
      updateSkill(existingId, values);
      showToast(`Updated skill "${values.name}".`);
    } else {
      addSkill(values);
      showToast(`Added "${values.name}" to your skills.`);
    }
  };

  const handleDeleteSkill = (id: string) => {
    const target = data.skills.find((s) => s.id === id);
    deleteSkill(id);
    if (target) showToast(`Removed "${target.name}" from skills.`);
  };

  const handleOpenAddCert = () => {
    setEditingCert(null);
    setCertModalOpen(true);
  };

  const handleOpenEditCert = (cert: CertificationItem) => {
    setEditingCert(cert);
    setCertModalOpen(true);
  };

  const handleSaveCert = (values: Omit<CertificationItem, 'id'>, existingId?: string) => {
    if (existingId) {
      updateCertification(existingId, values);
      showToast(`Updated certification "${values.title}".`);
    } else {
      addCertification(values);
      showToast(`Added "${values.title}" to your certifications.`);
    }
  };

  const handleDeleteCert = (id: string) => {
    const target = data.certifications.find((c) => c.id === id);
    deleteCertification(id);
    if (target) showToast(`Removed "${target.title}".`);
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'nishanth-portfolio-data.json';
    link.click();
    URL.revokeObjectURL(url);
    showToast('Exported portfolio backup JSON.');
  };

  const handleImportJson = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as PortfolioData;
        if (Array.isArray(parsed.skills) && Array.isArray(parsed.certifications)) {
          replaceAllData(parsed);
          showToast('Imported portfolio data successfully.');
        } else {
          showToast('Invalid portfolio JSON structure.');
        }
      } catch {
        showToast('Could not read JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="min-h-screen bg-[#0E0E11] text-[#E4E1E6] relative overflow-x-hidden">
      {/* Subtle Film Grain */}
      <div className="film-grain-overlay fixed inset-0 pointer-events-none z-50" aria-hidden="true" />

      <Navbar
        isEditMode={isEditMode}
        onToggleEditMode={() => {
          setIsEditMode((prev) => !prev);
          setConfirmReset(false);
        }}
        activeSection={activeSection}
      />

      {/* Owner Edit Toolbar (shown cleanly below header when Edit Mode is enabled) */}
      {isEditMode && (
        <div className="fixed top-16 md:top-20 inset-x-0 z-30 bg-[#1B1B1E]/95 backdrop-blur-md border-b border-[#2A2A2D]">
          <div className="max-w-6xl mx-auto px-6 md:px-10 py-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs sm:text-sm text-[#E4E1E6]">
              Edit Mode active — changes save automatically in this browser.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleOpenAddSkill}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#A13A4B] text-white text-xs font-medium hover:bg-[#8E3040] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Skill</span>
              </button>

              <button
                type="button"
                onClick={handleOpenAddCert}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#A13A4B] text-white text-xs font-medium hover:bg-[#8E3040] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Certification</span>
              </button>

              <button
                type="button"
                onClick={() => setContactModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#131316] border border-[#2A2A2D] text-[#E4E1E6] text-xs font-medium hover:border-[#FFB2B9]/50 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5 text-[#FFB2B9]" />
                <span>Links</span>
              </button>

              <button
                type="button"
                onClick={handleExportJson}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#131316] border border-[#2A2A2D] text-[#E4E1E6] text-xs font-medium hover:border-[#FFB2B9]/50 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#131316] border border-[#2A2A2D] text-[#E4E1E6] text-xs font-medium hover:border-[#FFB2B9]/50 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Import</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/json"
                onChange={handleImportJson}
                className="hidden"
              />

              {!confirmReset ? (
                <button
                  type="button"
                  onClick={() => setConfirmReset(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#131316] border border-[#2A2A2D] text-[#929094] text-xs font-medium hover:text-[#FFB4AB] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    resetToDefault();
                    setConfirmReset(false);
                    showToast('Restored default skills and certifications.');
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#93000A] text-white text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Confirm Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <main>
        <HeroSection
          skillCount={data.skills.length}
          certCount={data.certifications.length}
          projectCount={DEFAULT_PROJECTS.length}
          onOpenQuickAddSkill={handleOpenAddSkill}
          onOpenQuickAddCert={handleOpenAddCert}
        />

        <AboutSection />

        <ProjectsSection />

        <SkillsSection
          skills={data.skills}
          isEditMode={isEditMode}
          onAddSkill={handleOpenAddSkill}
          onEditSkill={handleOpenEditSkill}
          onDeleteSkill={handleDeleteSkill}
        />

        <CertificationsSection
          certifications={data.certifications}
          isEditMode={isEditMode}
          onAddCertification={handleOpenAddCert}
          onEditCertification={handleOpenEditCert}
          onDeleteCertification={handleDeleteCert}
        />

        <ContactSection
          contact={data.contact}
          isEditMode={isEditMode}
          onEditContact={() => setContactModalOpen(true)}
        />
      </main>

      {/* Clean Quiet Footer */}
      <footer className="bg-[#0E0E11] border-t border-[#2A2A2D] py-10">
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs font-medium text-[#929094]">
            Designed with curiosity. Built with purpose.
          </p>
          <p className="font-mono-tabular text-xs text-[#929094]">
            © {new Date().getFullYear()} Nishanth
          </p>
        </div>
      </footer>

      {/* Modals for Skills, Certifications, and Contact Links */}
      <SkillEditorModal
        isOpen={skillModalOpen}
        initialSkill={editingSkill}
        onClose={() => setSkillModalOpen(false)}
        onSave={handleSaveSkill}
      />

      <CertEditorModal
        isOpen={certModalOpen}
        initialCert={editingCert}
        onClose={() => setCertModalOpen(false)}
        onSave={handleSaveCert}
      />

      <ContactEditorModal
        isOpen={contactModalOpen}
        initialContact={data.contact}
        onClose={() => setContactModalOpen(false)}
        onSave={(nextContact) => {
          updateContact(nextContact);
          showToast('Updated contact links.');
        }}
      />

      {/* Non-intrusive Feedback Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-[#1B1B1E] border border-[#FFB2B9]/40 text-sm text-[#E4E1E6] shadow-xl"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
