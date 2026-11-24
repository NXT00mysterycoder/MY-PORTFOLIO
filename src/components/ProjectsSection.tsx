import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Cpu, Layers, X } from 'lucide-react';
import { DEFAULT_PROJECTS, ProjectItem } from '../types/portfolio';

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setActiveStageIdx(0);
  }, [selectedProject?.id]);

  useEffect(() => {
    if (!selectedProject) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedProject]);

  return (
    <section id="projects" className="py-20 md:py-28 bg-[#0E0E11] border-b border-[#2A2A2D]">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-medium text-[#FFB2B9] mb-3">02. Selected Work</p>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#E4E1E6] text-balance">
              Engineered Prototypes.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#929094] max-w-md">
            Hardware-software systems built to solve real-world safety and detection challenges.
            Select any prototype to inspect its interactive signal pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {DEFAULT_PROJECTS.map((project, index) => (
            <motion.article
              key={project.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group rounded-2xl bg-[#1B1B1E] border border-[#2A2A2D] hover:border-[#FFB2B9]/45 transition-colors duration-200 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* 16:9 Hardware Showcase Media */}
                <div className="relative aspect-video overflow-hidden bg-[#131316] border-b border-[#2A2A2D]">
                  {!brokenImages[project.id] ? (
                    <img
                      src={project.imageSrc}
                      alt={project.imageAlt}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setBrokenImages((prev) => ({ ...prev, [project.id]: true }))
                      }
                      className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-[#131316] text-[#929094] p-6">
                      <Cpu className="w-8 h-8 text-[#FFB2B9]" />
                      <span className="font-display text-lg text-[#E4E1E6]">{project.title}</span>
                    </div>
                  )}

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#1B1B1E]/90 via-transparent to-transparent pointer-events-none"
                  />
                </div>

                {/* Editorial Card Content */}
                <div className="p-6 md:p-8 flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-[#FFB2B9]">
                    <span className="font-mono-tabular">Project {project.indexLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#929094]">{project.subtitle}</span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#E4E1E6]">
                    {project.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#929094] leading-relaxed">
                    {project.description}
                  </p>

                  {/* Clean unboxed stack metadata */}
                  <div className="pt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-medium text-[#E4E1E6]/80">
                    {project.stack.map((tech, idx) => (
                      <span key={tech} className="inline-flex items-center gap-2.5">
                        {idx > 0 && (
                          <span aria-hidden="true" className="text-[#929094]">
                            ·
                          </span>
                        )}
                        <span>{tech}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2 flex items-center justify-between gap-4 border-t border-[#2A2A2D]/60">
                <span className="text-xs text-[#929094] truncate">{project.outcome}</span>
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#A13A4B] text-white text-sm font-medium border border-[#FFB2B9]/30 hover:bg-[#8E3040] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB2B9]"
                >
                  <span>Inspect System</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Interactive System Architecture Inspector Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedProject(null);
          }}
        >
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#1B1B1E] border border-[#2A2A2D] p-6 md:p-8 shadow-2xl">
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#2A2A2D]">
              <div>
                <p className="text-xs font-medium text-[#FFB2B9] mb-1">
                  <span className="font-mono-tabular">Project {selectedProject.indexLabel}</span> ·{' '}
                  System Architecture
                </p>
                <h3
                  id="project-modal-title"
                  className="font-display text-2xl sm:text-3xl font-semibold text-[#E4E1E6]"
                >
                  {selectedProject.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project inspector"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#131316] border border-[#2A2A2D] text-[#E4E1E6] hover:border-[#FFB2B9]/60 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-6 flex flex-col gap-6">
              {!brokenImages[selectedProject.id] && (
                <img
                  src={selectedProject.imageSrc}
                  alt={selectedProject.imageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-56 sm:h-64 object-cover rounded-xl border border-[#2A2A2D]"
                />
              )}

              <p className="text-sm sm:text-base text-[#E4E1E6]/90 leading-relaxed">
                {selectedProject.longDescription}
              </p>

              {/* Interactive Signal Flow Pipeline */}
              <div className="rounded-xl bg-[#131316] border border-[#2A2A2D] p-5">
                <div className="flex items-center gap-2 text-xs font-medium text-[#FFB2B9] mb-4">
                  <Layers className="w-4 h-4" aria-hidden="true" />
                  <span>Interactive Signal &amp; Logic Pipeline (Click any stage)</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
                  {selectedProject.architectureStages.map((stage, idx) => {
                    const isActive = activeStageIdx === idx;
                    return (
                      <button
                        key={stage.step}
                        type="button"
                        onClick={() => setActiveStageIdx(idx)}
                        className={`p-3 rounded-lg text-left transition-colors duration-150 cursor-pointer border ${
                          isActive
                            ? 'bg-[#A13A4B] border-[#FFB2B9]/40 text-white'
                            : 'bg-[#1B1B1E] border-[#2A2A2D] text-[#E4E1E6] hover:border-[#FFB2B9]/40'
                        }`}
                      >
                        <span className="font-mono-tabular text-xs opacity-75 block mb-1">
                          Stage {stage.step}
                        </span>
                        <span className="text-xs font-medium block truncate">{stage.title}</span>
                      </button>
                    );
                  })}
                </div>

                {selectedProject.architectureStages[activeStageIdx] && (
                  <div className="p-4 rounded-lg bg-[#1B1B1E] border border-[#2A2A2D]">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-sm font-semibold text-[#E4E1E6]">
                        {selectedProject.architectureStages[activeStageIdx].title}
                      </span>
                      <span className="font-mono-tabular text-xs text-[#FFB2B9]">
                        {selectedProject.architectureStages[activeStageIdx].module}
                      </span>
                    </div>
                    <p className="text-sm text-[#929094] leading-relaxed">
                      {selectedProject.architectureStages[activeStageIdx].detail}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-[#929094]">
                <span className="text-[#E4E1E6]">Core Stack:</span>
                {selectedProject.stack.map((tech, idx) => (
                  <span key={tech} className="inline-flex items-center gap-3">
                    {idx > 0 && <span aria-hidden="true">·</span>}
                    <span>{tech}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#2A2A2D] flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 rounded-lg bg-[#131316] text-[#E4E1E6] text-sm font-medium border border-[#2A2A2D] hover:border-[#FFB2B9]/50 transition-colors cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
