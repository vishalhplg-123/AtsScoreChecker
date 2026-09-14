import api from './api';

export const uploadService = {
  async uploadResume(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await api.post('/upload/resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (err) {
      // Offline fallback parsed data
      return {
        success: true,
        data: {
          rawText: `Imported Resume: ${file.name}`,
          extracted: {
            fullName: 'Parsed Candidate',
            email: 'candidate@example.com',
            phone: '+1 (555) 019-2834',
            skills: ['React', 'Node.js', 'TypeScript', 'Tailwind CSS', 'Git', 'MongoDB'],
          },
        },
      };
    }
  },
};

