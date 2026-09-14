import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { resumeService } from '../services/resumeService';
import { useToast } from './ToastContext';

const ResumeContext = createContext(null);

export const defaultResumeState = {
  title: 'Untitled Resume',
  targetRole: 'Software Engineer',
  template: 'modern',
  customization: {
    accentColor: '#2563eb',
    fontFamily: 'inter',
    fontSize: 'medium',
    lineSpacing: 'normal',
    margins: 'normal',
    sectionOrder: [
      'personalInfo',
      'summary',
      'experience',
      'projects',
      'skills',
      'education',
      'certifications',
      'achievements',
      'languages',
      'customSections',
    ],
    hiddenSections: [],
  },
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    website: '',
    avatar: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [
    { category: 'Technical Skills', items: [] },
  ],
  projects: [],
  certifications: [],
  achievements: [],
  languages: [],
  customSections: [],
  atsScore: 0,
};

export const ResumeProvider = ({ children }) => {
  const [resume, setResume] = useState(defaultResumeState);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [zoom, setZoom] = useState(100);
  const { showSuccess, showError } = useToast();

  const debounceTimer = useRef(null);
  const lastSavedStateRef = useRef(null);

  // Set resume safely without triggering spurious autosave if loaded from server
  const setResumeWithoutSave = (data) => {
    lastSavedStateRef.current = JSON.stringify(data);
    setResume(data);
  };

  // Autosave when resume changes (only if resume has a valid _id and actual changes were made)
  useEffect(() => {
    if (!resume._id) return;

    const currentSerialized = JSON.stringify(resume);
    if (lastSavedStateRef.current === null) {
      lastSavedStateRef.current = currentSerialized;
      return;
    }

    // If no content actually changed, do nothing
    if (lastSavedStateRef.current === currentSerialized) {
      return;
    }

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    setIsSaving(true);
    debounceTimer.current = setTimeout(async () => {
      try {
        const res = await resumeService.updateResume(resume._id, resume);
        if (res.data) {
          setLastSaved(new Date());
          lastSavedStateRef.current = JSON.stringify(res.data);
          if (res.data.atsScore !== undefined) {
            setResume((prev) => ({
              ...prev,
              atsScore: res.data.atsScore,
              lastAtsAnalysis: res.data.lastAtsAnalysis,
            }));
          }
        }
      } catch (err) {
        console.error('Autosave error:', err);
      } finally {
        setIsSaving(false);
      }
    }, 1500);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [resume]);

  // Load a resume by ID
  const loadResume = async (id) => {
    try {
      const res = await resumeService.getResumeById(id);
      if (res.data) {
        lastSavedStateRef.current = JSON.stringify(res.data);
        setResume(res.data);
        setLastSaved(new Date(res.data.updatedAt));
      }
      return res.data;
    } catch (err) {
      showError('Failed to load resume.');
      throw err;
    }
  };

  // Quick State Updaters
  const updatePersonalInfo = (field, value) => {
    setResume((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  const updateSummary = (value) => {
    setResume((prev) => ({ ...prev, summary: value }));
  };

  const updateCustomization = (key, value) => {
    setResume((prev) => ({
      ...prev,
      customization: {
        ...prev.customization,
        [key]: value,
      },
    }));
  };

  const setTemplate = (templateName) => {
    setResume((prev) => ({ ...prev, template: templateName }));
  };

  const updateSectionOrder = (newOrder) => {
    setResume((prev) => ({
      ...prev,
      customization: {
        ...prev.customization,
        sectionOrder: newOrder,
      },
    }));
  };

  const toggleSectionVisibility = (sectionKey) => {
    setResume((prev) => {
      const hidden = prev.customization?.hiddenSections || [];
      const isHidden = hidden.includes(sectionKey);
      return {
        ...prev,
        customization: {
          ...prev.customization,
          hiddenSections: isHidden
            ? hidden.filter((s) => s !== sectionKey)
            : [...hidden, sectionKey],
        },
      };
    });
  };

  return (
    <ResumeContext.Provider
      value={{
        resume,
        setResume,
        loadResume,
        isSaving,
        lastSaved,
        zoom,
        setZoom,
        updatePersonalInfo,
        updateSummary,
        updateCustomization,
        setTemplate,
        updateSectionOrder,
        toggleSectionVisibility,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) throw new Error('useResume must be used within a ResumeProvider');
  return context;
};
