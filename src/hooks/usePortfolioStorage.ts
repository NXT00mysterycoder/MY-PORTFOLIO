import { useCallback, useEffect, useState } from 'react';
import {
  CertificationItem,
  ContactProfile,
  DEFAULT_PORTFOLIO_DATA,
  PortfolioData,
  SkillItem,
} from '../types/portfolio';

const STORAGE_KEY = 'nishanth_portfolio_data_v1';

function loadInitialData(): PortfolioData {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PORTFOLIO_DATA;
    const parsed = JSON.parse(raw) as Partial<PortfolioData>;
    return {
      skills: Array.isArray(parsed.skills) ? parsed.skills : DEFAULT_PORTFOLIO_DATA.skills,
      certifications: Array.isArray(parsed.certifications)
        ? parsed.certifications
        : DEFAULT_PORTFOLIO_DATA.certifications,
      contact: parsed.contact
        ? { ...DEFAULT_PORTFOLIO_DATA.contact, ...parsed.contact }
        : DEFAULT_PORTFOLIO_DATA.contact,
    };
  } catch {
    return DEFAULT_PORTFOLIO_DATA;
  }
}

export function usePortfolioStorage() {
  const [data, setData] = useState<PortfolioData>(loadInitialData);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Ignore quota errors cleanly
    }
  }, [data]);

  const addSkill = useCallback((skill: Omit<SkillItem, 'id'>) => {
    const newItem: SkillItem = {
      ...skill,
      id: `skill-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    };
    setData((prev) => ({ ...prev, skills: [newItem, ...prev.skills] }));
    return newItem;
  }, []);

  const updateSkill = useCallback((id: string, updates: Omit<SkillItem, 'id'>) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...updates, id } : s)),
    }));
  }, []);

  const deleteSkill = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
  }, []);

  const addCertification = useCallback((cert: Omit<CertificationItem, 'id'>) => {
    const newCert: CertificationItem = {
      ...cert,
      id: `cert-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    };
    setData((prev) => ({
      ...prev,
      certifications: [newCert, ...prev.certifications],
    }));
    return newCert;
  }, []);

  const updateCertification = useCallback((id: string, updates: Omit<CertificationItem, 'id'>) => {
    setData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((c) => (c.id === id ? { ...updates, id } : c)),
    }));
  }, []);

  const deleteCertification = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c.id !== id),
    }));
  }, []);

  const updateContact = useCallback((contact: ContactProfile) => {
    setData((prev) => ({ ...prev, contact }));
  }, []);

  const replaceAllData = useCallback((nextData: PortfolioData) => {
    setData(nextData);
  }, []);

  const resetToDefault = useCallback(() => {
    setData(DEFAULT_PORTFOLIO_DATA);
  }, []);

  return {
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
  };
}
