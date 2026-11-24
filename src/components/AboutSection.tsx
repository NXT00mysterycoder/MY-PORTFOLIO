import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { DEFAULT_PILLARS } from '../types/portfolio';

export function AboutSection() {
  const [selectedId, setSelectedId] = useState<string>(DEFAULT_PILLARS[0].id);
  const prefersReducedMotion = useReducedMotion();

  const activePillar =
    DEFAULT_PILLARS.find((pillar) => pillar.id === selectedId) ?? DEFAULT_PILLARS[0];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#131316] border-b border-[#2A2A2D]">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading & Interactive Pillar Selector */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <p className="text-xs font-medium text-[#FFB2B9] mb-3">01. About Me</p>
              <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#E4E1E6] text-balance leading-tight">
                Beyond the Code.
              </h2>
            </div>

            <p className="text-base text-[#929094] leading-relaxed">
              Select a pillar to explore how I connect Electronics and Communication Engineering
              with software, teamwork, and creative storytelling.
            </p>

            {/* Interactive Segmented Pillar Controls */}
            <div
              role="tablist"
              aria-label="Core personal pillars"
              className="grid grid-cols-2 gap-2.5 pt-2"
            >
              {DEFAULT_PILLARS.map((pillar) => {
                const isSelected = pillar.id === selectedId;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedId(pillar.id)}
                    className={`px-4 py-3 rounded-lg text-left text-sm font-medium transition-colors duration-150 cursor-pointer whitespace-nowrap truncate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB2B9] ${
                      isSelected
                        ? 'bg-[#A13A4B] text-white border border-[#FFB2B9]/40'
                        : 'bg-[#1B1B1E] text-[#E4E1E6] border border-[#2A2A2D] hover:border-[#FFB2B9]/45'
                    }`}
                  >
                    {pillar.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Narrative + Dynamic Pillar Spotlight */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <p className="text-lg text-[#E4E1E6]/90 leading-relaxed text-pretty">
                I&apos;m an Electronics and Communication Engineering student at KPR Institute of
                Engineering and Technology with a deep curiosity for embedded hardware, software
                engineering, and practical innovation.
              </p>
              <p className="text-base text-[#929094] leading-relaxed text-pretty">
                I learn best through hands-on experimentation—taking concepts from breadboard
                sensors and Python scripts into working prototypes that solve everyday safety and
                communication challenges.
              </p>
            </div>

            {/* Interactive Pillar Spotlight Card */}
            <div className="rounded-2xl bg-[#1B1B1E] border border-[#2A2A2D] p-6 md:p-8 min-h-[210px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePillar.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between gap-4 border-b border-[#2A2A2D] pb-3">
                    <span className="text-xs font-medium text-[#FFB2B9]">
                      Spotlight · {activePillar.title}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-semibold text-[#E4E1E6] text-balance">
                    {activePillar.headline}
                  </h3>

                  <p className="text-sm sm:text-base text-[#929094] leading-relaxed">
                    {activePillar.description}
                  </p>

                  {/* Unboxed Focus Area Metadata */}
                  <div className="pt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-[#E4E1E6]/80">
                    {activePillar.focusAreas.map((area, idx) => (
                      <span key={area} className="inline-flex items-center gap-3">
                        {idx > 0 && (
                          <span aria-hidden="true" className="text-[#929094]">
                            ·
                          </span>
                        )}
                        <span>{area}</span>
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
