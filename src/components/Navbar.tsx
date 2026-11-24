import { useEffect, useState } from 'react';
import { Menu, Pencil, Check, X } from 'lucide-react';

interface NavbarProps {
  isEditMode: boolean;
  onToggleEditMode: () => void;
  activeSection: string;
}

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar({ isEditMode, onToggleEditMode, activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-200 ${
        scrolled || mobileOpen
          ? 'bg-[#0E0E11]/90 backdrop-blur-md border-b border-[#2A2A2D]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element brand wordmark */}
        <a
          href="#home"
          className="font-display text-lg md:text-xl font-semibold tracking-tight text-[#E4E1E6] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB2B9] rounded-sm"
        >
          Nishanth
        </a>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-underline text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB2B9] rounded-sm ${
                  isActive
                    ? 'text-[#FFB2B9] is-active'
                    : 'text-[#929094] hover:text-[#E4E1E6]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + mobile drawer trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleEditMode}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB2B9] ${
              isEditMode
                ? 'bg-[#A13A4B] text-white border border-[#FFB2B9]/40 hover:bg-[#8E3040]'
                : 'bg-[#1B1B1E] text-[#E4E1E6] border border-[#2A2A2D] hover:border-[#FFB2B9]/50'
            }`}
          >
            {isEditMode ? (
              <>
                <Check className="w-4 h-4" aria-hidden="true" />
                <span>Done Editing</span>
              </>
            ) : (
              <>
                <Pencil className="w-3.5 h-3.5 text-[#FFB2B9]" aria-hidden="true" />
                <span>Edit Portfolio</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg bg-[#1B1B1E] border border-[#2A2A2D] text-[#E4E1E6] hover:border-[#FFB2B9]/50 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0E0E11] border-b border-[#2A2A2D] px-6 py-5">
          <ul className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-2 text-base font-medium transition-colors ${
                    activeSection === item.id ? 'text-[#FFB2B9]' : 'text-[#929094] hover:text-[#E4E1E6]'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
