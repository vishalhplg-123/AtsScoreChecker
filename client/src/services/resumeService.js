import api from './api';

export const resumeService = {
  async getResumes() {
    const res = await api.get('/resumes');
    return res.data;
  },

  async getResumeById(id) {
    const res = await api.get(`/resumes/${id}`);
    return res.data;
  },

  async createResume(resumeData) {
    const res = await api.post('/resumes', resumeData);
    return res.data;
  },

  async updateResume(id, resumeData) {
    const res = await api.put(`/resumes/${id}`, resumeData);
    return res.data;
  },

  async deleteResume(id) {
    const res = await api.delete(`/resumes/${id}`);
    return res.data;
  },

  async duplicateResume(id) {
    const res = await api.post(`/resumes/${id}/duplicate`);
    return res.data;
  },
};
