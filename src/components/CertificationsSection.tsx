import { useEffect, useMemo, useState } from 'react';
import { Award, ExternalLink, Pencil, Plus, Trash2, X } from 'lucide-react';
import {
  CertificationCategory,
  CertificationItem,
  DEFAULT_MILESTONES,
} from '../types/portfolio';

interface CertificationsSectionProps {
  certifications: CertificationItem[];
  isEditMode: boolean;
  onAddCertification: () => void;
  onEditCertification: (cert: CertificationItem) => void;
  onDeleteCertification: (id: string) => void;
}

const CERT_FILTERS: Array<'All' | CertificationCategory> = [
  'All',
  'Embedded & Hardware',
  'Software & AI',
  'Creative & Leadership',
];

function formatCompletionDate(value: string): string {
  if (!value) return 'Completed';
  const match = /^(\d{4})-(\d{2})$/.exec(value.trim());
  if (!match) return value;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, 1);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function CertificationsSection({
  certifications,
  isEditMode,
  onAddCertification,
  onEditCertification,
  onDeleteCertification,
}: CertificationsSectionProps) {
  const [filter, setFilter] = useState<'All' | CertificationCategory>('All');
  const [activeCert, setActiveCert] = useState<CertificationItem | null>(null);

  const filteredCerts = useMemo(() => {
    if (filter === 'All') return certifications;
    return certifications.filter((c) => c.category === filter);
  }, [certifications, filter]);

  useEffect(() => {
    if (!activeCert) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveCert(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeCert]);

  return (
    <section
      id="certifications"
      className="py-20 md:py-28 bg-[#0E0E11] border-b border-[#2A2A2D]"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Part A: Academic & Hackathon Milestones */}
        <div className="mb-16">
          <div className="mb-10">
            <p className="text-xs font-medium text-[#FFB2B9] mb-3">
              04. Milestones &amp; Credentials
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#E4E1E6] text-balance">
              Experience &amp; Certifications.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DEFAULT_MILESTONES.map((milestone) => (
              <article
                key={milestone.id}
                className="rounded-xl bg-[#1B1B1E] border border-[#2A2A2D] p-6 flex flex-col justify-between gap-4"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-3 text-xs font-medium">
                    <span className="font-mono-tabular text-[#FFB2B9]">
                      {milestone.indexLabel} · {milestone.context}
                    </span>
                    <span className="font-mono-tabular text-[#929094]">
                      {milestone.timeframe}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-[#E4E1E6]">
                    {milestone.title}
                  </h3>
                  <p className="text-sm text-[#929094] leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Part B: Verified & Editable Certifications Vault */}
        <div className="pt-12 border-t border-[#2A2A2D]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#E4E1E6] mb-2">
                Completed Certifications
              </h3>
              <p className="text-sm sm:text-base text-[#929094]">
                Log new courses, technical workshops, and credentials directly as you complete them.
              </p>
            </div>

            <button
              type="button"
              onClick={onAddCertification}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#A13A4B] text-white text-sm font-medium border border-[#FFB2B9]/30 hover:bg-[#8E3040] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB2B9]"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              <span>Add Certification</span>
            </button>
          </div>

          {/* Certification Filter Tabs */}
          <div
            role="group"
            aria-label="Filter certifications"
            className="flex flex-wrap items-center gap-2 mb-8"
          >
            {CERT_FILTERS.map((cat) => {
              const active = filter === cat;
              const count =
                cat === 'All'
                  ? certifications.length
                  : certifications.filter((c) => c.category === cat).length;

              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB2B9] ${
                    active
                      ? 'bg-[#A13A4B] text-white border border-[#FFB2B9]/40'
                      : 'bg-[#1B1B1E] text-[#929094] border border-[#2A2A2D] hover:text-[#E4E1E6] hover:border-[#FFB2B9]/40'
                  }`}
                >
                  <span>{cat}</span>
                  <span className="font-mono-tabular ml-2 text-xs opacity-80">{count}</span>
                </button>
              );
            })}
          </div>

          {filteredCerts.length === 0 ? (
            <div className="rounded-2xl bg-[#1B1B1E] border border-[#2A2A2D] p-10 text-center flex flex-col items-center gap-3">
              <Award className="w-8 h-8 text-[#FFB2B9]" aria-hidden="true" />
              <p className="text-base font-medium text-[#E4E1E6]">
                No certifications logged in this category yet
              </p>
              <p className="text-sm text-[#929094] max-w-md">
                Add a newly earned certificate with issuer details, completion date, and verification
                link.
              </p>
              <button
                type="button"
                onClick={onAddCertification}
                className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#A13A4B] text-white text-sm font-medium cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Certification</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredCerts.map((cert) => (
                <article
                  key={cert.id}
                  className="rounded-xl bg-[#1B1B1E] border border-[#2A2A2D] hover:border-[#FFB2B9]/45 transition-colors duration-150 p-6 flex flex-col justify-between gap-5"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-medium text-[#929094]">
                        <span className="text-[#FFB2B9]">{cert.issuer}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-tabular">
                          {formatCompletionDate(cert.completedDate)}
                        </span>
                      </div>

                      {isEditMode && (
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => onEditCertification(cert)}
                            aria-label={`Edit ${cert.title}`}
                            className="p-1.5 rounded-md bg-[#131316] border border-[#2A2A2D] text-[#E4E1E6] hover:border-[#FFB2B9]/60 cursor-pointer"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteCertification(cert.id)}
                            aria-label={`Delete ${cert.title}`}
                            className="p-1.5 rounded-md bg-[#131316] border border-[#2A2A2D] text-[#FFB4AB] hover:border-[#FFB4AB]/60 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    <h4 className="font-display text-xl font-semibold text-[#E4E1E6] text-balance">
                      {cert.title}
                    </h4>

                    <p className="text-sm text-[#929094] leading-relaxed">{cert.summary}</p>
                  </div>

                  <div className="pt-4 border-t border-[#2A2A2D]/70 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#E4E1E6]/80">
                      {cert.skillsGained.slice(0, 3).map((item, idx) => (
                        <span key={item} className="inline-flex items-center gap-2">
                          {idx > 0 && (
                            <span aria-hidden="true" className="text-[#929094]">
                              ·
                            </span>
                          )}
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveCert(cert)}
                      className="text-xs font-medium text-[#FFB2B9] hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      View Credential
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Credential Detail Modal */}
      {activeCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveCert(null);
          }}
        >
          <div className="w-full max-w-xl rounded-2xl bg-[#1B1B1E] border border-[#2A2A2D] p-6 md:p-8 shadow-2xl">
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#2A2A2D]">
              <div>
                <p className="text-xs font-medium text-[#FFB2B9] mb-1">
                  {activeCert.issuer} ·{' '}
                  <span className="font-mono-tabular">
                    {formatCompletionDate(activeCert.completedDate)}
                  </span>
                </p>
                <h3
                  id="cert-modal-title"
                  className="font-display text-2xl font-semibold text-[#E4E1E6]"
                >
                  {activeCert.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setActiveCert(null)}
                aria-label="Close credential details"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#131316] border border-[#2A2A2D] text-[#E4E1E6] hover:border-[#FFB2B9]/60 cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-5 flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#929094]">
                <span>Track: {activeCert.category}</span>
                {activeCert.credentialId && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-tabular">ID: {activeCert.credentialId}</span>
                  </>
                )}
              </div>

              <p className="text-sm sm:text-base text-[#E4E1E6]/90 leading-relaxed">
                {activeCert.summary}
              </p>

              {activeCert.skillsGained.length > 0 && (
                <div className="pt-2">
                  <p className="text-xs font-medium text-[#929094] mb-1.5">Skills Applied</p>
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-[#E4E1E6]">
                    {activeCert.skillsGained.map((s, idx) => (
                      <span key={s} className="inline-flex items-center gap-2.5">
                        {idx > 0 && (
                          <span aria-hidden="true" className="text-[#929094]">
                            ·
                          </span>
                        )}
                        <span>{s}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#2A2A2D] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const target = activeCert;
                    setActiveCert(null);
                    onEditCertification(target);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#131316] border border-[#2A2A2D] text-sm text-[#E4E1E6] hover:border-[#FFB2B9]/50 cursor-pointer"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span>Edit Entry</span>
                </button>

                {activeCert.credentialUrl && (
                  <a
                    href={activeCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#A13A4B] text-white text-sm font-medium hover:bg-[#8E3040]"
                  >
                    <span>Verify Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <button
                type="button"
                onClick={() => setActiveCert(null)}
                className="px-4 py-2 rounded-lg bg-[#131316] border border-[#2A2A2D] text-sm text-[#929094] hover:text-[#E4E1E6] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
