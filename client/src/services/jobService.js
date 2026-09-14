import api from './api';

export const jobService = {
  async getJobs() {
    const res = await api.get('/jobs');
    return res.data;
  },

  async createJob(jobData) {
    const res = await api.post('/jobs', jobData);
    return res.data;
  },

  async updateJob(id, jobData) {
    const res = await api.put(`/jobs/${id}`, jobData);
    return res.data;
  },

  async deleteJob(id) {
    const res = await api.delete(`/jobs/${id}`);
    return res.data;
  },
};
