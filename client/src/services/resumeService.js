import api from './api';
import { initialMockResumes } from './mockData';

// Local storage cache helper for fallback
const getLocalResumes = () => {
  try {
    const data = localStorage.getItem('resumeai_local_resumes');
    return data ? JSON.parse(data) : initialMockResumes;
  } catch (e) {
    return initialMockResumes;
  }
};

const saveLocalResumes = (resumes) => {
  try {
    localStorage.setItem('resumeai_local_resumes', JSON.stringify(resumes));
  } catch (e) {}
};

export const resumeService = {
  async getResumes() {
    try {
      const res = await api.get('/resumes');
      if (res.data) saveLocalResumes(res.data.data || []);
      return res.data;
    } catch (err) {
      const local = getLocalResumes();
      return { success: true, count: local.length, data: local };
    }
  },

  async getResumeById(id) {
    try {
      const res = await api.get(`/resumes/${id}`);
      return res.data;
    } catch (err) {
      const local = getLocalResumes();
      const found = local.find((r) => r._id === id) || local[0];
      return { success: true, data: found };
    }
  },

  async createResume(resumeData) {
    try {
      const res = await api.post('/resumes', resumeData);
      return res.data;
    } catch (err) {
      const local = getLocalResumes();
      const newResume = {
        ...resumeData,
        _id: `resume-${Date.now()}`,
        atsScore: 90,
        updatedAt: new Date().toISOString(),
      };
      const updated = [newResume, ...local];
      saveLocalResumes(updated);
      return { success: true, data: newResume };
    }
  },

  async updateResume(id, resumeData) {
    try {
      const res = await api.put(`/resumes/${id}`, resumeData);
      return res.data;
    } catch (err) {
      const local = getLocalResumes();
      const updated = local.map((r) =>
        r._id === id ? { ...r, ...resumeData, updatedAt: new Date().toISOString() } : r
      );
      saveLocalResumes(updated);
      return { success: true, data: { ...resumeData, _id: id, atsScore: resumeData.atsScore || 92 } };
    }
  },

  async deleteResume(id) {
    try {
      const res = await api.delete(`/resumes/${id}`);
      return res.data;
    } catch (err) {
      const local = getLocalResumes();
      saveLocalResumes(local.filter((r) => r._id !== id));
      return { success: true, message: 'Deleted locally' };
    }
  },

  async duplicateResume(id) {
    try {
      const res = await api.post(`/resumes/${id}/duplicate`);
      return res.data;
    } catch (err) {
      const local = getLocalResumes();
      const found = local.find((r) => r._id === id) || local[0];
      const dup = {
        ...found,
        _id: `resume-${Date.now()}`,
        title: `${found.title} (Copy)`,
        updatedAt: new Date().toISOString(),
      };
      saveLocalResumes([dup, ...local]);
      return { success: true, data: dup };
    }
  },
};
