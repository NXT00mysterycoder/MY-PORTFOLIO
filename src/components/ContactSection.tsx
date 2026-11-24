import { FormEvent, useState } from 'react';
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, Pencil, Send } from 'lucide-react';
import { ContactProfile } from '../types/portfolio';

interface ContactSectionProps {
  contact: ContactProfile;
  isEditMode: boolean;
  onEditContact: () => void;
}

export function ContactSection({ contact, isEditMode, onEditContact }: ContactSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [topic, setTopic] = useState('Project Collaboration');
  const [message, setMessage] = useState('');
  const [preparedFeedback, setPreparedFeedback] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Clipboard fallback ignored
    }
  };

  const handleComposeMailto = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${topic} — ${senderName || 'Visitor'}`);
    const body = encodeURIComponent(
      `Hi Nishanth,\n\n${message || 'I would love to connect regarding a collaboration or opportunity.'}\n\nBest,\n${senderName || 'Visitor'}`
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setPreparedFeedback(true);
    setTimeout(() => setPreparedFeedback(false), 3000);
  };

  return (
    <>
      {/* Editorial Chapter Quote Interlude */}
      <section className="py-24 md:py-32 bg-[#131316] border-b border-[#2A2A2D]">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <span className="inline-block w-12 h-px bg-[#FFB2B9] mb-8" aria-hidden="true" />
          <blockquote className="font-display italic text-3xl sm:text-5xl text-[#E4E1E6] text-balance leading-tight">
            “Consistency turns curiosity into capability.”
          </blockquote>
          <p className="text-xs font-medium text-[#FFB2B9] mt-8 tracking-widest">
            Learning · Building · Evolving
          </p>
        </div>
      </section>

      {/* Contact & Quick Collaboration Section */}
      <section id="contact" className="py-20 md:py-28 bg-[#0E0E11]">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-[#FFB2B9] mb-3">05. Connect</p>
              <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#E4E1E6] text-balance mb-4">
                Let&apos;s Build Something Meaningful.
              </h2>
              <p className="text-base sm:text-lg text-[#929094] text-pretty">
                Have a hardware prototype, hackathon team, or engineering idea in mind? Reach out
                directly or start an email draft below.
              </p>
            </div>

            {isEditMode && (
              <button
                type="button"
                onClick={onEditContact}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1B1B1E] border border-[#2A2A2D] text-sm font-medium text-[#E4E1E6] hover:border-[#FFB2B9]/50 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5 text-[#FFB2B9]" />
                <span>Edit Links</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Direct Channels */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="rounded-xl bg-[#1B1B1E] border border-[#2A2A2D] p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  <Mail className="w-5 h-5 text-[#FFB2B9] shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#E4E1E6]">Direct Email</p>
                    <p className="text-sm text-[#929094] truncate">{contact.email}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#131316] border border-[#2A2A2D] text-xs font-medium text-[#E4E1E6] hover:border-[#FFB2B9]/50 cursor-pointer shrink-0"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#80D99C]" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href={contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-[#1B1B1E] border border-[#2A2A2D] hover:border-[#FFB2B9]/50 transition-colors p-5 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <Linkedin className="w-5 h-5 text-[#FFB2B9]" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-[#E4E1E6]">LinkedIn</p>
                    <p className="text-sm text-[#929094]">Academic &amp; project updates</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#929094]" aria-hidden="true" />
              </a>

              <a
                href={contact.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-[#1B1B1E] border border-[#2A2A2D] hover:border-[#FFB2B9]/50 transition-colors p-5 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <Github className="w-5 h-5 text-[#FFB2B9]" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-[#E4E1E6]">GitHub</p>
                    <p className="text-sm text-[#929094]">Firmware &amp; Python repositories</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#929094]" aria-hidden="true" />
              </a>

              <p className="text-xs text-[#929094] pt-2">{contact.location}</p>
            </div>

            {/* Right: Quick Collaboration Draft Composer */}
            <form
              onSubmit={handleComposeMailto}
              className="lg:col-span-7 rounded-2xl bg-[#1B1B1E] border border-[#2A2A2D] p-6 md:p-8 flex flex-col gap-4"
            >
              <h3 className="font-display text-2xl font-semibold text-[#E4E1E6]">
                Quick Inquiry Draft
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1.5 text-sm">
                  <span className="font-medium text-[#E4E1E6]">Your Name</span>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="px-3.5 py-2.5 rounded-lg bg-[#131316] border border-[#2A2A2D] text-[#E4E1E6] placeholder:text-[#929094] focus:outline-none focus:border-[#FFB2B9]/60"
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-sm">
                  <span className="font-medium text-[#E4E1E6]">Topic</span>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="px-3.5 py-2.5 rounded-lg bg-[#131316] border border-[#2A2A2D] text-[#E4E1E6] focus:outline-none focus:border-[#FFB2B9]/60"
                  >
                    <option value="Project Collaboration">Project Collaboration</option>
                    <option value="Hackathon Team">Hackathon Team</option>
                    <option value="Internship / Opportunity">Internship / Opportunity</option>
                    <option value="General Hello">General Hello</option>
                  </select>
                </label>
              </div>

              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-medium text-[#E4E1E6]">Message</span>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share a quick overview of your idea or opportunity..."
                  className="px-3.5 py-2.5 rounded-lg bg-[#131316] border border-[#2A2A2D] text-[#E4E1E6] placeholder:text-[#929094] focus:outline-none focus:border-[#FFB2B9]/60 resize-none"
                />
              </label>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-[#929094]">
                  {preparedFeedback
                    ? 'Opened your default email client with this draft.'
                    : `Opens a pre-filled draft addressed to ${contact.email}`}
                </span>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#A13A4B] text-white text-sm font-medium border border-[#FFB2B9]/30 hover:bg-[#8E3040] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>Open Email Draft</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
