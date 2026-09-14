import api from './api';

export const coverLetterService = {
  async getCoverLetters() {
    const res = await api.get('/cover-letters');
    return res.data;
  },

  async getCoverLetterById(id) {
    const res = await api.get(`/cover-letters/${id}`);
    return res.data;
  },

  async createCoverLetter(data) {
    const res = await api.post('/cover-letters', data);
    return res.data;
  },

  async updateCoverLetter(id, data) {
    const res = await api.put(`/cover-letters/${id}`, data);
    return res.data;
  },

  async deleteCoverLetter(id) {
    const res = await api.delete(`/cover-letters/${id}`);
    return res.data;
  },
};
