import api from './api';

export const aiService = {
  async generateSummary(payload) {
    const res = await api.post('/ai/generate-summary', payload);
    return res.data;
  },

  async improveBullet(payload) {
    const res = await api.post('/ai/improve-bullet', payload);
    return res.data;
  },

  async suggestSkills(payload) {
    const res = await api.post('/ai/generate-skills', payload);
    return res.data;
  },

  async analyzeResume(payload) {
    const res = await api.post('/ai/analyze-resume', payload);
    return res.data;
  },

  async tailorResume(payload) {
    const res = await api.post('/ai/tailor-resume', payload);
    return res.data;
  },

  async generateCoverLetter(payload) {
    const res = await api.post('/ai/generate-cover-letter', payload);
    return res.data;
  },

  async getInterviewPrep(payload) {
    const res = await api.post('/ai/interview-prep', payload);
    return res.data;
  },

  async evaluateAnswer(payload) {
    const res = await api.post('/ai/evaluate-answer', payload);
    return res.data;
  },

  async generateInitialResume(payload) {
    const res = await api.post('/ai/generate-initial-resume', payload);
    return res.data;
  },
};
