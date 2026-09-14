import api from './api';
import { initialMockLetters } from './mockData';

const getLocalLetters = () => {
  try {
    const data = localStorage.getItem('resumeai_local_letters');
    return data ? JSON.parse(data) : initialMockLetters;
  } catch (e) {
    return initialMockLetters;
  }
};

const saveLocalLetters = (letters) => {
  try {
    localStorage.setItem('resumeai_local_letters', JSON.stringify(letters));
  } catch (e) {}
};

export const coverLetterService = {
  async getCoverLetters() {
    try {
      const res = await api.get('/cover-letters');
      if (res.data) saveLocalLetters(res.data.data || []);
      return res.data;
    } catch (err) {
      const local = getLocalLetters();
      return { success: true, count: local.length, data: local };
    }
  },

  async getCoverLetterById(id) {
    try {
      const res = await api.get(`/cover-letters/${id}`);
      return res.data;
    } catch (err) {
      const local = getLocalLetters();
      const found = local.find((l) => l._id === id) || local[0];
      return { success: true, data: found };
    }
  },

  async createCoverLetter(data) {
    try {
      const res = await api.post('/cover-letters', data);
      return res.data;
    } catch (err) {
      const local = getLocalLetters();
      const newLetter = {
        ...data,
        _id: `cl-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      const updated = [newLetter, ...local];
      saveLocalLetters(updated);
      return { success: true, data: newLetter };
    }
  },

  async updateCoverLetter(id, data) {
    try {
      const res = await api.put(`/cover-letters/${id}`, data);
      return res.data;
    } catch (err) {
      const local = getLocalLetters();
      const updated = local.map((l) => (l._id === id ? { ...l, ...data } : l));
      saveLocalLetters(updated);
      return { success: true, data: { ...data, _id: id } };
    }
  },

  async deleteCoverLetter(id) {
    try {
      const res = await api.delete(`/cover-letters/${id}`);
      return res.data;
    } catch (err) {
      const local = getLocalLetters();
      saveLocalLetters(local.filter((l) => l._id !== id));
      return { success: true, message: 'Deleted locally' };
    }
  },
};

