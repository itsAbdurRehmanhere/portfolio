import axios from 'axios';

const API_BASE_URL = 'http://localhost:8001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const projectService = {
  getProjects: async () => {
    const response = await api.get('/projects');
    return response.data;
  },
  getFeaturedProjects: async () => {
    const response = await api.get('/projects?featured=true');
    return response.data;
  }
};

export const skillService = {
  getSkills: async () => {
    const response = await api.get('/skills');
    return response.data;
  }
};

export const contactService = {
  sendMessage: async (data) => {
    const response = await api.post('/contact', data);
    return response.data;
  }
};

export const experienceService = {
  getExperiences: async () => {
    const response = await api.get('/experience');
    return response.data;
  }
};

export default api;
