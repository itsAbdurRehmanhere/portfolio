import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if needed
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      console.error('Rate limit exceeded');
    }
    return Promise.reject(error);
  }
);

export const contactService = {
  submitMessage: (data) => api.post('/api/contact', data),
};

export const projectService = {
  getAll: (params) => api.get('/api/projects', { params }),
  getById: (id) => api.get(`/api/projects/${id}`),
};

export const skillService = {
  getAll: (params) => api.get('/api/skills', { params }),
};

export default api;