import api from './api';

export const uploadService = {
  async uploadResume(file) {
    const formData = new FormData();
    formData.append('file', file);

    const res = await api.post('/upload/resume', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },
};
