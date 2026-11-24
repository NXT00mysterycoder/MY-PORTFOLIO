import { FormEvent, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import {
  CertificationCategory,
  CertificationItem,
  ContactProfile,
  SkillCategory,
  SkillItem,
  SkillProficiency,
} from '../types/portfolio';

interface SkillEditorModalProps {
  isOpen: boolean;
  initialSkill: SkillItem | null;
  onClose: () => void;
  onSave: (values: Omit<SkillItem, 'id'>, existingId?: string) => void;
}

export function SkillEditorModal({
  isOpen,
  initialSkill,
  onClose,
  onSave,
}: SkillEditorModalProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<SkillCategory>('Programming');
  const [proficiency, setProficiency] = useState<SkillProficiency>('Practicing');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setName(initialSkill?.name ?? '');
    setCategory(initialSkill?.category ?? 'Programming');
    setProficiency(initialSkill?.proficiency ?? 'Practicing');
    setNote(initialSkill?.note ?? '');
  }, [isOpen, initialSkill]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave(
      {
        name: name.trim(),
        category,
        proficiency,
        note: note.trim() || undefined,
      },
      initialSkill?.id
    );
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="skill-editor-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-2xl bg-[#1B1B1E] border border-[#2A2A2D] p-6 md:p-8 shadow-2xl flex flex-col gap-5"
      >
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#2A2A2D]">
          <h3 id="skill-editor-title" className="font-display text-2xl font-semibold text-[#E4E1E6]">
            {initialSkill ? 'Edit Skill' : 'Add Completed Skill'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close skill editor"
            className="w-9 h-9 rounded-lg bg-[#131316] border border-[#2A2A2D] flex items-center justify-center text-[#E4E1E6] hover:border-[#FFB2B9]/50 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-[#E4E1E6]">Skill Name</span>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Verilog HDL, PCB Design, OpenCV"
              className="px-3.5 py-2.5 rounded-lg bg-[#131316] border border-[#2A2A2D] text-[#E4E1E6] placeholder:text-[#929094] focus:outline-none focus:border-[#FFB2B9]/60"
            />
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-[#E4E1E6]">Category</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as SkillCategory)}
                className="px-3.5 py-2.5 rounded-lg bg-[#131316] border border-[#2A2A2D] text-[#E4E1E6] focus:outline-none focus:border-[#FFB2B9]/60"
              >
                <option value="Programming">Programming</option>
                <option value="Engineering">Engineering</option>
                <option value="Creative">Creative</option>
                <option value="Professional">Professional</option>
              </select>
            </label>

            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-[#E4E1E6]">Proficiency</span>
              <select
                value={proficiency}
                onChange={(e) => setProficiency(e.target.value as SkillProficiency)}
                className="px-3.5 py-2.5 rounded-lg bg-[#131316] border border-[#2A2A2D] text-[#E4E1E6] focus:outline-none focus:border-[#FFB2B9]/60"
              >
                <option value="Exploring">Exploring</option>
                <option value="Practicing">Practicing</option>
                <option value="Proficient">Proficient</option>
                <option value="Advanced">Advanced</option>
              </select>
            </label>
          </div>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-[#E4E1E6]">Context or Tools (optional)</span>
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Briefly describe projects or tools where you applied this skill"
              className="px-3.5 py-2.5 rounded-lg bg-[#131316] border border-[#2A2A2D] text-[#E4E1E6] placeholder:text-[#929094] focus:outline-none focus:border-[#FFB2B9]/60 resize-none"
            />
          </label>
        </div>

        <div className="pt-4 border-t border-[#2A2A2D] flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#131316] border border-[#2A2A2D] text-sm text-[#929094] hover:text-[#E4E1E6] cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-[#A13A4B] text-white text-sm font-medium border border-[#FFB2B9]/30 hover:bg-[#8E3040] cursor-pointer"
          >
            Save Skill
          </button>
        </div>
      </form>
    </div>
  );
}

interface CertEditorModalProps {
  isOpen: boolean;
  initialCert: CertificationItem | null;
  onClose: () => void;
  onSave: (values: Omit<CertificationItem, 'id'>, existingId?: string) => void;
}

export function CertEditorModal({
  isOpen,
  initialCert,
  onClose,
  onSave,
}: CertEditorModalProps) {
  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [category, setCategory] = useState<CertificationCategory>('Embedded & Hardware');
  const [completedDate, setCompletedDate] = useState('2026-11');
  const [credentialId, setCredentialId] = useState('');
  const [credentialUrl, setCredentialUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [skillsText, setSkillsText] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setTitle(initialCert?.title ?? '');
    setIssuer(initialCert?.issuer ?? '');
    setCategory(initialCert?.category ?? 'Embedded & Hardware');
    setCompletedDate(initialCert?.completedDate ?? '2026-11');
    setCredentialId(initialCert?.credentialId ?? '');
    setCredentialUrl(initialCert?.credentialUrl ?? '');
    setSummary(initialCert?.summary ?? '');
    setSkillsText(initialCert?.skillsGained.join(', ') ?? '');
  }, [isOpen, initialCert]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !issuer.trim()) return;
    const skillsGained = skillsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    onSave(
      {
        title: title.trim(),
        issuer: issuer.trim(),
        category,
        completedDate: completedDate.trim() || '2026-11',
        credentialId: credentialId.trim() || undefined,
        credentialUrl: credentialUrl.trim() || undefined,
        summary:
          summary.trim() ||
          `Completed ${title.trim()} issued by ${issuer.trim()}.`,
        skillsGained,
      },
      initialCert?.id
    );
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-editor-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#1B1B1E] border border-[#2A2A2D] p-6 md:p-8 shadow-2xl flex flex-col gap-5"
      >
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#2A2A2D]">
          <h3 id="cert-editor-title" className="font-display text-2xl font-semibold text-[#E4E1E6]">
            {initialCert ? 'Edit Certification' : 'Add Completed Certification'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close certification editor"
            className="w-9 h-9 rounded-lg bg-[#131316] border border-[#2A2A2D] flex items-center justify-center text-[#E4E1E6] hover:border-[#FFB2B9]/50 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-[#E4E1E6]">Certification Title</span>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Embedded Systems Design with ARM & ESP32"
              className="px-3.5 py-2.5 rounded-lg bg-[#131316] border border-[#2A2A2D] text-[#E4E1E6] placeholder:text-[#929094] focus:outline-none focus:border-[#FFB2B9]/60"
            />
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-[#E4E1E6]">Issuing Organization</span>
              <input
                type="text"
                required
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
                placeholder="e.g., NPTEL, Coursera, IEEE"
                className="px-3.5 py-2.5 rounded-lg bg-[#131316] border border-[#2A2A2D] text-[#E4E1E6] placeholder:text-[#929094] focus:outline-none focus:border-[#FFB2B9]/60"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-[#E4E1E6]">Track Category</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CertificationCategory)}
                className="px-3.5 py-2.5 rounded-lg bg-[#131316] border border-[#2A2A2D] text-[#E4E1E6] focus:outline-none focus:border-[#FFB2B9]/60"
              >
                <option value="Embedded & Hardware">Embedded &amp; Hardware</option>
                <option value="Software & AI">Software &amp; AI</option>
                <option value="Creative & Leadership">Creative &amp; Leadership</option>
              </select>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-[#E4E1E6]">Completion Month</span>
              <input
                type="month"
                value={completedDate}
                onChange={(e) => setCompletedDate(e.target.value)}
                className="px-3.5 py-2.5 rounded-lg bg-[#131316] border border-[#2A2A2D] text-[#E4E1E6] focus:outline-none focus:border-[#FFB2B9]/60"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-[#E4E1E6]">Credential ID (optional)</span>
              <input
                type="text"
                value={credentialId}
                onChange={(e) => setCredentialId(e.target.value)}
                placeholder="e.g., CERT-88412"
                className="px-3.5 py-2.5 rounded-lg bg-[#131316] border border-[#2A2A2D] text-[#E4E1E6] placeholder:text-[#929094] focus:outline-none focus:border-[#FFB2B9]/60"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-[#E4E1E6]">Verification URL (optional)</span>
            <input
              type="url"
              value={credentialUrl}
              onChange={(e) => setCredentialUrl(e.target.value)}
              placeholder="https://..."
              className="px-3.5 py-2.5 rounded-lg bg-[#131316] border border-[#2A2A2D] text-[#E4E1E6] placeholder:text-[#929094] focus:outline-none focus:border-[#FFB2B9]/60"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-[#E4E1E6]">
              Skills Gained (comma separated)
            </span>
            <input
              type="text"
              value={skillsText}
              onChange={(e) => setSkillsText(e.target.value)}
              placeholder="e.g., Firmware C, RTOS, Sensor Calibration"
              className="px-3.5 py-2.5 rounded-lg bg-[#131316] border border-[#2A2A2D] text-[#E4E1E6] placeholder:text-[#929094] focus:outline-none focus:border-[#FFB2B9]/60"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-[#E4E1E6]">Summary / Key Takeaways</span>
            <textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="What you built or learned during this certification"
              className="px-3.5 py-2.5 rounded-lg bg-[#131316] border border-[#2A2A2D] text-[#E4E1E6] placeholder:text-[#929094] focus:outline-none focus:border-[#FFB2B9]/60 resize-none"
            />
          </label>
        </div>

        <div className="pt-4 border-t border-[#2A2A2D] flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#131316] border border-[#2A2A2D] text-sm text-[#929094] hover:text-[#E4E1E6] cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-[#A13A4B] text-white text-sm font-medium border border-[#FFB2B9]/30 hover:bg-[#8E3040] cursor-pointer"
          >
            Save Certification
          </button>
        </div>
      </form>
    </div>
  );
}

interface ContactEditorModalProps {
  isOpen: boolean;
  initialContact: ContactProfile;
  onClose: () => void;
  onSave: (contact: ContactProfile) => void;
}

export function ContactEditorModal({
  isOpen,
  initialContact,
  onClose,
  onSave,
}: ContactEditorModalProps) {
  const [email, setEmail] = useState(initialContact.email);
  const [linkedinUrl, setLinkedinUrl] = useState(initialContact.linkedinUrl);
  const [githubUrl, setGithubUrl] = useState(initialContact.githubUrl);
  const [location, setLocation] = useState(initialContact.location);

  useEffect(() => {
    if (!isOpen) return;
    setEmail(initialContact.email);
    setLinkedinUrl(initialContact.linkedinUrl);
    setGithubUrl(initialContact.githubUrl);
    setLocation(initialContact.location);
  }, [isOpen, initialContact]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave({
      email: email.trim(),
      linkedinUrl: linkedinUrl.trim(),
      githubUrl: githubUrl.trim(),
      location: location.trim(),
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-editor-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-2xl bg-[#1B1B1E] border border-[#2A2A2D] p-6 md:p-8 shadow-2xl flex flex-col gap-5"
      >
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#2A2A2D]">
          <h3
            id="contact-editor-title"
            className="font-display text-2xl font-semibold text-[#E4E1E6]"
          >
            Edit Contact Links
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close contact editor"
            className="w-9 h-9 rounded-lg bg-[#131316] border border-[#2A2A2D] flex items-center justify-center text-[#E4E1E6] hover:border-[#FFB2B9]/50 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-[#E4E1E6]">Email Address</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-3.5 py-2.5 rounded-lg bg-[#131316] border border-[#2A2A2D] text-[#E4E1E6] focus:outline-none focus:border-[#FFB2B9]/60"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-[#E4E1E6]">LinkedIn URL</span>
            <input
              type="url"
              required
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              className="px-3.5 py-2.5 rounded-lg bg-[#131316] border border-[#2A2A2D] text-[#E4E1E6] focus:outline-none focus:border-[#FFB2B9]/60"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-[#E4E1E6]">GitHub URL</span>
            <input
              type="url"
              required
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="px-3.5 py-2.5 rounded-lg bg-[#131316] border border-[#2A2A2D] text-[#E4E1E6] focus:outline-none focus:border-[#FFB2B9]/60"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-[#E4E1E6]">Location / Institution</span>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="px-3.5 py-2.5 rounded-lg bg-[#131316] border border-[#2A2A2D] text-[#E4E1E6] focus:outline-none focus:border-[#FFB2B9]/60"
            />
          </label>
        </div>

        <div className="pt-4 border-t border-[#2A2A2D] flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#131316] border border-[#2A2A2D] text-sm text-[#929094] hover:text-[#E4E1E6] cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-[#A13A4B] text-white text-sm font-medium border border-[#FFB2B9]/30 hover:bg-[#8E3040] cursor-pointer"
          >
            Save Links
          </button>
        </div>
      </form>
    </div>
  );
}
