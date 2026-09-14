import api from './api';
import { initialMockJobs } from './mockData';

const getLocalJobs = () => {
  try {
    const data = localStorage.getItem('resumeai_local_jobs');
    return data ? JSON.parse(data) : initialMockJobs;
  } catch (e) {
    return initialMockJobs;
  }
};

const saveLocalJobs = (jobs) => {
  try {
    localStorage.setItem('resumeai_local_jobs', JSON.stringify(jobs));
  } catch (e) {}
};

export const jobService = {
  async getJobs() {
    try {
      const res = await api.get('/jobs');
      if (res.data) saveLocalJobs(res.data.data || []);
      return res.data;
    } catch (err) {
      const local = getLocalJobs();
      return { success: true, count: local.length, data: local };
    }
  },

  async createJob(jobData) {
    try {
      const res = await api.post('/jobs', jobData);
      return res.data;
    } catch (err) {
      const local = getLocalJobs();
      const newJob = {
        ...jobData,
        _id: `job-${Date.now()}`,
        dateApplied: new Date().toISOString(),
      };
      const updated = [newJob, ...local];
      saveLocalJobs(updated);
      return { success: true, data: newJob };
    }
  },

  async updateJob(id, jobData) {
    try {
      const res = await api.put(`/jobs/${id}`, jobData);
      return res.data;
    } catch (err) {
      const local = getLocalJobs();
      const updated = local.map((j) => (j._id === id ? { ...j, ...jobData } : j));
      saveLocalJobs(updated);
      return { success: true, data: { ...jobData, _id: id } };
    }
  },

  async deleteJob(id) {
    try {
      const res = await api.delete(`/jobs/${id}`);
      return res.data;
    } catch (err) {
      const local = getLocalJobs();
      saveLocalJobs(local.filter((j) => j._id !== id));
      return { success: true, message: 'Deleted locally' };
    }
  },
};

