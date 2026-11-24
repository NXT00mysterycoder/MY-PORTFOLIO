import { useMemo, useState } from 'react';
import { Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { SkillCategory, SkillItem } from '../types/portfolio';

interface SkillsSectionProps {
  skills: SkillItem[];
  isEditMode: boolean;
  onAddSkill: () => void;
  onEditSkill: (skill: SkillItem) => void;
  onDeleteSkill: (id: string) => void;
}

const CATEGORIES: Array<'All' | SkillCategory> = [
  'All',
  'Programming',
  'Engineering',
  'Creative',
  'Professional',
];

export function SkillsSection({
  skills,
  isEditMode,
  onAddSkill,
  onEditSkill,
  onDeleteSkill,
}: SkillsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | SkillCategory>('All');
  const [query, setQuery] = useState('');

  const filteredSkills = useMemo(() => {
    const q = query.trim().toLowerCase();
    return skills.filter((skill) => {
      const matchesCat = selectedCategory === 'All' || skill.category === selectedCategory;
      const matchesQuery =
        !q ||
        skill.name.toLowerCase().includes(q) ||
        skill.category.toLowerCase().includes(q) ||
        (skill.note ?? '').toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [skills, selectedCategory, query]);

  return (
    <section id="skills" className="py-20 md:py-28 bg-[#131316] border-b border-[#2A2A2D]">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-medium text-[#FFB2B9] mb-3">03. Capabilities</p>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#E4E1E6] text-balance">
              Multidisciplinary Stack.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search input */}
            <div className="relative">
              <Search
                className="w-4 h-4 text-[#929094] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search skills..."
                aria-label="Search skills"
                className="pl-9 pr-3 py-2 rounded-lg bg-[#1B1B1E] border border-[#2A2A2D] text-sm text-[#E4E1E6] placeholder:text-[#929094] focus:outline-none focus:border-[#FFB2B9]/60 w-48 sm:w-56"
              />
            </div>

            <button
              type="button"
              onClick={onAddSkill}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#A13A4B] text-white text-sm font-medium border border-[#FFB2B9]/30 hover:bg-[#8E3040] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB2B9]"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              <span>Add Skill</span>
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="group"
          aria-label="Filter skills by category"
          className="flex flex-wrap items-center gap-2 mb-8 pb-6 border-b border-[#2A2A2D]"
        >
          {CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            const count =
              category === 'All'
                ? skills.length
                : skills.filter((s) => s.category === category).length;

            return (
              <button
                key={category}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB2B9] ${
                  active
                    ? 'bg-[#A13A4B] text-white border border-[#FFB2B9]/40'
                    : 'bg-[#1B1B1E] text-[#929094] border border-[#2A2A2D] hover:text-[#E4E1E6] hover:border-[#FFB2B9]/40'
                }`}
              >
                <span>{category}</span>
                <span className="font-mono-tabular ml-2 text-xs opacity-80">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        {filteredSkills.length === 0 ? (
          <div className="rounded-2xl bg-[#1B1B1E] border border-[#2A2A2D] p-10 text-center flex flex-col items-center gap-3">
            <p className="text-base font-medium text-[#E4E1E6]">No matching skills found</p>
            <p className="text-sm text-[#929094]">
              Try clearing your search filter or add a new skill you recently learned.
            </p>
            <button
              type="button"
              onClick={onAddSkill}
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#A13A4B] text-white text-sm font-medium cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Skill</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSkills.map((skill) => (
              <article
                key={skill.id}
                className="rounded-xl bg-[#1B1B1E] border border-[#2A2A2D] hover:border-[#FFB2B9]/40 transition-colors duration-150 p-5 flex flex-col justify-between gap-4"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-semibold text-[#E4E1E6]">{skill.name}</h3>
                    {isEditMode && (
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => onEditSkill(skill)}
                          aria-label={`Edit ${skill.name}`}
                          className="p-1.5 rounded-md bg-[#131316] border border-[#2A2A2D] text-[#E4E1E6] hover:border-[#FFB2B9]/60 cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteSkill(skill.id)}
                          aria-label={`Delete ${skill.name}`}
                          className="p-1.5 rounded-md bg-[#131316] border border-[#2A2A2D] text-[#FFB4AB] hover:border-[#FFB4AB]/60 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {skill.note && (
                    <p className="text-sm text-[#929094] leading-relaxed">{skill.note}</p>
                  )}
                </div>

                {/* Unboxed typographic metadata */}
                <div className="pt-3 border-t border-[#2A2A2D]/70 flex items-center justify-between gap-3 text-xs font-medium">
                  <span className="text-[#929094]">{skill.category}</span>
                  <span className="text-[#FFB2B9]">{skill.proficiency}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
