import { useState, MouseEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDownRight, Mail, User } from 'lucide-react';
import { HERO_PORTRAIT_SRC } from '../types/portfolio';

interface HeroSectionProps {
  skillCount: number;
  certCount: number;
  projectCount: number;
  onOpenQuickAddCert: () => void;
  onOpenQuickAddSkill: () => void;
}

export function HeroSection({
  skillCount,
  certCount,
  projectCount,
  onOpenQuickAddCert,
  onOpenQuickAddSkill,
}: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 40 });
  const [imgError, setImgError] = useState(false);

  const handlePortraitMove = (e: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      rotateX: (0.5 - y) * 6,
      rotateY: (x - 0.5) * 6,
      glareX: x * 100,
      glareY: y * 100,
    });
  };

  const resetTilt = () => {
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 40 });
  };

  return (
    <section
      id="home"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-[#0E0E11] border-b border-[#2A2A2D] overflow-hidden"
    >
      {/* Subtle architectural vertical frame lines */}
      <div className="absolute inset-0 pointer-events-none opacity-25" aria-hidden="true">
        <div className="max-w-6xl mx-auto h-full border-x border-[#2A2A2D]" />
      </div>

      {/* Restrained ambient burgundy studio glow */}
      <div
        className="absolute top-24 right-1/4 w-[440px] h-[440px] rounded-full bg-[#A13A4B]/12 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Editorial Typographic Anchor */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center gap-6 order-2 lg:order-1"
          >
            <div className="flex items-center gap-3 text-sm font-medium text-[#FFB2B9]">
              <span className="w-8 h-px bg-[#FFB2B9]" aria-hidden="true" />
              <span>Electronics &amp; Communication Engineering</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-[#E4E1E6] text-balance leading-[1.04]">
              Nishanth
            </h1>

            <p className="text-sm sm:text-base font-medium text-[#929094] tracking-wide">
              ECE Student <span aria-hidden="true">·</span> Developer{' '}
              <span aria-hidden="true">·</span> Creative Thinker
            </p>

            <p className="text-base sm:text-lg text-[#E4E1E6]/85 max-w-xl leading-relaxed text-pretty">
              Exploring technology, building ideas, and turning curiosity into meaningful
              innovation across embedded hardware, computer vision, and visual storytelling.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#A13A4B] text-white text-sm font-medium border border-[#FFB2B9]/30 hover:bg-[#8E3040] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB2B9]"
              >
                <span>Explore Projects</span>
                <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#1B1B1E] text-[#E4E1E6] text-sm font-medium border border-[#2A2A2D] hover:border-[#FFB2B9]/50 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB2B9]"
              >
                <Mail className="w-4 h-4 text-[#FFB2B9]" aria-hidden="true" />
                <span>Let&apos;s Connect</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Authentic Portrait with Interactive Studio Frame */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 order-1 lg:order-2 flex items-center justify-center lg:justify-end"
          >
            <div
              onMouseMove={handlePortraitMove}
              onMouseLeave={resetTilt}
              style={
                prefersReducedMotion
                  ? undefined
                  : {
                      transform: `perspective(950px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                      transition: 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1)',
                    }
              }
              className="relative w-full max-w-sm lg:max-w-md aspect-[4/5] rounded-2xl overflow-hidden bg-[#1B1B1E] border border-[#2A2A2D] shadow-2xl"
            >
              {!imgError ? (
                <img
                  src={HERO_PORTRAIT_SRC}
                  alt="Portrait of Nishanth wearing a dark tailored suit and burgundy shirt"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-top filter contrast-[1.04] brightness-[0.96]"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-[#1B1B1E] text-[#929094] p-6 text-center">
                  <User className="w-12 h-12 text-[#FFB2B9]" />
                  <span className="font-display text-xl text-[#E4E1E6]">Nishanth</span>
                  <span className="text-sm">ECE Student &amp; Developer</span>
                </div>
              )}

              {/* Interactive subtle studio sheen following pointer */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none transition-opacity duration-200"
                style={{
                  background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,178,185,0.14), transparent 55%)`,
                }}
              />

              {/* Bottom contrast scrim so editorial caption stays crisp */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0E0E11] via-[#0E0E11]/65 to-transparent pointer-events-none"
              />

              <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-[#FFB2B9]">KPRIET · Coimbatore</p>
                  <p className="font-display text-lg text-white">Hardware &amp; Software Builder</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width Quantitative Summary & Quick Actions Row Below Split */}
        <div className="mt-14 pt-8 border-t border-[#2A2A2D] grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-baseline justify-between sm:justify-start sm:gap-4">
            <span className="font-mono-tabular text-3xl font-semibold text-[#E4E1E6]">
              0{projectCount}
            </span>
            <span className="text-sm text-[#929094]">
              Engineered Hardware-AI Prototypes
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-baseline gap-4">
              <span className="font-mono-tabular text-3xl font-semibold text-[#E4E1E6]">
                {String(skillCount).padStart(2, '0')}
              </span>
              <span className="text-sm text-[#929094]">Active Technical &amp; Creative Skills</span>
            </div>
            <button
              type="button"
              onClick={onOpenQuickAddSkill}
              className="text-xs font-medium text-[#FFB2B9] hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              + Add Skill
            </button>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-baseline gap-4">
              <span className="font-mono-tabular text-3xl font-semibold text-[#E4E1E6]">
                {String(certCount).padStart(2, '0')}
              </span>
              <span className="text-sm text-[#929094]">Verified Certifications Logged</span>
            </div>
            <button
              type="button"
              onClick={onOpenQuickAddCert}
              className="text-xs font-medium text-[#FFB2B9] hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              + Add Cert
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
